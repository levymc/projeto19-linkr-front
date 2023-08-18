import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UrlPreview from './UrlPreview';
import { BsFillPencilFill } from 'react-icons/bs';
import { BiSolidTrashAlt } from 'react-icons/bi';
import axios from "axios";
import ReactModal from 'react-modal';
import { simpleModal } from './modais/modais';

export default function Post(props) {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.text);
    const [editModeText, setEditModeText] = useState(editedText);
    const [hashtagWords, setHashtagWords] = useState([]);
    const [editedHashtags, setEditedHashtags] = useState(props.hashtag);
    const [onlyText, setOnlyText] = useState(props.text)
    const [editedContent, setEditedContent] = useState(`${props.text} ${props.hashtag}`);

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);


    const editFieldRef = useRef();

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
        try {
            const response = await axios.delete(`http://localhost:5000/posts/${postId}`);
            console.log(response)
            closeDeleteModal();
            simpleModal("success")
            window.location.reload();
        } catch (error) {
            console.error("Erro ao excluir o post", error);
            closeDeleteModal();
            alert("Erro ao excluir o post");
        }
    };

    const handleEditIconClick = () => {
        if (isEditing) {
            setEditedText(editModeText);
            setIsEditing(false);
            setEditedContent(`${editedText} ${editedHashtags}`);
        } else {
            setEditModeText(editedText);
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

            setEditedText(onlyText);
            setEditedHashtags(hashtagWords.join(" "));

            const words = editedContent.split(/\s+/);
            const hashtagWordsArray = words.filter(word => word.startsWith("#"));
            setHashtagWords(hashtagWordsArray);

            setLoading(false);
            setIsEditing(false);

            try {
                await axios.put('http://localhost:5000/posts', {
                    text: onlyText,
                    hashtags: hashtagWords.join(" "),
                    postId: 1
                });
            } catch (error) {
                setEditedText(editModeText)
                setEditedHashtags(editedHashtags);
                setIsEditing(false);
                console.error("Erro ao atualizar o post", error);
                alert("Erro ao atualizar o post");
            }
        } else if (event.key === 'Escape') {
            setIsEditing(false);
        }
    };

    // console.log(editedHashtags)
    // console.log(editedText)
    // console.log(loading)

    return (
        <ContainerPost>
            <LeftSection>
                <PerfilImg src="https://yt3.googleusercontent.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" />
                <ContainerLikes>
                    <FavoriteBorderIcon />
                    <span>13 likes</span>
                </ContainerLikes>
            </LeftSection>
            <h2>{props.name}
                <IconsEditTrash>
                    <BsFillPencilFill className="pencil" onClick={handleEditIconClick} onMouseDown={handleEditIconMouseDown} />
                    <BiSolidTrashAlt className="trash" onClick={openDeleteModal} />
                </IconsEditTrash>
            </h2>
            {isEditing ? (
                <textarea
                    ref={editFieldRef}
                    type="text"
                    value={editedContent}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
            ) : (
                <p>
                    {editedText}{" "}{<b>{editedHashtags}</b>}
                </p>

            )}
            <UrlPreview
                text={"testee"}
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
                    <p>Are you sure you want<br/>to delete this post?</p>
                    <div>
                        <CustomButton cancel onClick={closeDeleteModal}>No, go back</CustomButton>
                        <CustomButton onClick={handleDeleteConfirm}>Yes, delete it</CustomButton>
                    </div>
                </CustomContent>
            </ReactModal>
        </ContainerPost>
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

`
const ContainerPost = styled.div`
    height: 17em;   
    width: 100%;
    background-color: #171717;
    box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212); 
    border-radius: 10px;
    color: white;

    display: flex;
    flex-direction: column;
    padding: 2em;
    padding-left: 20%;
    position:relative;
    h2{
        display: flex;
        justify-content: space-between;
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
    position: absolute;
    left: 0;
    top: 0;
    background-color: #333333;
    width: 15%;
    height: 19em;
    padding-top: 2em;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2em;
`

const IconsEditTrash = styled.div`
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