import { forwardRef } from "react";
import { PlanetObj } from "../utilsFuncs/classes";
import { v4 as uuidv4 } from "uuid";
import Planet from "./Planet";
import planetsInfos from '../planetsInfos.json';
import venusBeforePic from '../assets/images/venus_ancient.webp';
import venusBeforeMini from '../assets/images/venus_ancient_mini.webp';
import venusAfterPic from '../assets/images/venus_current.webp';
import venusAfterMini from '../assets/images/venus_current_mini.webp';
import marsBeforePic from '../assets/images/mars_ancient.webp';
import marsAfterPic from '../assets/images/mars_current.webp';
import marsAfterMini from '../assets/images/mars_current_mini.webp';
import earthBeforePic from '../assets/images/early_earth.webp';
import earthAfterPic from '../assets/images/earth_current.webp';
import earthAfterMini from '../assets/images/earth_current_mini.webp';

const PlanetsSection = forwardRef<HTMLDivElement[]>((_props,planetsRef) => {
    
    const planets = [
        {...new PlanetObj('Mars',planetsInfos.Mars.before_content,planetsInfos.Mars.after_content,marsBeforePic,marsBeforePic,marsAfterPic,marsAfterMini,uuidv4())},
        {...new PlanetObj('Vénus',planetsInfos.Venus.before_content,planetsInfos.Venus.after_content,venusBeforePic,venusBeforeMini,venusAfterPic,venusAfterMini,uuidv4())},
        {...new PlanetObj('La Terre',planetsInfos.Earth.before_content,planetsInfos.Earth.after_content,earthBeforePic,earthBeforePic,earthAfterPic,earthAfterMini,uuidv4())}
    ]

    if (!(planetsRef && 'current' in planetsRef && planetsRef.current)) return null;

    
  return (
    <section className="planets-container">
        {planets.map((planet,ind) => <div ref={el => planetsRef.current![ind] = el!} key={planet.id} className="planet-container"><Planet planet={planet} /></div>)}
    </section>
  )
})

export default PlanetsSection;