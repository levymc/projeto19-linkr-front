import styled from 'styled-components'
import { CommentInfo, ContainerComment } from './StyledComments'
import { GiPlainCircle } from 'react-icons/gi';

export default function Comment(){
    return(
        <ContainerComment>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>
            <div>
                <CommentInfo>
                    <h1>User Test</h1>
                    <li>following</li>
                </CommentInfo>
                <p>Comentário de algum usuário</p>
            </div>
        </ContainerComment>
    )
}

