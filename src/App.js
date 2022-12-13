import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Employees,
  Customers,
  Area,
} from "./pages";
import "./App.css";
import Loading from "./components/Loading";
import {
  Auth0Provider,
  withAuthenticationRequired,
  useAuth0,
} from "@auth0/auth0-react";
import { useStateContext } from "./contexts/ContextProvider";


import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();
const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};


const App = () => {
   const { isLoading, error } = useAuth0();

   if (error) {
     return <div>Oops... {error.message}</div>;
   }

   if (isLoading) {
     return <Loading />;
   }
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useStateContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <Auth0ProviderWithRedirectCallback
      domain="dev-a3kheszuwvfvuoad.us.auth0.com"
      clientId="zVBOjQQhQSTxp3S8KRXOfLaMVMruuk2u"
      redirectUri={window.location.origin}
      audience="https://scaneame.vercel.app/"
      //scope="read:current_user update:current_user_metadata"
    >
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={<Ecommerce />} />
                  <Route path="/ecommerce" element={<Ecommerce />} />

                  {/* pages  */}
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />

                  {/* charts  */}

                  <Route path="/area" element={<Area />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </div>
    </Auth0ProviderWithRedirectCallback>
  );
};

export default App;
