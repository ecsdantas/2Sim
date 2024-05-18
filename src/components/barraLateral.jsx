import React from "react"
const LateralBar = (props) => {
    const { show, className, children } = props
    return <div className={`bar ${className} ${show && 'show'}`}>{ children }</div>
}

export default LateralBar