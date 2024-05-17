import axios from "../utils/axios";

let promise;

export async function refreshToken() {
    if (promise) {
        return promise;
    }
    promise = new Promise(async(resolve, reject) => {
        const resp = await axios.get('/nginxApi/authenticationToken', {
            headers: {
                Authorization: localStorage.getItem('refreshToken'),
            },
            __isRefreshToken: true,
        })

        resolve(resp.data.code === 200);
    })
    promise.finally(() => {
        promise = null;
    })
    return promise;
}

export function isRefreshRequest(config) {
    return !!config.__isRefreshToken;
}