import "./App.css";
import { Button } from "./components/ui/button";
import List from "./components/list";
import { useEffect, useState } from "react";

import { context } from "./lib/context";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import Search from "./components/search";
import { FaCartPlus } from "react-icons/fa6";
import MyDrawer from "./components/my-drawer";
import MyProgressBar from "./components/my-progress-bar";

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
  const [filterValue, setFilterValue] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("list", JSON.stringify(listData));
    }, 1000);
  }, [listData]);

  return (
    <>
      <context.Provider
        value={{
          setListData,
          editing,
          listData,
          setValues,
          setEditing,
          values,
          setIsOpen,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          {(!isOpen)&&<MyProgressBar/>}
          <div className="text-3xl font-bold"> Groceries List</div>
          <Button
            className="p-3"
            onClick={() => {
              toast.dismiss();
              setIsOpen(!isOpen);
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
        </div>
        <div>
          <Search
            setSearchValue={setSearchValue}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        </div>
        <List
          listData={listData}
          setListData={setListData}
          searchValue={searchValue}
          filterValue={filterValue}
        />
        <MyDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </context.Provider>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
