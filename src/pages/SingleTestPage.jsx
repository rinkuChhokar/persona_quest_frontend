import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setIsMainLoaderActive } from '../features/isMainLoaderActiveSlice';
import { BACKEND_URL } from '../api';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { setSinglePersonalityTestFetch } from '../features/personalityTest/singlePersonalityTestFetchSlice';
import { toast } from 'react-toastify';
import { setAnswers } from '../features/personalityTest/answersSlice';
import { setSelectedOption } from '../features/personalityTest/selectedOptionSlice';
import { setStep } from '../features/personalityTest/stepSlice';

// Sample questions, images, and options for each step
const questions = [
    {
        image: 'https://img.freepik.com/free-vector/flat-illustration-people-with-pets_23-2148981593.jpg?t=st=1731675461~exp=1731679061~hmac=726996f4da4452b3a85c861602d7ea9fdefde95813e43a04653651b902523815&w=740', // Replace with actual image URLs
        question: 'What is your preferred activity?',
        options: ['Reading', 'Traveling', 'Cooking', 'Sports'],
    },
    {
        image: 'https://readymadeui.com/images/food22.webp',
        question: 'Which color do you like the most?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
    },
    {
        image: 'https://img.freepik.com/free-vector/flat-illustration-people-with-pets_23-2148981593.jpg?t=st=1731675461~exp=1731679061~hmac=726996f4da4452b3a85c861602d7ea9fdefde95813e43a04653651b902523815&w=740',
        question: 'What time of day do you feel most productive?',
        options: ['Morning', 'Afternoon', 'Evening', 'Night'],
    },
];

const SingleTestPage = () => {
    const dispatch = useDispatch();
    const step = useSelector((store) => store.step.value);
    const answers = useSelector((store) => store.answers.value);
    const selectedOption = useSelector((store) => store.selectedOption.value);

    const singlePersonalityTestFetch = useSelector((store) => store.singlePersonalityTestFetch.value);

    const { test } = useParams();

    useEffect(() => {
        dispatch(setIsMainLoaderActive(true));
        fetch(`${BACKEND_URL}/api/v1/user/fetch-test-info-from-slug`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("userToken")}`
            },
            body: JSON.stringify({
                test_slug: test
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    const personalityTest = data.personality_test;

                    // Transform questions into the desired format
                    const transformedQuestions = personalityTest.questions.map((q, index) => ({
                        image: index % 2 === 0
                            ? personalityTest.image
                            : personalityTest.image, // Alternate images
                        question: q.question,
                        options: Object.values(q.options),
                    }));

                    // Updated test object
                    const updatedTest = {
                        ...personalityTest,
                        questions: transformedQuestions,
                    };

                    console.log("updatedTest", updatedTest);


                    // Dispatch transformed test
                    dispatch(setSinglePersonalityTestFetch(updatedTest));
                    dispatch(setIsMainLoaderActive(false));
                } else {
                    toast.error(data.message);
                    dispatch(setIsMainLoaderActive(false));
                }
            })
            .catch((error) => {
                console.error(error);
                dispatch(setIsMainLoaderActive(false));
            });

    }, [])

    const handleNext = () => {
        let updatedStep = JSON.parse(JSON.stringify(step));
        const updatedAnswersObject = JSON.parse(JSON.stringify(answers));
        updatedAnswersObject[updatedStep] = JSON.parse(JSON.stringify(selectedOption));
        dispatch(setAnswers(updatedAnswersObject))
        dispatch(setSelectedOption(null));
        dispatch(setStep(updatedStep + 1));
    };

    const handlePrevious = () => {
        let allAnswers = JSON.parse(JSON.stringify(answers));
        let allStep = JSON.parse(JSON.stringify(step));
        let updatedValue = allAnswers[allStep - 1]
        dispatch(setSelectedOption(updatedValue || null)); // Set previous selection if going back
        dispatch(setStep(allStep - 1));
    };

    const handleSelectOption = (option) => {
        console.log("option", option);

        dispatch(setSelectedOption(option));
    };

    const handleSubmit = () => {
        let allAnswers = JSON.parse(JSON.stringify(answers));
        allAnswers[step] = selectedOption;
        dispatch(setAnswers(allAnswers));

        let finalAnswers = [];
        let updatedAnswers = [...answers];
        updatedAnswers[step] = selectedOption;
        finalAnswers = updatedAnswers;

        let a = {};
        for (let i = 1; i <= finalAnswers.length; i++) {
            a[i] = finalAnswers[i - 1];
        }
        console.log("finalAnswers", a);

        dispatch(setIsMainLoaderActive(true));
        fetch(`${BACKEND_URL}/api/v1/user/calculate-mbti`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("userToken")}`
            },
            body: JSON.stringify({
                finalAnswers: a
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    console.log("final mbti result->", data);
                    dispatch(setIsMainLoaderActive(false));
                    dispatch(setStep(0)); // reset form
                    dispatch(setAnswers([]));
                    dispatch(setSelectedOption(null));
                } else {
                    toast.error(data.message);
                    dispatch(setIsMainLoaderActive(false));
                }
            })
            .catch((error) => {
                console.error(error);
                dispatch(setIsMainLoaderActive(false));
            });

        // alert(JSON.stringify(finalAnswers, null, 2));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {singlePersonalityTestFetch !== null ? (
                <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg mt-10 mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-center">Personality Test</h2>

                    {/* Step Progress Indicator */}
                    <div className="mb-4 flex items-center justify-center space-x-2">
                        {singlePersonalityTestFetch !== null && singlePersonalityTestFetch.questions.map((_, index) => (
                            <div
                                key={index}
                                className={`w-8 h-8 flex items-center justify-center rounded-full ${step === index ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {/* Display question, image, and options for each step */}
                    {step < singlePersonalityTestFetch.questions.length && (
                        <div className="space-y-4">
                            <img
                                src={singlePersonalityTestFetch.questions[step].image}
                                alt="Question visual"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold">{singlePersonalityTestFetch.questions[step].question}</h3>

                            {/* Options */}
                            <div className="space-y-2">
                                {singlePersonalityTestFetch.questions[step].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectOption(option)}
                                        className={`block w-full px-4 py-2 text-left border rounded-lg ${selectedOption === option
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-100 border-gray-300 text-gray-700'
                                            } hover:bg-blue-400`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex justify-between">
                        {step > 0 && (
                            <button
                                onClick={handlePrevious}
                                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                            >
                                Previous
                            </button>
                        )}
                        {step < singlePersonalityTestFetch.questions.length - 1 && selectedOption ? (
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Next
                            </button>
                        ) : null}
                        {step === singlePersonalityTestFetch.questions.length - 1 && selectedOption && (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            ) : <></>}

        </div>
    );
};

export default SingleTestPage;
