import { useEffect, useRef, useState } from "react";
import PlanetsSection from "./components/PlanetsSection";

function App() {
  const [nextAppears, setNextAppears] = useState(false);

  const introRef = useRef<HTMLDivElement>(null);
  
  const planetsRef = useRef<HTMLDivElement[]>(null);

  const observer = new IntersectionObserver(
    entries => {
      entries.map(entry => {
        switch (entry.target) {
          case introRef.current:            
            if (entry.intersectionRatio > .5) {
              introRef.current?.children[0].classList.add('appears');
            }
            if (entry.intersectionRatio === 1) {
              introRef.current?.children[1].classList.add('appears');
              observer.unobserve(entry.target);
            }
            break;
          /* case projectRefs.current[1]:
              entry.intersectionRatio > .2 ? projectRefs.current[1].classList.add('appears') : 
              projectRefs.current[1].classList.remove('appears');
              break; */
          /* case projectRefs.current[1]:
              entry.intersectionRatio > .2 ? projectRefs.current[1].classList.add('appears') : 
              projectRefs.current[1].classList.remove('appears');
              break; */
          default:
            break;
        }
      })
    },{
      threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]
    }
  );

  useEffect(() => {
    planetsRef.current && console.log(planetsRef.current);
    
  }, [planetsRef])
  
  useEffect(() => {
    if (nextAppears) {
      introRef.current && observer.observe(introRef.current);
    }
  }, [nextAppears])

  useEffect(() => {
    setTimeout(() => {
      setNextAppears(true);
    }, 5000);
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
            <p className="first">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In magni neque dolorem odio doloribus dicta cumque id ratione tempore placeat! Iusto, deserunt? Distinctio rerum dignissimos maiores, commodi nobis quaerat? Molestias architecto nesciunt porro similique rem, sunt praesentium provident! Reprehenderit eligendi eos, vitae qui veritatis, quo molestias labore quisquam ad dolor ullam? Ipsam ad rem quae consequatur. Iusto quaerat maiores quam debitis cupiditate. Quo dolorum modi quam, enim dicta 
            </p>
            <p className="second">
              dolores vel at sapiente tempore beatae necessitatibus in maxime voluptates debitis atque commodi qui dolore. Aliquid cum, ab dolorum sapiente labore consequatur tempora error adipisci, in nulla enim ipsam accusantium ut eligendi nam deleniti incidunt quos culpa beatae consequuntur delectus quo. Sunt deleniti perferendis officia, provident vel ratione fugit eveniet ullam quos modi voluptatum placeat tempore beatae dicta asperiores at. Quae at expedita nostrum consequatur voluptate cum debitis. Dolorum dolores consequatur accusantium sunt odit pariatur, sapiente est, nam aut quibusdam ratione illo perspiciatis praesentium ullam neque natus vel voluptates officia reiciendis reprehenderit cumque nemo, voluptate maxime! Vitae unde fugiat sit, labore exercitationem commo.
            </p>
          </section>
          <PlanetsSection ref={planetsRef} />
        </> : 
        <></>
      }
    </main>
  )
}

export default App;
