import React, { useState, useEffect } from 'react'
import Note from './Note'
import '../App.css';
import { connect } from 'react-redux';
import * as actionTypes from '../reducers/actions'
import { act } from 'react-dom/test-utils';
import { useFormik } from 'formik';
import * as Yup from 'yup'


const Notes = (props) => {
  const [input, setInput] = useState('')
  const [flag, setFlag]=useState("");


  const validationSchema=Yup.object({
    input:Yup.string()
        .required("Task Required")
        .max(25,"Too Long")      
});


//     const { values, touched, errors, handleChange, handleSubmit} = useFormik({
//     initialValues:{
//         input:""
//     },
//     validationSchema,
//     onSubmit(values){
//         props.submit({name : values.input})
//         setInput('')
//     }
// })


const handleSubmit = (e, input, setInput) => {
  e.preventDefault()
  if(flag){
    props.editTask(flag, input)
    setInput('')
  }
  else
  {
    props.submit({name: input})
    setInput('')
  }
}


 const edit = (id, message) => {
    setFlag(id)
    const result = props.notes.filter(obj => {
      return obj.id === id
    })
    setInput(result[0].message)
 }


useEffect(()=>{
    props.asyncrequest()
  },[]);


  return(
    <div className="container">
      <h2 className="app-title">To Do App</h2>
      
      <form onSubmit={(e) => handleSubmit(e, input, setInput)}>
        
        <input className="a" onChange={(e) => setInput(e.target.value)} value={input}/>
        {/* {<button onClick={submit}>Save</button>} */}
        {/* <form onSubmit={handleSubmit}> */}
          
        {/* <input className="a" onChange={(e) => setInput(e.target.value), handleChange} name="input" value={values.input} className={errors.input && touched.input && "error" }/>
        {errors.input && touched.input && (
                    <div>{errors.input}</div>
                )} */}
        <button className="b">Add To Do</button>
        
       {/* <button className="b">Save Changes</button> */}
      </form>
      {props.notes.map(note => (
          <Note message={note.message} id={note.id} deleteNote={(id) => props.delete(id)} editNote={(id, message) => edit(id, message)}/>
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
    delete : (id) => dispatch(actionTypes.deleteProducts(id)),
    editTask : (id, message) => dispatch(actionTypes.editProducts(id, message))
    }
};

  export default connect(mapStateToProps, mapDispatchToProps)(Notes);
