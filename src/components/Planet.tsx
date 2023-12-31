interface planetProps {
    name: string;
    before_content: string;
    after_content: string;
    before_pict: string;
    before_mini: string;
    after_pict: string;
    after_mini: string;
    id: string;
}

export default function Planet({planet}:{planet:planetProps}) {
    
  return (
    <>
        <h2 tabIndex={0}>{planet.name}</h2>
        <div className="inside-planet">
            <div className="text-content">
                <p className="before" tabIndex={0}>{planet.before_content}</p>
                <p className="after" tabIndex={0}>{planet.after_content}</p>
            </div>
            <div className="picture-content" tabIndex={0}>
                <img 
                    srcSet={(`${planet.before_mini} 480w, ${planet.before_pict} 800w`)} 
                    sizes="(max-width: 600px) 480px,800px" 
                    src={planet.before_pict} 
                    alt={planet.name + " before"} 
                    className="before" 
                />
                <img 
                    srcSet={(`${planet.after_mini} 480w, ${planet.after_pict} 800w`)} 
                    sizes="(max-width: 600px) 480px,800px" 
                    src={planet.after_pict} 
                    alt={planet.name + " after"} 
                    className="after" 
                />
            </div>
        </div>
    </>
  )
}