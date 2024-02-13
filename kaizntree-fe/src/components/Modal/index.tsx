import React from "react";
import { Button, Modal } from "flowbite-react";
const CustomModal = ({
  header,
  isOpen,
  closeModal,
  children,
  footerContent,
  size,
  popup,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      show={isOpen}
      onClose={() => closeModal(false)}
      size={size || "sm"}
      popup={popup}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footerContent && <Modal.Footer>{footerContent}</Modal.Footer>}
    </Modal>
  );
};

export default CustomModal;
