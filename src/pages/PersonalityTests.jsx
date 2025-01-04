import React from 'react';
import { useNavigate } from 'react-router-dom';


const personalityTests = [
    {
        id: 1,
        testName: "MBTI Test",
        image: "https://img.freepik.com/free-vector/people-with-various-mbti-personality-types-isometric-icons-set-isolated-vector-illustration_98292-8599.jpg?t=st=1731675145~exp=1731678745~hmac=eb256dc7eb994d5234dafc05383851454ee0fa0e7e62b66d0dd61ca5f1bd5993&w=740"
    },

    {
        id: 2,
        testName: "LOGB Test",
        image: "https://img.freepik.com/free-vector/flat-illustration-people-with-pets_23-2148981593.jpg?t=st=1731675461~exp=1731679061~hmac=726996f4da4452b3a85c861602d7ea9fdefde95813e43a04653651b902523815&w=740"
    },

    {
        id: 3,
        testName: "Color Test",
        image: "https://img.freepik.com/free-photo/mom-daughter-are-drawing_1157-18809.jpg?t=st=1731675311~exp=1731678911~hmac=c9d2cc845d61d42d8fc564c079769a47c3e23c9f1106e53a99ede4b88898b239&w=740"
    }
]

const PersonalityTests = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 font-sans">
            <div className="max-w-5xl max-lg:max-w-3xl max-md:max-w-md mx-auto mt-10 mb-16">
                <h2 className="text-3xl font-extrabold text-gray-800">Personality Tests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {personalityTests.map((test) => (
                        <div key={test.id} className="bg-purple-100 cursor-pointer rounded-md overflow-hidden group">
                            <div className="relative overflow-hidden">
                                <img src={test.image} alt="Blog Post 3" className="w-full h-60 object-cover group-hover:scale-125 transition-all duration-300" />
                                <div className="px-4 py-2.5 text-white text-sm tracking-wider bg-pink-500 absolute bottom-0 right-0">August 16, 2023</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800">{test.testName}</h3>
                                <button onClick={() => navigate(`${test.id}`)} className="px-4 py-2 mt-6 rounded-md text-white text-sm tracking-wider border-none outline-none bg-pink-500 hover:bg-pink-600">Play</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default PersonalityTests