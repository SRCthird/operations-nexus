import { Button } from '@chakra-ui/react';
import '@styles/NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }
    return (
        <div className="NotFound">
            <h1 className="NotFound-Title">404</h1>
            <p>Oops! Something is wrong.</p>
            <Button className="button" onClick={handleClick}>
              <i className="icon-home"></i> 
              Go back home, is better there.
            </Button>
        </div>
    );
};

export default NotFound;
