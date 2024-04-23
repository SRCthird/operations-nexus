import NotFound from "@pages/NotFound";
import { Nexus_Display } from "@core/Display";
import BuildApp from "@apps";
import {  Templates } from "@templates";
import FullDisplay from "@templates/components/FullDisplay";
import FullDisplay2 from "@templates/components/FullDisplay2";
import FullDisplay3 from "@templates/components/FullDisplay3";
import FullDisplay4 from "@templates/components/FullDisplay4";
import FullDisplay5 from "@templates/components/FullDisplay5";
import FullWithCircle from "@templates/components/FullWithCircle";
import OneByThree from "@templates/components/OneByThree";
import SplitScreen from "@templates/components/SplitScreen";
import ThreeOnTwo from "@templates/components/ThreeOnTwo";
import TwoByTwo from "@templates/components/TwoByTwo";

interface Props {
  token: string;
  slideShowKey: number;
  display:Nexus_Display 
}

const BuildTemplate = ({ token, slideShowKey, display }: Props) => {

  if (display.template?.design === Templates.FullDisplay) {
    return (
      <FullDisplay
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        app={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.FullDisplay2) {
    return (
      <FullDisplay2
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        transition={display.template.transition || 30}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.FullDisplay3) {
    return (
      <FullDisplay3
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        transition={display.template.transition || 30}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            app={display.template.apps[2]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.FullDisplay4) {
    return (
      <FullDisplay4
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        transition={display.template.transition || 30}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            app={display.template.apps[2]}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            app={display.template.apps[3]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.FullDisplay5) {
    return (
      <FullDisplay5
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        transition={display.template.transition || 30}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            app={display.template.apps[2]}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            app={display.template.apps[3]}
            slideShowKey={slideShowKey}
          />
        }
        app5={
          <BuildApp
            app={display.template.apps[4]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.FullWithCircle) {
    return (
      <FullWithCircle
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )

  } else if (display.template?.design === Templates.OneByThree) {
    return (
      <OneByThree
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            app={display.template.apps[2]}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            app={display.template.apps[3]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.SplitScreen) {
    return (
      <SplitScreen
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.ThreeOnTwo) {
    return (
      <ThreeOnTwo
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            app={display.template.apps[2]}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            app={display.template.apps[3]}
            slideShowKey={slideShowKey}
          />
        }
        app5={
          <BuildApp
            app={display.template.apps[4]}
            slideShowKey={slideShowKey}
          />
        }
      />
    )
  } else if (display.template?.design === Templates.TwoByTwo) {
    return (
      <TwoByTwo
        title={display.template.title}
        backgroundColor={display.template.background}
        backgroundGradient={display.template.gradient}
        app1={
          <BuildApp
            app={display.template.apps[0]}
            slideShowKey={slideShowKey}
          />
        }
        app2={
          <BuildApp
            app={display.template.apps[1]}
            slideShowKey={slideShowKey}
          />
        }
        app3={
          <BuildApp
            app={display.template.apps[2]}
            slideShowKey={slideShowKey}
          />
        }
        app4={
          <BuildApp
            app={display.template.apps[3]}
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
