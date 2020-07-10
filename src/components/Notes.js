import React, { useState, useEffect } from 'react'
import Note from './Note'
import '../App.css';
import { connect } from 'react-redux';
import * as actionTypes from '../reducers/actions'
import { act } from 'react-dom/test-utils';


const Notes = (props) => {
  const [input, setInput] = useState('')


const handleSubmit = (e, input, setInput) => {
  e.preventDefault()
  props.submit({message: input})
  setInput('')
}


useEffect(()=>{
    props.asyncrequest()
  },[]);

  
  return(
    <div className="container">
      <h2 className="app-title">To Do App</h2>
        <form onSubmit={(e) => handleSubmit(e, input, setInput)}>
        <input className="a" onChange={(e) => setInput(e.target.value)} value={input}/>
        <button className="b">Add To Do</button>
      </form>
      {props.notes.map(note => (
          <Note message={note.message} id={note.id} deleteNote={(id) => props.delete(id)}/>
        ))}
    </div>
  );
  }

  
  const mapStateToProps = (state) => {
    return {
      notes : state.notes
    }
  }

  
  const mapDispatchToProps = dispatch => {
    return {
    asyncrequest : () => dispatch(actionTypes.fetchItems()),
    submit : (entry) => dispatch(actionTypes.saveProducts(entry)),
    delete : (id) => dispatch(actionTypes.deleteProducts(id))
    }
};

  export default connect(mapStateToProps, mapDispatchToProps)(Notes);

  
  
