import { Button, Form, Input } from "antd";
import React, { FC } from "react";
import { IUser } from "../../models/UserModel";
import { rules } from "../../utils/rules";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);

  const { login } = useAction();

  const submit = (value: IUser) => {
    login(value.username, value.password);
  };
  return (
    <Form onFinish={submit}>
      <Form.Item
        label="User name"
        name="username"
        rules={[rules.required("Please input your username!")]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="User password"
        name="password"
        rules={[rules.required("Please input your password!")]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
    </Form>
  );
};
export default LoginForm;
