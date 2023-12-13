import { Fragment, ReactNode, useEffect } from "react";
import { supabase } from "../Services/Supabase";
import { addData } from "../Store";
import { useSelector, useDispatch } from "react-redux";

interface element {
  key(): ReactNode;
  service_name: string;
}

function Display() {
  const dispatch = useDispatch();
  const display = useSelector(({ lcl_db: { data } }) => {
    return data;
  });

  useEffect(() => {
    const data = async () => {
      try {
        const { data, error } = await supabase.from("services").select();

        dispatch(addData(data));

        if (error) {
          throw new Error(error.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    data();
  }, []);

  const show = display?.map((element: element) => {
    console.log(element?.service_name);
    return (
      <Fragment key={element?.service_name}>
        <p>{element?.service_name}</p>
      </Fragment>
    );
  });

  return <div>{show}</div>;
}

export default Display;
