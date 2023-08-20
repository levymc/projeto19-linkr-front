import { EditField } from "./Styled";
import { BsFillPencilFill } from 'react-icons/bs';
import { BiSolidTrashAlt } from 'react-icons/bi';

import React, { useState, useRef, useEffect } from 'react';

export function EditPost(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material");
  const [editModeText, setEditModeText] = useState(editedText);
  const [editedHashtags, setEditedHashtags] = useState(props.hashtag);
  console.lof(editedHashtags)
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
      //setEditedText(editModeText);
      setIsEditing(false);
    } else {
      setEditModeText(editedText);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    setEditModeText(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleEditIconMouseDown = (event) => {
    event.preventDefault(); // Impede que o foco seja roubado do textarea
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <EditField>
      <div>
        <p>Juvenal Juvêncio</p>
        <ul>
          <BsFillPencilFill className="pencil" onClick={handleEditIconClick} onMouseDown={handleEditIconMouseDown} />
          <BiSolidTrashAlt className="trash" />
        </ul>
      </div>
      {isEditing ? (
        <textarea
          ref={editFieldRef}
          type="text"
          value={editModeText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p>{editedText}</p>
      )}
    </EditField>
  );
}


