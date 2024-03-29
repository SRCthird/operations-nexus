import NotFound from "@pages/NotFound";
import { Displays } from "@hooks/useDisplays";
import BuildApp from "@apps";
import { useTemplates, Templates } from "@templates";
import FullDisplay, { emptyFullDisplay, Template_FullDisplay } from "@templates/FullDisplay";
import FullDisplay2, { emptyFullDisplay2, Template_FullDisplay2 } from "@templates/FullDisplay2";
import FullDisplay3, { emptyFullDisplay3, Template_FullDisplay3 } from "@templates/FullDisplay3";
import FullDisplay4, { emptyFullDisplay4, Template_FullDisplay4 } from "@templates/FullDisplay4";
import FullDisplay5, { emptyFullDisplay5, Template_FullDisplay5 } from "@templates/FullDisplay5";
import FullWithCircle, { emptyFullWithCircle, Template_FullWithCircle } from "@templates/FullWithCircle";
import OneByThree, { emptyOneByThree, Template_OneByThree } from "@templates/OneByThree";
import SplitScreen, { emptySplitScreen, Template_SplitScreen } from "@templates/SplitScreen";
import ThreeOnTwo, { emptyThreeOnTwo, Template_ThreeOnTwo } from "@templates/ThreeOnTwo";
import TwoByTwo, { emptyTwoByTwo, Template_TwoByTwo } from "@templates/TwoByTwo";

interface Props {
  token: string;
  slideShowKey: number;
  display: Displays
}

const BuildTemplate = ({ token, slideShowKey, display }: Props) => {
  const { pages } = useTemplates({
    page: display.Page,
    ids: [display.Page_ID || 0]
  })

  if (display.Page === Templates.FullDisplay) {
    const page: Template_FullDisplay = pages[0] || emptyFullDisplay;
    return (
      <FullDisplay
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        app={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.FullDisplay2) {
    const page: Template_FullDisplay2 = pages[0] || emptyFullDisplay2;
    return (
      <FullDisplay2
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        transition={page.Transition}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.FullDisplay3) {
    const page: Template_FullDisplay3 = pages[0] || emptyFullDisplay3;
    return (
      <FullDisplay3
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        transition={page.Transition}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            type={page.App3}
            id={page.App3_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.FullDisplay4) {
    const page: Template_FullDisplay4 = pages[0] || emptyFullDisplay4;
    return (
      <FullDisplay4
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        transition={page.Transition}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            type={page.App3}
            id={page.App3_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            type={page.App4}
            id={page.App4_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.FullDisplay5) {
    const page: Template_FullDisplay5 = pages[0] || emptyFullDisplay5;
    return (
      <FullDisplay5
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        transition={page.Transition}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            type={page.App3}
            id={page.App3_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            type={page.App4}
            id={page.App4_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app5={
          <BuildApp
            type={page.App5}
            id={page.App5_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.FullWithCircle) {
    const page: Template_FullWithCircle = pages[0] || emptyFullWithCircle;
    return (
      <FullWithCircle
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )

  } else if (display.Page === Templates.OneByThree) {
    const page: Template_OneByThree = pages[0] || emptyOneByThree;
    return (
      <OneByThree
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            type={page.App3}
            id={page.App3_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            type={page.App4}
            id={page.App4_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.SplitScreen) {
    const page: Template_SplitScreen = pages[0] || emptySplitScreen;
    return (
      <SplitScreen
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.ThreeOnTwo) {
    const page: Template_ThreeOnTwo = pages[0] || emptyThreeOnTwo;
    return (
      <ThreeOnTwo
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            type={page.App3}
            id={page.App3_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            type={page.App4}
            id={page.App4_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app5={
          <BuildApp
            type={page.App5}
            id={page.App5_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.Page === Templates.TwoByTwo) {
    const page: Template_TwoByTwo = pages[0] || emptyTwoByTwo;
    return (
      <TwoByTwo
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        app1={
          <BuildApp
            type={page.App1}
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            type={page.App2}
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            type={page.App3}
            id={page.App3_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            type={page.App4}
            id={page.App4_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  }
  return (
    <NotFound />
  )
}

export default BuildTemplate 
