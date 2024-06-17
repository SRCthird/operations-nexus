import NotFound from "@pages/NotFound";
import { Nexus_Display } from "@core/Display";
import BuildApp from "@apps";
import { Templates } from "@templates";
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
import Transition2x2_3on2 from "./components/Transition2x2_3on2";
import { useEffect, useState } from "react";
import api from "@src/utils/api";
import { isEqual } from 'lodash';

interface Props {
  token: string;
  slideShowKey: number;
  display: Nexus_Display
}

const BuildTemplate = ({ token, slideShowKey, display: _display }: Props) => {
  const [display, setDisplay] = useState<Nexus_Display>(_display);

  useEffect(() => {
    const watch = () => {
      api.get(`/display/${display.id}`)
        .then(response => {
          if (isEqual(response.data, display)) return;
          setDisplay(response.data);
        })
    }

    const intervalId = setInterval(() => {
      watch();
    }, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  switch (display.template?.design) {
    case Templates.FullDisplay:
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
      );
    case Templates.FullDisplay2:
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
      );
    case Templates.FullDisplay3:
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
    case Templates.FullDisplay4:
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
    case Templates.FullDisplay5:
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
    case Templates.FullWithCircle:
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
    case Templates.ThreeOnTwo:
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
    case Templates.OneByThree:
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
    case Templates.SplitScreen:
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
    case Templates.TwoByTwo:
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
    case Templates.Transition2x2_3on2:
      return (
        <Transition2x2_3on2
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
          app6={
            <BuildApp
              app={display.template.apps[5]}
              slideShowKey={slideShowKey}
            />
          }
          app7={
            <BuildApp
              app={display.template.apps[6]}
              slideShowKey={slideShowKey}
            />
          }
          app8={
            <BuildApp
              app={display.template.apps[7]}
              slideShowKey={slideShowKey}
            />
          }
          app9={
            <BuildApp
              app={display.template.apps[8]}
              slideShowKey={slideShowKey}
            />
          }
        />
      )
    default:
      return <NotFound />
  }
}

export default BuildTemplate 
