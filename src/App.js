import logo from './logo.svg';
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from './components/basics/loading';
import 'antd/dist/antd.min.css';
import './App.css';

const ForgotPassword = lazy(() => import("./pages/account/forgot"));
const Login = lazy(() => import("./pages/account/login"));
const ChangePassword = lazy(() => import("./pages/account/change_password"));
const HomePage = lazy(() => import("./pages/conversation/home"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
          <Route path="dang-nhap" element={<Login />} />
          <Route path="quen-mat-khau" element={<ForgotPassword />} />
          <Route path="doi-mat-khau" element={<ChangePassword />} />
          <Route path="" element={<HomePage />} />
          <Route path="nhan-tin" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
