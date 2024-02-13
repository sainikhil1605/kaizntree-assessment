import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
const Sidebar = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };
  return (
    <div className="flex max-sm:flex-col ">
      <div className=" flex md:visible max-sm:hidden flex-col w-64 h-screen px-4 py-8 bg-white border-r  dark:border-gray-600">
        <div className=" font-semibold text-gray-800 ">
          <img src={Logo} className="max-w-46" />
        </div>
        <div className="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-4">Home</span>
              </li>

              <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-4">Items</span>
              </li>
              <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-4">Stock</span>
              </li>
            </ul>
          </aside>
          <div className="flex items-center p-2 mt-6 -mx-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div
              className="mx-2 text-base font-normal text-gray-900 "
              onClick={() => handleLogout()}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden flex-col">
        <div className="flex w-full  px-4 py-8 bg-white border-r  dark:border-gray-600 justify-between flex-row">
          <div>
            <img src={Logo} className="max-w-28" />
          </div>
          {!navOpen ? (
            <span>
              <GiHamburgerMenu onClick={() => setNavOpen(!navOpen)} />
            </span>
          ) : (
            <IoIosClose onClick={() => setNavOpen(!navOpen)} />
          )}
        </div>
        <div>
          {navOpen && (
            <ul className="flex text-center items-center flex-col">
              <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-4">Home</span>
              </li>

              <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-4">Items</span>
              </li>
              <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ml-4">Stock</span>
              </li>
              <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="ml-4" onClick={() => handleLogout()}>
                  Logout
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
