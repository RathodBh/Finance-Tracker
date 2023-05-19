import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Index";
import { Link, useNavigate } from "react-router-dom";
import msg from "../../utils/generateMessage";
import generateToken from "../../utils/generateToken";
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const users = useSelector((state: RootState) => state.users.value);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: any) => {
        console.log(
            "🚀 ~ file: Login.tsx:37 ~ onFinish ~ values:",
            values,
            users
        );
        const valid_user = users?.find(
            (user) =>
                user.email === values.email && user.password === values.password
        );
        if (valid_user) {
            msg(messageApi, "Login successfully");
            const token = generateToken();
            localStorage.setItem("token", JSON.stringify(token));
            navigate("/transaction");
        } else {
            msg(messageApi, "Invalid email and password", "error");
        }
    };

    return (
        <>
            {contextHolder}
            <div style={{ width: "100%" }}>
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{ width: "60vw" }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        <Link to="/register">
                            <Button type="link">
                                Dont'have account? Register
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Login;
