import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const Top = () => {
  const auth = useAuth();

  return (
    <div className="">
      <div>
        {auth?.user?.name}
      </div>
      <div>
        <Link to="/login">ログイン画面へ</Link>
      </div>
      <div>
        <Link to="/register">会員登録画面へ</Link>
      </div>
    </div>
  );
};

export default Top;
