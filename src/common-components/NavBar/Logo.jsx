import { useState } from 'react'
import yoteLogoHalf from "./../../assets/yoteLogoHalf.png"
import yoteLogoFull from "./../../assets/yoteLogoFull.png"

function Logo(){
    const [logo, setLogo] = useState(yoteLogoHalf);

  return (
    <>
      <img className="cursorP"
        src={logo} 
        onMouseEnter={() => setLogo(yoteLogoFull)} 
        onMouseLeave={() => setLogo(yoteLogoHalf)} 
        alt="Yote Logo"
        style={{ width: "150px", transition: "2.0s ease" }}
      />
    </>
  );
}

export default Logo