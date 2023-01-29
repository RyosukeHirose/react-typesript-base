import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useAxios } from "../hooks/Common";

const Login = () => {
  interface FormErrors {
    email: string;
    password: string;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const http = useAxios();

  const initialFormErrors: FormErrors = {
    email: "",
    password: "",
  };
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const validateForm = () => {
    let errors = { ...initialFormErrors };
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!isEmail(email)) {
      formIsValid = false;
      errors.email = "Invalid email format";
    }

    if (!password) {
      formIsValid = false;
      errors.password = "Password is required";
    } else if (password.length < 6) {
      formIsValid = false;
      errors.password = "Password must be at least 6 characters long";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const isEmail = (email: string) => {
    const emailRegex = /\S+@\S+.\S+/;
    return emailRegex.test(email);
  };

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    http.get("/sanctum/csrf-cookie").then(() => {
      auth?.login({
        email: email,
        password: password,
      }).then(
        () => {
          console.log(auth);
          // history.push("/");
        },
      ).catch((error) => {
        console.log(error);
      });
    });
  };

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    http.get("/sanctum/csrf-cookie").then(() => {
      auth?.logout().then(
        () => {
          console.log(auth);
          // history.push("/");
        },
      ).catch((error) => {
        console.log(error);
      });
    });
  };
  return (
    <div>
      <label>email</label>
      {formErrors.email && <span>{formErrors.email}</span>}
      <input type="text" value={email} onChange={onChangeEmail} />

      <label>password</label>
      {formErrors.password && <span>{formErrors.password}</span>}
      <input type="password" value={password} onChange={onChangePassword} />

      <button type="submit" onClick={login}>
        Login
      </button>
      <button onClick={logout}>
        ログアウト
      </button>
    </div>
  );
};

export default Login;
