import React from 'react';
import styles from './createWineForm.module.scss';
import CustomInput from '../../inputs/customInput/CustomInput';
import CustomBtn from '../../buttons/customBtns/primaryBtn/PrimaryBtn';
interface Props {

}

const CreateWineForm: React.FC<Props> = () => {
    const [input, setInput] = React.useState({
        name:"",
        varietal:"",
        year:2024,
        consumed:false,
        type:"",
        rating:0,
        date_consumed:"",
        user_id:localStorage.getItem("user_id")
    });
    const [hideDateConsumed, setHideDateConsumed] = React.useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // change date_consumed to string
        if(e.target.name === "date_consumed") {
            setInput({
                ...input,
                [e.target.name]: e.target.value.toString()
            });
            return;
        }
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.checked
        });
        console.log(e.target.checked);
        
        setHideDateConsumed(e.target.checked);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
        fetch("http://localhost:3000/wine/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(input),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    
  return (
    <div>
       <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.form_title}>Fill in details below</p>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Name"
            type="text"
            name="name"
            required
          />
          <span></span>
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Year"
            type="number"
            name="year"
            required
          />
          <span></span>
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Type"
            type="text"
            name="type"
            required
          />
          <span></span>
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Varietal"
            type="text"
            name="varietal"
            required
          />
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Rating"
            type="number"
            name="rating"
            required
          />
          <span></span>
        </div>
       

        <div className={styles.checkbox_container}>
            
            <input
                onChange={handleCheckboxChange}
                type="checkbox"
                name="consumed"
                id="consumed"
            />
            <label htmlFor="consumed">Consumed</label>
        </div>
        <div className={styles.input_container} style={{display:hideDateConsumed?'block':"none"}}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Date Consumed"
            type="date"
            name="date_consumed"
            
        
          />
          <span></span>
        </div>
        <div>
        <CustomBtn text="Cancel" onClick={() => {}} type="submit" />
        <CustomBtn text="Save" onClick={() => {}} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateWineForm;
