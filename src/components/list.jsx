import Item from "./item";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import MyAlertDialog from "./my-alert-dialog";

export default function List({
  filterValue,
  searchValue,
  listData,
  setListData,
}) {
  const filterItemsDone = useMemo(
    () => listData.filter((item) => item.status),
    [listData]
  );
  const filterItemsLeft = useMemo(
    () => listData.filter((item) => !item.status),
    [listData]
  );

  const filteredItems = useMemo(
    () =>
      filterValue === "done"
        ? filterItemsDone
        : filterValue === "ongoing"
        ? filterItemsLeft
        : filterItemsLeft.concat(filterItemsDone),
    [listData]
  );

  const searchedItems = filteredItems.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  const [listDataHistory, setListDataHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setListDataHistory([]);
    }, 20000);
  }, [listDataHistory]);

  const handleClear = () => {
    if (!listData.length) {
      toast.info("Your list is already empty");
    } else {
      setListData([]);
      toast.success("You cleared your list", {
        action: {
          label: (
            <div className="px-2 py-1 rounded-md bg-black text-white">undo</div>
          ),
          onClick: () => {
            setListData([...listDataHistory]);
            toast.success("Your list is restored");
          },
        },
      });
    }
  };

  return (
    <>
      <MyAlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClear={handleClear}
      />
      <div className="flex justify-between">
        <div className="flex flex-col items-start">
          <p className="text-xl font-bold">List</p>
          <p className="font-light text-sm">
            {!searchValue.length
              ? filterValue === "ongoing"
                ? `${filterItemsLeft.length} left`
                : filterValue === "done"
                ? `${filterItemsDone.length} done`
                : `${filterItemsLeft.length} left, ${filterItemsDone.length} done`
              : searchValue.length > 1
              ? `${searchedItems.length} found`
              : `${searchedItems.length} founds`}
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={() => {
            setListDataHistory([...listData]);
            toast.dismiss();
            setIsOpen(!isOpen);
          }}
        >
          Clear
        </Button>
      </div>
      <ul className="animate-slide-in-bottom">
        {listData.length ? (
          (searchValue.length ? searchedItems : filteredItems).map((item) => (
            <Item key={item.id} item={item} />
          ))
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <li key="e">No item</li>
          </div>
        )}
      </ul>
    </>
  );
}
