import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  ModalHeader,
  Select,
  useToast,
} from "@chakra-ui/react";
import { TemplateInput } from "../template/TemplateInput";

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const EducationModal: React.FC<EducationModalProps> = ({
  isOpen,
  onClose,
  count,
  setCount,
}) => {
  const toast = useToast();
  const [educationType, setEducationType] = useState<string>("university");

  const incrementCount = () => {
    toast({
      title: "Success",
      description: "Education added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setCount((prevCount) => prevCount + 1);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEducationType(event.target.value);
  };

  const renderEducationInputs = () => {
    switch (educationType) {
      case "university":
        return (
          <>
            <TemplateInput
              name={`university-qualification-${count}`}
              placeholder="Qualification"
              type="text"
            />
            <TemplateInput
              name={`university-name-${count}`}
              placeholder="University"
              type="text"
            />
            <TemplateInput
              name={`university-address-${count}`}
              placeholder="Address of the place"
              type="text"
            />
            <TemplateInput
              name={`university-time-period-${count}`}
              placeholder="Time Period"
              type="text"
            />
          </>
        );
      case "college":
        return (
          <>
            <TemplateInput
              name={`college-qualification-${count}`}
              placeholder="Qualification"
              type="text"
            />
            <TemplateInput
              name={`college-name-${count}`}
              placeholder="College"
              type="text"
            />
            <TemplateInput
              name={`college-address-${count}`}
              placeholder="Address of the place"
              type="text"
            />
            <TemplateInput
              name={`college-time-period-${count}`}
              placeholder="Time Period"
              type="text"
            />
          </>
        );
      case "school":
        return (
          <>
            <TemplateInput
              name={`school-qualification-${count}`}
              placeholder="Qualification"
              type="text"
            />
            <TemplateInput
              name={`school-name-${count}`}
              placeholder="School"
              type="text"
            />
            <TemplateInput
              name={`school-address-${count}`}
              placeholder="Address of the place"
              type="text"
            />
            <TemplateInput
              name={`school-time-period-${count}`}
              placeholder="Time Period"
              type="text"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Education</ModalHeader>
        <ModalBody>
          <Select value={educationType} onChange={handleSelectChange} mb={3}>
            <option value="university">University</option>
            <option value="college">College</option>
            <option value="school">School</option>
          </Select>
          {renderEducationInputs()}
        </ModalBody>
        <ModalFooter gap={2}>
          <Button
            bg={"brand.lightBrown"}
            color={"brand.brown"}
            onClick={incrementCount}
          >
            ADD EDUCATION
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

export default EducationModal;
