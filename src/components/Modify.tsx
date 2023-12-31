import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import {
  onUpdate as Update,
  onDelete as Delete,
  onModalCustomer,
} from "../store";
import { interact } from "../types/slicesTypes";

function Modify() {
  /*Whenever user click div child the modal closes and the buttons updated.*/
  const dispatch = useDispatch();
  const { on_delete, on_update } = useSelector(
    (state: { interact: interact }) => state.interact
  );

  const onAdd = () => {
    dispatch(onModalCustomer(true));
  };
  const onUpdate = () => {
    dispatch(Update(!on_update));
  };
  const onDelete = () => {
    dispatch(Delete(!on_delete));
  };

  return (
    <div className="flex">
      <Button onClick={onAdd}>Add</Button>
      <Button onClick={onUpdate}>Update</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}

export default Modify;
