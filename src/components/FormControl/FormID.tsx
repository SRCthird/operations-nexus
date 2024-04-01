import { FormControl, FormLabel, Input } from "@chakra-ui/react"

export const FormControlID = ({id}:{id: number}) => {
  return (
      <FormControl isDisabled={true}>
        <FormLabel>ID</FormLabel>
        <Input value={id === 0 ? "" : id} />
      </FormControl>
  )
}
