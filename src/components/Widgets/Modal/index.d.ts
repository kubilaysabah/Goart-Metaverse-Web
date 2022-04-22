import type { ReactNode } from "react";

export default interface ModalProps {
    width?: string;
    title?: string;
    content?: ReactNode;
    type?: "error" | "message";
    isOpen?: boolean;
    closeModal?: () => void;
    button?: {
        text: string;
        confirmModal?: () => void;
    };
}