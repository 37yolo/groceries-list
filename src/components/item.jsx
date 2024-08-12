import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "./ui/card";
import { useContext, useRef, useEffect, useState } from "react";
import { context } from "../lib/context";
import { toast } from "sonner";

export default function Item({ item }) {
  const { title, qty, details, id, status } = item;
  const { setValues, setEditing, setListData,setIsOpen } = useContext(context);
  const [expand, setExpand] = useState(false);

  const cardRef = useRef();

  const handleExpand = () => {
    setExpand(!expand);
  };

  const handleCheck = (e) => {
    e.stopPropagation();
    cardRef.current.classList.add("animate-slide-in-bottom");
    setListData((prev) =>
      prev.map((i, index) => (index + 1 === id ? { ...i, status: !status } : i))
    );

    setExpand(false);
  };
  const handleEdit = () => {
    toast.dismiss();
    setIsOpen(true)
    setValues(item);
    setEditing(true);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    setListData((prev) =>
      prev.filter((i, index) => index !== prev.indexOf(item))
    );
    toast.success("You deleted an item");
  };

  useEffect(() => {
    setTimeout(() => {
      cardRef.current.classList.remove("animate-slide-in-bottom");
    }, 500);
  }, [status]);

  return (
    <>
      <Card
        ref={cardRef}
        className={"mb-2"}
        onClick={handleExpand}
        key={"i" + id}
      >
        <div
          className={
            status
              ? "flex justify-between items-center p-3 opacity-40"
              : "flex justify-between items-center p-3"
          }
        >
          <Checkbox onClick={handleCheck} checked={status} />
          <p className={!status ? "font-semibold" : "line-through"}>{title}</p>
          <p className="font-light text-sm">Qty:{qty}</p>
        </div>
        {expand ? (
          <div
            className="flex flex-col gap-2 p-2 animate-slide-out-bottom"
            key={"id" + id}
          >
            <div className="break-words px-4">
              {details ? details : "No note"}
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={handleEdit}>Edit</Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        ) : null}
      </Card>
    </>
  );
}
