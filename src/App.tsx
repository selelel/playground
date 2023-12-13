import { useDispatch, useSelector } from "react-redux";
import { addData, deleteData } from "./Store/Slices/import_db";
import { RootState } from "./vite-env";

function App() {
  const dispatch = useDispatch();

  const detail = useSelector((state: RootState) => {
    return state.lcl_db.data;
  });

  const fun = () => {
    dispatch(addData("afd"));
    console.log();
  };
  const del = () => {
    dispatch(deleteData());
  };
  return (
    <>
      <button onClick={fun}>greet</button>
      <p>{detail}</p>
      <button onClick={del}>delt</button>
    </>
  );
}

export default App;
