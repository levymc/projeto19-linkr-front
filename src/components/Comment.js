import styled from 'styled-components'
import { CommentInfo, ContainerComment } from './StyledComments'
import { GiPlainCircle } from 'react-icons/gi';

export default function Comment(props){
    console.log(props.info, "info")
    return(
        <ContainerComment>
            <img src={props.info.imageUrl}/>
            <div>
                <CommentInfo>
                    <h1>{props.info.name}</h1>
                    <li>following</li>
                </CommentInfo>
                <p>{props.info.comment}</p>
            </div>
        </ContainerComment>
    )
}

