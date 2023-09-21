import { forwardRef } from "react";
import { PlanetObj } from "../utilsFuncs/classes";
import { v4 as uuidv4 } from "uuid";
import Planet from "./Planet";

const PlanetsSection = forwardRef<HTMLDivElement[]>((_props,planetsRef) => {
    const planets = [
        {...new PlanetObj('Venus','','','','',uuidv4())},
        {...new PlanetObj('Earth','','','','',uuidv4())},
        {...new PlanetObj('Mars','','','','',uuidv4())}
    ]
    
    if (!(planetsRef && 'current' in planetsRef && planetsRef.current)) return null;
  return (
    <section className="planets-section">
        {planets.map((planet,ind) => <div ref={el => planetsRef.current![ind] = el!} key={planet.id}><Planet planet={planet} /></div>)}
    </section>
  )
})

export default PlanetsSection;