import { Bell, Search, UserRound } from "lucide-react";
import { useNavigate } from "react-router";
import "./header.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/context/userContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser, clearUser } = useContext(UserContext);
  const [hasUser, setHasUser] = useState(false);
  // console.log(user);

  // useEffect(() => {
  //   if (user) {
  //     fetchUser(user.id);
  //   }
  // }, [user, fetchUser]);

  const handleLoginNavigation = () => {
    if (user) {
      clearUser();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user) {
      console.log({ user });
      setHasUser(true);
    }
  }, [user]);

  return (
    <div className="header-container">
      <h1>Hi {user?.name}!</h1>
      <div className="nav-all">
        <Bell className="icon-bell" />
        <UserRound className="icon-profile" />

        <button
          style={{ marginLeft: 16, padding: "4px 16px", width: "30%" }}
          onClick={handleLoginNavigation}
        >
          Login
        </button>
        <button
          style={{ marginLeft: 16, padding: "4px 16px", width: "30%" }}
          onClick={() => {
            navigate("/organizations");
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Header;
