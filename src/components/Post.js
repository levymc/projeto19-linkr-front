import styled from 'styled-components'
import React, { useContext, useEffect, useRef, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { SlPaperPlane } from 'react-icons/sl';
import UrlPreview from './UrlPreview';
import { BsFillPencilFill } from 'react-icons/bs';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';
import axios from "axios";
import ReactModal from 'react-modal';
import LikeButton from './LikeButton';
import AuthContext from '../context/AuthContext';
import ReactLoading from "react-loading";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CommentField, ContainerComments } from './StyledComments';
import Comment from './Comment';    
import RepostButton from './RepostButton';


export default function Post(props) {
    const [originalText, setOriginalText] = useState(props.text)
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.text);
    const [hashtagWords, setHashtagWords] = useState([]);
    const [editedHashtags, setEditedHashtags] = useState(() => {
        if (props.hashtag) return props.hashtag;
        else return "";
    });
    const [onlyText, setOnlyText] = useState(props.text)
    const [editedContent, setEditedContent] = useState(`${props.text} ${props.hashtag}`);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const editFieldRef = useRef();
    let isUserPost = false;
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const postUserId = props.userId
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);

    const fetchCommentCount = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/numberComments/${props.postId}`);
          setCommentCount(parseInt(response.data.commentcount));
        } catch (error) {
          console.error("Erro ao obter contador de comentários", error);
        }
      };
      
      useEffect(() => {
        fetchCommentCount();
      }, []);    

      useEffect(() => {
        fetchCommentCount();
        fetchComments();
    }, [props.postId, commentCount]); 

    useEffect(() => {
        setOriginalText(props.text);
        setEditedText(props.text)
    }, [props.text]);

    if (user.id === postUserId) {
        isUserPost = true;
    }

    useEffect(() => {
        if (isEditing) {
            editFieldRef.current.focus();
            editFieldRef.current.selectionStart = editFieldRef.current.value.length;
            editFieldRef.current.selectionEnd = editFieldRef.current.value.length;
        }
    }, [isEditing]);

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleDeleteConfirm = async () => {
        const postId = props.postId
        setLoading(true)
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`);
            console.log(response)
            setLoading(false)
            closeDeleteModal();
            props.setCont((props.cont) - 1)
        } catch (error) {
            console.error("Erro ao excluir o post", error);
            setLoading(false)
            closeDeleteModal();
            alert("Error to delete post");
        }
        fetchCommentCount();
        fetchComments();
    };

    const handleEditIconClick = () => {
        if (isEditing) {
            setOriginalText(editedText);
            setIsEditing(false);
            setEditedContent(`${editedText} ${editedHashtags}`);
        } else {
            setOriginalText(editedText);
            setEditedHashtags(editedHashtags);
            setEditedContent(`${editedText} ${editedHashtags}`)
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        if (isEditing) {
            setEditedContent(inputValue);
        } else {
            setEditedText(inputValue);
        }
        const words = inputValue.split(/\s+/);
        console.log(words, "words")
        setOriginalText(words.join(" "))
        const hashtagWordsArray = words.filter(word => word.startsWith("#"));
        setHashtagWords(hashtagWordsArray);

        const nonHashtagWordsArray = words.filter(word => !word.startsWith("#"));
        setOnlyText(nonHashtagWordsArray.join(" "));
        if (!isEditing) {
            setEditedHashtags(hashtagWordsArray.join(" "));
        }
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        setEditedContent(`${editedText} ${editedHashtags}`);
    };

    const handleEditIconMouseDown = (event) => {
        event.preventDefault();
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            setLoading(true);

            setEditedText(originalText);
            setEditedHashtags(hashtagWords.join(" "));

            const words = editedContent.split(/\s+/);
            const hashtagWordsArray = words.filter(word => word.startsWith("#"));
            setHashtagWords(hashtagWordsArray);

            setIsEditing(false);

            const hashtags = hashtagWords.join(" ")

            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/posts`, {
                    text: originalText,
                    hashtags: hashtags,
                    postId: props.postId
                });
                setLoading(false);
            } catch (error) {
                setOriginalText(editedText)
                setEditedHashtags(editedHashtags);
                setIsEditing(false);
                setLoading(false);
                console.error("Erro ao atualizar o post", error);
                alert("Error to update post");
            }

        } else if (event.key === 'Escape') {
            setIsEditing(false);
            setOriginalText(editedText);
        }
    };

    const handleHashtagClick = (hashtag) => {
        navigate(`/hashtag/${hashtag}`);
    };

    const handleTextAreaChange = (event) => {
        const value = event.target.value;
        setCommentInput(value);
        console.log(value)

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            handleSendComment(); 
        }
    };

    const handleSendComment = async () => {
        if (commentInput.trim() === '') {
            return; 
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/comments`, {
                postId: props.postId,
                userId: user.id, 
                comment: commentInput
            });
            setCommentInput('');
            fetchComments();
            fetchCommentCount();
        } catch (error) {
            console.error('Erro ao enviar o comentário', error);
            alert('Erro ao enviar o comentário');
        }
    };

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/${props.postId}`);
            setComments(response.data); 
        } catch (error) {
            console.error('Erro ao obter os comentários', error);
        }
        setLoadingComments(false);
    };

    const handleCommentsIconClick = () => {
        setCommentsVisible(!commentsVisible);
        if (!commentsVisible) {
            fetchComments(); 
        }
    };
    

    return (
        <>
            <ContainerPost data-test="post" onClick = {() => console.log(props.postUrl)} >
                <LeftSection>
                    <PerfilImg src={props.userImg} />
                    <LikeButton />
                    <span data-test="comment-btn"><AiOutlineComment className="comments" onClick={handleCommentsIconClick} /></span>
                    <p data-test="comment-counter">{commentCount} comments</p>
                    {/* <RepostButton postId={props.postId} respostAmount={0} /> */}
                    {/* eu colocaria no respostAmount o valor recebido pelo back, mas falta implementar a timeline de following */}
                </LeftSection>
                <div>
                    <h2 data-test="username" onClick={() => navigate(`/user/${postUserId}`)}>{props.name}</h2>
                    <IconsEditTrash isUserPost={isUserPost}>
                        {isUserPost && (
                            <>
                                <p data-test="edit-btn"><BsFillPencilFill className="pencil" onClick={handleEditIconClick} onMouseDown={handleEditIconMouseDown} /></p>
                                <p data-test="delete-btn"><BiSolidTrashAlt className="trash" onClick={openDeleteModal} /></p>
                            </>
                        )}
                    </IconsEditTrash>
                </div>

                {isEditing ? (
                    <textarea
                        data-test="edit-input"
                        ref={editFieldRef}
                        type="text"
                        value={originalText}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                ) : (
                    <p data-test="description">
                        {originalText.split(/\s+/).map((word, index) => {
                            if (word.startsWith('#')) {
                                const hashtag = word.substring(1);
                                return (
                                    <Link
                                        to={`/hashtag/${hashtag}`}
                                        data-test="description"
                                        key={index}
                                        onClick={() => handleHashtagClick(hashtag)}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {word}{' '}
                                    </Link>
                                );
                            }
                            return `${word} `;
                        })}
                    </p>


                )}
                <UrlPreview
                    title={props.title}
                    metaImg={props.metaImg}
                    description={props.description}
                    postUrl={props.postUrl}
                />
                {isDeleteModalOpen && <BackgroundOverlay />}
                <ReactModal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeDeleteModal}
                    contentLabel="Confirmação de Exclusão"
                    overlayClassName="custom-overlay"
                    className="custom-content"
                >
                    <CustomContent>
                        <p>Are you sure you want<br />to delete this post?</p>
                        <div>
                            <CustomButton data-test="cancel" cancel onClick={closeDeleteModal}>No, go back</CustomButton>
                            {loading ? "" : <CustomButton data-test="confirm" onClick={handleDeleteConfirm}>Yes, delete it</CustomButton>}
                            {loading && (
                                <ContainerLoading>
                                    <ReactLoading
                                        type="spin"
                                        color="#ffffff"
                                        height={40}
                                        width={40}
                                    />
                                </ContainerLoading>
                            )}
                        </div>
                    </CustomContent>
                </ReactModal>
            </ContainerPost>
            {commentsVisible && (
                <ContainerComments data-test="comment-box">
                    {loadingComments ? (
                        <p>Loading comments...</p>
                    ) : (
                        <>
                            {comments.map((comment, index) => (
                                <Comment key={index} info={comment} userId={postUserId}/>
                            ))}
                            <CommentField>
                                <img src={user.imageUrl} />
                                <textarea
                                    data-test="comment-input"
                                    placeholder="write a comment..."
                                    value={commentInput}
                                    onChange={handleTextAreaChange}
                                    onKeyDown={handleTextAreaChange}
                                />
                            </CommentField>
                            <span data-test="comment-submit"><SlPaperPlane className="send" onClick={handleSendComment} /></span>
                        </>
                    )}
                </ContainerComments>
            )}
        </>
    )
}

const ContainerLikes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    justify-content: center;
    align-items: center;
    span{ 
        font-size: 13px;
    }
`

const PerfilImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
`
const ContainerPost = styled.div`
    height: 100%;   
    width: 100%;
    background-color: #171717;
    //box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212); 
    border-radius: 16px;
    color: white;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    padding: 2em;
    padding-left: 15%;
    position:relative;
    z-index: 2;
    gap: 1em;
    div{
        display: flex;
        justify-content: space-between;
        h2{
            cursor: pointer;
        }
    }

    textarea {
        margin-top: 7px;
        margin-bottom: 15px;
        color: #4C4C4C;
        font-family: Lato;
        font-size: 17px;
        border: none;
        border-radius: 7px;
        resize: none;
        word-wrap: break-word; 
        white-space: pre-wrap;
        overflow-y: auto; 
        min-height: 50px; 
        max-height: 100px; 
        height: auto;
        &:focus {
        outline: none;
        }
    }
`

const LeftSection = styled.section`
    margin-left: 10px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #171717;
    height: calc(100% - 32px);
    width: 12%;
    padding-top: 2em;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2em;
    .comments{
        font-size: 25px;
        cursor: pointer;
    }
    p{
        color: #FFF;
        text-align: center;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        position: relative;
        bottom: 13px;
    }
`

const IconsEditTrash = styled.div`
    display: ${props => (props.isUserPost ? 'flex' : 'none')};
    .pencil {
        margin-right: 15px;
        cursor: pointer;
    }
    .trash{
        cursor: pointer;
    }
`

const CustomContent = styled.div`
    color: white;
    text-align: center;
    font-family: Lato;
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background-color: #333;
    border-radius: 50px;
    width: 597px;
    height: 262px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: auto;
    margin-bottom: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    div{display:flex}
`;

const CustomButton = styled.button`
    background-color: ${props => (props.cancel ? '#FFFFFF' : '#1877F2')};
    color:  ${props => (props.cancel ? '#1877F2' : '#FFFFFF')};
    border: none;
    border-radius: 4px;
    width: 134px;
    height: 37px;
    cursor: pointer;
    margin: 13px;
    margin-top: 40px;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.90);
  z-index: 10; 
`;

const ContainerLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 134px;
    height: 37px;
    margin: 13px;
    margin-top: 38px;
`