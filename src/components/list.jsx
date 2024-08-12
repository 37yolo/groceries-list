import Item from "./item";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useMemo, useState } from "react";


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

  const filteredItems =
    filterValue === "done"
      ? filterItemsDone
      : filterValue === "ongoing"
      ? filterItemsLeft
      : filterItemsLeft.concat(filterItemsDone);
  const searchedItems = useMemo(
    () => filteredItems.filter((item) => (item.title).toLowerCase().includes(searchValue)),
    [filteredItems]
  );

  const [listDataHistory, setListDataHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{setTimeout(() => {
    setListDataHistory([])
  }, 20000);},[listDataHistory])

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
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <p className="text-xl font-bold">List</p>
            <p className="font-light text-sm">{!searchValue.length ? (
                filterValue==='ongoing'?`${filterItemsLeft.length} left`:
                filterValue==='done'?`${filterItemsDone.length} done`:
                `${filterItemsLeft.length} left, ${filterItemsDone.length} done`     
            ) : searchValue.length > 1 ? (
              `${searchedItems.length} found`
            ) : (
              `${searchedItems.length} founds`
            )}</p>
          </div>
          <Button
            variant="destructive"
            onClick={() => {
              setListDataHistory([...listData]);
              toast.dismiss();
              setIsOpen(!isOpen)
            }}
          >Clear</Button>
        </div>
        <ul className="animate-slide-in-bottom">
          {listData.length ? (
            (searchValue.length ? searchedItems : filteredItems).map((item,index) => (
              <Item key={item.id} index={index} item={item}/>
            ))
          ) : (
            <div className="flex justify-center items-center h-[50vh]">
              <li key="e">No item</li>
            </div>
          )}
        </ul>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="max-sm:max-w-[90vw] rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action might not be undone. This will permanently delete
                your every items in your list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 active:bg-red-700" onClick={handleClear}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
