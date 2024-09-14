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
import { TemplateInput } from "../template/TemplateInput";
import add from "../../assets/images/add.png";
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  CertificateCount: number;
  setCertificateCount: React.Dispatch<React.SetStateAction<number>>;
}
import { Field, ErrorMessage } from "formik";
export const CertificationModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  CertificateCount,
  setCertificateCount,
}) => {
  const toast = useToast();

  const incrementCertificateCount = () => {
    toast({
      title: "Success",
      description: "Certification added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setCertificateCount((prevCertificateCount) => prevCertificateCount + 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <>Add Certification {CertificateCount}</>
        </ModalHeader>
        <ModalBody>
          <TemplateInput
            name={`certification-name-${CertificateCount}`}
            placeholder="Certification Name"
            type="text"
          />
          <Box mb={3}>
            <Field name={`certification-link-${CertificateCount}`}>
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
                      placeholder="Certification Link"
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
                      name={`certification-link-${CertificateCount}`}
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
            onClick={incrementCertificateCount}
          >
            ADD CERTIFICATION
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
