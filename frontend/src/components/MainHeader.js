import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Auth } from "../contexts/Auth";
import { CardContext } from "../contexts/CardContext";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { motion } from "framer-motion";

function MainHeader() {
  const { user } = useContext(Auth);
  const { state } = useContext(CardContext);
  console.log("card from header", state, user);
  const cardStyle = state ? `bg-red-600` : "";
  const { logOut } = useLogout();

  const navigate = useNavigate();

  const handelUserClick = (username) => {
    navigate(`/${username}`);
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <header className="Header relative ">
      <div className="navbar ">
        <div className="flex-1">
          <motion.div
            className="box"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to={"/"} className="btn btn-ghost normal-case text-xl">
              POD
            </Link>
          </motion.div>
        </div>
        {!user && (
          <div className="btn-group gap-1">
            <Link to={"/login"}>
              <button className="btn btn-secondary btn-xs m-x1">login</button>
            </Link>
            <Link to={"/signup"}>
              <button className="btn btn-primary btn-xs m-x1">Signup</button>
            </Link>
          </div>
        )}
        {user && (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <motion.div
                className="box"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {state ? (
                      state.length === 0 ? (
                        <></>
                      ) : (
                        <span
                          className={`badge border-0 badge-sm indicator-item ${cardStyle}`}
                        >
                          {state.length}
                        </span>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </label>
              </motion.div>
              <div
                tabIndex={0}
                className="mt-3 w-10vw rounded-lg card-compact dropdown-content bg-base-100 shadow z-[1001]"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {state ? state.length : 0} Items
                  </span>
                  <span className="text-info">
                    Subtotal: ${state ? 200 * state.length : 0}
                  </span>
                  <div className="card-actions">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="btn btn-primary btn-block"
                    >
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end z-[1001]">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="w-10 rounded-full">
                    <Avatar
                      className="m-auto"
                      size="large"
                      icon={<UserOutlined />}
                    />
                  </div>
                </motion.div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    className="justify-between"
                    onClick={() => handelUserClick(user.username)}
                  >
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>

                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
