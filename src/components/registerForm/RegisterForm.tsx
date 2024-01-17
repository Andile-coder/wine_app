import React from "react";
import styles from "./registerForm.module.scss";
import { Link } from "react-router-dom";
import CustomInput from "../inputs/customInput/CustomInput";
import CustomBtn from "../buttons/customBtns/primaryBtn/PrimaryBtn";
interface Props {}

const RegisterForm: React.FC<Props> = (props) => {
  const [registerForm, setRegisterForm] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // environment variables should be used here
  const localhost = "http://localhost:3000/register";
  const vercel = "https://wine-app-frontend.vercel.app/register";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerForm);
    fetch(localhost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
    })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.form_title}>Sign in to your account</p>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Username"
            type="text"
            name="username"
            required
          />
          <span></span>
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Email"
            type="text"
            name="email"
            required
          />
          <span></span>
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Password"
            type="password"
            name="password"
            required
          />
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            required
          />
          <span></span>
        </div>
        <CustomBtn text="Sign up" onClick={() => {}} type="submit" />
        <p className={styles.signuplink}>
          Already have an account?
          <Link to="/">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
