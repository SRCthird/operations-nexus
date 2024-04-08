import { FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { Nexus_Department } from "@core/Department";

interface Props {
  editMode: boolean;
  isLoading: boolean;
  department: string;
  departments: Nexus_Department[];
  setData: (value: any) => void;
  helperText?: string;
}

export const FormControlDepartment = ({ editMode, isLoading, department, departments, setData, helperText }: Props) => {
  return (
    <FormControl isDisabled={!editMode}>
      <FormLabel>Department</FormLabel>
      <Select value={department}
        onChange={(value) => {
          setData((prev: any) => ({ ...prev, Department: value.target.value }));
        }}
      >
        {isLoading? 
          <option value={department}>{department}</option>:
          departments.map(department => (
            <option key={department.ID} value={department.Department}>{department.Department}</option>
          ))
        }
      </Select>
      <FormHelperText>{helperText || "The name of where the Slides were uploaded."}</FormHelperText>
    </FormControl>
  );
};

