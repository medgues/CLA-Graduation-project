// import styles of this component
import styles from "./UserProfile.module.css";
// import other pkgs
import { UploadOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { motion } from "framer-motion";

const UserProfile = ({ userProfile = "img/Arash.jpg", user }) => {
  return (
    <div
      className={`${styles["user-profile"]} d-flex flex-column align-items-center border bg-white`}
    >
      <label htmlFor="user-profile" className={styles["user-profile-label"]}>
        {/* <img src={userProfile} alt="" /> */}

        <Avatar className="m-auto" size={155} icon={<UserOutlined />} />
        <motion.div
          className="box"
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className={`${styles["profile-icon-box"]} bg-primary`}>
            <UploadOutlined />
          </div>
        </motion.div>

        <input type="file" className="hidden" id="user-profile" />
      </label>
      <h1 className={`${styles.username} mt-3`}> @{user.username} </h1>
      <h4 className={`${styles["user-email"]} mt-1`}>{user.email}</h4>
    </div>
  );
};

export default UserProfile;
