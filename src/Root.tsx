import { Route, Routes, HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage/HomePage';
import { AccountPage } from './Pages/AccountPage/AccountPage';
import { LogInPage } from './Pages/LogInPage/LogInPage';
import { SignUpPage } from './Pages/SignUpPage/SignUpPage';
import { AuthProvider } from './Components/AuthContext/AuthContext';
import { RequireAuth } from './Components/RequireAuth/RequireAuth';

const Root = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='login' element={<LogInPage />} />
            <Route path='signup' element={<SignUpPage />} />

            <Route path='account' element={<RequireAuth />}>
              <Route index element={<AccountPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>

    </Router>
  )
};

export default Root;