import { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

export const usePostsContext = () => useContext(PostsContext);

export function ContextProvider({ children }) {
    const [postsInfos, setPostsInfos] = useState([])
    const [ newPost, setNewPost ] = useState([])
    const [resetComments, setResetComments] = useState(false);

    return (
        <PostsContext.Provider value={{ postsInfos, setPostsInfos, newPost, setNewPost, resetComments, setResetComments }}>
            {children}
        </PostsContext.Provider>
    );
}
