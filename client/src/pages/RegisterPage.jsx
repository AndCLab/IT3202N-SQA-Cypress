import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import Swal from "sweetalert2";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", {
        username,
        password,
      });
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Account Created",
        showConfirmButton: false,
        timer: 2000,
        background: "#242424",
        color: "white",
      });
      navigate("/login");
    } catch (error) {
      setErrorMsg(error?.response?.data?.message ?? "something wen't wrong");
    }
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="bg-base-300 w-4/5 mx-auto p-4 mb-40 shadow-lg rounded md:w-96">
        <form action="#" onSubmit={handleSubmit} autoComplete="off">
          <h1 className="text-center text-xl mb-2">Register</h1>

          <div className="flex flex-col mb-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
              />
            </label>
          </div>

          <div className="flex flex-col mb-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </label>
          </div>
          <div className="error">{errorMsg}</div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>

        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500  hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
