import NotFound from "@pages/NotFound";
import ThreeOnTwo from "@templates/ThreeOnTwo";
import { Displays } from "@hooks/useDisplays";
import usePages from "@hooks/usePages";
import { emptyThreeOnTwoPage, ThreeOnTwoPage } from "@components/admin/ThreeOnTwoForm";
import BuildApp from "@components/BuildApp";

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

  if (display.Page === "ThreeOnTwo") {
    const page: ThreeOnTwoPage = pages[0] || emptyThreeOnTwoPage;
    return (
      <ThreeOnTwo
        title={page.Title}
        backgroundColor={page.Background}
        backgroundGradient={page.Gradient}
        data1={
          <BuildApp
            type={page.App1} 
            id={page.App1_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        data2={
          <BuildApp
            type={page.App2} 
            id={page.App2_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        data3={
          <BuildApp
            type={page.App3} 
            id={page.App3_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        data4={
          <BuildApp
            type={page.App4} 
            id={page.App4_ID || 0}
            slideShowKey={slideShowKey}
          />
        }
        information={
          <BuildApp
            type={page.App5} 
            id={page.App5_ID || 0}
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
