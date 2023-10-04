import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useRef } from "react";
import { BsSearch } from 'react-icons/bs'

interface Props {
  /**
   * Pushes the searched text to app.tsx
   * 
   * @param searchText - The text input by a user
   * @returns {void} - Returns nothing 
   */
  onSearch: (searchText: string) => void;
}

/**
 * Search bar component for NavBar
 * 
 * @param {interface} Props - Properties of the Search Input component
 * @returns {JSX.Element} - Returns the Search Input component
 */
const SearchInput = ({ onSearch }:Props): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value)
    }}>
        <InputGroup>
            <InputLeftElement children={<BsSearch />}/>
            <Input ref={ref} borderRadius={20} placeholder='Search display...' variant='filled' />
        </InputGroup>
    </form>
  )
}

export default SearchInput