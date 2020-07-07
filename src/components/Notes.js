import React, { useState, useEffect } from 'react'
import Note from './Note'
import '../App.css';
import { connect } from 'react-redux';
import * as actionTypes from '../reducers/actions'

const Notes = (props) => {
  //const {requestApi} = props;
  const[notes, setNotes] = useState([])
  const [input, setInput] = useState('')

const requestUsersAction = () => { // container
  
    fetch('https://tododemo-5d7d3.firebaseio.com/notes.json')
    .then(response=>response.json())
    .then(responseData=>{
        const loadedEntry=[];
        debugger;
        console.log('data');
        for(const key in responseData)
        {
            loadedEntry.push({
                id: key,
                message:responseData[key].name
            });
        }
        props.requestApi(loadedEntry);
        //setNotes(loadedEntry);
    })
  
};

const handleSubmit = (e, notes, setNotes, input, setInput) => {
  e.preventDefault()
  
  fetch('https://tododemo-5d7d3.firebaseio.com/notes.json',{
        method:'POST',
        body: JSON.stringify({name:input}),
        headers:{'Content-type':'application/json'}
    }).then(response=>{
        return response.json();
    }).then(responseData=>{
        setNotes([...notes, {id:responseData.name, message: input}])
    });
    console.log('0')
    setInput('')
}

const deleteNote = (id, notes, setNotes) => {
  //setNotes(notes.filter(note => note.id != id))

    fetch(`https://tododemo-5d7d3.firebaseio.com/notes/${id}.json`,{
          method:'DELETE',
      }).then(response=>{
          setNotes(prevEntry=>
              prevEntry.filter(notes=>notes.id!==id)
        );
      })
  }
  
  useEffect(()=>{
    //requestApi();
    requestUsersAction();
  },[]);

  return(
    <div className="container">
      <h2 className="app-title">To Do App</h2>
        <form onSubmit={(e) => handleSubmit(e, notes, setNotes, input, setInput)}>
        <input className="a" onChange={(e) => setInput(e.target.value)} value={input}/>
        <button className="b">Add To Do</button>
      </form>
      {notes.map(note => (
          <Note message={note.message} id={note.id} deleteNote={(id) => deleteNote(id, notes, setNotes)}/>
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
    requestApi : (data) => dispatch(actionTypes.receiveUsers(data)),
    delete : (id) => dispatch(actionTypes.deleteUsers(id))
    }
};

  export default connect(mapStateToProps, mapDispatchToProps)(Notes);

  
  