import React, { useState } from "react";

function playerInput({className, placeHolder, onChange, ID, label, value, response}){


    return(
        <>
            <span style={{color: '#DCD072', fontSize: '1.5rem', fontWeight:'bolder'}}>{label}</span>
            <div className="input-container">
                <input type="text" placeholder={placeHolder} onChange={onChange} className={className} id={ID} value={value} />
                <i className={response == true ? "fa-regular fa-circle-check" : "fa-regular fa-circle-xmark"} style={{color: response == true ? "#62FB74" : "#FBAC62", fontSize: "1.2rem"}}></i>
            </div>
            
        </>
    )
}


export default playerInput