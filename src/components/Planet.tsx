interface planetProps {
    name: string;
    before_content: string;
    after_content: string;
    before_pict: string;
    after_pict: string;
    id: string;
}

export default function Planet({planet}:{planet:planetProps}) {
    
  return (
    <>
        <h2>{planet.name}</h2>
        <div className="inside-planet">
            <div className="text-content">
                <p className="before">{planet.before_content}</p>
                <p className="after">{planet.after_content}</p>
            </div>
            <div className="picture-content">
                <img src={planet.before_pict} alt={planet.name + " before"} className="before" />
                <img src={planet.after_pict} alt={planet.name + " after"} className="after" />
            </div>
        </div>
    </>
  )
}