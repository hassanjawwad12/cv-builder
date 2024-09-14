// PopoverComponent.tsx
import React from 'react';
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
} from '@chakra-ui/react';
import { FaRegEdit } from "react-icons/fa";


const Delete: React.FC = () => {
  return (

    <Popover isLazy>
      <PopoverTrigger>
      <Button>  <FaRegEdit  /> </Button>
      </PopoverTrigger>
      <Portal>
      <PopoverContent p={6} gap={2}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Are you sure you want to delete your account ❔  </PopoverHeader>
        <PopoverBody>
        <Button bg='brand.green' mt={4}>Yes!</Button>
            </PopoverBody>
      </PopoverContent>
         </Portal>
       </Popover>
  );
};

export default Delete;

