// PopoverComponent.tsx
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Input,
  Portal,
  Box,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";

interface PopoverComponentProps {
  heading: string;
  content: string;
  onSubmit: (value: string) => void;
}

const PopoverComponent: React.FC<PopoverComponentProps> = ({
  heading,
  content,
  onSubmit,
}) => {
  const [value, setValue] = useState<string>("");
  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button>
          <FaRegEdit />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{heading}</PopoverHeader>
          <PopoverBody>
            <Input
              placeholder={content}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
            >
              <Button
                bg="brand.green"
                color="white"
                _hover={{ bg: "brand.lightGreen", color: "brand.green" }}
                onClick={handleSubmit}
              >
                Edit
              </Button>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default PopoverComponent;
