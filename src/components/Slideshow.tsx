import { useEffect, useState} from 'react';
import useMainSlides from '../webhooks/useMainSlides';
import useDelay from '../webhooks/useDelay';
import useSecondarySlides from '../webhooks/useSecondarySlides';
import '../styles/Slideshow.css';

/**
 * Properties for the Slideshow component.
 * 
 * @param {boolean} includeMainSlides - Whether or not to include the main slides.
 * @param {'SSC' | 'Encapsulation'} locations - Location of the folder in the backend.
 */
interface Props {
  main: boolean;
  location?: string;
}

/**
 * The Slideshow component for displaying flow downs and other information
 * 
 * @param {object} Props - Properties for the Slideshow component. 
 * @returns {JSX.Element} - Returns the Slideshow component.
 */
const Slideshow = ({main, location}:Props): JSX.Element => {
  const { mainSlides, slideError } = useMainSlides();
  const { secondarySlides, secondarySlideError } = useSecondarySlides({ location: location });
  const { delay, delayError } = useDelay();
  const [slideIndex, setSlideIndex] = useState<number>(0);
  if (secondarySlideError) console.log(secondarySlideError);

  // If includeMain is true, then the main slides will be appeded
  const slides = main
    ? [...mainSlides, ...secondarySlides] 
    : secondarySlides;

  useEffect(() => {
    const showNextSlide = () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const interval = setInterval(() => {
      if (slideIndex === slides.length - 1) {
        setSlideIndex(0);
      } else {
        showNextSlide();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [slideIndex, slides.length, delay]);

  if (slideError ?? delayError) console.log({slideError, delayError});
  
  return (
    <div id="slideshow-container">
      {slides.map((imageUrl, index) => (
        <img
          key={index}
          className="slide"
          src={`/api/static/${imageUrl}`}
          style={{ display: index === slideIndex ? 'block' : 'none' }}
          alt={`Slide ${index}`}
        />
      ))}
    </div>
  );
};

export default Slideshow;
