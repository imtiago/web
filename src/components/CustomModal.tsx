import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react';

export interface ICustomModalRef {
  toggleModal: () => void;
}
export interface ICustomModal extends ModalProps {
  children: React.ReactNode;
  title: string;
}
const CustomModal: ForwardRefRenderFunction<ICustomModalRef, ICustomModal> = ({ children, title }, ref) => {
  const { onClose } = useDisclosure();
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleModal() {
      setOpen(!open);
    },
  }));

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton onClick={() => setOpen(false)} />
        <ModalBody my={2}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(CustomModal);
