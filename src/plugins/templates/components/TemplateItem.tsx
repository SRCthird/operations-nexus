import { Box, Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import { Template } from "../types";

type Props = {
  selected: string;
  select: (template: Template) => void;
  template: Template;
}
const TemplateItem = ({ selected, select, template }: Props) => {
  return (
    <Card
      onClick={() => select(template)}
      style={{
        cursor: "pointer",
        color: "black",
        backgroundColor: selected === template.title ? "#0077b6" : "#8d99ae",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <CardHeader style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px solid black"
      }}>{template.title}</CardHeader>
      <CardBody style={{
        display: "flex",
        flexDirection: "row",
      }}>
        <Text>{template.design}</Text>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto"
          }}
        >
          <Text>{template.apps.length}</Text>
          <Text>Apps</Text>
        </Box>
      </CardBody>
    </Card>
  );
}

export default TemplateItem;
