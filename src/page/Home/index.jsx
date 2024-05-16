import React, {useEffect, useState} from 'react';
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, PoweroffOutlined, UsergroupAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, Avatar, Popover, Breadcrumb, Row, Col, theme} from 'antd';

import "./index.css";
import {Outlet, useNavigate} from "react-router-dom";
import {getMenu} from "../../api/Home";
import treeUtils from "../../utils/treeUtils";


const {Header, Sider, Content, Footer} = Layout;

const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const systemName = 'sso管理平台'

    const path = window.location.pathname;

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const getItem = (label, key, icon, children, type) => ({
        key,
        icon,
        children,
        label,
        type,
    })

    const [menu, setMenu] = useState([
        getItem('菜单', 'grp1', null, [
            getItem('系统设置', 'sub1', <UsergroupAddOutlined/>, [
                getItem('角色', 'role'),
                getItem('用户', 'admin'),
                getItem('网站管理', 'web'),
                // getItem('部门', 'Department'),
                // getItem('页面', 'Page'),
                // getItem('路由', 'Router'),
                // getItem('菜单', 'Menu'),
                // getItem('预警设置', 'rolemanage'),
            ]),
            // getItem('组织管理', 'sub2', <UsergroupAddOutlined/>, [
            //     getItem('班级管理', 'classroom'),
            //     getItem('宿舍管理', 'dormitory'),
            //     getItem('人员管理', 'student'),
            // ]),
            // getItem('设备管理', 'sub3', <UsergroupAddOutlined/>, [
            //     getItem('校门', 'schoolgate'),
            //     getItem('宿舍', 'dormitorygate'),
            // ]),
            // getItem('记录日志', 'sub4', <UsergroupAddOutlined/>, [
            //     getItem('校门记录', 'schoolgaterecord'),
            //     getItem('宿舍记录', 'dormitorygaterecord'),
            //     getItem('请假记录', 'leavetracker'),
            //     getItem('预警记录', 'alertlog'),
            // ]),
            {
                type: 'divider',
            },
        ], 'group'),
    ]);

    // Popover 气泡卡片
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    // 菜单选择
    const muenSelect = ({key}) => {
        navigate(key === undefined ? "/404" : key, {
            replace: false,
            state: {}
        })
    }

    // 退出登录
    const logout = () => {
        window.localStorage.removeItem('accessToken');
        navigate("/login");
    }

    // 面包屑
    const [breadcrumbItems, setBreadcrumbItems] = useState([])

    useEffect(() => {
        const pathArray = path.split("/").filter((part) => part !== "").map(pathname => ({
            title: {
                home: <HomeOutlined/>,
            }[pathname] || pathname
        }));
        setBreadcrumbItems(pathArray);
    }, [path])

    useEffect(() => {
        // getMenu({tableName: 'menu'}).then(res => {
        //     const {DATA} = res.data;
        //     DATA.sort((a, b) => b.zIndex - a.zIndex);
        //     const data = DATA.map(({rid, name, icon, type_, id, zIndex, ...val}) => ({...getItem(name, rid ? rid : id, <UsergroupAddOutlined/>, type_), ...val, ...{id}}));
        //     setMenu([getItem('菜单', 'grp1', null, [
        //         ...treeUtils(data, true),
        //     ], 'group')])
        // })
    }, [])


    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div
                    className="header-company-container">{collapsed ? systemName.slice(0, 2) : systemName}
                </div>
                <div className="header-right-container">
                    <Popover
                        content={<>
                            <Row gutter={6}>
                                <Col className="gutter-row" span={12}>
                                    <Button type="primary" >
                                        更改密码
                                    </Button>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Button onClick={logout} danger>
                                        退出登录
                                    </Button>
                                </Col>
                            </Row>
                        </>}
                        placement="bottomRight"
                        title="用户信息"
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Avatar
                            style={{
                                margin: "0 5px",
                                cursor: "pointer"
                            }}
                            icon={<UserOutlined/>}
                        />
                        <span>
                            超级管理员
                        </span>
                    </Popover>
                    <div
                        className="header-exit"
                        style={{
                            marginLeft: "10px",
                            cursor: "pointer",
                            userSelect: "none"
                        }}>
                        <PoweroffOutlined  style={{
                            fontSize: "15px",
                        }}/>
                    </div>
                </div>
            </Header>
            <Layout style={{height: "calc(100vh - 64px)", overflow: "hidden"}}>
                <Sider
                    className="sider"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={[]}
                        onSelect={muenSelect}
                        items={menu}
                    />
                </Sider>
                <Layout>
                    <div style={{
                        padding: '10px 16px',
                        // background: colorBgContainer,
                        display: 'flex',
                        alignContent: 'center',
                    }}>
                        <div
                            style={{
                                marginRight: 15,
                                color: '#ed7b2f',
                                userSelect: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ?
                                <>
                                    <MenuUnfoldOutlined style={{
                                        marginRight: 5,
                                    }} />展开
                                </> :
                                <>
                                    <MenuFoldOutlined style={{
                                        marginRight: 5,
                                    }}/>收起
                                </>
                            }

                        </div>
                        <Breadcrumb
                            separator=">"
                            items={breadcrumbItems}
                        />
                    </div>
                    <Content
                        style={{
                            margin: '16px 16px 0 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            overflow: "auto",
                        }}
                    >
                        <Outlet/>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        {systemName} ©2023
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default App;