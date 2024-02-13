import { useState } from "react";
import Logo from "../../assets/logo.png";
import axiosInstance from "../../utils/Axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const resp = await axiosInstance.post("/token/", {
      username: username,
      password: password,
    });
    if (resp.status === 200) {
      localStorage.setItem("access_token", resp.data.access);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="container m-auto">
        <div className="row">
          <div className="columns-6 flex justify-around  ">
            <img
              className="h-auto object-cover"
              src={Logo}
              alt="Logo"
              width={400}
            />
          </div>
        </div>
        <div className="row">
          <div className="columns-6 m-2 flex justify-around">
            <input
              type="text"
              placeholder="Username"
              className="px-10 pl-4  w-1/4 max-sm:w-1/2 rounded border-2 text-left"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="columns-6 m-2 flex justify-around">
            <input
              type="password"
              placeholder="Password"
              className="px-10 pl-4 w-1/4 max-sm:w-1/2 rounded border-2 text-left"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="columns-4 m-5 flex justify-center">
            <button
              className="bg-custom-gray rounded-lg p-3 shadow-2xl mr-7 text-sm "
              style={{
                boxShadow:
                  "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
              }}
              onClick={() => navigate("/signup")}
            >
              CREATE ACCOUNT
            </button>

            <button
              className="bg-custom-gray rounded-lg p-3 shadow-2xl  text-sm px-8 "
              style={{
                boxShadow:
                  "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
              }}
              onClick={() => handleSubmit()}
            >
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
