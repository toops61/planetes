import { useEffect, useRef, useState } from "react";
import PlanetsSection from "./components/PlanetsSection";
import Arrow from "./components/Arrow";
import logoNasa from "./assets/logo_nasa.webp";

function App() {
  const [nextAppears, setNextAppears] = useState(false);
  const [tresholdsArray, setTresholdsArray] = useState<number[]>([]);
  

  const introRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  const planetsRef = useRef<HTMLDivElement[]>([]);

  const fillTresholds = () => {
    const tempArray : number[] = [];
    for (let i = 0; i < 100; i++) {
      tempArray.push(i/100);
    }
    setTresholdsArray(tempArray);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.map(entry => {
        switch (entry.target) {
          case introRef.current:            
            if (entry.intersectionRatio > .5) {
              introRef.current?.children[0].classList.add('appears');
            }
            if (entry.intersectionRatio > .8) {
              introRef.current?.children[1].classList.add('appears');
              observer.unobserve(entry.target);
            }
            break;
          default:
            break;
        }
        planetsRef.current.map(planetDiv => {
          if (entry.target === planetDiv) {
            
            const textContent = planetDiv.children[1].children[0] as HTMLDivElement;
            const textBefore = textContent.children[0] as HTMLParagraphElement;
            const textAfter = textContent.children[1] as HTMLParagraphElement;

            const imageContent = planetDiv.children[1].children[1];
            const imageBefore = imageContent.children[0] as HTMLImageElement;
            const imageAfter = imageContent.children[1] as HTMLImageElement;

            textContent.style.height = (textBefore.offsetHeight > textAfter.offsetHeight) ? (textBefore.offsetHeight + 'px') : (textAfter.offsetHeight + 'px');            

            entry.intersectionRatio > .4 ? planetDiv.classList.add('appears') : planetDiv.classList.remove('appears');

            if (window.scrollY < planetDiv.offsetTop) {
              entry.intersectionRatio > .8 ? textContent.classList.add('appears') : textContent.classList.remove('appears');
  
              if (entry.intersectionRatio > .5) {
                imageBefore.style.opacity = (1 - (entry.intersectionRatio - .5)*2).toString();
                imageAfter.style.opacity = ((entry.intersectionRatio - .5)*2).toString();
              } else {
                imageBefore.style.opacity = '1';
                imageAfter.style.opacity = '0';
              }
            } else {
              textContent.classList.add('appears');
              imageBefore.style.opacity = '0';
              imageAfter.style.opacity = '1';
            }
          }
        })
      })
    },{
      threshold:tresholdsArray
    }
  );

  useEffect(() => {
    if (planetsRef.current) {
      planetsRef.current.forEach(e => observer.observe(e));
    } 
    
  }, [nextAppears])
  
  useEffect(() => {
    if (nextAppears) {
      introRef.current && observer.observe(introRef.current);
    }
  }, [nextAppears])

  useEffect(() => {
    fillTresholds();
    setTimeout(() => {
      setNextAppears(true);
    }, 3000);

    const windowScroll = () => {
      window.scrollY > 500 ? arrowRef.current?.classList.add('appears') : arrowRef.current?.classList.remove('appears');      
    } 

    window.addEventListener('scroll', windowScroll);

    return () => {
    window.removeEventListener('scroll', windowScroll);
    }

  }, [])
  
  return (
    <main className="App">
      <section className="title-container">
        <h1>Hier ...</h1>
        <p>... Aujourd'hui</p>
      </section>
      {
        nextAppears ? 
        <>
          <section className="introduction-container" ref={introRef}>
            <article className="first">
              Le Big Bang s'est déroulé il y a maintenant 13,8 milliards d'années. Les planètes du système solaire se sont formées puis ont évolué.<br/>Certaines ont très peu changé depuis des millions d'années comme Uranus ou Neptune mais d'autres sont radicalement différentes, et ce, à cause de l'interaction avec les autres planètes, leur proximité avec le soleil, leur atmosphère ou encore à des cataclysmes survenus il y a plus ou moins longtemps.
            </article>
            <article className="second">
              Les anneaux de Saturne ont été formés, des satellites ont été créés ou, au contraire, désintégrés, ont fusionné; des océans sont apparus, ont disparu.<br/>
              La Terre évolue aussi et cette évolution s'accélère et est perturbée par la présence et l'activité de l'Homme. Nous le constatons de plus en plus et le dérèglement climatique devient critique.<br />Pourtant, d'autres planètes ont aussi connu un changement rendant parfois leur températures et conditions extrêmes à l'image de Vénus.
            </article>
          </section>
          <div className="arrow-down"></div>
          <PlanetsSection ref={planetsRef} />
          <footer>
            <div className="source">
              <p>Source des images : </p>
              <a href="https://www.nasa.gov/" target="_blank" rel="noreferrer">Nasa 
                <div className="logo">
                  <img src={logoNasa} alt="Nasa" />
                </div>
              </a>
            </div>
            <div className="code">
              <a href="https://github.com/toops61/planetes" target="_blank" rel="noreferrer" >
                <p>Code source</p>
              </a>
            </div>
          </footer>
        </> : 
        <></>
      }
      <Arrow ref={arrowRef} />
    </main>
  )
}

export default App;
