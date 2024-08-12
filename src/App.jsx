import "./App.css";
import { Button } from "./components/ui/button";
import List from "./components/list";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "./components/ui/drawer";
import Form from "./components/form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { context } from "./lib/context";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import Search from "./components/search";
import { FaCartPlus } from "react-icons/fa6";

function App() {
  const [values, setValues] = useState({
    id: 0,
    title: "",
    qty: 1,
    details: "",
    status: false,
  });
  const [searchValue, setSearchValue] = useState("");
  const [listData, setListData] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [editing, setEditing] = useState(false);
  const [filterValue, setFilterValue] = useState('all')

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("list", JSON.stringify(listData));
    }, 1000);
  }, [listData]);

  return (
    <>
      <context.Provider
        value={{ setListData, listData, setValues, setEditing, values }}
      >
        <Drawer>
          <div className="flex justify-between items-center mb-4">
            <div className="text-3xl font-bold"> Groceries List</div>
            <DrawerTrigger asChild>
              <Button
                className="p-3"
                onClick={() => {
                  toast.dismiss();
                  setEditing(false);
                  setValues({
                    id: 0,
                    title: "",
                    qty: 1,
                    details: "",
                    status: false,
                  });
                }}
              >
                <FaCartPlus className="text-2xl" />
              </Button>
            </DrawerTrigger>
          </div>
          <div>
            <Search setSearchValue={setSearchValue} filterValue={filterValue} setFilterValue={setFilterValue}/>
          </div>
          <List
            listData={listData}
            setListData={setListData}
            searchValue={searchValue}
            filterValue={filterValue}
          />
          <VisuallyHidden>
            <DrawerTitle>''</DrawerTitle>
          </VisuallyHidden>
          <DrawerContent aria-describedby={undefined}>
            <div className="mx-auto w-full max-w-xl">
              <Form
                values={values}
                setValues={setValues}
                listData={listData}
                setListData={setListData}
                editing={editing}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </context.Provider>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
