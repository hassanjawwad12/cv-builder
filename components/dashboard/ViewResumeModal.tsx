import React from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import ActionButton from "../buttons/ActionButton";
import copy from "clipboard-copy";
import { MarkdownViewer } from "../../shared/ReusableFunctions";
import { markdownToPlainText } from "../../shared/ReusableFunctions";
export const ViewResumeModal: React.FC<any> = ({
  isOpen,
  onClose,
  title,
  data,
}) => {
  const handleCopy: any = () => {
    const plainText = markdownToPlainText(data);
    copy(plainText);
  };
  let resumeText = data;
  if (resumeText) {
    resumeText = resumeText.replace(/```markdown|```/g, "");
  }

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={"inside"}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box overflow="auto">
            <MarkdownViewer markdownText={resumeText} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <ActionButton action="copy" onClick={handleCopy} />
          <ActionButton action="close" onClick={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
