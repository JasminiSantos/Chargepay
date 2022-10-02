import { useState } from "react";

export default function useModalEditUser() {
    const [open, setOpen] = useState(false);

    return {
        open,
        setOpen
    }
}