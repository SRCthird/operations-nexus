import { HStack, Image } from '@chakra-ui/react'
import Logo from '@src/assets/logo.png' // TODO: Change logo to one thats not depricated
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
    <HStack>
        <Image src={Logo} boxSize='80px' margin='10px' marginLeft='30px'/>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
    </HStack>
  )
}

export default NavBar
