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
  Portal,
  Box,
  Text,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";

interface PopoverComponentProps {
  onSubmit: (value: string) => void;
}

const Password: React.FC<PopoverComponentProps> = ({ onSubmit }) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email");
    } else {
      setError("");
      onSubmit(value);
      setValue("");
    }
  };
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button>
          <FaRegEdit />
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverContent p={6} gap={2}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Enter Email to Change Password</PopoverHeader>
          <PopoverBody>
            <Input
              placeholder="Email Address"
              type="email"
              value={value}
              onChange={handleChange}
              isInvalid={!!error}
            />
            {error && <Text color="red.500">{error}</Text>}
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
                Submit
              </Button>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Password;
