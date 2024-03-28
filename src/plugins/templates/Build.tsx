import NotFound from "@pages/NotFound";
import { Displays } from "@hooks/useDisplays";
import BuildApp from "@apps";
import { useTemplates, Templates } from "@templates";
import FullDisplay, { FullDisplayPage, emptyFullDisplayPage } from "@templates/FullDisplay";
import FullDisplay2, { emptyFullDisplay2Page, FullDisplay2Page } from "@templates/FullDisplay2";
import FullDisplay3, { emptyFullDisplay3Page, FullDisplay3Page } from "@templates/FullDisplay3";
import FullDisplay4, { emptyFullDisplay4Page, FullDisplay4Page } from "@templates/FullDisplay4";
import FullDisplay5, { emptyFullDisplay5Page, FullDisplay5Page } from "@templates/FullDisplay5";
import FullWithCircle, { FullWithCirclePage, emptyFullWithCirclePage } from "@templates/FullWithCircle";
import OneByThree, { OneByThreePage, emptyOneByThreePage } from "@templates/OneByThree";
import SplitScreen, { SplitScreenPage, emptySplitScreenPage } from "@templates/SplitScreen";
import ThreeOnTwo, { ThreeOnTwoPage, emptyThreeOnTwoPage } from "@templates/ThreeOnTwo";
import TwoByTwo, { TwoByTwoPage, emptyTwoByTwoPage } from "@templates/TwoByTwo";

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
    const page: FullDisplayPage = pages[0] || emptyFullDisplayPage;
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
    const page: FullDisplay2Page = pages[0] || emptyFullDisplay2Page;
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
    const page: FullDisplay3Page = pages[0] || emptyFullDisplay3Page;
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
    const page: FullDisplay4Page = pages[0] || emptyFullDisplay4Page;
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
    const page: FullDisplay5Page = pages[0] || emptyFullDisplay5Page;
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
    const page: FullWithCirclePage = pages[0] || emptyFullWithCirclePage;
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
    const page: OneByThreePage = pages[0] || emptyOneByThreePage;
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
    const page: SplitScreenPage = pages[0] || emptySplitScreenPage;
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
    const page: ThreeOnTwoPage = pages[0] || emptyThreeOnTwoPage;
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
    const page: TwoByTwoPage = pages[0] || emptyTwoByTwoPage;
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
