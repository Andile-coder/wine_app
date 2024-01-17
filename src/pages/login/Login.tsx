import React from "react";
import LoginForm from "../../components/forms/loginForm/LoginForm";
import styles from "./login.module.scss";

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <h1>welcome to Wine App</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
