import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

interface Props {
  editMode: boolean;
  title: string;
  setData: (value: any) => void;
  helperText?: string;
}

export const FormControlTitle = ({ editMode, title, setData, helperText }: Props) => {
  return (
    <FormControl isDisabled={!editMode}>
      <FormLabel>Title</FormLabel>
      <Input
        value={title}
        onChange={(event) => {
          setData((prev: any) => ({ ...prev, title: event.target.value }));
        }}
      />
      <FormHelperText>{helperText ?? "The title of this page."}</FormHelperText>
    </FormControl>
  );
};

