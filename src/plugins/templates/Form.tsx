import NotFound from "@src/pages/NotFound";
import { FullDisplayForm } from "./FullDisplay";
import { FullDisplay2Form } from "./FullDisplay2";
import { FullWithCircleForm } from "./FullWithCircle";
import { OneByThreeForm } from "./OneByThree";
import { SplitScreenForm } from "./SplitScreen";
import { ThreeOnTwoForm } from "./ThreeOnTwo";
import { TwoByTwoForm } from "./TwoByTwo";
import { Templates } from "./types";

interface Props {
  data: any;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  submitPage: boolean;
  setSubmitPage: (submitPage: boolean) => void;
  setData: (data: any) => void;
  onChange: (data: any) => void;
}

export const TemplateForm = ({ data, editMode, setEditMode, submitPage, setSubmitPage, setData, onChange }: Props) => {
  if (data.Page === Templates.FullDisplay) {
    return (
      <FullDisplayForm
        pageID={data.Page_ID || 0}
        editMode={editMode}
        setEditMode={setEditMode}
        submit={submitPage}
        setSubmit={setSubmitPage}
        getPageID={(newID) => {
          setData({ ...data, Page_ID: newID });
          onChange({ ...data, Page_ID: newID });
        }}
        parentID={data.ID}
      />
    )
  } else if (data.Page === Templates.FullDisplay2) {
    return (
      <FullDisplay2Form
        pageID={data.Page_ID || 0}
        editMode={editMode}
        setEditMode={setEditMode}
        submit={submitPage}
        setSubmit={setSubmitPage}
        getPageID={(newID) => {
          setData({ ...data, Page_ID: newID });
          onChange({ ...data, Page_ID: newID });
        }}
        parentID={data.ID}
      />
    )
  } else if (data.Page === Templates.FullWithCircle) {
    return (
      <FullWithCircleForm
        pageID={data.Page_ID || 0}
        editMode={editMode}
        setEditMode={setEditMode}
        submit={submitPage}
        setSubmit={setSubmitPage}
        getPageID={(newID) => {
          setData({ ...data, Page_ID: newID });
          onChange({ ...data, Page_ID: newID });
        }}
        parentID={data.ID}
      />
    )
  } else if (data.Page === Templates.OneByThree) {
    return (
      <OneByThreeForm
        pageID={data.Page_ID || 0}
        editMode={editMode}
        setEditMode={setEditMode}
        submit={submitPage}
        setSubmit={setSubmitPage}
        getPageID={(newID) => {
          setData({ ...data, Page_ID: newID });
          onChange({ ...data, Page_ID: newID });
        }}
        parentID={data.ID}
      />
    )
  } else if (data.Page === Templates.SplitScreen) {
    return (
      <SplitScreenForm
        pageID={data.Page_ID || 0}
        editMode={editMode}
        setEditMode={setEditMode}
        submit={submitPage}
        setSubmit={setSubmitPage}
        getPageID={(newID) => {
          setData({ ...data, Page_ID: newID });
          onChange({ ...data, Page_ID: newID });
        }}
        parentID={data.ID}
      />
    )
  } else if (data.Page === Templates.ThreeOnTwo) {
    return (
      <ThreeOnTwoForm
        pageID={data.Page_ID || 0}
        editMode={editMode}
        setEditMode={setEditMode}
        submit={submitPage}
        setSubmit={setSubmitPage}
        getPageID={(newID) => {
          setData({ ...data, Page_ID: newID });
          onChange({ ...data, Page_ID: newID });
        }}
        parentID={data.ID}
      />
    )
  } else if (data.Page === Templates.TwoByTwo) {
    return (
      <TwoByTwoForm
        pageID={data.Page_ID || 0}
        editMode={editMode}
        setEditMode={setEditMode}
        submit={submitPage}
        setSubmit={setSubmitPage}
        getPageID={(newID) => {
          setData({ ...data, Page_ID: newID });
          onChange({ ...data, Page_ID: newID });
        }}
        parentID={data.ID}
      />
    )
  } else {
    return (
      <NotFound />
    )
  }
}
