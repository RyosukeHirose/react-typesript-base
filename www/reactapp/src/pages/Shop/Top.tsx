import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/ShopAuthContext";
import { useAxios } from "../../hooks/Common";

const Top = () => {
  const auth = useAuth();
  const http = useAxios();

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
        {auth?.shop?.name}
      </div>
      <div>
        <Link to="/shop/login">店舗ログイン画面へ</Link>
      </div>
      <div>
        <Link to="/shop/register">店舗登録画面へ</Link>
      </div>
      <button onClick={logout}>
        ログアウト
      </button>
    </div>
  );
};

export default Top;
