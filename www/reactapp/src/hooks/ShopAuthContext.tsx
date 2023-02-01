import { useAxios } from "./Common";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

interface Shop {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  two_factor_recovery_codes: string | null;
  two_factor_secret: string | null;
  created_at: string;
  updated_at: string | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ProfileData {
  name?: string;
  email?: string;
}

interface authProps {
  shop: Shop | null;
  register: (registerData: RegisterData) => Promise<void>;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  // saveProfile: (formData: FormData | ProfileData) => Promise<void>;
}

interface Props {
  children: ReactNode;
}

interface RouteProps {
  children: ReactNode;
  path: string;
  exact?: boolean;
}

interface From {
  from: Location;
}

const authContext = createContext<authProps | null>(null);

const ProvideAuth = ({ children }: Props) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default ProvideAuth;

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const http = useAxios();

  const register = (registerData: RegisterData) => {
    return http.post("/api/shop/register", registerData).then((res) => {
      http.get("api/user").then((res) => {
        setShop(res.data);
      });
    }).catch((error) => {
      console.error(error);
    });
  };

  const login = async (loginData: LoginData) => {
    try {
      const res = await http.post("/api/shop/login", loginData);
    } catch (error) {
      throw error;
    }

    return http.get("/api/shop").then((res) => {
      setShop(res.data);
    }).catch((error) => {
      setShop(null);
    });
  };

  const logout = () => {
    return http.post("/api/shop/logout", {}).then(() => {
      setShop(null);
    });
  };

  // const saveProfile = async (formData: FormData | ProfileData) => {
  //   const res = await http.post(
  //     "/api/user/profile-information",
  //     formData,
  //     { headers: { "X-HTTP-Method-Override": "PUT" } },
  //   )
  //     .catch((error) => {
  //       throw error;
  //     });
  //   if (res?.status == 200) {
  //     return http.get("/api/user").then((res) => {
  //       setShop(res.data);
  //     }).catch((error) => {
  //       setShop(null);
  //     });
  //   }
  // };

  useEffect(() => {
    http.get("/api/shop").then((res) => {
      setShop(res.data);
    }).catch((error) => {
      setShop(null);
    });
  }, []);

  return {
    shop,
    register,
    login,
    logout,
    // signin,
    // signout,
    // saveProfile,
  };
};

/**
 * 認証済みのみアクセス可能
 */
export const PrivateRoute = ({ children, path, exact = false }: RouteProps) => {
  const auth = useAuth();

  //   if (!auth?.user) return <Loading />;

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
        if (auth?.shop == null) {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        } else {
          return children;
        }
      }}
    />
  );
};

/**
 * 認証していない場合のみアクセス可能（ログイン画面など）
 */
export const ShopPublicRoute = (
  { children, path, exact = false }: RouteProps,
) => {
  const auth = useAuth();
  const history = useHistory();

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
        if (auth?.shop == null) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: (history.location.state as From)
                  ? (history.location.state as From).from.pathname
                  : "/shop",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};
