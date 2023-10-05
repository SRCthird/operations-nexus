import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react'

/**
 * The outline of a display card shown while the webhook is loading.
 * 
 * @returns {JSX.Element} - Returns the SkeletonCard component.
 */
const SkeletonCard = (): JSX.Element => {
  return (
    <Card>
        <Skeleton borderRadius={10} height={270}/>
        <CardBody>
            <SkeletonText />
        </CardBody>
    </Card>
  )
}

export default SkeletonCard