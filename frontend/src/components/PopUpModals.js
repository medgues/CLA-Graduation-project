import { Form, Formik } from "formik";
import React, { useContext } from "react";
import UseFormik from "../hooks/UseFormik";
import * as Yup from "yup";
import { PopupContext } from "../contexts/PopupContext";

import bg from "../../src/assets/shirt.svg";
import ProductPage from "./productPage/pages/ProductPage";
import AddProductForm from "./AddProductForm";
import { motion } from "framer-motion";

const PopUpModals = () => {
  const { MyTextInput, MyCheckbox, MySelect, ImageUploaderField } = UseFormik();
  const { setShowModal } = useContext(PopupContext);
  const categories = ["sci-fi", "anime", "movies", "animals"];

  const deletePop = ({ product, handelDeletDesign }) => {
    const { data } = product;
    return (
      <>
        <div
          onClick={setShowModal(false)}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-2  max-w-xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex  p-2 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Delete a Design Perminantly
                </h3>
              </div>
              {/*body*/}
              <div className="relative px-3 flex w-full justify-center items-center">
                <p className="my-4 w-2/6   text-slate-500 text-lg leading-relaxed">
                  this action will delete your design perminantly, and you wont
                  be able to retrive it again
                </p>

                <div className="relative hover:cursor-pointer flex flex-row items-center h-auto sm:w-2/3 w-1/2 bg-slate-300 m-2 rounded-md">
                  <div className="relative">
                    <img
                      src={data.img}
                      alt=""
                      className=" top-10 absolute scale-40"
                    />
                    <img
                      src={bg}
                      alt=""
                      className=" w-full h-44 object-cover overflow-hidden rounded-md"
                    />
                  </div>
                  <div className="flex w-full  justify-start">
                    <div className=" p-2 h-fit self-start">
                      <p>{data.title}</p>
                      <p>by : {data.postedBy}</p>
                      <p className="mt-1">
                        <span>200 DA</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Non
                  </button>
                </motion.div>
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handelDeletDesign(data)}
                  >
                    Delete!
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  const editForm = ({ data }) => {
    console.log("product this", data);
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-2  max-w-xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex  p-2 border-b border-solid border-slate-200 rounded-t">
                <h1 className="text-5xl font-bold">Edit Design!</h1>
              </div>
              {/*body*/}
              <div className="relative px-3 flex w-full justify-center items-center">
                <div className="flex flex-col w-full">
                  <Formik
                    initialValues={{
                      title: data.title,
                      description: data.description,
                      file: "",
                      categories: data.categories, // added for our select
                    }}
                    validationSchema={Yup.object({
                      title: Yup.string()
                        .min(5, "Must be 5 characters or more")
                        .required("Required"),
                      description: Yup.string()
                        .min(20, "Must be 20 characters or more")
                        .required("Required"),
                      acceptedTerms: Yup.boolean()
                        .required("Required")
                        .oneOf([true], "You must accept the conditions."),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                      const user = { ...values };
                      console.log("values", values);

                      // await signup(user);
                      setSubmitting(false);
                    }}
                  >
                    <Form>
                      <MyTextInput
                        className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
                        label="Title"
                        name="title"
                        type="text"
                        placeholder={data.title}
                      />
                      <MyTextInput
                        className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
                        label="Description"
                        name="description"
                        type="text"
                        placeholder={data.description}
                      />

                      <MySelect
                        className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
                        label="categories"
                        name="categories"
                        value={undefined}
                      >
                        <option value="">Select a Categorie</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </MySelect>
                      <ImageUploaderField
                        value={undefined}
                        className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
                        label="Design"
                        name="file"
                        type="file"
                      />

                      <MyCheckbox
                        className="checkbox checkbox-sm"
                        name="acceptedTerms"
                      >
                        This Product will be edited For good you won't be able
                        to revert those changes
                      </MyCheckbox>
                      {/* {error ? (
                          <div className="alert p-2 alert-error shadow-lg">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>{error}</span>
                            </div>
                          </div>
                        ) : null} */}
                      <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                        <motion.div
                          className="box"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.8 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <button
                            className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Non
                          </button>
                        </motion.div>
                        <motion.div
                          className="box"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.8 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <button
                            className="bg-gray-700 bordre-gray-700 text-white rounded-lg p-2"
                            type="submit"
                          >
                            Submit
                          </button>
                        </motion.div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
              {/*footer*/}
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  const addProductForm = (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-2  max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex  p-2 border-b border-solid border-slate-200 rounded-t">
              <h1 className="text-5xl font-bold">Create a New Product!</h1>
            </div>
            {/*body*/}
            <div className="relative px-3 flex w-full justify-center items-center">
              <AddProductForm />
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );

  const addtoBusketComponent = ({ data }) => {
    return (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <ProductPage product={data} />
      </div>
    );
  };
  return { editForm, addProductForm, deletePop, addtoBusketComponent };
};

export default PopUpModals;
