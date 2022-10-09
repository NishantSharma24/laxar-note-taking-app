import React, { useState ,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './MyNote.css'

// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("LaxarToDo");
  
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };



export default function MyNote() {

  // Handling the inputs of the Title 
  const [title,setTitle] =useState("");
  const handleTitleChange = (e) =>{
    setTitle(e.target.value);
  }
  // Handling the inputs of the description
  const [description,setDescription] =useState("");
  const handleDescriptionChange =(e) =>{
    setDescription(e.target.value);
  }

  // Edit Mode
  const[EditMode,setEditMode] = useState(false);
  const[isEditItem,setEditItem] =useState(null);

  // Array  to store different notes
  // notes is used store all the note which we will be creating each time
  const [notes,setNotes] = useState(getLocalData());
  // function to insert Note inside the array
  const addNote =()=>{
    var trimedTitle = title.trim();
    if (!title) {
        alert("Please set the required values 😉");
    }
    else if(trimedTitle.length<10 && !description){
        alert("Please Provide some description 😉");
    }
    else if(title && EditMode){ // this is for editing purpose


      const isFound = notes.some(element => {
        if (element.newTitle === title && element.id !==isEditItem) {
          return true;
        }
        return false;
      });


      if (isFound) {
        alert("The Note with similar Title is already present Kindly change the Title 😊");
      }
      else{
        setNotes(
        notes.map((curElem) => {
            if (curElem.id === isEditItem) {
            return { ...curElem, newTitle: title,newDescription:description };
            }
            return curElem;
        })
        ); 

        setTitle("");
        setDescription("");
        setEditItem(null);
        setEditMode(false);
      }
    }
    else if(title){

        const isFound = notes.some(element => {
            if (element.newTitle === title) {
              return true;
            }
            return false;
          });


          if (isFound) {
            alert("The Note with similar Title is already present Kindly change the Title 😊");
          }
          else{
            const myNewNote = {
                    id: new Date().getTime().toString(),
                    newTitle:title,
                    newDescription:description
                }
                console.log(myNewNote);
                setNotes([...notes,myNewNote]);
                setTitle("");
                setDescription("");
                console.log(notes);
            }
        
    }
  }

  // Edit the Note
 const editNote =(ele) =>{
    const item_todo_edited = notes.find((curElem) => {
        return curElem.id ===ele;
      });
      setTitle(item_todo_edited.newTitle);
      setDescription(item_todo_edited.newDescription);
      setEditItem(ele);
      setEditMode(true);
 }
 // Delete the Note
 const deleteNote = (ele) =>{
    const updatedNotes = notes.filter((curEle)=>{
        return curEle.id !==ele;
    });
    setNotes(updatedNotes);
 }

 // adding localStorage
  useEffect(() => {
    localStorage.setItem("LaxarToDo", JSON.stringify(notes));
  }, [notes]);



  return (
    <div>
        <form className='note-enter'>
            <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td style={{color:'purple',fontWeight:'bolder',fontSize:"2  0px" , fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>Add a Note</td>
                  </tr>
                    <tr>
                        <td ><TextField id="title" label="Title" variant="standard" value={title} onChange={handleTitleChange}/></td>
                    </tr>
                    <tr>
                        <td><TextField id="description" label="Description" variant="outlined" value={description} onChange={handleDescriptionChange} /></td>
                    </tr>
                    <tr>
                        <td>
                        <Button variant="contained" 
                        style={{backgroundColor:'green', color:'white'}} 
                        startIcon={<AddTaskIcon/>}
                        onClick={addNote}
                        >
                        </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        
        </form>
        {/* displaying different notes */}
        <div className='notes'>
            <h2 className='notes-heading'>My Notes</h2>
            {notes.map((curElem) => {
              return (
                <div className = "note" key={curElem.id}>
                  
                  <h3 className='note-title'>{curElem.newTitle}</h3>
                  <i className='note-description'>{curElem.newDescription}</i>
                  <div className='note-buttons'>
                    <Button variant="contained" 
                        style={{backgroundColor:'#bbdc00', color:'black' , width:"70 px" ,height:"18px",padding:"12px",marginRight:"10px"}} 
                        startIcon={<EditIcon/>}
                        onClick={() => editNote(curElem.id)}
                        >
                          Edit
                    </Button>
                    <Button variant="contained" 
                        style={{backgroundColor:'#bd0000', color:'white' , width:"100px" ,height:"18px",padding:"12px"}} 
                        startIcon={<DeleteIcon/>}
                        onClick={() => deleteNote(curElem.id)}
                        >
                          Delete
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
        
    </div>
  )
}
