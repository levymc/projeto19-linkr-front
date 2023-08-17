import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UrlPreview from './UrlPreview';
import { BsFillPencilFill } from 'react-icons/bs';
import { BiSolidTrashAlt } from 'react-icons/bi';
import axios from "axios";
import LikeButton from './LikeButton';

export default function Post(props) {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.text);
    const [editModeText, setEditModeText] = useState(editedText);
    const [hashtagWords, setHashtagWords] = useState([]);
    const [editedHashtags, setEditedHashtags] = useState(props.hashtag);
    const [onlyText, setOnlyText] = useState(props.text)
    const [editedContent, setEditedContent] = useState(`${props.text} ${props.hashtag}`);
    

    const editFieldRef = useRef();

    useEffect(() => {
        if (isEditing) {
            editFieldRef.current.focus();
            editFieldRef.current.selectionStart = editFieldRef.current.value.length;
            editFieldRef.current.selectionEnd = editFieldRef.current.value.length;
        }
    }, [isEditing]);

    const handleEditIconClick = () => {
        if (isEditing) {
            setEditedText(editModeText);
            setIsEditing(false);
            setEditedContent(`${editedText} ${editedHashtags}`);
        } else {
            setEditModeText(editedText);
            setEditedHashtags(editedHashtags);
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

            //requisição
            axios.put('http://localhost:5000/posts')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                setEditedText(editModeText)
                setEditedHashtags(editedHashtags);
                setIsEditing(false);
                alert("Erro ao atualizar o post");
            });

            setEditedText(onlyText);
            setEditedHashtags(hashtagWords.join(" "));

            const words = editedContent.split(/\s+/);
            const hashtagWordsArray = words.filter(word => word.startsWith("#"));
            setHashtagWords(hashtagWordsArray);
            
            setLoading(false);
            setIsEditing(false);
        } else if (event.key === 'Escape') {
            setIsEditing(false);
        }
    };

    console.log(editedHashtags)
    console.log(editedText)
    console.log(loading)


    return (
        <ContainerPost>
            <LeftSection>
                <PerfilImg src="https://yt3.googleusercontent.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" />
                <LikeButton />
            </LeftSection>
            <h2>{props.name}
                <IconsEditTrash>
                    <BsFillPencilFill className="pencil" onClick={handleEditIconClick} onMouseDown={handleEditIconMouseDown} />
                    <BiSolidTrashAlt className="trash" />
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
                />
            ) : (
                <p>
                    {editedText}{" "}{<b>{editedHashtags}</b>}
                </p>

            )}
            <UrlPreview
                text={"testee"}
            />
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
        margin-top: 15px;
        margin-bottom: 10px;
        color: #4C4C4C;
        font-family: Lato;
        font-size: 17px;
        border: none;
        border-radius: 7px;
        resize: none;
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
        margin-right: 10px;
    }
`