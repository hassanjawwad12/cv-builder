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
  skillCount: number;
  setSkillCount: React.Dispatch<React.SetStateAction<number>>;
}
import { Field, ErrorMessage } from "formik";
export const SkillModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  skillCount,
  setSkillCount,
}) => {
  const toast = useToast();

  const incrementskillCount = () => {
    toast({
      title: "Success",
      description: "Skill added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setSkillCount((prevCount) => prevCount + 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <>Add Skill {skillCount}</>
        </ModalHeader>
        <ModalBody>
          <Box mb={3}>
            <Field name={`skill-${skillCount}`}>
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
                      placeholder="Skill"
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
                    <ErrorMessage name="skill" component="div" />
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
            onClick={incrementskillCount}
          >
            ADD SKILL
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
