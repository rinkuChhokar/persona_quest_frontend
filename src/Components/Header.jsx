import React from 'react';
import Logo from "/public/images/logo.svg";
import { useSelector, useDispatch } from 'react-redux';
import { setIsMenuShowInMobile } from '../features/isMenuShowInMobileSlice';
import { Avatar, Dropdown } from "flowbite-react";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { BACKEND_URL } from '../api';
import { setIsUserLoggedIn } from '../features/isUserLoggedInSlice';
import { setIsMainLoaderActive } from '../features/isMainLoaderActiveSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const menuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/"
    },

    {
        id: 2,
        name: "Team",
        link: "/our-team"
    },

    {
        id: 3,
        name: "Feature",
        link: "/feature"
    },

    {
        id: 4,
        name: "Blog",
        link: "/blog"
    },

    {
        id: 5,
        name: "Personality Tests",
        link: "/test"
    },

    {
        id: 6,
        name: "Contact",
        link: "/contact-us"
    },
]


const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const isMenuShowInMobile = useSelector((store) => store.isMenuShowInMobile.value);
    const handleMenuClick = () => {
        if (isMenuShowInMobile) {
            dispatch(setIsMenuShowInMobile(false));
        } else {
            dispatch(setIsMenuShowInMobile(true));
        }
    }

    const handleUserLogout = () => {
        dispatch(setIsMainLoaderActive(true));
        fetch(`${BACKEND_URL}/api/v1/user/user-logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("userToken")}`
            },
            body: JSON.stringify({
                token: Cookies.get("userToken")
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.status == "success") {
                    toast.success(data.message);
                    Cookies.remove("userToken");
                    dispatch(setIsUserLoggedIn(false));
                    navigate("/");
                    dispatch(setIsMainLoaderActive(false));
                }
                else {
                    toast.error(data.message);
                    dispatch(setIsMainLoaderActive(false));
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(setIsMainLoaderActive(false));
            })
    }
    return (
        <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
            <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                <Link to={"/"}><img src={Logo} alt="logo" className='w-36' />
                </Link>

                <div id="collapseMenu"
                    className={`${isMenuShowInMobile ? "!block" : "!hidden"} max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}>
                    <button id="toggleClose" onClick={handleMenuClick} className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"></path>
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"></path>
                        </svg>
                    </button>

                    <ul
                        className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                        <li className='mb-6 hidden max-lg:block'>
                            <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
                            </a>
                        </li>

                        {menuLinks.map((link) => (
                            <li key={link.id} className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                <Link to={link.link}
                                    className={`${location.pathname == link.link ? "text-[#007bff]" : "text-gray-500"} hover:text-[#007bff] block font-semibold text-[15px]`}>{link.name}</Link>
                            </li>
                        ))}


                    </ul>
                </div>

                <div className='flex max-lg:ml-auto space-x-3'>
                    <Dropdown
                        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
                        arrowIcon={false}
                        inline
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={() => { navigate("/user-dashboard") }}>Dashboard</Dropdown.Item>
                        {/* <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item> */}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleUserLogout}>Sign out</Dropdown.Item>
                    </Dropdown>

                    <button id="toggleOpen" onClick={handleMenuClick} className='lg:hidden'>
                        <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>

            </div>
        </header>
    )
}

export default Header