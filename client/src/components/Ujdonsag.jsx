import { Box } from "@chakra-ui/react";
import HoverBox from "./HoverBox";

const Ujdonsag = () => {
  return (
    <Box pt={10} display="flex" justifyContent="center" flexWrap="wrap" gap="5">
      <HoverBox text="4 Tojásos levestésztáink" image="/images/carousel/pastadry.png" link='/tesztaink/4-levestészta'/>
      <HoverBox text="8 Tojásos levestésztáink" image="/images/carousel/lebbencs3.png" link='/tesztaink/8-levestészta'/>
      <HoverBox text="4 Tojásos körettésztáink" image="/images/pastagpt3.png" link='/tesztaink/4-körettészta'/>
   
      {/* <HoverBox text="8 Tojásos körettésztáink" image="/images/pasta4.jpg" link='/tesztaink/8-körettészta'/> */}
    </Box>
  );
};

export default Ujdonsag;
