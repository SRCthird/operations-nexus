import { List } from "@chakra-ui/react";
import { Template } from "../types";
import { useTemplates } from "../useTemplates";
import TemplateItem from "./TemplateItem";
import { useEffect, useState } from "react";

type Props = {
  searchText: string;
  selected: string;
  onSelect: (template: Template) => void;
}

const TemplateList = ({ searchText, selected, onSelect }: Props) => {
  const { templates, isPageLoading } = useTemplates({});
  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  useEffect(() => {
    if (searchText === '') {
      setFilteredTemplates(templates);
      return;
    }
    const filtered = templates.filter((template) => {
      return template.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredTemplates(filtered);
    // eslint-disable-next-line
  }, [searchText, templates]);

  return (
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        paddingTop: "10",
        borderRadius: "5px",
        marginLeft: "-10px",
        paddingRight: "15px",
      }}
    >
      {isPageLoading && <div>Loading...</div>}
      {filteredTemplates.map((template) => (
        <TemplateItem 
          key={template.id} 
          selected={selected}
          select={onSelect}
          template={template} 
        />
      ))}
    </List>
  );
}

export default TemplateList;
