import { useState } from 'react';
/*
    Requer o css do tooltip
*/
// eslint-disable-next-line react/prop-types
export const Tooltip = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="tooltip-container"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && <div className="tooltip-box">{text}</div>}
    </div>
  );
}
