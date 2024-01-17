import React from "react";
import styles from "./primaryBtn.module.scss";
interface Props {
  text: string;

  onClick: () => void;
  type: "submit" | "button";
}

const PrimaryBtn: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <button className={styles.container_btn} onClick={props.onClick} type={props.type}>
        {props.text}
      </button>
    </div>
  );
};

export default PrimaryBtn;
