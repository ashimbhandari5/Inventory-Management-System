import { Bell, UserRound } from "lucide-react";
import { useNavigate } from "react-router";
import "./header.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/context/userContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserRound className="icon-profile cursor-pointer" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="dropdown-menu">
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/login")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
