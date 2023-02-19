import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import UseFormik from "../hooks/UseFormik";
import { PopupContext } from "../contexts/PopupContext";
import { motion } from "framer-motion";

const AddProductForm = () => {
  const { MyTextInput, MySelect, ImageUploaderField } = UseFormik();
  const { setShowModal } = useContext(PopupContext);

  const [err, setErr] = useState("");
  const { fetch } = useFetch();
  const categories = ["sci-fi", "anime", "movies", "animals"];
  const handelImage = async (values) => {
    console.log("img", values.file);
    console.log("title", values.title);
    const newTitle = values.title.replaceAll(" ", "").toLowerCase();
    const { data } = await axios.get(`api/preUrl/${newTitle}.png`);
    console.log(data);
    const { put, get, key } = data.UpUrl;
    console.log(put, get, key);

    await axios.put(put, values.file);

    const user = JSON.parse(localStorage.getItem("user"));
    const product = { ...values, file: key, postedBy: user.username };
    console.log("product", product);
    const url = "/api/products/";
    fetch({ url, data: product, method: "post", user });
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold">create new product</h1>
        <Formik
          initialValues={{
            title: "",
            description: "",
            file: "",
            categories: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string()
              .min(20, "Must be 20 characters or More")
              .required("Required"),
            categories: Yup.string().oneOf(categories).required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("values", values);
            handelImage(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <MyTextInput
              className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
              label="Titel"
              name="title"
              type="text"
              placeholder="react T-shirt Design"
            />
            <MyTextInput
              className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
              label="Description"
              name="description"
              type="text"
              placeholder="description...."
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
    </>
  );
};
export default AddProductForm;
