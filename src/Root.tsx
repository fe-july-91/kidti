import { Route, Routes, HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage/HomePage';
import { AccountPage } from './Pages/AccountPage/AccountPage';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='account' element={<AccountPage />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default Root;
