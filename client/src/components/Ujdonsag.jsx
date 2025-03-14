import { Box } from "@chakra-ui/react";
import HoverBox from "./HoverBox";

const Ujdonsag = () => {
  return (
    <Box pt={10} display="flex" justifyContent="center" flexWrap="wrap" gap="5">
      <HoverBox text="4 Tojásos tésztáink" />
      <HoverBox text="8 Tojásos tésztáink" />
    </Box>
  );
};

export default Ujdonsag;
