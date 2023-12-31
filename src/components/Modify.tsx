import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { onAdding, onUpdate as Update, onDelete as Delete } from "../store";
import { interact } from "../types/slicesTypes";

function Modify() {
  /*Whenever user click div child the modal closes and the buttons updated.*/
  const dispatch = useDispatch();

  const { on_add, on_delete, on_update } = useSelector(
    (state: { interact: interact }) => state.interact
  );

  const onAdd = () => {
    dispatch(onAdding(!on_add));
  };
  const onUpdate = () => {
    dispatch(Update(!on_update));
  };
  const onDelete = () => {
    dispatch(Delete(!on_delete));
  };

  return (
    <div>
      <Button onClick={onAdd}>Add</Button>
      <Button onClick={onUpdate}>Update</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}

export default Modify;
