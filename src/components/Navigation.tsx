import { Link } from "react-router-dom";
import Button from "../ui/Button";

function Navigation() {
  return (
    <div>
      <ul className=" flex flex-row gap-1">
        <li>
          <Link to={"/"}>
            <Button>Customer Info</Button>
          </Link>
        </li>
        <li>
          <Link to={"/services"}>
            <Button>Services</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
