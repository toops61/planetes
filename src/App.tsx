import { useEffect, useRef, useState } from "react";
import PlanetsSection from "./components/PlanetsSection";
import Arrow from "./components/Arrow";

function App() {
  const [nextAppears, setNextAppears] = useState(false);

  const introRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  const planetsRef = useRef<HTMLDivElement[]>([]);

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
            const textContent = planetDiv.children[1].children[0];
            const imageContent = planetDiv.children[1].children[1];
            const imageBefore = imageContent.children[0] as HTMLImageElement;
            const imageAfter = imageContent.children[1] as HTMLImageElement;

            entry.intersectionRatio > .4 ? planetDiv.classList.add('appears') : planetDiv.classList.remove('appears');
            if (entry.intersectionRatio > .5) {
              entry.intersectionRatio > .8 ? textContent.classList.add('appears') : textContent.classList.remove('appears');
              imageBefore.style.opacity = (1 - (entry.intersectionRatio/2)).toString();
              imageAfter.style.opacity = (entry.intersectionRatio/2).toString();
            } else {
              imageBefore.style.opacity = '1';
              imageAfter.style.opacity = '0';
            }
          }
        })
      })
    },{
      threshold:[0,.4,.45,.5,.55,.6,.65,.7,.75,.8,.85,.9,.95,1]
    }
  );

  useEffect(() => {
    if (planetsRef.current) {
      console.log(planetsRef.current);
      planetsRef.current.forEach(e => observer.observe(e));
    } 
    
  }, [nextAppears])
  
  useEffect(() => {
    if (nextAppears) {
      introRef.current && observer.observe(introRef.current);
    }
  }, [nextAppears])

  useEffect(() => {
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In magni neque dolorem odio doloribus dicta cumque id ratione tempore placeat! Iusto, deserunt? Distinctio rerum dignissimos maiores, commodi nobis quaerat? Molestias architecto nesciunt porro similique rem, sunt praesentium provident! Reprehenderit eligendi eos, vitae qui veritatis, quo molestias labore quisquam ad dolor ullam? Ipsam ad rem quae consequatur. Iusto quaerat maiores quam debitis cupiditate. Quo dolorum modi quam, enim dicta 
            </article>
            <article className="second">
              dolores vel at sapiente tempore beatae necessitatibus in maxime voluptates debitis atque commodi qui dolore. Aliquid cum, ab dolorum sapiente labore consequatur tempora error adipisci, in nulla enim ipsam accusantium ut eligendi nam deleniti incidunt quos culpa beatae consequuntur delectus quo. Sunt deleniti perferendis officia, provident vel ratione fugit eveniet ullam quos modi voluptatum placeat tempore beatae dicta asperiores at. Quae at expedita nostrum consequatur voluptate cum debitis. Dolorum dolores consequatur accusantium sunt odit pariatur, sapiente est, nam aut quibusdam ratione illo perspiciatis praesentium ullam neque natus vel voluptates officia reiciendis reprehenderit cumque nemo, voluptate maxime! Vitae unde fugiat sit, labore exercitationem commo.
            </article>
          </section>
          <div className="arrow-down"></div>
          <PlanetsSection ref={planetsRef} />
        </> : 
        <></>
      }
      <Arrow ref={arrowRef} />
    </main>
  )
}

export default App;
