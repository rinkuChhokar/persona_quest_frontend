import { combineReducers } from "@reduxjs/toolkit";
import isMenuShowInMobileReducer from "../features/isMenuShowInMobileSlice"
import isUserLoggedInReducer from "../features/isUserLoggedInSlice";
import isMainLoaderActiveReducer from "../features/isMainLoaderActiveSlice";
import isUserClickedOnSignUpButtonReducer from "../features/userRegister/isUserClickedOnSignUpButtonSlice";
import isUserClickedOnSignInButtonReducer from "../features/userLogin/isUserClickedOnSignInButtonSlice";
import isUserClickedOnSignInButtonForAdminReducer from "../features/adminLogin/isUserClickedOnSignInButtonForAdminSlice";
import isAdminLoggedInReducer from "../features/adminLogin/isAdminLoggedInSlice";
import isAddPersonalityTestModalOpenReducer from "../features/adminPage/testPage/isAddPersonalityTestModalOpenSlice";
import allQuestionAndAnswerRecordReducer from "../features/adminPage/testPage/allQuestionAndAnswerRecordSlice";
import allRecordOfTestReducer from "../features/adminPage/testPage/allRecordOfTestSlice";
import isEditPersonalityTestModalOpenReducer from "../features/adminPage/testPage/isEditPersonalityTestModalOpenSlice"
import currentTestForEditReducer from "../features/adminPage/testPage/currentTestForEditSlice";
import isDeletetTestModalOpenReducer from "../features/adminPage/testPage/isDeletetTestModalOpenSlice";
import currentTestForDeleteReducer from "../features/adminPage/testPage/currentTestForDeleteSlice";
import allPersonalityTestsReducer from "../features/personalityTest/allPersonalityTestsSlice";
import singlePersonalityTestFetchReducer from "../features/personalityTest/singlePersonalityTestFetchSlice";
import stepReducer from "../features/personalityTest/stepSlice";
import answersReducer from "../features/personalityTest/answersSlice";
import selectedOptionReducer from "../features/personalityTest/selectedOptionSlice";


const rootReducer = combineReducers({
    isMenuShowInMobile: isMenuShowInMobileReducer,
    isUserLoggedIn: isUserLoggedInReducer,
    isMainLoaderActive: isMainLoaderActiveReducer,
    isUserClickedOnSignUpButton: isUserClickedOnSignUpButtonReducer,
    isUserClickedOnSignInButton: isUserClickedOnSignInButtonReducer,
    isUserClickedOnSignInButtonForAdmin: isUserClickedOnSignInButtonForAdminReducer,
    isAdminLoggedIn: isAdminLoggedInReducer,
    isAddPersonalityTestModalOpen: isAddPersonalityTestModalOpenReducer,
    allQuestionAndAnswerRecord: allQuestionAndAnswerRecordReducer,
    allRecordOfTest: allRecordOfTestReducer,
    isEditPersonalityTestModalOpen: isEditPersonalityTestModalOpenReducer,
    currentTestForEdit: currentTestForEditReducer,
    isDeletetTestModalOpen: isDeletetTestModalOpenReducer,
    currentTestForDelete: currentTestForDeleteReducer,
    allPersonalityTests: allPersonalityTestsReducer,
    singlePersonalityTestFetch: singlePersonalityTestFetchReducer,
    step: stepReducer,
    answers: answersReducer,
    selectedOption: selectedOptionReducer
});

export default rootReducer;