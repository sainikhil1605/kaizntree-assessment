import { useState } from "react";
import NewCategoryModal from "./NewCategoryModal";
import { Button } from "flowbite-react";

const DashboardHeader = ({ totalItems, totalCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <NewCategoryModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <div className="p-4 max-sm:p-1">
        <div className=" flex flex-row max-sm:flex-col max-sm:justify-center md:flex-row md:justify-between  mb-4 md:mb-0 max-sm:items-center max-sm:max-w-96">
          <div className="flex flex-col ">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Item Dashboard
            </h1>
            <p>All items</p>
            <div className="mt-10">
              <Button
                className=" text-white font-bold py-2 px-4 rounded inline-flex items-center mb-4 md:mb-0 mr-2"
                onClick={() => setIsOpen(true)}
                color="success"
              >
                New Item Category
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-x-2">
            <div>
              <span className="text-sm text-gray-500">Total Categories: </span>
              <span className="text-sm font-semibold">{totalCategories}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Items: </span>
              <span className="text-sm font-semibold">{totalItems}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardHeader;
