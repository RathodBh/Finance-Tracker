const generate = () => {
    const abc = "abcdefghijklmnopqrstuvwxyz1234567890";
    let auth = "";
    for (let i = 0; i < 16; i++) {
        auth += abc[Math.floor(Math.random() * abc.length)];
    }
    return auth;
};
export default generate;
