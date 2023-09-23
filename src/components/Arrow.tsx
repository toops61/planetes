import { forwardRef } from "react";

const Arrow = forwardRef<HTMLDivElement>((_props,arrowRef) => {
    const bodyScrollTop = () => {
        window.scrollTo({
            top:0,
            left:0,
            behavior: "smooth"
        });
    }
  return (
    <div className="back-to-top" onClick={bodyScrollTop} ref={arrowRef} ></div>
  )
})

export default Arrow;