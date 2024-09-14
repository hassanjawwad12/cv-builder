import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface ProgressBarProps {
  value: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, total }) => {
  let percentage: number = 0;

  if (value !== 0 || total !== 0) {
    percentage = (value / total) * 100;
  }

  return (
    <CircularProgress
      value={percentage}
      color="green.400"
      size="120px"
      thickness="8px"
    >
      <CircularProgressLabel>{`${percentage.toFixed(
        0
      )}%`}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default ProgressBar;
