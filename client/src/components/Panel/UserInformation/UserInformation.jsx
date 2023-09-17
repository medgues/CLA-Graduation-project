import styles from "../Panel.module.css";

const UserInformation = ({ user }) => {
  return (
    <div className="flex flex-col">
      <h1 className={`${styles["information-heading"]} mt-1`}>
        User Information
      </h1>
      <h3 className={`${styles["information-heading-text"]} text-muted p-0`}>
        Coming soon....
      </h3>
    </div>
  );
};

export default UserInformation;
