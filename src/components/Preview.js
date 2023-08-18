import React from 'react';

const PostPreview = () => {
  const title = "Título do Seu Post"; // Substitua com a lógica para obter o título
  const description = "Descrição do seu post."; // Substitua com a lógica para obter a descrição
  const imageUrl = "URL_da_Imagem"; // Substitua com a lógica para obter a URL da imagem
  const postUrl = "https://dev.to/yulioaj290/link-previews-in-reactjs-for-social-networks-using-nextjs-4hd9" // Substitua com a lógica para obter a URL do post

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={imageUrl} alt="Imagem do post" />
      <a href={postUrl}>Ver post completo</a>
    </div>
  );
};

export default PostPreview;
