import { Box } from "@chakra-ui/react";
import HoverBox from "./HoverBox";

const Ujdonsag = () => {
  return (
    <Box pt={10} display="flex" justifyContent="center" flexWrap="wrap" gap="5">
      <HoverBox text="4 Tojásos levestésztáink" image="/images/4tojasos.jpg" link='/tesztaink/4-levestészta'/>
      <HoverBox text="4 Tojásos körettésztáink" image="/images/8tojasos.jpg" link='/tesztaink/4-körettészta'/>
      <HoverBox text="8 Tojásos levestésztáink" image="/images/8tojasos.jpg" link='/tesztaink/8-levestészta'/>
      <HoverBox text="8 Tojásos körettésztáink" image="/images/8tojasos.jpg" link='/tesztaink/8-körettészta'/>
    </Box>
  );
};

export default Ujdonsag;
