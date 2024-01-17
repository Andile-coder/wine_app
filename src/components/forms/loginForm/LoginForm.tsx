import React from "react";
import styles from "./loginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import CustomBtn from "../../buttons/customBtns/primaryBtn/PrimaryBtn";
import CustomInput from "../../inputs/customInput/CustomInput";
interface Props {}

const LoginForm: React.FC<Props> = () => {
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });
  // environment variables should be used here
  const localhost = "http://localhost:3000/login";
  // const vercel = "https://wine-app-frontend.vercel.app/login";

  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
   
    fetch(localhost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
       
        if(data.status === 401) {
          alert("Invalid credentials");
        } else if(data.status=== 200) {
          alert("Login successful");
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user_id", data.message.user_id);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
    })

  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form className={styles.form} onSubmit={handleLogin}>
        <p className={styles.form_title}>Sign in to your account</p>
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
        <CustomBtn text="Sign in" onClick={() => {}} type="submit" />
        <p className={styles.signuplink}>
          No account?
          <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
