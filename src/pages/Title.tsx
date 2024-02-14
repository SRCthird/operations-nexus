import { Grid, GridItem, Text } from '@chakra-ui/react';

interface Props {
    title: string;
}

const Title = ({ title }: Props): JSX.Element => {
    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} marginBottom={6} >
            <GridItem className="Empty" w="100%" h="10vh" />
            <GridItem className="Title" w="100%" h="10vh">
                <Text className='text-center my-3 title' fontSize={44}>{title}</Text>
            </GridItem>
            <GridItem className="Empty" w="100%" h="10vh" />
        </Grid>
    )
}

export default Title
