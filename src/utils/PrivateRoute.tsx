import { Button, Layout, Select, theme } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Index";
import { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { setLanguage } from "../store/Slices/languagesSlice";

const PrivateRoutes = () => {
    const [collapsed, setCollapsed] = useState(false);
    const state = useSelector((state: RootState) => state.languages.value);
    const dispatch = useDispatch();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    const { Header, Content } = Layout;
    let auth = false;

    if (localStorage.getItem("token")) {
        auth = true;
    }
    const lang: string[] = ["English", "Hindi", "Gujarati"];

    const changeLang = (value: string) => {
        dispatch(setLanguage(value));
    };

    return auth ? (
        <Layout>
            <Sidebar collapsed={collapsed} />
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
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    ) : (
        <Navigate to="/login" />
    );
    // return auth ? <Outlet /> : <Navigate to="/login" />;
};

const CheckLoginAuth = () => {
    let auth = true;
    if (localStorage.getItem("token")) {
        auth = false;
    }
    return auth ? <Outlet /> : <Navigate to="/transaction" />;
};

export { CheckLoginAuth };
export default PrivateRoutes;
