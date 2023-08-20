import Hashtag from "./Hashtag";

export default function HashtagParser({content}) {
    return (
        <p>
            {content.split(/\s+/).map((word) => {
                if (word.startsWith('#')) {
                    const hashtag = word.substring(1);
                    return (
                        <><Hashtag hashtag={hashtag} />{' '}</>
                    );
                }
                return `${word} `;
            })}
        </p>
    )
}