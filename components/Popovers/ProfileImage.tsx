import React, { useState } from "react";
import {
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Image,
  Box,
  Stack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { supabaseClient } from "../../config/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/store";

const ProfileImage: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<File>();
  const [image, setImage] = useState<any>();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;
    const tempimgage = URL.createObjectURL(imageFile);
    setImage(tempimgage);
    setImageUrl(imageFile);

    console.log("imageFile", tempimgage);
  };
  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleSubmit = async () => {
    try {
      if (!imageUrl) {
        toast({
          title: "Please select an image",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      setLoading(true);
      const user = await supabaseClient.auth.getSession();
      const uuid = user?.data?.session?.user?.id;
      if (uuid && imageUrl) {
        const bucket = "avatar";
        const fileName = imageUrl.name;
        const { error } = await supabaseClient.storage
          .from(bucket)
          .upload(fileName, imageUrl, { upsert: true });
        if (error) {
          console.error("Upload error:", error);
        } else {
          const { data } = await supabaseClient.storage
            .from(bucket)
            .getPublicUrl(fileName);
          if (data?.publicUrl) {

            const { data: userUploaded } = await supabaseClient
              .auth
              .updateUser({
                data: { avatar_url: data?.publicUrl }
              });
            console.log("userUploaded", userUploaded);
            dispatch(setUser(userUploaded?.user));

            if (userUploaded) {
              toast({
                title: "Profile image updated successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              setLoading(false);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <PopoverContent p={5}>
      <PopoverArrow />
      <PopoverCloseButton />
      <input
        title="fileInput"
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        accept=".png, .jpg, .jpeg, .pdf"
      />
      <Stack justify={"center"} align={"center"}>
        <Image
          src={image ? image : "person.png"}
          alt="Logo"
          width="20"
          height="20"
          display={["none", "block"]}
          zIndex={1}
          position="relative"
          borderRadius={12}
          onClick={handleButtonClick}
          border={imageUrl ? "1px solid gray" : "none"}
        />
      </Stack>
      <PopoverBody>
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <Button
            bg="brand.green"
            color="white"
            _hover={{ bg: "brand.lightGreen", color: "brand.green" }}
            onClick={handleSubmit}
          >
            {loading ? <Spinner /> : " Upload"}
          </Button>
        </Box>
      </PopoverBody>
    </PopoverContent>
  );
};

export default ProfileImage;
