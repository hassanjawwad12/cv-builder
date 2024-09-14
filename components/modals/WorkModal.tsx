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
  workcount: number;
  setWorkCount: React.Dispatch<React.SetStateAction<number>>;
}
import { Field, ErrorMessage } from "formik";
import { TemplateInput } from "../template/TemplateInput";
export const WorkModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  workcount,
  setWorkCount,
}) => {
  const toast = useToast();

  const incrementworkcount = () => {
    toast({
      title: "Success",
      description: "Work added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setWorkCount((prevcount) => prevcount + 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <>Add Work Experience {workcount}</>
        </ModalHeader>
        <ModalBody>
          <TemplateInput
            name={`company-name-${workcount}`}
            placeholder="Company Name"
            type="text"
          />
          <TemplateInput
            name={`work-location-${workcount}`}
            placeholder="Location"
            type="text"
          />
          <TemplateInput
            name={`-${workcount}`}
            placeholder="Work Period"
            type="text"
          />
          <TemplateInput
            name={`job-roll-${workcount}`}
            placeholder="Job Roll"
            type="text"
          />
          <Field name={`work-description-${workcount}`}>
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
                    placeholder="work-description"
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
                  <ErrorMessage name={"work-description"} component="div" />
                </Box>
              </div>
            )}
          </Field>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button
            bg={"brand.lightBrown"}
            color={"brand.brown"}
            onClick={incrementworkcount}
          >
            ADD WORK
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
