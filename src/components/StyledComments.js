import styled from 'styled-components'

export const ContainerComments = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-color: #1E1E1E;
    padding-top: 26px;
    position: relative;
    bottom: 60px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    textarea {
        width: 100%;
        border: none;
        padding: 5px 35px 5px 10px;
        border-radius: 8px;
        background-color: #252525;
        color: white;
        outline: none;
        resize: none;
        overflow: hidden;
        min-height: 40px;
    }

textarea::placeholder {
    color: #575757;
    font-family: Lato;
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.7px;
}
.send{
    font-size: 16px;
    color: #F3F3F3;
    position: relative;
    bottom: 55px;
    left: 335px;
}
`

export const ContainerComment = styled.div`
    border-top: 1px solid #353535;
    display: flex;
    align-items: flex-start;
    padding: 17px 0;
    padding-top: 20px;
    font-family: Lato;
    width: calc(100% - 50px);

img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 18px;
}

div {
    p {
        color: #ACACAC;
        font-size: 14px;
    }
}
`;

export const CommentInfo = styled.div`
display: flex;
width: 100%;
font-size: 14px;
margin-bottom: 5px;
h1{
    color: #F3F3F3;
}
li {
    margin-left: 5px;
    color: #565656;
    list-style: none; 
    position: relative;
    margin-left: 17px;
}

li::before {
    content: "•"; 
    margin-right: 5px; 
    position: absolute;
    left: -12px; 
}
`

export const CommentField = styled.div`
    border-top: 1px solid #353535;
    display: flex;
    align-items: flex-start;
    padding: 17px 0;
    padding-top: 20px;
    font-family: Lato;
    width: calc(100% - 50px);
    img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 18px;
}
`;