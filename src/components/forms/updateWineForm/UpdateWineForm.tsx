import React from 'react';
import styles from './updateWineForm.module.scss';
import CustomInput from '../../inputs/customInput/CustomInput';
import CustomBtn from '../../buttons/customBtns/primaryBtn/PrimaryBtn';
interface Props {

}

const UpdateWineForm: React.FC<Props> = (props) => {
    const [formData, setFormData] = React.useState({
        name: "",
        year: "",
        type: "",
        varietal: "",
        rating: "",
        consumed: false,
        date_consumed: "",
    });
    //get wine_id from url
    const wine_id = window.location.pathname.split("/")[2];
    const localhost = `http://localhost:3000/wine/${wine_id}`;
    const vercel = `https://wine-app-frontend.vercel.app/wine/${wine_id}`;
    const getWine = async () => {
        let response = await fetch(localhost, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.ok) {
            let res = await response.json();
            console.log(res.data);
            setFormData(res.data);
            setHideDateConsumed(res.data.consumed);
            return res;
        }
    };
    

    const [hideDateConsumed, setHideDateConsumed] = React.useState(formData.consumed);
    console.log("consumed",formData.consumed);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "date_consumed") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value.toString(),
            });
            return;
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
        setHideDateConsumed(e.target.checked);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        fetch(`http://localhost:3000/wine/${wine_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        getWine();
    }, []);
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
            value={formData.name}

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
            value={formData.year}
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
            value={formData.type}
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
            value={formData.varietal}
          />
        </div>
        <div className={styles.input_container}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Rating"
            type="number"
            name="rating"
            required
            value={formData.rating}
          />
          <span></span>
        </div>
       

        <div className={styles.checkbox_container}>
            
            <input
                onChange={handleCheckboxChange}
                type="checkbox"
                name="consumed"
                id="consumed"
                checked={formData.consumed}
            />
            <label htmlFor="consumed">Consumed</label>
        </div>
        <div className={styles.input_container} style={{display:hideDateConsumed?'block':"none"}}>
          <CustomInput
            onChange={handleInputChange}
            placeholder="Date Consumed"
            type="date"
            name="date_consumed"
            value={formData.date_consumed}
            
        
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

export default UpdateWineForm;
