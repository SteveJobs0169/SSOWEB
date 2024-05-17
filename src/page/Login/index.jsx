import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {login} from "../../api/Login";
import "./index.css";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export default function Login() {

    const [url, setUrl] = useState("");

    useEffect(() => {
        // 获取包含url参数的当前URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlValue = urlParams.get('url') ? urlParams.get('url') : false;

        setUrl(urlValue)
    }, []);

    const [userInfo, setUserInfo] = useState({
        account: 'admin',
        password: 'Shuang00'
    });

    const navigate = useNavigate();
    const Login = () => {
        login(userInfo).then(response => {
            const {code, refreshToken} = response.data;
            if (code === 200) {
                if (!!url) {
                    // localStorage.setItem('refreshToken', refreshToken);
                    window.location.href = url + "?refreshToken=" + refreshToken;
                }else {
                    navigate("/home/admin")
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function handleKeyPress(e) {
        if (e.charCode === 13) {
            // 在这里处理按下 Enter 键后的操作
            Login();
        }
    }

    return (
        <>
            <div className="dowebok">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src="/state/images/login.png" alt="IMG"/>
                        </div>

                        <div className="login100-form validate-form">
                            <span className="login100-form-title">
                                房屋管理系统登陆
                            </span>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" name="email" value={userInfo.account}
                                       onChange={(event) => setUserInfo(i => ({...i, account: event.target.value}))}
                                       onKeyPress={handleKeyPress}
                                       placeholder="账户"/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <UserOutlined/>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="password" name="pass" value={userInfo.password}
                                       onChange={(event) => setUserInfo(i => ({...i, password: event.target.value}))}
                                       onKeyPress={handleKeyPress}
                                       placeholder="密码"/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                     <LockOutlined/>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={Login}>
                                    登陆
                                </button>
                            </div>

                            {/*<div className="text-center p-t-12">*/}
                            {/*    <a className="txt2" href="javascript:">*/}
                            {/*        忘记密码？*/}
                            {/*    </a>*/}
                            {/*</div>*/}

                            {/*<div className="text-center p-t-136">*/}
                            {/*    <a className="txt2" href="http:///" target="_blank">*/}
                            {/*        还没有账号？立即注册*/}
                            {/*        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}