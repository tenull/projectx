import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaLongArrowAltUp } from "react-icons/fa";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        display: isVisible ? 'block' : 'none',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
      _hover={{ transform: 'scale(1.05)' }}
    >
      <FaLongArrowAltUp fontSize='20' />
    </Button>
  );
};

export default ScrollToTopButton;
