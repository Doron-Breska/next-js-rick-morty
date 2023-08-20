import React, { useRef, useEffect } from "react";

type Props = {};

interface ExtendedHTMLDialogElement extends HTMLDialogElement {
  open: boolean;
  close: () => void;
  showModal: () => void;
}

const Index = (props: Props) => {
  const dialogRef = useRef<ExtendedHTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    const isModalDialogOpen = sessionStorage.getItem("isModalDialogOpen");

    if (dialogElement) {
      if (isModalDialogOpen === "true" && !dialogElement.open) {
        dialogElement.showModal();
      }
    }

    return () => {
      if (dialogElement && dialogElement.open) {
        dialogElement.close();
      }
    };
  }, []);

  const openModal = () => {
    const dialogElement = dialogRef.current;
    if (dialogElement && !dialogElement.open) {
      dialogElement.showModal();
      sessionStorage.setItem("isModalDialogOpen", "true");
    }
  };

  const closeModal = () => {
    const dialogElement = dialogRef.current;
    if (dialogElement && dialogElement.open) {
      dialogElement.close();
      sessionStorage.removeItem("isModalDialogOpen");
    }
  };

  return (
    <div>
      <h1>Testing</h1>
      <button onClick={openModal}>Open Modal</button>
      <dialog ref={dialogRef}>
        <button onClick={closeModal}>Close</button>
        <p>Modal content</p>
      </dialog>
    </div>
  );
};

export default Index;
