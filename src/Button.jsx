import React, {useState} from 'react'

function Button({children, onClick}){
    return(
        <>
            <button className='button-class' onClick={onClick}>{children}</button>
        </>
    )
}

export default Button;