import Modal from "react-modal";
import {Button} from "@/components/ui/button.tsx";
import { IoClose } from "react-icons/io5";

import {ModalProps} from "@/types/BaseModal.ts";
import {cn} from "@/lib/utils.ts";

export default function BaseModal({children, isModalOpen, onClose, className}: ModalProps) {
        return (
         <Modal
         isOpen={isModalOpen}
         onRequestClose={onClose}
         overlayClassName="flex justify-center items-center fixed inset-0 bg-black bg-opacity-70"
             className={cn("relative rounded-xl bg-background text-foreground focus:outline-0 focus:border-0 p-7 w-[400px]", className)}>
            <Button variant={"ghost"} size={"icon"} className="absolute right-5 top-4" onClick={onClose}><IoClose size={30}/></Button>
             {children}
         </Modal>
        )
}