import './App.css';
import MyNote from './components/MyNote';
import Grid from '@mui/material/Grid';
function App() {
  return (
    <>
    <div >
    <img src="./images/note.png" alt="icon" className='image-style'/>
    </div>
    <h1 className='title'>Laxar- Note Taking App</h1>
    <h4 style={{textAlign:'center',color:'#d78d00'}}>By Nishant Sharma</h4>
    <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '40vh' }}
            >

            <Grid
            item xs={3}>
            <MyNote />
            </Grid>   
            
      </Grid> 
    </>
  );
}

export default App;
