import React, { useState } from 'react';

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
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleNext = () => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[step] = selectedOption;
            return updatedAnswers;
        });
        setSelectedOption(null);
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setSelectedOption(answers[step - 1] || null); // Set previous selection if going back
        setStep(step - 1);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[step] = selectedOption;
            return updatedAnswers;
        });
        let finalAnswers = [];
        let updatedAnswers = [...answers];
        updatedAnswers[step] = selectedOption;
        finalAnswers = updatedAnswers;

        alert(JSON.stringify(finalAnswers, null, 2));
        setStep(0); // reset form
        setAnswers([]);
        setSelectedOption(null);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg mt-10 mb-16">
                <h2 className="mb-6 text-2xl font-bold text-center">Personality Test</h2>

                {/* Step Progress Indicator */}
                <div className="mb-4 flex items-center justify-center space-x-2">
                    {questions.map((_, index) => (
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
                {step < questions.length && (
                    <div className="space-y-4">
                        <img
                            src={questions[step].image}
                            alt="Question visual"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold">{questions[step].question}</h3>

                        {/* Options */}
                        <div className="space-y-2">
                            {questions[step].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectOption(option)}
                                    className={`block w-full px-4 py-2 text-left border rounded-lg ${selectedOption === option
                                        ? 'bg-blue-500 text-white border-blue-500'
                                        : 'bg-gray-100 border-gray-300 text-gray-700'
                                        } hover:bg-blue-100`}
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
                    {step < questions.length - 1 && selectedOption ? (
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Next
                        </button>
                    ) : null}
                    {step === questions.length - 1 && selectedOption && (
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleTestPage;
