import Hashtag from "./Hashtag";

export default function HashtagParser({content}) {
    return (
        <p>
            {content.split(/\s+/).map((word, index) => {
                if (word.startsWith('#')) {
                    const hashtag = word.substring(1);
                    return (
                        <span key={index}><Hashtag hashtag={hashtag} />{' '}</span>
                    );
                }
                return `${word} `;
            })}
        </p>
    )
}