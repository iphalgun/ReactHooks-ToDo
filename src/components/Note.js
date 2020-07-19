import React from 'react'

export default ({message, id, deleteNote, editNote}) => (
    <div>
        <p> {message}   <button onClick={() =>deleteNote(id)}>X</button>  <button onClick={() =>editNote(id)}>Edit</button></p>
    </div>
)
