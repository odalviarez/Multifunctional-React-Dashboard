import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { Button, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth0 } from "@auth0/auth0-react";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  console.log("isAutenti: ", isAuthenticated);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          {isAuthenticated ? (
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src={user.picture}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {user.name}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => loginWithRedirect()}
            >
              <span className="text-gray-400 font-bold ml-1 text-14">
                Log in
              </span>
            </div>
          )}
        </TooltipComponent>

        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
