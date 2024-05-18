const BaseSVG = ({ elements, getConnections, getNewConnections, getScale, createNewConnection, getMousePosition}) =>
    <svg className="main" viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} preserveAspectRatio="xMidYMid meet" onContextMenu={(e) => e.preventDefault()}>
        {elements.map((el) => (
            <g key={el.type + el.index + el.name} >
                <rect x={el.x} y={el.y} width={el.width * getScale} height={el.height * getScale} fill="rgb(255,255,255)" stroke="black" onMouseDown={e => moveElement(e, el)} />
                <text x={el.x + el.width * getScale / 2} y={el.y - 5} textAnchor="middle" fontSize="12" fill='rgb(230,230,230)'>{el.name}</text>
                <text x={el.x + el.width * getScale / 2} y={el.y + el.height * getScale + 15} textAnchor="middle" fontSize="12" fill='rgb(230,230,230)'>{el.value}</text>
                {el.ports.in.map((elIn, i) => <circle key={i} cx={el.x + elIn.x} cy={el.y + elIn.y * getScale + el.height * getScale / 2} r="5" fill="rgb(214,214,44)" onClick={() => createNewConnection(el, false)} />)}
                {el.ports.out && <circle cx={el.x + el.ports.out.x + el.width * getScale} cy={el.y + el.ports.out.y * getScale + el.height * getScale / 2} r="5" fill="rgb(44,44,244)" onClick={() => createNewConnection(el, true)} />}
            </g>
        ))}
        {getConnections.map((conn, idx) => (
            <line
                x1={conn.from.x + conn.from.width * getScale + (conn.from.__isOutput ? conn.from.ports.out.x : conn.from.ports.in[0].x)}
                y1={conn.from.y + conn.from.height * getScale / 2 + (conn.from.__isOutput ? conn.from.ports.out.y : conn.from.ports.in[0].y)}
                x2={conn.to.x + (conn.from.__isOutput ? conn.to.ports.in[0].x : conn.to.ports.out.x)}
                y2={conn.to.y + conn.from.height * getScale / 2 + (conn.from.__isOutput ? conn.to.ports.in[0].y : conn.to.ports.out.y)}
                stroke="rgb(230,230,230)" strokeWidth="2" key={idx} />
        ))}
        {getNewConnections && (
            <line
                x1={getNewConnections.x +
                    (getNewConnections.__isOutput ? getNewConnections.ports.out.x + getNewConnections.width : getNewConnections.ports.in[0].x) * getScale
                }
                y1={getNewConnections.y +
                    (getNewConnections.height / 2 + (getNewConnections.__isOutput ? getNewConnections.ports.out.y : getNewConnections.ports.in[0].y)) * getScale
                }
                x2={getMousePosition.x}
                y2={getMousePosition.y}
                stroke="rgb(30,250,30)" strokeWidth="2" />
        )}
    </svg>

export default BaseSVG