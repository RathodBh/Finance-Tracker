import React, { useState } from "react";
import RoutesFile from "./Route";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
function App() {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // const navigate = useNavigate();

    return (
        <BrowserRouter>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                    >
                        <Menu.Item key="1">
                            <Link to="/">
                                <UserOutlined />
                                <span>nav 1</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/show-transaction">
                                <VideoCameraOutlined />
                                <span>nav 2</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/nav-3">
                                <UploadOutlined />
                                <span>nav 3</span>
                            </Link>
                        </Menu.Item>
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
                        }}
                    >
                        <div
                            style={{
                                // height: "100%",
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
                            <Title level={3} style={{margin:"0"}}>
                                Finance Tracker
                            </Title>
                        </div>
                        {/* <p>Hello</p> */}
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
