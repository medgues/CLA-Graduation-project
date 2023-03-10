import axios from "axios";

export const useFetch = () => {
  const fetch = async ({ url, data, method, user }) => {
    console.log("url");
    if (method === "post") {
      try {
        const res = await axios.post(url, data, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        return res;
      } catch (err) {
        const res = err;
        return res;
      }
    }
    if (method === "get") {
      console.log("user token", user);
      try {
        const res = await axios.get(url);
        console.log("fetch res", res);
        return res;
      } catch (err) {
        const res = err;
        console.log("fetch res", res);
        return res;
      }
    }
    if (method === "getProfile") {
      console.log("user token", user);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log("get profile fetch res", res);
        return res;
      } catch (err) {
        const res = err;
        console.log("fetch res", res);
        return res;
      }
    }
    if (method === "getUserProducts") {
      console.log("user token", user);
      try {
        const res = await axios.get(url);
        console.log("fetch res", res);
        return res;
      } catch (err) {
        const res = err;
        console.log("fetch res", res);
        return res;
      }
    }
    if (method === "getProduct") {
      console.log("user token", user);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log("fetch res", res);
        return res;
      } catch (err) {
        const res = err;
        console.log("fetch res", res);
        return res;
      }
    }
    if (method === "delete") {
      try {
        console.log("order with user", url, user);
        const res = await axios.delete(url, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        return res;
      } catch (err) {
        console.log("delete error with user", err);
        const res = err;
        return res;
      }
    }
    if (method === "patch") {
      try {
        console.log("order with user", url, user);
        const res = await axios.patch(url, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        return res;
      } catch (err) {
        console.log("patch error with user", err);
        const res = err;
        return res;
      }
    }
  };

  return { fetch };
};
