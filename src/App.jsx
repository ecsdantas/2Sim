import React, { useEffect, useState } from 'react';
import PlayBtn from './assets/icons/play.svg'
import LibraryBtn from './assets/icons/library.svg'
import GearBtn from './assets/icons/gear.svg'
import { inputPort, gain, add, outputPort } from './components/blocks'
import { Tooltip } from './components/tooltip';
import BaseSVG from './components/baseSVG';

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

  const createNewConnection = (element, startFromOutputPort = false) => {
    element.__isOutput = startFromOutputPort;
    if (getNewConnections) {
      element.ports.in[0].link = getNewConnections
      setConnections(oldConnections => [...oldConnections, { from: getNewConnections, to: element }])
    } else {
      setNewConnections(element)
    }
  }

  const updateMousePos = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    if (getDragElement) {
      getDragElement.x = e.clientX
      getDragElement.y = e.clientY
    }
  }

  const moveElement = (e, element) => {
    e.preventDefault();
    if (e.button === 2) {
      setDragElement(dragElement => dragElement ? null : element)
    }
  }

  const solve = () => {
    getConnections.filter(el => el.to.type === 'output').map(el => {
      const outp = el.to
      outp.solve()
    })
  }

  return (
    <div>
      <div className="fixed-bottom-center">
        <Tooltip text="Allow to add new blocks">
          <button onClick={() => { }}><img src={LibraryBtn} width={30} /></button>
        </Tooltip>
        <Tooltip text="Run the simulation">
          <button onClick={() => solve()}><img src={PlayBtn} width={30} /></button>
        </Tooltip>
        <Tooltip text="Open the preferences">
          <button onClick={() => { }}><img src={GearBtn} width={30} /></button>
        </Tooltip>
      </div>
      <div className="App" onMouseMove={updateMousePos}>
        <BaseSVG elements={elements} getConnections={getConnections} getNewConnections={getNewConnections} getScale={getScale} createNewConnection={createNewConnection} getMousePosition={getMousePosition} />
      </div>
    </div>
  );
};

export default App;
