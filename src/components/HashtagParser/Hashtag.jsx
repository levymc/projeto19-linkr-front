import { Link } from 'react-router-dom';

export default function Hashtag({hashtag}) {
    return (
        <Link
            to={`/hashtag/${hashtag}`}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
            }}
        >
            #{hashtag}
        </Link>
    )
}