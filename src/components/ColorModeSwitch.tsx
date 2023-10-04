import {HStack, Switch, Text, useColorMode} from '@chakra-ui/react'

/**
 * Toggle for dark/light mode using Chakra UI.
 * 
 * @returns {JSX.Element} - Returns the Color Switch component
 */
const ColorModeSwitch = (): JSX.Element => {
    const {toggleColorMode, colorMode} = useColorMode();
    return (
        <HStack padding='10px'>
            <Switch colorScheme='blue' isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
            <Text whiteSpace='nowrap'>Dark Mode</Text>
        </HStack>
    )
}

export default ColorModeSwitch;