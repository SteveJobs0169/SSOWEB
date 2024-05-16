import axios from "../../utils/axios";

export const account = {
    get: (dataObject={}) => {
        return axios({
            method: "get",
            url: "/nginxApi/account",
            params: dataObject
        })
    },
    post: (dataObject={}) => {
        return axios({
            method: "post",
            url: "/nginxApi/account",
            data: dataObject
        })
    },
    put: (dataObject={}, id) => {
        return axios({
            method: "put",
            url: "/nginxApi/account/"+id,
            data: dataObject
        })
    },
    delete: (dataObject={}, id) => {
        return axios({
            method: "delete",
            url: "/nginxApi/account/"+id,
            params: dataObject
        })
    },
}


export const role = {
    get: (dataObject={}) => {
        return axios({
            method: "get",
            url: "/nginxApi/role",
            params: dataObject
        })
    },
    post: (dataObject={}) => {
        return axios({
            method: "post",
            url: "/nginxApi/role",
            data: dataObject
        })
    },
    put: (dataObject={}, id) => {
        return axios({
            method: "put",
            url: "/nginxApi/role/"+id,
            data: dataObject
        })
    },
    delete: (dataObject={}, id) => {
        return axios({
            method: "delete",
            url: "/nginxApi/role/"+id,
            params: dataObject
        })
    },
}


export const accountRole = {
    get: (dataObject={}) => {
        return axios({
            method: "get",
            url: "/nginxApi/accountRole",
            params: dataObject
        })
    },
    post: (dataObject={}) => {
        return axios({
            method: "post",
            url: "/nginxApi/accountRole",
            data: dataObject
        })
    },
    delete: (dataObject={}) => {
        return axios({
            method: "delete",
            url: "/nginxApi/accountRole",
            params: dataObject
        })
    }
}

export const web = {
    get: (dataObject={}) => {
        return axios({
            method: "get",
            url: "/nginxApi/web",
            params: dataObject
        })
    },
    post: (dataObject={}) => {
        return axios({
            method: "post",
            url: "/nginxApi/web",
            data: dataObject
        })
    },
    put: (dataObject = {}, id) => {
        return axios({
            method: "put",
            url: "/nginxApi/web/"+id,
            data: dataObject
        })
    },
    delete: (dataObject={}, id) => {
        return axios({
            method: "delete",
            url: "/nginxApi/web/"+id,
            params: dataObject
        })
    }
}


export const get_web_key = (dataObject={}) => {
    return axios({
        method: "get",
        url: "/nginxApi/get_web_key",
        params: dataObject
    })
}
