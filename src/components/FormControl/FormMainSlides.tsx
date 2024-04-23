import { FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";

interface Props {
  editMode: boolean;
  main: string;
  setData: (value: any) => void;
  helperText?: string;
}

export const FormControlMainSlides = ({ editMode, main, setData, helperText }: Props) => {
  return (
    <FormControl isDisabled={!editMode}>
      <FormLabel>Type</FormLabel>
      <Select
        value={main ? "true" : "false"}
        onChange={(event) => {
          setData((prev: any) => ({ ...prev, main: event.target.value === "true" }));
        }}
      >
        <option value={"true"}>true</option>
        <option value={"false"}>false</option>
      </Select>
      <FormHelperText>{helperText || "Do you want the main slides to show on this page?"}</FormHelperText>
    </FormControl>
  );
};

