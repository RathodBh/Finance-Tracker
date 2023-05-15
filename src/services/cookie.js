export const getCookie = (email = "") => {
    const x = document.cookie;
    const arr = x.split(";");
    const key = "Finance=";
    const token = arr?.filter((cur) => cur.includes(key));

    const obj = JSON.parse(
        token[0]?.split("=")[1] || JSON.stringify({ email: "", token: "" })
    );

    return obj;
};

export const removeCookie = () => {
    const cookie = getCookie();
    const expDate = new Date(new Date().getTime() - 10000);
    document.cookie = `Finance=${JSON.stringify(
        cookie
    )};expires=${expDate.toUTCString()}`;
};

export const setCookie = (email = "", token = "") => {
    const obj = {
        email,
        token,
    };
    const expDate = new Date(new Date().getTime() + 3600 * 1000);
    document.cookie = `Finance=${JSON.stringify(
        obj
    )};expires=${expDate.toUTCString()}`;
};
