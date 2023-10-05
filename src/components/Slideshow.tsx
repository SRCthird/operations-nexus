import { useEffect, useState} from 'react';
import useMainSlides from '../webhooks/useMainSlides';
import useDelay from '../webhooks/useDelay';
import useSecondarySlides from '../webhooks/useSecondarySlides';

interface Props {
  location?: 'SSC' | 'Encapsulation'
}

const Slideshow = ({location}:Props) => {
  const { mainSlides, slideError } = useMainSlides();
  const { secondarySlides, secondarySlideError } = useSecondarySlides({ location: location });
  console.log(secondarySlideError);
  const { delay, delayError } = useDelay();
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const slides = [...mainSlides, ...secondarySlides];
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

    console.log({slideError, delayError});
    return (
      <div id="slideshow-container">
        {slides.map((imageUrl, index) => (
          <img
            key={index}
            className="slide"
            src={`/static/${imageUrl}`}
            style={{ display: index === slideIndex ? 'block' : 'none' }}
            alt={`Slide ${index}`}
          />
        ))}
      </div>
    );
};

export default Slideshow;
