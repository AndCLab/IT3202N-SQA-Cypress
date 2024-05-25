import { Link, useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import api from "../utils/axiosInstance";
import Swal from "sweetalert2";
import { useUserContext } from "../UserContext";


function Navbar() {
  const navigate = useNavigate();
  const { username } = useUserContext();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure, You want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        background: "#242424",
        color: "white",
      });
      if (result.isConfirmed) {
        await api.delete("/logout");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-base-300 py-4 px-4">
      <div className="container flex justify-between items-center relative mx-auto">
        <Link to="/">Yet Another Todoz</Link>
        <div className="flex gap-4">
          <Link
            to="/profile"
            className="flex gap-1 hover:scale-110 transition-transform"
          >
            <UserCircleIcon className="w-6 h-6 " />
            {username}
          </Link>

          <ArrowRightStartOnRectangleIcon
            className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
