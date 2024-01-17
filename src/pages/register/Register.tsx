import React from "react";
import RegisterForm from "../../components/registerForm/RegisterForm";
import styles from "./register.module.scss";
interface Props {}

const Register: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Wine App</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
