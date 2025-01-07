import { Route, Routes, HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage/HomePage';
import { AccountPage } from './Pages/AccountPage/AccountPage';
import { LogInPage } from './Pages/LogInPage/LogInPage';
import { SignUpPage } from './Pages/SignUpPage/SignUpPage';
import { AuthProvider } from './Components/AuthContext/AuthContext';
import { RequireAuth } from './Components/RequireAuth/RequireAuth';
import { SettingsPage } from './Pages/SettingsPage/SettingsPage';
import { Recovery } from './Pages/PasswordRecovery/Recovery';
import { RightsPage } from './Pages/RightsPage/RightsPage';

const Root = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='login' element={<LogInPage />} />
            <Route path='recovery' element={<Recovery />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='rights' element={<RightsPage />} />

            <Route path='account' element={<RequireAuth />}>
              <Route index element={<AccountPage />} />
              <Route path='settings' element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
};

export default Root;
