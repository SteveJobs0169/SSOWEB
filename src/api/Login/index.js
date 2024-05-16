import axios from "../../utils/axios";

export const login = (dataObject={}) => {
    return axios({
        method: "post",
        url: "/nginxApi/login",
        data: dataObject
    })
}
