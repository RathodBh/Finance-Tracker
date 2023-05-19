import React, { useState } from "react";
import RoutesFile from "./Route";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FolderViewOutlined,
    FileAddOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Select } from "antd";
import { BrowserRouter, Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/Index";
import { setLanguage } from "./store/Slices/languagesSlice";
function App() {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const state = useSelector((state: RootState) => state.languages.value);
    const dispatch = useDispatch();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const lang: string[] = ["English", "Hindi", "Gujarati"];
    const navs = [
        {
            to: "/transaction",
            label: state.add,
            icon: <FileAddOutlined />,
        },
        {
            to: "/show-transaction",
            label: state.showTransaction,
            icon: <FolderViewOutlined />,
        },
        {
            to: "/logout",
            label: "Logout",
            icon: <LogoutOutlined />,
        },
    ];

    const changeLang = (value: string) => {
        dispatch(setLanguage(value));
    };
   

    return (
        <BrowserRouter>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{
                        position: "sticky",
                        height: "calc(100vh - 20px)",
                        top: "10px",
                        bottom: "10px",
                    }}
                >
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["0"]}
                    >
                        {navs.map((nav, i) => (
                            <Menu.Item key={i}>
                                <Link to={nav?.to}>
                                    {nav?.icon}
                                    <span>{nav?.label}</span>
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "sticky",
                            top: "0",
                            zIndex: "10",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                type="text"
                                icon={
                                    collapsed ? (
                                        <MenuUnfoldOutlined />
                                    ) : (
                                        <MenuFoldOutlined />
                                    )
                                }
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: "16px",
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <Title level={3} style={{ margin: "0" }}>
                                {state?.title}
                            </Title>
                        </div>

                        <div>
                            <Select
                                defaultValue={lang[0]}
                                style={{ width: 120 }}
                                onChange={changeLang}
                                options={lang?.map((cur) => ({
                                    label: cur,
                                    value: cur,
                                }))}
                            />
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <RoutesFile />
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
