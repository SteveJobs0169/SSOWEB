

import React, {useEffect} from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

// antd组件全局配置
import zhCN from 'antd/locale/zh_CN';
import {ConfigProvider} from "antd";



const App = (props) => {
    const element = useRoutes(routes);

    const colorTheme = {
        fontColor: '#fff',
        purples: [
            '#f6ffed',
            '#d9f7be',
            '#b7eb8f',
            '#95de64',
            '#73d13d',
            '#1677ff',
            '#389e0d',
            '#237804',
            '#135200',
            '#092b00',
        ]
    }

    const { fontColor } = colorTheme;

    const colorArray = colorTheme.purples;

    return (
        <>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    token: {
                        colorArray,
                    },
                    components: {
                        Layout: {
                            headerBg: colorArray[5],
                            headerColor: fontColor,
                            headerPadding: '0 30px 0 0',
                            algorithm: true,
                        },
                        Menu: {
                            colorPrimary: colorArray[5],
                            borderRadius: 0,
                            algorithm: true,
                        },
                        Button: {
                            borderRadius: 2,
                            colorPrimary: colorArray[5],
                            algorithm: true, // 启用算法
                        },
                        Table: {
                            algorithm: true, // 启用算法
                        },
                    },
                }}
            >
                {element}
            </ConfigProvider>
        </>
    )
}

export default App
