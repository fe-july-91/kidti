import { Route, Routes, HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage/HomePage';
import { AccountPage } from './Pages/AccountPage/AccountPage';
import { LogInPage } from './Pages/LogInPage/LogInPage';
import { SignUpPage } from './Pages/SignUpPage/SignUpPage';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='account' element={<AccountPage />} />
          <Route path='login' element={<LogInPage />} />
          <Route path='signup' element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default Root;
