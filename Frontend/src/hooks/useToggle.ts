import { useState } from "react";

export const useToggle = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const toggleOpen = () => {
    setOpen((state) => !state);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, toggleOpen, handleClose, handleOpen };
};
