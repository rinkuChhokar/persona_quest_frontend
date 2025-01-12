import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Header from './Components/Header'
import { useEffect } from 'react';
import { setIsMainLoaderActive } from './features/isMainLoaderActiveSlice';
import LoginForm from './pages/LoginForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterForm from './pages/RegisterForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { setIsUserLoggedIn } from './features/isUserLoggedInSlice';
import Footer from './Components/Footer';
import OurTeam from './pages/OurTeam';
import Feature from './pages/Feature';
import ContactUs from './pages/ContactUs';
import PersonalityTests from './pages/PersonalityTests';
import SingleTestPage from './pages/SingleTestPage';
import UserDashboardPage from './pages/UserDashboardPage';
import DashboardPage from './pages/userDashboardPage/DashboardPage';
import UserTestsPage from './pages/userDashboardPage/UserTestsPage';
import AdminLoginForm from './pages/AdminLoginForm';
import AdminDashboardPage from './pages/adminDashboardPages/AdminDashboardPage';
import { setIsAdminLoggedIn } from './features/adminLogin/isAdminLoggedInSlice';
import Dashboard from './pages/adminDashboardPages/pages/Dashboard';
import UserListPage from './pages/adminDashboardPages/pages/users/UserListPage';
import PersonalityTestPage from './pages/adminDashboardPages/pages/personalityTestPage/PersonalityTestPage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUserLoggedIn = useSelector((store) => store.isUserLoggedIn.value);
  const isAdminLoggedIn = useSelector((store) => store.isAdminLoggedIn.value);
  const isMainLoaderActive = useSelector((store) => store.isMainLoaderActive.value);

  useEffect(() => {
    dispatch(setIsMainLoaderActive(true));
    setTimeout(() => {
      dispatch(setIsMainLoaderActive(false));
    }, 2000);
  }, []);


  useEffect(() => {
    if (Cookies.get("userToken")) {
      dispatch(setIsUserLoggedIn(true));
    }
    if (Cookies.get("adminToken")) {
      dispatch(setIsAdminLoggedIn(true));
    }
  }, [])

  useEffect(() => {
    console.log("isMainLoaderActive", isMainLoaderActive);

  }, [])



  return (
    <>

      {/* <!-- Loader Overlay --> */}
      {isMainLoaderActive ? (
        // <div className="loader-overlay">
        //   <div className="lds-ripple"><div></div><div></div></div>
        // </div>
        <div className="page-loader z-[12222222222]">
          <div className="spinner"></div>
          <div className="txt">PersonaQuest</div>
        </div>
      ) : <></>}

      {isUserLoggedIn ? (
        <>

          {!location.pathname.startsWith("/user-dashboard") ? (
            <Header />
          ) : <></>}


          {/*Implementing Routes for respective Path */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/feature" element={<Feature />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/test" element={<PersonalityTests />} />
            <Route path="/test/*" element={<SingleTestPage />} />
            <Route path="/user-dashboard/*" element={<UserDashboardPage />} >
              <Route index element={<DashboardPage />} />
              <Route path='tests' element={<UserTestsPage />} />

            </Route>

            <Route path="*" element={<NotFoundPage />} />

          </Routes>

          {!location.pathname.startsWith("/user-dashboard") ? (
            <Footer />
          ) : <></>}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/admin/*" element={isAdminLoggedIn ? <AdminDashboardPage /> : <AdminLoginForm />}>
              <Route index element={<Dashboard />} />
              <Route path='user-list' element={<UserListPage />} />
              <Route path='tests' element={<PersonalityTestPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </>
      )}


      <ToastContainer className="z-[999999]" />

    </>
  )
}

export default App
