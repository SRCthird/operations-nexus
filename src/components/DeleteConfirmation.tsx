import {Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, ButtonGroup, Button,} from "@chakra-ui/react"
import { MouseEventHandler } from "react";

/**
 * Props for the DeleteConfirmation element
 * @param {MouseEventHandler<HTMLButtonElement>} onDelete - an arrow function that handles the delete button
 * @param {string} message - The message to be displayed in the popup
 * @param {boolean | undefined} isOpen - the variable of useDisclosure() that determines if the popup is open
 * @param {() => void} onClose - the arrow function that runs on close or the variable ofuseDisclosure() 
 * @param {MouseEventHandler<HTMLButtonElement} onToggle - the variable of useDisclosure() that toggles the popup
 */
interface Props {
  onDelete: MouseEventHandler<HTMLButtonElement>; 
  message: string;
  isOpen: boolean | undefined;
  onClose: () => void;
  onToggle: MouseEventHandler<HTMLButtonElement>;
}

/**
 * The DeleteConfirmation element displays a popup that confirms or deletes an item based on the onDelete method.
 * @param {interface} Props - the properties of the DeleteConfirmation element.
 * @returns {JSX.Element} - Returns the DeleteConfirmation element.  
 */
const DeleteConfirmation = ({ onDelete, message, isOpen, onClose, onToggle }: Props) => {
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button opacity={0}>Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {message}
        </PopoverBody>
        <PopoverFooter display='flex' justifyContent='flex-end'>
          <ButtonGroup size='sm'>
            <Button variant='outline' onClick={onToggle}>Cancel</Button>
            <Button colorScheme='red' onClick={onDelete}>Delete</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default DeleteConfirmation;
