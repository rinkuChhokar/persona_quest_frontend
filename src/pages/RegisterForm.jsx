import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../api';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserClickedOnSignUpButton } from '../features/userRegister/isUserClickedOnSignUpButtonSlice';

const RegisterForm = () => {
    const dispatch = useDispatch();

    const isUserClickedOnSignUpButton = useSelector((store) => store.isUserClickedOnSignUpButton.value);

    const regiterForm = useRef(null);
    const navigate = useNavigate();

    const validateForm = (data) => {
        // Destructure the data object
        const { fullName, email, password, confirmPassword } = data;

        // Initialize an errors object
        let errors = {};

        // Validate full name
        if (!fullName || fullName.trim() === '') {
            errors.fullName = 'Full name is required.';
        }

        // Validate email
        if (!email || email.trim() === '') {
            errors.email = 'Email is required.';
        }

        // Validate password
        if (!password || password.trim() === '') {
            errors.password = 'Password is required.';
        }

        // Validate confirm password
        if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        // Validate remember me checkbox
        if (!(Object.keys(data).includes("rememberMe"))) {
            errors.rememberMe = 'You must agree to Terms & conditions.';
        }

        // Return errors (if any) or success
        return errors;
    }


    const handleRegisterForm = (e) => {
        e.preventDefault();
        const form = regiterForm.current;
        const formData = new FormData(form);
        const formDataJSON = {}

        for (let [key, value] of formData.entries()) {
            formDataJSON[key] = value;
        }

        let errorResult = validateForm(formDataJSON);
        if (Object.keys(errorResult).length > 0) {
            return toast.error(errorResult[Object.keys(errorResult)[0]]);
        }

        console.log(formDataJSON);
        dispatch(setIsUserClickedOnSignUpButton(true));
        fetch(`${BACKEND_URL}/api/v1/user/user-register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                full_name: formDataJSON["fullName"],
                email: formDataJSON["email"],
                password: formDataJSON["password"]
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.status == "success") {
                    toast.success(data.message);
                    dispatch(setIsUserClickedOnSignUpButton(false));
                    navigate('/');

                }
                else {
                    toast.error(data.message);
                    dispatch(setIsUserClickedOnSignUpButton(false));
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(setIsUserClickedOnSignUpButton(false));

            })


    }

    return (
        <div className="font-[sans-serif] bg-white md:h-screen">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                <div className="max-md:order-1 p-4 bg-gray-50 h-full">
                    <img src="https://readymadeui.com/signin-image.webp" className="lg:max-w-[90%] w-full h-full object-contain block mx-auto" alt="login-image" />
                </div>

                <div className="flex items-center p-6 h-full w-full">
                    <form className="max-w-lg w-full mx-auto" ref={regiterForm} onSubmit={handleRegisterForm}>
                        <div className="mb-12">
                            <h3 className="text-blue-500 md:text-3xl text-2xl font-extrabold max-md:text-center">Create an account</h3>
                        </div>

                        <div>
                            <label className="text-gray-800 text-xs block mb-2">Full Name</label>
                            <div className="relative flex items-center">
                                <input name="fullName" type="text" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Enter name" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="text-gray-800 text-xs block mb-2">Email</label>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Enter email" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                    <defs>
                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                        </clipPath>
                                    </defs>
                                    <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                        <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="text-gray-800 text-xs block mb-2">Password</label>
                            <div className="relative flex items-center">
                                <input name="password" type="password" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Enter password" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="text-gray-800 text-xs block mb-2">Confirm Password</label>
                            <div className="relative flex items-center">
                                <input name="confirmPassword" type="password" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Enter password" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center mt-6">
                            <input id="remember-me" name="rememberMe" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
                            <label htmlFor="rememberMe" className="ml-3 block text-sm text-gray-800">
                                I accept the <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
                            </label>
                        </div>


                        <div className="mt-12">
                            <button type="submit" className={`w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md ${isUserClickedOnSignUpButton ? "bg-slate-700" : "bg-blue-600"} ${isUserClickedOnSignUpButton ? "hover:bg-slate-700" : "hover:bg-blue-700"} text-white focus:outline-none`} disabled={isUserClickedOnSignUpButton ? true : false}>
                                {isUserClickedOnSignUpButton ? "Creating..." : "Create an account"}
                            </button>
                            <p className="text-sm mt-6 text-gray-800">Already have an account? <Link to="/" className="text-blue-500 font-semibold hover:underline ml-1">Login here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm