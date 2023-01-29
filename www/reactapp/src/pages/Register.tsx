import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useAxios } from "../hooks/Common";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [users, setUsers] = useState([]);
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

  const register = () => {
    console.log(email);
    console.log(password);
    http.get("/sanctum/csrf-cookie").then(() => {
      auth?.register({
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }).then(
        () => {
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
      <input type="text" value={name} onChange={onChangeName} />
      <label>email</label>
      <input type="text" value={email} onChange={onChangeEmail} />
      <label>password</label>
      <input type="password" value={password} onChange={onChangePassword} />
      <label>password_confirmation</label>
      <input
        type="password"
        value={passwordConfirmation}
        onChange={onChangePasswordComfirmation}
      />
      <button onClick={register}>登録</button>
    </div>
  );
};

export default Register;
