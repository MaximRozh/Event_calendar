import Layout, { Content } from "antd/lib/layout/layout";
import React, { FC, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import "./App.css";
import { useAction } from "./hooks/useActions";
import { IUser } from "./models/UserModel";

const App: FC = () => {
  const { setUser, setIsAuth } = useAction();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setUser({ username: localStorage.getItem("username" || "") } as IUser);
      setIsAuth(true);
    } else {
    }
  }, []); // eslint-disable-next-line

  return (
    <Layout>
      <NavBar />
      <Content>
        <AppRouter />
      </Content>
    </Layout>
  );
};

export default App;
