import { Image, SimpleGrid } from '@chakra-ui/react'
import ColorModeSwitch from '@components/ColorModeSwitch'
import SearchInput from '@components/SearchInput'

interface Props {
  /**
   * Pushes the searched text to app.tsx
   * 
   * @param searchText - The text input from SearchInput
   * @returns {void} - Returns nothing 
   */
  onSearch: (searchText: string) => void;
}

/**
 * NavBar containing the logo, search bar and color-mode toggle.
 * 
 * @param {interface} Props - Properties of the Nav Bar component
 * @returns {JSX.Element} - Returns the Nav Bar component
 */
const NavBar = ({ onSearch }:Props): JSX.Element => {
  return (
    <SimpleGrid templateColumns={'192px 1fr 192px'} alignItems='center'>
        <Image src='/logo192.png' boxSize='80px' margin='10px' marginLeft='30px'/>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
    </SimpleGrid>
  )
}

export default NavBar
