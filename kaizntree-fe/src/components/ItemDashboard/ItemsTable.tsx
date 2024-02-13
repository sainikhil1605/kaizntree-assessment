import { useEffect, useMemo, useState } from "react";
import NewItemModal from "./NewItemModal";
import {
  Button,
  Checkbox,
  Dropdown,
  RangeSlider,
  TextInput,
} from "flowbite-react";
import Modal from "../Modal";
import { IoIosFunnel } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import axiosInstance from "../../utils/Axios";

import Table from "./Table";
const ItemsTable = ({
  items,
  setItems,
  selectedItems,
  onSelectItem,
  selectAll,
  onSelectAll,
  categories,
  tags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [inStockRange, setInStockRange] = useState(0);
  const [avaibleStockRange, setAvaibleStockRange] = useState(0);
  const [search, setSearch] = useState("");
  const [skuSearch, setSkuSearch] = useState("");
  const [catSearch, setCatSearch] = useState("");
  const handleModify = () => {
    const editItem = items.filter(
      (item) => selectedItems[item.sku] === true && selectedItems[item.sku]
    );
    setEditItem(editItem[0]);
    setIsEdit(true);
    setIsOpen(true);
  };
  const computeMax = useMemo(() => {
    return Math.max(...items.map((item) => item.in_stock));
  }, [items]);
  const computeMaxAvailableStock = useMemo(() => {
    return Math.max(...items.map((item) => item.available_stock));
  }, [items]);

  useEffect(() => {
    setInStockRange(computeMax);
    setAvaibleStockRange(computeMaxAvailableStock);
  }, [computeMax, computeMaxAvailableStock]);
  const handleDelete = () => {
    const itemsToDelete = items.filter(
      (item) => selectedItems[item.sku] === true
    );

    itemsToDelete.forEach(async (item) => {
      await axiosInstance.delete(`/items/${item.id}/`);
    });
    setItems(items.filter((item) => itemsToDelete.indexOf(item) === -1));
  };

  return (
    <div className="antialiased text-gray-900">
      <NewItemModal
        isOpen={isOpen}
        isEdit={isEdit}
        editItem={editItem}
        closeModal={() => setIsOpen(false)}
        categories={categories}
        tags={tags}
        setItems={setItems}
      />
      <Modal
        isOpen={isOpenDelete}
        closeModal={() => setIsOpenDelete(false)}
        popup
        header="Alert!"
        footerContent={
          <>
            <Button className="bg-red-500" onClick={() => handleDelete()}>
              Continue
            </Button>
            <Button
              className="bg-green-500"
              onClick={() => setIsOpenDelete(false)}
            >
              Cancel
            </Button>
          </>
        }
      >
        Are you sure you want to delete Table.HeadCelle selected items?
      </Modal>
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className=" m-5 flex  justify-between max-sm:justify-between max-sm:flex-col  max-sm:max-w-96">
              <div className="flex items-center max-sm:justify-between ">
                <Button
                  onClick={() => setIsOpen(true)}
                  className="py-2 px-4 mr-6 text-white font-bold   rounded  "
                  color="success"
                >
                  New Item
                </Button>

                <div>
                  <Dropdown
                    className={`${
                      selectedItems &&
                      Object.keys(selectedItems)?.filter(
                        (item) => selectedItems[item] === true
                      ).length === 0
                        ? "disabled bg-gray-500"
                        : " green-500 "
                    }`}
                    label="Options"
                    color="white"
                    dismissOnClick={false}
                    disabled={
                      selectedItems &&
                      Object.keys(selectedItems)?.filter(
                        (item) => selectedItems[item] === true
                      ).length === 0
                    }
                  >
                    {selectedItems &&
                      Object.keys(selectedItems)?.filter(
                        (item) => selectedItems[item] === true
                      ).length > 0 && (
                        <Dropdown.Item onClick={() => setIsOpenDelete(true)}>
                          Delete Selected
                        </Dropdown.Item>
                      )}
                    {selectedItems &&
                      Object.keys(selectedItems)?.filter(
                        (item) => selectedItems[item] === true
                      ).length === 1 && (
                        <Dropdown.Item onClick={() => handleModify()}>
                          Modify this Item
                        </Dropdown.Item>
                      )}
                  </Dropdown>
                </div>
              </div>
              <div className="flex items-center flex-row max-sm:justify-between max-sm:mt-4">
                <div className=" flex flex-row relative mr-2">
                  <TextInput
                    className="block w-full pl-10 pr-4 py-2 text-sm max-sm:p-0 focus:border-blue-500"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button color="success" className="px-2">
                    <CiSearch />
                  </Button>
                </div>
                <div>
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span>
                        <IoIosFunnel />
                      </span>
                    )}
                  >
                    <Dropdown.Item as="switch">
                      <div>
                        In Stock : 0 to {inStockRange}
                        <RangeSlider
                          value={inStockRange}
                          max={computeMax}
                          onChange={(e) => setInStockRange(e.target.value)}
                        />
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item as="switch">
                      <div>
                        Available Stock : 0 to {avaibleStockRange}
                        <RangeSlider
                          value={avaibleStockRange}
                          max={computeMaxAvailableStock}
                          onChange={(e) => setAvaibleStockRange(e.target.value)}
                        />
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div>
                        Search By SKU
                        <Dropdown label={skuSearch} color="success">
                          <Dropdown.Item
                            onClick={() => {
                              setSkuSearch("");
                            }}
                          >
                            All
                          </Dropdown.Item>
                          {items.map((item) => (
                            <Dropdown.Item
                              key={item.sku}
                              onClick={() => {
                                setSkuSearch(item.sku);
                              }}
                            >
                              {item.sku}
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div>
                        Search By Category
                        <Dropdown label={catSearch} color="success">
                          <Dropdown.Item
                            onClick={() => {
                              setCatSearch("");
                            }}
                          >
                            All
                          </Dropdown.Item>
                          {categories.map((item) => (
                            <Dropdown.Item
                              onClick={() => {
                                setCatSearch(item.name);
                              }}
                            >
                              {item.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                      </div>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="max-sm:max-w-96 max-sm:overflow-x-auto md:w-full">
              <Table
                items={items}
                onSelectAll={onSelectAll}
                selectAll={selectAll}
                avaibleStockRange={avaibleStockRange}
                inStockRange={inStockRange}
                search={search}
                skuSearch={skuSearch}
                catSearch={catSearch}
                selectedItems={selectedItems}
                onSelectItem={onSelectItem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
