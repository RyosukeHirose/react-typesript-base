import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useAxios } from "../hooks/Common";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const initialFormErrors: FormErrors = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  const auth = useAuth();
  const http = useAxios();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangePasswordComfirmation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setPasswordConfirmation(e.target.value);

  interface FormErrors {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

  const validateForm = () => {
    let errors = { ...initialFormErrors };
    let formIsValid = true;
    if (!name) {
      formIsValid = false;
      errors.name = "Name is required";
    }

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

    if (!passwordConfirmation) {
      formIsValid = false;
      errors.passwordConfirmation = "Password confirmation is required";
    } else if (password !== passwordConfirmation) {
      formIsValid = false;
      errors.passwordConfirmation = "Passwords do not match";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const isEmail = (email: string) => {
    let emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const register = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    http.get("/sanctum/csrf-cookie").then(() => {
      auth?.register({
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
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

  //   const login = () => {
  //     http.get("/sanctum/csrf-cookie").then((res) => {
  //       http.post("/api/login", { email, password }).then((res) => {
  //         console.log(res);
  //       });
  //     });
  //   };

  return (
    <div>
      <label>企業名</label>
      {formErrors.name && <span>{formErrors.name}</span>}
      <input type="text" value={name} onChange={onChangeName} />

      <label>email</label>
      {formErrors.email && <span>{formErrors.email}</span>}
      <input type="text" value={email} onChange={onChangeEmail} />

      <label>password</label>
      {formErrors.password && <span>{formErrors.password}</span>}
      <input type="password" value={password} onChange={onChangePassword} />

      <label>password_confirmation</label>
      {formErrors.passwordConfirmation && (
        <span>{formErrors.passwordConfirmation}</span>
      )}
      <input
        type="password"
        value={passwordConfirmation}
        onChange={onChangePasswordComfirmation}
      />
      <button onClick={(e) => register(e)}>登録</button>
    </div>
  );
};

export default Register;
