import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  editMode: boolean;
  gradient?: string;
  setData: (value: any) => void;
  helperText?: string;
}

export const FormControlGradient = ({ editMode, gradient, setData, helperText }: Props) => {
  return (
    <FormControl isDisabled={!editMode}>
      <FormLabel>Gradient</FormLabel>
      <Input value={gradient ?? ""}
        onChange={(value) => {
          setData((prev: any) => ({ ...prev, Gradient: value.target.value }));
        }}
      />
      <FormHelperText>{helperText ?? "The gradient of this page."}</FormHelperText>
    </FormControl>

  )
}
