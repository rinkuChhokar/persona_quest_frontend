/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddPersonalityTestModalOpen } from "../../../../features/adminPage/testPage/isAddPersonalityTestModalOpenSlice";
import { setAllQuestionAndAnswerRecord } from "../../../../features/adminPage/testPage/allQuestionAndAnswerRecordSlice";
import { setAllRecordOfTest } from "../../../../features/adminPage/testPage/allRecordOfTestSlice";
import { setIsEditPersonalityTestModalOpen } from "../../../../features/adminPage/testPage/isEditPersonalityTestModalOpenSlice";
import { setCurrentTestForEdit } from "../../../../features/adminPage/testPage/currentTestForEditSlice";
import { setIsDeletetTestModalOpen } from "../../../../features/adminPage/testPage/isDeletetTestModalOpenSlice";
import { setCurrentTestForDelete } from "../../../../features/adminPage/testPage/currentTestForDeleteSlice";

const PersonalityTestPage = () => {
  const dispatch = useDispatch();
  const allRecordOfTest = useSelector((store) => store.allRecordOfTest.value);

  useEffect(() => {
    console.log("allRecordOfTest3333333", allRecordOfTest);

  }, [allRecordOfTest])

  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Tests
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for users"
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddPersonalityTestModal />
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              {allRecordOfTest.length > 0 ? (
                <Test />
              ) : <></>}

            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

const AddPersonalityTestModal = () => {
  const dispatch = useDispatch();
  const isAddPersonalityTestModalOpen = useSelector((store) => store.isAddPersonalityTestModalOpen.value);
  const allQuestionAndAnswerRecord = useSelector((store) => store.allQuestionAndAnswerRecord.value);
  const allRecordOfTest = useSelector((store) => store.allRecordOfTest.value);

  const fileInputForLogoRef = useRef(null);
  const personalityTestImageRef = useRef(null);
  const testNameRef = useRef(null);

  const triggerFileUpload = () => {
    fileInputForLogoRef.current.click();
  };

  const handleFileUploadForLogoImage = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB

    if (file) {
      if (file.size > maxSizeInBytes) {
        // alert('File size exceeds 1 MB');
        toast.warning("File size exceeds 1 MB!");
        event.target.value = null;
        return;
      }

      // Handle the uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        // let image = [...currentUploadedImage];
        // image.push(e.target.result);

        // dispatch(setCurrentUploadedImage(image));
        if (personalityTestImageRef.current) {
          personalityTestImageRef.current.src = e.target.result;
          personalityTestImageRef.current.image = e.target.result;
        }
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const addDiv = (e) => {
    e.preventDefault();
    const newDiv = {
      id: `div-${Date.now()}`,
      question: "",
      options: { A: "", B: "", C: "", D: "" },
    };
    let allRecords = JSON.parse(JSON.stringify(allQuestionAndAnswerRecord));
    allRecords.push(newDiv);
    dispatch(setAllQuestionAndAnswerRecord(allRecords));
  };

  const removeDiv = (id) => {
    let allRecords = allQuestionAndAnswerRecord.filter((div) => div.id !== id);
    dispatch(setAllQuestionAndAnswerRecord(allRecords));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedDivs = Array.from(allQuestionAndAnswerRecord);
    const [removed] = reorderedDivs.splice(result.source.index, 1);
    reorderedDivs.splice(result.destination.index, 0, removed);
    dispatch(setAllQuestionAndAnswerRecord(reorderedDivs));
  };

  useEffect(() => {
    console.log("All Divs Data", allQuestionAndAnswerRecord)
  }, [allQuestionAndAnswerRecord]);


  const handleAddPersonalityTest = (e) => {
    e.preventDefault();
    let testName = testNameRef.current.value;
    console.log("dfgfd", testName);
    if (testName.trim() === "") {
      toast.error("Please give a test name!");
      return;
    }

    console.log("Image-", personalityTestImageRef.current);

    if (personalityTestImageRef.current.src === "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png") {
      toast.error("Please provide an image!");
      return;
    }

    if (allQuestionAndAnswerRecord.length === 0) {
      toast.error("Please provide at least one question!");
      return;
    }

    console.log(allQuestionAndAnswerRecord);

    for (let question of allQuestionAndAnswerRecord) {
      if (question.question.trim() === "" || question.options["A"].trim() === "" || question.options["B"].trim() === "" || question.options["C"].trim() === "" || question.options["D"].trim() === "") {
        toast.error("Please fill out all the details of Question!");
        return;
      }
    }

    let allRecord = {
      id: `id${Date.now()}`,
      name: testName,
      image: personalityTestImageRef.current.src,
      questions: allQuestionAndAnswerRecord
    }

    let allDataOfTests = JSON.parse(JSON.stringify(allRecordOfTest));
    allDataOfTests.push(allRecord)
    dispatch(setAllRecordOfTest(allDataOfTests));
    dispatch(setAllQuestionAndAnswerRecord([]));
    dispatch(setIsAddPersonalityTestModalOpen(false));

  }


  return (
    <>
      <Button color="primary" onClick={() => dispatch(setIsAddPersonalityTestModalOpen(true))}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add test
        </div>
      </Button>
      <Modal className="z-[9999]" onClose={() => { dispatch(setAllQuestionAndAnswerRecord([])); dispatch(setIsAddPersonalityTestModalOpen(false)) }} show={isAddPersonalityTestModalOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add test</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
            <div
              className="h-[150px] w-[150px] relative rounded-lg"
            >
              <img
                ref={personalityTestImageRef}
                className="object-contain h-[150px] w-[150px]"
                src={
                  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                alt=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={triggerFileUpload}
                fill="#000000"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                className="p-2 bg-white rounded-full absolute top-[10px] right-[10px] cursor-pointer"
              >
                <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
              </svg>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputForLogoRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileUploadForLogoImage}
              />
            </div>
            <div>
              <Label htmlFor="firstName">Test name</Label>
              <div className="mt-1">
                <TextInput
                  ref={testNameRef}
                  id="firstName"
                  name="firstName"
                  placeholder="Enter test name"
                />
              </div>
            </div>
            <div>
              <button
                onClick={addDiv}
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Add Question
              </button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="divs">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {allQuestionAndAnswerRecord.map((div, index) => (
                      <Draggable key={div.id} draggableId={div.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 bg-gray-100 rounded-md mb-2"
                          >
                            <div className="mb-3">
                              <TextInput
                                value={div.question}
                                onChange={(e) => {
                                  let allRecords = allQuestionAndAnswerRecord.map((d) =>
                                    d.id === div.id
                                      ? { ...d, question: e.target.value }
                                      : d
                                  );
                                  dispatch(setAllQuestionAndAnswerRecord(allRecords));
                                }
                                }
                                placeholder="Enter question"
                              />
                            </div>
                            {Object.keys(div.options).map((key) => (
                              <div key={key} className="mb-2">
                                <Label>{`Option ${key}`}</Label>
                                <TextInput
                                  value={div.options[key]}
                                  onChange={(e) => {
                                    let allRecords = allQuestionAndAnswerRecord.map((d) =>
                                      d.id === div.id
                                        ? {
                                          ...d,
                                          options: {
                                            ...d.options,
                                            [key]: e.target.value,
                                          },
                                        }
                                        : d
                                    );

                                    dispatch(setAllQuestionAndAnswerRecord(allRecords));


                                  }
                                  }
                                  placeholder={`Enter option ${key}`}
                                />
                              </div>
                            ))}
                            <button
                              onClick={() => removeDiv(div.id)}
                              className="text-red-500 mt-2"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleAddPersonalityTest}>
            Add test
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Test = () => {
  const dispatch = useDispatch();
  const allRecordOfTest = useSelector((store) => store.allRecordOfTest.value);
  const currentTestForEdit = useSelector((store) => store.currentTestForEdit.value);
  const isEditPersonalityTestModalOpen = useSelector((store) => store.isEditPersonalityTestModalOpen.value);
  const isDeletetTestModalOpen = useSelector((store) => store.isDeletetTestModalOpen.value);

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {allRecordOfTest.map((data, index) => (
          <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              1
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src={data.image}
                alt="Image"
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {data.name}
                </div>
                {/* <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              neil.sims@flowbite.com
            </div> */}
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                Active
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <Button color="primary" onClick={() => {
                  dispatch(setCurrentTestForEdit([data]));
                  dispatch(setIsEditPersonalityTestModalOpen(true));
                }}>
                  <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                    Edit test
                  </div>
                </Button>

                <Button color="failure" onClick={() => { dispatch(setIsDeletetTestModalOpen(true)); dispatch(setCurrentTestForDelete([data])) }}>
                  <div className="flex items-center gap-x-2">
                    <HiTrash className="text-lg" />
                    Delete test
                  </div>
                </Button>

              </div>
            </Table.Cell>
          </Table.Row>
        ))}
        {isEditPersonalityTestModalOpen ? (
          <EditUserModal />
        ) : <></>}

        {isDeletetTestModalOpen ? (
          <DeleteUserModal />
        ) : <></>}


      </Table.Body>
    </Table>
  );
};

const EditUserModal = () => {
  const dispatch = useDispatch();
  const isEditPersonalityTestModalOpen = useSelector((store) => store.isEditPersonalityTestModalOpen.value);
  const allQuestionAndAnswerRecord = useSelector((store) => store.allQuestionAndAnswerRecord.value);
  const allRecordOfTest = useSelector((store) => store.allRecordOfTest.value);
  const fileInputForLogoRef = useRef(null);
  const personalityTestImageRef = useRef(null);
  const testNameRef = useRef(null);
  const currentTestForEdit = useSelector((store) => store.currentTestForEdit.value);

  const triggerFileUpload = () => {
    fileInputForLogoRef.current.click();
  };

  const handleFileUploadForLogoImage = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB

    if (file) {
      if (file.size > maxSizeInBytes) {
        // alert('File size exceeds 1 MB');
        toast.warning("File size exceeds 1 MB!");
        event.target.value = null;
        return;
      }

      // Handle the uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        // let image = [...currentUploadedImage];
        // image.push(e.target.result);

        // dispatch(setCurrentUploadedImage(image));
        if (personalityTestImageRef.current) {
          personalityTestImageRef.current.src = e.target.result;
          personalityTestImageRef.current.image = e.target.result;
        }
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const addDiv = (e) => {
    e.preventDefault();
    const newDiv = {
      id: `div-${Date.now()}`,
      question: "",
      options: { A: "", B: "", C: "", D: "" },
    };
    let allRecords = JSON.parse(JSON.stringify(currentTestForEdit[0].questions));
    allRecords.push(newDiv);
    let currentEditRecord = JSON.parse(JSON.stringify(currentTestForEdit));
    currentEditRecord[0].questions = allRecords
    console.log("currentEditRecord", currentEditRecord);

    dispatch(setCurrentTestForEdit(currentEditRecord));
  };

  const removeDiv = (id) => {
    let allRecords = currentTestForEdit[0].questions.filter((div) => div.id !== id);
    let currentEditRecord = JSON.parse(JSON.stringify(currentTestForEdit));
    currentEditRecord[0].questions = allRecords
    dispatch(setCurrentTestForEdit(currentEditRecord));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedDivs = Array.from(currentTestForEdit[0].questions);
    const [removed] = reorderedDivs.splice(result.source.index, 1);
    reorderedDivs.splice(result.destination.index, 0, removed);
    let currentEditRecord = JSON.parse(JSON.stringify(currentTestForEdit));
    currentEditRecord[0].questions = reorderedDivs
    dispatch(setCurrentTestForEdit(currentEditRecord));
  };

  useEffect(() => {
    console.log("All Divs Data", allQuestionAndAnswerRecord)
  }, [allQuestionAndAnswerRecord]);


  const handleEditPersonalityTest = (e) => {
    e.preventDefault();
    let testName = testNameRef.current.value;
    console.log("dfgfd", testName);
    if (testName.trim() === "") {
      toast.error("Please give a test name!");
      return;
    }

    console.log("Image-", personalityTestImageRef.current);

    if (personalityTestImageRef.current.src === "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png") {
      toast.error("Please provide an image!");
      return;
    }

    if (currentTestForEdit[0].questions.length === 0) {
      toast.error("Please provide at least one question!");
      return;
    }


    for (let question of currentTestForEdit[0].questions) {
      if (question.question.trim() === "" || question.options["A"].trim() === "" || question.options["B"].trim() === "" || question.options["C"].trim() === "" || question.options["D"].trim() === "") {
        toast.error("Please fill out all the details of Question!");
        return;
      }
    }

    let allRecord = {
      id: `id${Date.now()}`,
      name: testName,
      image: personalityTestImageRef.current.src,
      questions: currentTestForEdit[0].questions
    }

    let allDataOfTests = JSON.parse(JSON.stringify(allRecordOfTest)).filter((data) => {
      return data.id !== currentTestForEdit[0].id
    });
    allDataOfTests.push(allRecord)
    dispatch(setAllRecordOfTest(allDataOfTests));
    dispatch(setAllQuestionAndAnswerRecord([]));
    dispatch(setIsEditPersonalityTestModalOpen(false))

  }


  return (
    <>

      <Modal className="z-[9999]" onClose={() => dispatch(setIsEditPersonalityTestModalOpen(false))} show={isEditPersonalityTestModalOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit Test</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
            <div
              className="h-[150px] w-[150px] relative rounded-lg"
            >
              <img
                ref={personalityTestImageRef}
                className="object-contain h-[150px] w-[150px]"
                src={currentTestForEdit[0].image}
                alt=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={triggerFileUpload}
                fill="#000000"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                className="p-2 bg-white rounded-full absolute top-[10px] right-[10px] cursor-pointer"
              >
                <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
              </svg>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputForLogoRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileUploadForLogoImage}
              />
            </div>
            <div>
              <Label htmlFor="firstName">Test name</Label>
              <div className="mt-1">
                <TextInput
                  ref={testNameRef}
                  id="firstName"
                  name="firstName"
                  placeholder="Enter test name"
                  defaultValue={currentTestForEdit[0].name}
                />
              </div>
            </div>
            <div>
              <button
                onClick={addDiv}
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Add Question
              </button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="divs">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {currentTestForEdit[0].questions.map((div, index) => (
                      <Draggable key={div.id} draggableId={div.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 bg-gray-100 rounded-md mb-2"
                          >
                            <div className="mb-3">
                              <TextInput
                                value={div.question}
                                onChange={(e) => {
                                  let allRecords = currentTestForEdit[0].questions.map((d) =>
                                    d.id === div.id
                                      ? { ...d, question: e.target.value }
                                      : d
                                  );

                                  let currentEditRecord = JSON.parse(JSON.stringify(currentTestForEdit));
                                  currentEditRecord[0].questions = allRecords
                                  dispatch(setCurrentTestForEdit(currentEditRecord));
                                }
                                }
                                placeholder="Enter question"
                              />
                            </div>
                            {Object.keys(div.options).map((key) => (
                              <div key={key} className="mb-2">
                                <Label>{`Option ${key}`}</Label>
                                <TextInput
                                  value={div.options[key]}
                                  onChange={(e) => {
                                    let allRecords = currentTestForEdit[0].questions.map((d) =>
                                      d.id === div.id
                                        ? {
                                          ...d,
                                          options: {
                                            ...d.options,
                                            [key]: e.target.value,
                                          },
                                        }
                                        : d
                                    );

                                    let currentEditRecord = JSON.parse(JSON.stringify(currentTestForEdit));
                                    currentEditRecord[0].questions = allRecords
                                    dispatch(setCurrentTestForEdit(currentEditRecord));
                                  }
                                  }
                                  placeholder={`Enter option ${key}`}
                                />
                              </div>
                            ))}
                            <button
                              onClick={() => removeDiv(div.id)}
                              className="text-red-500 mt-2"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleEditPersonalityTest}>
            Edit test
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteUserModal = () => {
  const dispatch = useDispatch();
  const isDeletetTestModalOpen = useSelector((store) => store.isDeletetTestModalOpen.value);
  const allRecordOfTest = useSelector((store) => store.allRecordOfTest.value);
  const currentTestForDelete = useSelector((store) => store.currentTestForDelete.value);

  return (
    <>
      <Modal className="z-[9999]" onClose={() => dispatch(setIsDeletetTestModalOpen(false))} show={isDeletetTestModalOpen} size="md">
        <Modal.Header className="px-6 pt-6 pb-0">
          <span className="sr-only">Delete Test</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this test?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => {
                console.log(currentTestForDelete);

                let allTestDataRecord = JSON.parse(JSON.stringify(allRecordOfTest));
                let updatedTestRecord = allTestDataRecord.filter((data) => {
                  return data.id !== currentTestForDelete[0].id
                });

                dispatch(setAllRecordOfTest(updatedTestRecord));
                dispatch(setIsDeletetTestModalOpen(false));
              }}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => { dispatch(setIsDeletetTestModalOpen(false)); dispatch(setCurrentTestForDelete([])) }}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const Pagination = () => {
  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default PersonalityTestPage;
