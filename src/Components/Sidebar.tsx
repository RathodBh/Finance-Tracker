import { Layout, Menu } from "antd";
import React from "react";
import {
    FolderViewOutlined,
    FileAddOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/Index";
import { Link, useNavigate } from "react-router-dom";
interface Props {
  collapsed: boolean;
}
const Sidebar = ({collapsed}:Props) => {
    const { Sider } = Layout;
    const state = useSelector((state: RootState) => state.languages.value);
    const navigate = useNavigate()
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
    ];
     const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
                {navs.map((nav, i) => (
                    <Menu.Item key={i}>
                        <Link to={nav?.to}>
                            {nav?.icon}
                            <span>{nav?.label}</span>
                        </Link>
                    </Menu.Item>
                ))}

                <Menu.Item key={"logout"} onClick={logout}>
                    {/* <Button > */}
                        <LogoutOutlined />
                        <span>Logout</span>
                    {/* </Button> */}
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
