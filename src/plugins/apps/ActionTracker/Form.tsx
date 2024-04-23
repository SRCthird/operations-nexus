import { Box } from "@chakra-ui/react";
import FormControl from "@components/FormControl";
import { Nexus_Department } from "@src/plugins/core/Department";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id?: number;
  editMode: boolean;
  loading: boolean;
  departments: Nexus_Department[];
  department: string;
  area: string;
  setData: Dispatch<SetStateAction<Nexus_Department>>;
}

export const ActionTrackerForm = ({ id, editMode, loading, department, departments, area, setData }: Props) => {

  return (
    <Box>
      <FormControl.ID id={id || 0} />
      <FormControl.Department
        editMode={editMode}
        isLoading={loading}
        department={department}
        departments={departments}
        setData={setData}
      />
      <FormControl.Area
        editMode={editMode}
        area={area || ""}
        setData={setData}
        helperText="The area of the action tracker. (Optional)"
      />
    </Box>
  );
}
