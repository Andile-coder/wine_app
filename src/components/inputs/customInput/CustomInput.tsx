import React from "react";
import styles from "./customInput.module.scss";
interface Props {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CustomInput: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.container_input}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.value}

        name={props.name}
        // value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    </div>
  );
};

export default CustomInput;
