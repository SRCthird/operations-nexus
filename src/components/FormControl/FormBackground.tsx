import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  editMode: boolean;
  background: string;
  setData: (value: any) => void;
  helperText?: string;
}
export const FormControlBackground = ({editMode, background, setData, helperText}: Props) => {
  return (
    <FormControl isDisabled={!editMode}>
      <FormLabel>Background</FormLabel>
      <Input value={background}
        onChange={(value) => {
          setData((prev: any) => ({ ...prev, Background: value.target.value }));
        }}
      />
      <FormHelperText>{helperText ?? "The background color of this page, using HTML colors"}</FormHelperText>
    </FormControl>
  )
}
