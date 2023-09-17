import React from "react";
import { Field, useField, useFormikContext } from "formik";

const UseFormik = () => {
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col">
        <label className="text-gray-800 mt-4" htmlFor={props.id || props.name}>
          {label}
        </label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-500  ">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <>
        <label className="flex flex-row gap-3 mt-4">
          <input className="checkbox" {...field} {...props} type="checkbox" />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="text-red-500">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col">
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-500">{meta.error}</div>
        ) : null}
      </div>
    );
  };
  const ImageUploaderField = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const { value, ...rest } = field;
    return (
      <div className="flex flex-col">
        <label className="text-gray-800 mt-4" htmlFor={props.id || props.name}>
          {label}
        </label>
        <Field
          {...rest}
          {...props}
          onChange={(event) => {
            setFieldValue(field.name, event.currentTarget.files[0]);
          }}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500  ">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return { ImageUploaderField, MyTextInput, MyCheckbox, MySelect };
};

export default UseFormik;
