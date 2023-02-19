// import styles of this component
import styles from "./SideBarLink.module.css";
import { RightOutlined } from "@ant-design/icons";

// import other pkg to use

const SideBarLink = ({ id, border, text, icon, href, active, onActive }) => {
  return (
    <>
      <li
        className={`${styles["sidebar-link"]} flex justify-between items-center px-4`}
        onClick={() => onActive(id)}
      >
        {href ? (
          <a
            href={href}
            className="flex justify-between w-100 items-center  text-black"
          >
            {icon}
            <span>{text}</span>
            <RightOutlined />
          </a>
        ) : (
          <>
            {icon}
            <span className={active ? "text-primary" : "text-black"}>
              {text}
            </span>
            <RightOutlined />
          </>
        )}
      </li>
      {border && (
        <div className={styles["sidebar-link-border"]}>
          <div></div>
        </div>
      )}
    </>
  );
};

export default SideBarLink;
