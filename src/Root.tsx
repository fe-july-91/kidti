import { RouterProvider, createHashRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./Pages/HomePage/HomePage";
import { AccountPage } from "./Pages/AccountPage/AccountPage";
import { LogInPage } from "./Pages/LogInPage/LogInPage";
import { SignUpPage } from "./Pages/SignUpPage/SignUpPage";
import { AuthProvider } from "./Context/AuthContext";
import { RequireAuth } from "./Components/RequireAuth/RequireAuth";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import { Recovery } from "./Pages/PasswordRecovery/Recovery";
import { RightsPage } from "./Pages/RightsPage/RightsPage";
import { LangProvider } from "./Context/LangContext";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LogInPage /> },
      { path: "recovery", element: <Recovery /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "about", element: <RightsPage /> },
      {
        path: "account",
        element: <RequireAuth />,
        children: [
          { index: true, element: <AccountPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
]);

const Root = () => {
  return (
    <AuthProvider>
      <LangProvider>
        <RouterProvider router={router} />
      </LangProvider>
    </AuthProvider>
  );
};

export default Root;
