import {useState} from "react"
import {TextField,Button} from "@mui/material"
import {useNavigate} from "react-router-dom";
import "./Register.css"
const Register=()=>{
    const navigate=useNavigate();
    const [username,setUsername]=useState("")
    


    //post data (username) to the api

    const postData=async(e)=>{
        e.preventDefault();
        const res=await fetch(`/`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({username:username})
        })
         const data=await res.json();
         const id=data.id
         if(data.status===422 || !data){
            alert("Registration Failed");
         }else{
            navigate(`/${id}`)
         }
    }

    return( 
        <>
            <h1>Word Race</h1>
            <form method="POST" id="form">
            <TextField required id="username" label="Username Required" onChange={(e)=>setUsername(e.target.value)} />
           <Button variant="contained" type="submit" id="play" onClick={(e)=>postData(e)} >Play Game</Button>
           <div id="instructions">
            <h2>Instructions</h2>
            <p>After Clicking the "Play Game" Button you'll be directed to the game.</p>
            <p>On top, you'll see your current level, points scored & words to be typed correctly to reach the next level</p>
            <p>Below that, there is a timer & a word that is to be typed in the space given below the word</p>
            <p>After successfully typing the word, next word will appear & the timer will again start</p>
            <p>Every correctly typed word gives you a point</p>
            <p>If due to any reason you're not able to type the word in the given time then it will be stored in the word stack</p>
            <p>Word stack is the space provided below the word and above the keyboard which will store the words that you were not able to complete</p>
            <p>Word Stack has a space of 3 words in it & after that your game wil end.</p>
            <p>Once the game ends you'll be asked to save your game or try a new game.</p>
            <p>If you choose to save your game then you'll be redirected to the top scores table.</p>
           </div>
        </form>
        </>
    )
}

export default Register;