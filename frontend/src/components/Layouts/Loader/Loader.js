import React from 'react'
import "./Loader.css"

const Spinner = ({style}) => {
    return (
        <div style={style} className="lds-dual-ring"></div>
    )
}

export default Spinner
