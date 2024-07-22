import { useState, useEffect } from 'react';
import ScrollToTopIcon from './ScrolltoTopIcon';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#1d4ed8',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          padding: '10px',
          cursor: 'pointer',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <ScrollToTopIcon />
      </button>
    )
  );
};

export default ScrollToTopButton;
