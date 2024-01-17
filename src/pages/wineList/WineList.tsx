import React from "react";
import WineListTable from "../../components/tables/wineListTable/WineListTable";
import styles from "./wineList.module.scss";
import PrimaryBtn from "../../components/buttons/customBtns/primaryBtn/PrimaryBtn";
import { useNavigate } from "react-router-dom";
interface Props {}

const WineList: React.FC<Props> = (props) => {
  const [data, setData] = React.useState([]);
  // enviroment variables are a better way to store the url
  const localhost = "http://localhost:3000/wine/";
  const vercel = "https://wine-app-frontend.vercel.app/wine";
  const getWineList = async () => {
    const token = localStorage.getItem("token");
   
   let response= await fetch(localhost, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
   
    if (response.ok) {
      let res = await response.json();
      console.log(res.data);
      
      setData(res.data);
      return res;
    }
     
  };
  const handleDelete = async (id: string) => {};
  const navigate = useNavigate();
  const toCreate = () => {
    navigate("/create");
  }
  React.useEffect(() => {
    getWineList();
  }, []);
  return (
    <div className={styles.container}>
      <h1>Wine List</h1>
     <div className={styles.container_btn}>
        <PrimaryBtn onClick={toCreate} text="Create" type="button" />
     </div>
      <WineListTable data={data} />
    </div>
  );
};

export default WineList;
