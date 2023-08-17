export default async function sleep(seconds) {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(intervalId);
                resolve();
            }
        }, 1000);
    });
}