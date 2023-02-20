import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Auth } from "../contexts/Auth";
import { CardContext } from "../contexts/CardContext";
import {
  UserOutlined,
  ShoppingCartOutlined,
  BellFilled,
} from "@ant-design/icons";

import { Avatar, Badge, Popover, Space } from "antd";
import { motion } from "framer-motion";

function MainHeader() {
  const { user } = useContext(Auth);
  const { state } = useContext(CardContext);
  const { logOut } = useLogout();

  const navigate = useNavigate();

  const handelUserClick = (username) => {
    navigate(`/${username}`);
  };

  const handleLogout = () => {
    logOut();
  };
  const busket = (
    <div className="flex flex-col ">
      <span className="font-bold text-lg">
        you have {state ? state.length : 0} Item in your busket
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
  );
  const notif = <div>@</div>;
  const profile = (
    <ul className="menu menu-compact bg-base-100 w-52">
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
  );

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
          <div className="flex gap-4 justify-center items-center mr-9">
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Popover content={busket} title="Busket Content">
                <Badge size="default" count={state.length}>
                  <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                </Badge>
              </Popover>
            </motion.div>
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Popover content={notif} title="Notification ">
                <Badge dot>
                  <BellFilled style={{ fontSize: "24px" }} />
                </Badge>
              </Popover>
            </motion.div>
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Popover placement="bottomRight" content={profile}>
                <Space wrap size={16}>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Space>
              </Popover>
            </motion.div>
          </div>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
