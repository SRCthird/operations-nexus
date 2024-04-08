import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  editMode: boolean;
  area: string;
  setData: (value: any) => void;
  helperText?: string;
}
export const FormControlArea = ({editMode, area, setData, helperText}: Props) => {
  return (
    <FormControl isDisabled={!editMode}>
      <FormLabel>Area</FormLabel>
      <Input value={area}
        onChange={(value) => {
          setData((prev: any) => ({ ...prev, Area: value.target.value }));
        }}
      />
      <FormHelperText>{helperText ?? "The area of the department."}</FormHelperText>
    </FormControl>
  )
}
