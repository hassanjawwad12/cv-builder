import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  ModalHeader,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import add from "../../assets/images/add.png";
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectCount: number;
  setProjectCount: React.Dispatch<React.SetStateAction<number>>;
}
import { Field, ErrorMessage } from "formik";
import { TemplateInput } from "../template/TemplateInput";
export const ProjectModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  projectCount,
  setProjectCount,
}) => {
  const toast = useToast();

  const incrementCount = () => {
    toast({
      title: "Success",
      description: "Project added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setProjectCount((prevCount) => prevCount + 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Project {projectCount}</ModalHeader>
        <ModalBody>
          <TemplateInput
            name={`project-company-name-${projectCount}`}
            placeholder="Company Name"
            type="text"
          />
          <TemplateInput
            name={`client-name-${projectCount}`}
            placeholder="Client Name"
            type="text"
          />
          <TemplateInput
            name={`project-working-period-${projectCount}`}
            placeholder="Working Period"
            type="text"
          />
          <TemplateInput
            name={`project-roll-${projectCount}`}
            placeholder="Project Roll"
            type="text"
          />
          <Box mb={3}>
            <Field name={`project-description-1${projectCount}`}>
              {({ field }: { field: any }) => (
                <div>
                  <InputGroup
                    size="md"
                    mb={3}
                    color={"rgba(253, 253, 253, 0.39)"}
                  >
                    <Input
                      {...field}
                      pr="4.5rem"
                      type="text"
                      placeholder="Project Description"
                      color={"black"}
                      bg={"brand.white"}
                      h={"50px"}
                    />
                    <InputRightElement
                      width="40px"
                      color={"brand.green"}
                      bg={"brand.lightBrown"}
                      h={"40px"}
                      m={1}
                    >
                      <img src={add} alt="lock" height={20} width={20} />
                    </InputRightElement>
                  </InputGroup>
                  <Box color={"red"}>
                    <ErrorMessage
                      name={`project-description-${projectCount}`}
                      component="div"
                    />
                  </Box>
                </div>
              )}
            </Field>
          </Box>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button
            bg={"brand.lightBrown"}
            color={"brand.brown"}
            onClick={incrementCount}
          >
            ADD PROJECT
          </Button>
          <Button
            bg={"brand.brown"}
            color={"brand.white"}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
