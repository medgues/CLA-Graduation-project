import { useContext, useState } from "react";
import axios from "axios";
import { Auth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";

export const useSignupn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  const { dispatch } = useContext(Auth);

  const signup = async (user) => {
    setisLoading(true);
    setError(null);

    try {
      await axios.post("/api/user/signup", user).then((res) => {
        console.log(res, "res, signup");

        if (res.statusText === "OK") {
          console.log(res, "res, signup");
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({ type: "SIGNUP", payload: res });
          Navigate("/");
        }
      });
    } catch (err) {
      setisLoading(true);
      setError(err.response.data.err);
      console.log("err", err.response.data);
    }
  };

  return { error, isLoading, signup };
};
