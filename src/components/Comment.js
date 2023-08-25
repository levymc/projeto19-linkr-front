import { CommentInfo, ContainerComment } from './StyledComments'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { checkFollow } from '../services/search';

export default function Comment(props) {
    console.log(props.info.userId, "userId");
    console.log(props.userId, "id");
    const { token, user } = useContext(AuthContext);
    const [autor, setAuthor] = useState(false);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        if (props.info.userId === props.userId) {
            setAuthor(true);
        }


        console.log()

        const fetchFollowStatus = async () => {
              try {
                const followStatus = await checkFollow(
                  props.info.userId,
                  user.id,
                  token
                );
                setFollowing(followStatus);
              } catch (error) {
                console.error("Error fetching follow status:", error);
              }
          }
          fetchFollowStatus();
    }, [props.info.userId, props.userId]);

    return (
        <ContainerComment data-test="comment">
            <img src={props.info.imageUrl} alt={props.info.name} />
            <div>
                <CommentInfo>
                    <h1>{props.info.name}</h1>
                    {following ? (
                        <li>following</li>
                    ) : (
                        <span>{autor ? "• post’s author" : ""}</span>
                    )}
                </CommentInfo>
                <p>{props.info.comment}</p>
            </div>
        </ContainerComment>
    );
}

