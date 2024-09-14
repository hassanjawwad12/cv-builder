import { Button } from "@chakra-ui/react";

const ActionButton = ({ action, onClick }: any) => {
  const actionsMap: any = {
    copy: {
      label: "Copy",
      bgColor: "brand.lightGreen",
      color: "brand.green",
      hover: {
        bg: "brand.green",
        color: "brand.white",
      },
    },
    close: {
      label: "Close",
      bgColor: "brand.green",
      color: "brand.white",
      hover: {
        bgColor: "brand.lightGreen",
        color: "brand.green",
      },
    },
    remove: {
      label: "Remove",
      border: "1px solid grey",
    },
    delete: {
      label: "Delete",
      border: "1px solid grey",
    },
  };

  const actionProps = actionsMap[action];

  if (!actionProps) {
    console.error(`Unsupported action: ${action}`);
    return null;
  }

  return (
    <Button
      mr={3}
      bg={actionProps.bgColor}
      color={actionProps.color}
      _hover={actionProps.hover}
      colorScheme={actionProps.colorScheme}
      onClick={onClick}
    >
      {actionProps.label}
    </Button>
  );
};

export default ActionButton;
