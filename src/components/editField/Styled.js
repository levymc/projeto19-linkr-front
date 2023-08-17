import { styled } from "styled-components";

export const EditField = styled.div`
    margin: 50px;
    width: 611px;
    height: 276px;
    border-radius: 5px;
    background-color: #4D4D4D;
    
    div {
        display: flex;
        justify-content: space-between;
        
        p {
            color: white;
            width: calc(100% - 60px); /* Largura total - margens esquerda e direita */
        }

        ul {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        
        .pencil {
            margin-right: 30px;
        }

        .trash {
            margin-right: 30px;
        }
    }
    }

    textarea {
        margin-top: 10px;
        height: 100px;
        width: calc(100% - 100px); /* Mesma largura que o <p> */
        margin-left: 30px;
        margin-right: 30px;
        color: #4C4C4C;
        font-family: Lato;
        font-size: 17px;
        border: none;
        border-radius: 7px;
        resize: none;
        margin-right: 100px;
        &:focus {
        outline: none;
        }
    }

    p {
        color: #B7B7B7;
        margin-left: 30px;
        margin-right: 30px;
    }
`;