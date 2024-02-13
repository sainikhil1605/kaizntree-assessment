import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import ItemsTable from "./ItemsTable";
import DashboardHeader from "./Header";
import { it } from "node:test";

const ItemDashboard = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectItem = (sku) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [sku]: !prevSelectedItems[sku],
    }));
  };
  const handleSelectAll = (e) => {
    const newSelectedItems = {};
    if (e.target.checked) {
      items.forEach((item) => {
        newSelectedItems[item.sku] = true;
      });
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(e.target.checked);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const resp = await axiosInstance.get("/items/");
      const resp1 = await axiosInstance.get("/categories/");
      const resp2 = await axiosInstance.get("/tags/");
      if (resp.status === 200) {
        setItems(resp.data);
      }
      if (resp1.status === 200) {
        setCategories(resp1.data);
      }
      if (resp2.status === 200) {
        setTags(resp2.data);
      }
      setLoading(false);
    };
    getData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <DashboardHeader
        totalCategories={categories.length}
        totalItems={items.length}
      />
      <ItemsTable
        items={items}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        selectAll={selectAll}
        selectedItems={selectedItems}
        categories={categories}
        tags={tags}
        setItems={setItems}
      />
    </div>
  );
};

export default ItemDashboard;
