import React from "react";
import styles from "./wineListTable.module.scss";
import PrimaryBtn from "../../buttons/customBtns/primaryBtn/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
interface Props {
  data: Wine[];
}

interface Wine {
  wine_id: string,
  user_id: string,
  name:string,
  year: 2024,
  type: string,
  rating: 5,
  consumed: boolean,
  date_consumed: any,
  varietal: string,
  createdAt: string,
  updatedAt: string
}
const WineListTable: React.FC<Props> = (props) => {

  return (
    <div className={styles.container}>
      <table className={styles.container_table}>
        <thead className={styles.container_table_row_header}>
          <tr>
            <th>
              {" "}
              <span>ID </span>
            </th>
            <th>
              {" "}
              <span>Name </span>
            </th>
            <th>
              {" "}
              <span>Year </span>
            </th>
            <th>
              {" "}
              <span>Type </span>
            </th>
            <th>
              {" "}
              <span>Rating </span>
            </th>
            <th>
              {" "}
              <span>Consumed </span>
            </th>
            <th>
              {" "}
              <span>Date Consumed </span>
            </th>
            <th>
              {" "}
              <span>Action </span>
            </th>
          </tr>
        </thead>
        <tbody className={styles.container_table_row_body}>
          {props.data.map((wine, index) => (
            <TableRow key={index} index={index+1} wine={wine} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface TableRowProps {
  index: number;
  wine: Wine;
}
const TableRow: React.FC<TableRowProps> = (props) => {
  const navigate = useNavigate();
  const [stateRefresh, setStateRefresh] = React.useState(false);
  const toEdit = () => {
    navigate(`/edit/${props.wine.wine_id}`);
  }
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:3000/wine/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let res = await response.json();
      console.log(res);
      alert("Wine deleted");
      window.location.reload();

    }
  
  };
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.wine.name}</td>
      <td>{props.wine.year}</td>
      <td>{props.wine.type}</td>
      <td>{props.wine.rating}</td>
      <td>{props.wine.consumed?"Yes":"No"}</td>
      <td>{props.wine.date_consumed}</td>
      <td>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <PrimaryBtn text="Edit" onClick={toEdit} type="button" />
        <MdDeleteForever color="red" onClick={()=>handleDelete(props.wine.wine_id)} size={50} />
        </div>
        
      </td>
    </tr>
  );
};

export default WineListTable;
