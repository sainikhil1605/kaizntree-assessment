import { useState } from "react";
import Modal from "../Modal";
import axiosInstance from "../../utils/Axios";
import { Button, TextInput } from "flowbite-react";

const NewCategoryModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [category, setCategory] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axiosInstance.post("/categories/", { name: category });
    if (resp.status === 201) {
      closeModal();
    }
  };
  return (
    <Modal
      header={"Add New Category"}
      isOpen={isOpen}
      closeModal={closeModal}
      footerContent={
        <Button
          className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded  items-center mb-4 md:mb-0 mr-2"
          onClick={(e) => handleSubmit(e)}
        >
          Add Category
        </Button>
      }
    >
      <form className="flex flex-col">
        <TextInput
          type="text"
          placeholder="Category"
          sizing="sm"
          onChange={(e) => setCategory(e.target.value)}
        />
      </form>
    </Modal>
  );
};
export default NewCategoryModal;
