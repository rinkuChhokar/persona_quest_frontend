import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { setIsMainLoaderActive } from './features/isMainLoaderActiveSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { setIsUserLoggedIn } from './features/isUserLoggedInSlice';
import { setIsAdminLoggedIn } from './features/adminLogin/isAdminLoggedInSlice';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React, { Suspense } from 'react';

// Lazy-loaded components
const Header = React.lazy(() => import('./Components/Header'));
const Footer = React.lazy(() => import('./Components/Footer'));
const LoginForm = React.lazy(() => import('./pages/LoginForm'));
const Homepage = React.lazy(() => import('./pages/Homepage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const RegisterForm = React.lazy(() => import('./pages/RegisterForm'));
const OurTeam = React.lazy(() => import('./pages/OurTeam'));
const Feature = React.lazy(() => import('./pages/Feature'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const PersonalityTests = React.lazy(() => import('./pages/PersonalityTests'));
const SingleTestPage = React.lazy(() => import('./pages/SingleTestPage'));
const UserDashboardPage = React.lazy(() => import('./pages/UserDashboardPage'));
const DashboardPage = React.lazy(() => import('./pages/userDashboardPage/DashboardPage'));
const UserTestsPage = React.lazy(() => import('./pages/userDashboardPage/UserTestsPage'));
const AdminLoginForm = React.lazy(() => import('./pages/AdminLoginForm'));
const AdminDashboardPage = React.lazy(() => import('./pages/adminDashboardPages/AdminDashboardPage'));
const Dashboard = React.lazy(() => import('./pages/adminDashboardPages/pages/Dashboard'));
const UserListPage = React.lazy(() => import('./pages/adminDashboardPages/pages/users/UserListPage'));
const PersonalityTestPage = React.lazy(() => import('./pages/adminDashboardPages/pages/personalityTestPage/PersonalityTestPage'));

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUserLoggedIn = useSelector((store) => store.isUserLoggedIn.value);
  const isAdminLoggedIn = useSelector((store) => store.isAdminLoggedIn.value);
  const isMainLoaderActive = useSelector((store) => store.isMainLoaderActive.value);

  // useEffect(() => {
  //   dispatch(setIsMainLoaderActive(true));
  //   setTimeout(() => {
  //     dispatch(setIsMainLoaderActive(false));
  //   }, 2000);
  // }, [dispatch]);

  useEffect(() => {
    if (Cookies.get("userToken")) {
      dispatch(setIsUserLoggedIn(true));
    }
    if (Cookies.get("adminToken")) {
      dispatch(setIsAdminLoggedIn(true));
    }
  }, [dispatch]);

  return (
    <>
      {isMainLoaderActive && (
        <div className="page-loader z-[12222222222]">
          <div className="spinner"></div>
          <div className="txt">PersonaQuest</div>
        </div>
      )}

      <Suspense fallback={<div className="page-loader z-[12222222222]">
        <div className="spinner"></div>
        <div className="txt">PersonaQuest</div>
      </div>}>
        {isUserLoggedIn ? (
          <>
            {!location.pathname.startsWith("/user-dashboard") && <Header />}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/feature" element={<Feature />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/test" element={<PersonalityTests />} />
              <Route path="/test/:test" element={<SingleTestPage />} />
              <Route path="/user-dashboard/*" element={<UserDashboardPage />}>
                <Route index element={<DashboardPage />} />
                <Route path="tests" element={<UserTestsPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!location.pathname.startsWith("/user-dashboard") && <Footer />}
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/admin/*" element={isAdminLoggedIn ? <AdminDashboardPage /> : <AdminLoginForm />}>
              <Route index element={<Dashboard />} />
              <Route path="user-list" element={<UserListPage />} />
              <Route path="tests" element={<PersonalityTestPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
        <ToastContainer className="z-[999999]" />
      </Suspense>
    </>
  );
}

export default App;
