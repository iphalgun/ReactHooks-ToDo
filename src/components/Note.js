import React from 'react'

export default ({message, id, deleteNote}) => (
    <div>
        <p> {message}   <button onClick={() =>deleteNote(id)}>X</button></p>
    </div>
)