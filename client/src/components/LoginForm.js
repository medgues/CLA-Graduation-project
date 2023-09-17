import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import UseFormik from "../hooks/UseFormik";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { MyTextInput } = UseFormik();
  const { error, isLoading, login } = useLogin();
  console.log("err", error);
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-bold">Log In!</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          password: Yup.string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Invalid password addresss : Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            )
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const url = "/api/user/login";
          const user = { ...values };
          await login({ url: url, data: user });
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MyTextInput
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="********"
          />
          {error ? (
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
          ) : null}

          <button
            className="bg-gray-700 bordre-gray-700 text-white rounded-lg p-2 mt-4"
            type="submit"
          >
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
