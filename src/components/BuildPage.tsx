import NotFound from "@pages/NotFound";
import ThreeOnTwo from "@templates/ThreeOnTwo";
import { Displays } from "@hooks/useDisplays";
import usePages, { Pages } from "@hooks/usePages";
import { emptyThreeOnTwoPage, ThreeOnTwoPage } from "@components/admin/templates/ThreeOnTwoForm";
import { emptyFullDisplayPage, FullDisplayPage } from "./admin/templates/FullDisplayForm";
import BuildApp from "@components/BuildApp";
import FullDisplay from "@src/templates/FullDisplay";
import { emptyFullWithCirclePage, FullWithCirclePage } from "./admin/templates/FullWithCircleForm";
import FullWithCircle from "@src/templates/FullWithCircle";
import OneByThree from "@src/templates/OneByThree";
import { emptyOneByThreePage, OneByThreePage } from "./admin/templates/OneByThreeForm";
import { emptySplitScreenPage, SplitScreenPage } from "./admin/templates/SplitScreenForm";
import SplitScreen from "@src/templates/SplitScreen";
import { emptyTwoByTwoPage, TwoByTwoPage } from "./admin/templates/TwoByTwoForm";
import TwoByTwo from "@src/templates/TwoByTwo";

interface Props {
  token: string;
  slideShowKey: number;
  display: Displays
}

const BuildPage = ({ token, slideShowKey, display }: Props) => {
  const { pages } = usePages({
    page: display.Page,
    ids: [display.Page_ID || 0]
  })

  if (display.Page === Pages.FullDisplay) {
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
  } else if (display.Page === Pages.FullWithCircle) {
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

  } else if (display.Page === Pages.OneByThree) {
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
  } else if (display.Page === Pages.SplitScreen) {
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
  } else if (display.Page === Pages.ThreeOnTwo) {
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
  } else if (display.Page === Pages.TwoByTwo) {
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

export default BuildPage
