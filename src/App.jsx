import React, { useEffect, useState } from 'react';
import './App.css';
import PlayBtn from './assets/icons/play.svg'
import LibraryBtn from './assets/icons/library.svg'
import GearBtn from './assets/icons/gear.svg'
import { inputPort, gain, add, outputPort } from './blocks'
import { Tooltip } from './components/tooltip';

const App = () => {
  const [elements, setElements] = useState([inputPort, gain, outputPort, add]);
  const [getConnections, setConnections] = useState([]);
  const [getNewConnections, setNewConnections] = useState(null);
  const [getMousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [getDragElement, setDragElement] = useState(null)
 
  const getScale = 2

  window.getConnections = getConnections
  window.getNewConnections = getNewConnections

  useEffect(() => {
    setNewConnections(null)
  }, [getConnections])

  const createNewConnection = ( element, startFromOutputPort = false ) => {
    element.__isOutput = startFromOutputPort;
    if (getNewConnections) {
      element.ports.in[0].link = getNewConnections
      setConnections(oldConnections => [...oldConnections, {from: getNewConnections, to: element}])
    }else{
      setNewConnections(element)
    }
  }

  const updateMousePos = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    if(getDragElement){
      getDragElement.x = e.clientX
      getDragElement.y = e.clientY
    }
  }

  const moveElement = (e,element) => {
    e.preventDefault();
    if (e.button === 2){
      setDragElement(dragElement => dragElement? null : element)
    }
  }

  const solve = () => {
    getConnections.filter(el => el.to.type === 'output').map( el => {
      const outp = el.to
      outp.solve() 
    })
  }

  return (
    <div>
      <div className="fixed-bottom-center">
        <Tooltip text="Allow to add new blocks">
          <button onClick={ () => {} }><img src={LibraryBtn} width={30} /></button>
        </Tooltip>
        <Tooltip text="Run the simulation">
          <button onClick={ () => solve() }><img src={PlayBtn} width={30} /></button>
        </Tooltip>
        <Tooltip text="Open the preferences">
          <button onClick={ () => {} }><img src={GearBtn} width={30} /></button>
        </Tooltip>
      </div>
    <div className="App" onMouseMove={ updateMousePos }>
      <svg viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} preserveAspectRatio="xMidYMid meet" onContextMenu={(e) => e.preventDefault()}>
        {elements.map((el) => (
          <g key={el.type + el.index + el.name} >
            <rect x={el.x} y={el.y} width={el.width * getScale} height={el.height * getScale} fill="lightblue" stroke="black" onMouseDown={ e => moveElement(e,el) } />
            <text x={el.x + el.width * getScale / 2} y={el.y - 5} textAnchor="middle" fontSize="10" fill='rgb(230,230,230)'>{el.name}</text>
            <text x={el.x + el.width * getScale / 2} y={el.y + el.height * getScale + 15} textAnchor="middle" fontSize="10" fill='rgb(230,230,230)'>{el.value}</text>
            { el.ports.in.map( ( elIn, i ) => <circle key={ i } cx={el.x + elIn.x} cy={el.y + elIn.y * getScale + el.height * getScale / 2} r="5" fill="red" onClick={ () => createNewConnection(el, false) } /> ) }
            { el.ports.out && <circle cx={el.x + el.ports.out.x + el.width * getScale} cy={el.y + el.ports.out.y  * getScale + el.height * getScale / 2} r="5" fill="red" onClick={ () => createNewConnection(el, true) }/> }
          </g>
        ))}
        {getConnections.map((conn, idx) => (
          <line
            x1={conn.from.x + conn.from.width * getScale + (conn.from.__isOutput? conn.from.ports.out.x : conn.from.ports.in[0].x)}
            y1={conn.from.y + conn.from.height * getScale / 2 + (conn.from.__isOutput? conn.from.ports.out.y : conn.from.ports.in[0].y)}
            x2={conn.to.x + (conn.from.__isOutput? conn.to.ports.in[0].x : conn.to.ports.out.x )}
            y2={conn.to.y + conn.from.height * getScale / 2 + (conn.from.__isOutput? conn.to.ports.in[0].y : conn.to.ports.out.y )}
            stroke="rgb(230,230,230)" strokeWidth="2" key={idx} />
        ))}
        {getNewConnections && (
          <line
            x1={ getNewConnections.x + 
              (getNewConnections.__isOutput? getNewConnections.ports.out.x + getNewConnections.width : getNewConnections.ports.in[0].x ) * getScale
            }
            y1={ getNewConnections.y + 
              (getNewConnections.height / 2 + (getNewConnections.__isOutput? getNewConnections.ports.out.y : getNewConnections.ports.in[0].y )) * getScale
            }
            x2={ getMousePosition.x }
            y2={ getMousePosition.y }
            stroke="rgb(30,250,30)" strokeWidth="2" />
        )}
      </svg>
    </div>
    </div>
  );
};

export default App;
