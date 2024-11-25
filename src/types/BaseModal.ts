import {ReactNode} from "react";

export type ModalProps = {
    children?: ReactNode,
    isModalOpen: boolean,
    onClose: () => void,
    className?: string,
}