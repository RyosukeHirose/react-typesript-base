import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/UserAuthContext";
import { useAxios } from "../../hooks/Common";

const Top = () => {
  const http = useAxios();

  const auth = useAuth();
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
    <div className="">
      <div>
        {auth?.user?.name}
      </div>
      <div>
        <Link to="/user/login">ユーザーログイン画面へ</Link>
      </div>
      <div>
        <Link to="/user/register">会員登録画面へ</Link>
      </div>
      <button onClick={logout}>
        ログアウト
      </button>
    </div>
  );
};

export default Top;
