import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { DrawerClose } from "./ui/drawer";
import { toast } from "sonner";

export default function Form({ values, setValues, setListData, editing }) {
  const handleSave = () => {
    if (values.title) {
      if (editing) {
        toast.success("You edited an item!");
        setListData((prev) =>
          prev.map((item) =>
            item.id === values.id ? values : item
          )
        );
      } else {
        toast.success("You added an item!");
        setListData((prev) => [
          ...prev,
          { ...values, ["id"]: prev[prev.length - 1]?.id + 1 || 1 },
        ]);
      }
    } else {
      toast.warning("Did you added your item?");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <div className="max-w-xl flex flex-col py-2 px-6 gap-2">
        <div className="flex justify-center text-3xl font-bold">
          <p>Add Item</p>
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Item</p>
          <Input
            name="title"
            value={values.title}
            placeholder="Enter your item here."
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Note</p>
          <Textarea
            className="	no-underline"
            name="details"
            value={values.details}
            placeholder="Enter your note here."
            onChange={onChange}
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">Status</p>
            <Select
              className="flex"
              value={!values.status ? "0" : "1"}
              name="status"
              onValueChange={(v) => {
                v === "1"
                  ? setValues({ ...values, ["status"]: true })
                  : setValues({ ...values, ["status"]: false });
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue
                  placeholder={!values.status ? "Ongoing" : "Done"}
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="0">Ongoing</SelectItem>
                <SelectItem value="1">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">Amount</p>
            <div className="flex">
              <Button
                variant="outline"
                onClick={() =>
                  values.qty > 1 &&
                  setValues({ ...values, ["qty"]: values.qty - 1 })
                }
              >
                -
              </Button>
              <Input
                name="qty"
                type="number"
                value={values.qty}
                className="z-[+1] text-center"
                onChange={onChange}
              />
              <Button
                variant="outline"
                onClick={() =>
                  setValues({ ...values, ["qty"]: values.qty + 1 })
                }
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <DrawerClose asChild>
          <div className="flex gap-2 justify-end py-4">
            <Button variant="outline">Cancel</Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DrawerClose>
      </div>
    </>
  );
}
