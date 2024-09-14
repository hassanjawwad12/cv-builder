import React from "react";
import { TemplateButton } from "../TemplateButton";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { TemplateInput } from "../TemplateInput";
import { ErrorMessage, Field } from "formik";
import { CertificationModal } from "../../modals/CertificationModal";
import add from "../../../assets/images/add.png";

export const CertificateInputGroup: React.FC = () => {
  const [CertificateCount, setCertificateCount] = React.useState<number>(2);
  const {
    isOpen: isCertificationModalOpen,
    onOpen: onOpenCertificationModal,
    onClose: onCloseCertificationModal,
  } = useDisclosure();
  return (
    <>
      <Stack alignItems="left" mb={2}>
        <Text fontWeight={800} fontSize={"24px"} color={"rgba(38, 39, 37, 1)"}>
          Certification
        </Text>
      </Stack>
      <TemplateInput
        name="certification-name-1"
        placeholder="Certification Name"
        type="text"
      />
      <Box mb={3}>
        <Field name="certification-link-1">
          {({ field }: { field: any }) => (
            <div>
              <InputGroup size="md" mb={3} color={"rgba(253, 253, 253, 0.39)"}>
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
                <ErrorMessage name="certification-link-1" component="div" />
              </Box>
            </div>
          )}
        </Field>
      </Box>
      <CertificationModal
        isOpen={isCertificationModalOpen}
        onClose={onCloseCertificationModal}
        CertificateCount={CertificateCount}
        setCertificateCount={setCertificateCount}
      />
      {CertificateCount > 2 && (
        <Stack align={"center"}>
          <Text color={"rgba(0, 0, 0, 0.4)"} fontWeight={600} fontSize={"14px"}>
            {CertificateCount - 1} Certification added
          </Text>
        </Stack>
      )}
      <TemplateButton
        name="ADD ANOTHER CERTIFICATE"
        bg="brand.lightBrown"
        hover_bg="brand.brown"
        color={"brand.brown"}
        hover_color="brand.white"
        onClick={onOpenCertificationModal}
      />
    </>
  );
};
