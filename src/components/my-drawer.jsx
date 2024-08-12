
import { Drawer,DrawerContent, DrawerTitle } from "./ui/drawer";
import Form from "./form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function MyDrawer({ isOpen, setIsOpen }) {
  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <VisuallyHidden>
          <DrawerTitle>''</DrawerTitle>
        </VisuallyHidden>
        <DrawerContent aria-describedby={undefined} >
          <div className="mx-auto w-full max-w-xl">
            <Form isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
