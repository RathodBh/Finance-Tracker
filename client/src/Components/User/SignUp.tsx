import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { newUser } from "../../store/Slices/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import msg from "../../utils/generateMessage";

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

const SignUp: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: {
        email: string;
        password: string;
        confirm: string;
    }) => {
        dispatch(newUser(values));
        setTimeout(() => {
            navigate("/login");
        }, 1500);
        msg(messageApi, "Registration successfully");
    };

    return (
        <>
            {contextHolder}

            <div style={{ width: "100vw" }}>
                <h1 style={{ textAlign: "center" }}>SignUp</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{ width: "76%" }}
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

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <Link to="/login">
                            <Button type="link">
                                Already have an account? Login
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SignUp;
