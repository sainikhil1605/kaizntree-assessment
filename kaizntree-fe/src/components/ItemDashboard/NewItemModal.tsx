import { useEffect, useState } from "react";
import Modal from "../Modal";
import axiosInstance from "../../utils/Axios";
import { Button, Select, TextInput } from "flowbite-react";

const NewItemModal = ({
  isOpen,
  isEdit,
  editItem,
  closeModal,
  categories,
  tags,
  setItems,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [item, setItem] = useState(
    { ...editItem } || {
      sku: "",
      name: "",
      category: "",
      tag: [],
      in_stock: "",
      available_stock: "",
    }
  );
  useEffect(() => {
    setItem(editItem);
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      const resp = await axiosInstance.post("/items/", {
        ...item,
      });
      if (resp.status === 201) {
        setItems((prevItems) => [...prevItems, resp.data]);
        closeModal();
      }
    } else {
      const resp = await axiosInstance.patch(`/items/${editItem.id}/`, {
        ...item,
      });
      if (resp.status === 200) {
        setItems((prevItems) => {
          return prevItems.map((item) => {
            if (item.id === resp.data.id) {
              return resp.data;
            }
            return item;
          });
        });
        closeModal();
      }
    }
  };
  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      size="md"
      header={!isEdit ? "Add New Item" : "Edit Item"}
    >
      <div>
        <form className="flex flex-col">
          <TextInput
            type="text"
            placeholder="SKU"
            className="m-5 mt-2 pl-1"
            onChange={(e) => setItem({ ...item, sku: e.target.value })}
            value={item.sku}
          />
          <TextInput
            type="text"
            placeholder="Name"
            className="m-5 mt-1 pl-1"
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            value={item.name}
          />
          <Select
            defaultValue={tags[0].id}
            className="m-5 mt-1 pl-1"
            onChange={(e) =>
              setItem({ ...item, tag: [...item.tag, e.target.value] })
            }
            value={item.tag}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Select>
          <Select
            defaultValue={categories[0].id}
            className="m-5 mt-1 pl-1"
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            value={item.category}
          >
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </Select>
          <TextInput
            type="number"
            placeholder="In Stock"
            className="m-5 mt-1 pl-1"
            onChange={(e) => setItem({ ...item, in_stock: e.target.value })}
            value={item.in_stock}
          />
          <TextInput
            type="number"
            placeholder="Available Stock"
            className="m-5 mt-1 pl-1"
            onChange={(e) =>
              setItem({ ...item, available_stock: e.target.value })
            }
            value={item.available_stock}
          />
          <Button
            type="submit"
            color="success"
            className=" rounded px-5 py-2 text-white"
            onClick={(e) => handleSubmit(e)}
          >
            {!isEdit ? "Create" : "Update"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default NewItemModal;
