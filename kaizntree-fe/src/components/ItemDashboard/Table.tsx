import { Checkbox, Table } from "flowbite-react";
import { useMemo, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
const DashBoardTable = ({
  selectAll,
  onSelectAll,
  items,
  onSelectItem,
  selectedItems,
  inStockRange,
  avaibleStockRange,
  search,
  skuSearch,
  catSearch,
}) => {
  const [sortFilter, setSortFilter] = useState([]);

  const sortItems = (items, sortFilter) => {
    const sortedItems = [...items];
    if (sortFilter.length > 0) {
      sortFilter.forEach((filter) => {
        const constraint = Object.keys(filter)[0];
        const direction = filter[constraint] === "asc" ? 1 : -1;

        sortedItems.sort((a, b) => {
          if (a[constraint] < b[constraint]) return -1 * direction;
          if (a[constraint] > b[constraint]) return 1 * direction;
          return 0;
        });
      });
    }
    // Return original items if no sortFilter is set
    return sortedItems;
  };

  const sortedItems = useMemo(() => {
    return sortItems(items, sortFilter);
  }, [items, sortFilter]);
  return (
    <Table
      className="min-w-full divide-y divide-gray-200 max-sm:overflow-x-scroll max-sm:max-w-96 md:w-full"
      hoverable
    >
      <Table.Head className="bg-gray-50">
        <Table.HeadCell className="py-3 px-3 text-left">
          <Checkbox
            color="green"
            className="form-checkbox h-5 w-5"
            onChange={onSelectAll}
            checked={selectAll}
          />
        </Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          SKU
        </Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Name
        </Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Tags
        </Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Category
        </Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        ></Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          <div className="flex ">
            <div>In Stock </div>
            <div>
              <span
                onClick={() =>
                  setSortFilter((prev) => [...prev, { in_stock: "asc" }])
                }
              >
                <MdArrowDropUp />
              </span>
              <span
                onClick={() =>
                  setSortFilter((prev) => [...prev, { in_stock: "dsc" }])
                }
              >
                <MdArrowDropDown />
              </span>
            </div>
          </div>
        </Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        ></Table.HeadCell>
        <Table.HeadCell
          scope="col"
          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          <div className="flex ">
            <div>Available Stock </div>
            <div>
              <span
                onClick={() =>
                  setSortFilter((prev) => [...prev, { available_stock: "asc" }])
                }
              >
                <MdArrowDropUp />
              </span>
              <span
                onClick={() =>
                  setSortFilter((prev) => [...prev, { available_stock: "dsc" }])
                }
              >
                <MdArrowDropDown />
              </span>
            </div>
          </div>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="bg-white divide-y divide-gray-200">
        {sortedItems
          .filter(
            (item) =>
              item.in_stock <= inStockRange &&
              item.available_stock <= avaibleStockRange &&
              item.name.toLowerCase().includes(search.toLowerCase()) &&
              item.sku.toLowerCase().includes(skuSearch.toLowerCase()) &&
              item.category_name.toLowerCase().includes(catSearch.toLowerCase())
          )
          .map((item) => (
            <Table.Row key={item.sku}>
              <Table.Cell className="py-3 px-3 text-left">
                <Checkbox
                  color="green"
                  className="form-checkbox h-5 w-5 accent-green-700 "
                  // You can handle change event to make it controlled
                  onChange={(e) => {
                    onSelectItem(item.sku);
                  }}
                  checked={selectedItems[item.sku] || false}
                />
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.sku}
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.name}
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.tags?.reduce((acc, tag) => `${acc} ${tag.name}`, "")}
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.category_name}
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap items-center">
                <span
                  className={`px-1 mr-5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.stock_status === "In Stock"
                      ? "bg-green-700 text-green-800 p-1 "
                      : "bg-red-700 text-red-800 p-1"
                  }`}
                ></span>
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap items-center">
                {item.in_stock}
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap items-center">
                <span
                  className={`px-1  ml-5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.stock_status === "In Stock"
                      ? "bg-green-700 text-green-800 p-1"
                      : "bg-red-700 text-red-800 p-1"
                  }`}
                ></span>
              </Table.Cell>
              <Table.Cell className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.available_stock}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};
export default DashBoardTable;
