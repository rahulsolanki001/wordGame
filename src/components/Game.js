import React from 'react';
import './Game.css';
import { useState,useEffect } from 'react';
import { TextField,Stack,ButtonGroup,Button,Modal } from '@mui/material';
import {PunchClock} from "@mui/icons-material"
import { useParams,useNavigate } from 'react-router-dom';




const words=["hello","please","bye","goodnight","sleep","moon","remember","test","why","how","regular","college","home","school","zenith","dragon"]
const Game=()=> {
  const navigate=useNavigate();
  const {id}=useParams();
  const [text,setText]=useState("")
  const[word,setWord]=useState("bye")
  const[score,setScore]=useState(0)
  const[level,setLevel]=useState(1)
  const[scoreToNext,setScoreToNext]=useState(10)
  const[lastLetter,setLastLetter]=useState("")
  const[timer,setTimer]=useState(8-level)
  const [stack,setStack]=useState([])
  const [open,setOpen]=useState(false)


  const randWord=()=>{
    const word=words[Math.floor(Math.random()*words.length)]
    setWord(word)
   
    
  }

  const checkWord=(e)=>{
    e.preventDefault()
    setText(e.target.value)
  }
  

  

useEffect(()=>{
  if(text===word){
    setScore(score+1)
    setScoreToNext(scoreToNext-1)
    if(scoreToNext===0){
      setLevel(level+1)
      setScoreToNext(10)
    }
    setText("")
    randWord()
    setTimer(8-level)
  }

},[text])

useEffect(()=>{
 const time= timer>0 && setInterval(()=>setTimer(timer-1),1000)
 if(timer===0){
  setText("")
  randWord()
  setTimer(8-level)
  setStack([...stack,word])
  if (stack.length===3){
    //alert("game over");
    setOpen(true)
    setStack([])
  }
}
 return ()=>clearInterval(time)
},[timer,stack])


const highlightStyle={
  backgroundColor:"#c1c40c",
  color:"#ffff",
  transition:"all 0.15s ease-in-out",
  transform:"scale(125%)"
}

const lowTimeStyle={
    color:"#A30000",
    transform:"scale(150%)"
}
const showLastLetter=(e)=>{
  const key=e.key
  if(key.length===1){
    setLastLetter(e.key)
  }
}

const handleClose=()=>{setOpen(false);window.location.reload()}


const saveGame=async ()=>{
  const res=await fetch(`/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({score:score,level:level})
  })
  const data=await res.json()
  if(!data || data.status===402){
    alert("could not save game!!...");
    
  }else{
    navigate(`/scores`);
  }
}


 
  
  return (
    <>
      <Stack>
      <Stack direction="row" id="info">
        <div id="level"><h3>{level}</h3><span>Level</span></div>
        <div id="score"><h3>{score}</h3><span>Points</span></div>
        <div id="nextLevel"><h3>{scoreToNext}</h3><span>Words to reach Level {level+1}</span></div>
      </Stack>
      <Stack direction="row" id="word-timer">
      <div id="timer" style={timer<=3 ? lowTimeStyle : null}><h1><PunchClock/>{timer}</h1></div>
      <div id='word'><h2>{word}</h2></div>
      </Stack>
     
      <Stack id="stack" direction="row">
        {stack.map((word,index)=><p key={index}>{word}</p>)}
      </Stack>
      <Stack id="input" >
        <TextField label="Type Word" variant='standard' value={text} onChange={(e)=> checkWord(e)} onKeyDown={(e)=>showLastLetter(e)}/>
      </Stack>
      <Stack id="keyboard">
        <Stack id="row1" direction="row">
          <ButtonGroup variant="outlined" aria-label="outlined button group" size='large'>
              <Button  id="q" style={lastLetter==="q"  && text  ? highlightStyle : null}>Q</Button>
              <Button  id="w" style={lastLetter==="w"  && text  ? highlightStyle : null}>W</Button>
              <Button id="e" style={lastLetter==="e"  && text  ? highlightStyle : null}>E</Button>
              <Button id="r" style={lastLetter==="r"  && text  ? highlightStyle : null}>R</Button>
              <Button id="t" style={lastLetter==="t"  && text  ? highlightStyle : null}>T</Button>
              <Button id="y" style={lastLetter==="y"  && text  ? highlightStyle : null}>Y</Button>
              <Button id="u" style={lastLetter==="u"  && text  ? highlightStyle : null}>U</Button>
              <Button id="i" style={lastLetter==="i"  && text  ? highlightStyle : null}>I</Button>
              <Button id="o" style={lastLetter==="o"  && text  ? highlightStyle : null}>O</Button>
              <Button id="p" style={lastLetter==="p" && text ? highlightStyle : null}>P</Button>
            </ButtonGroup>
        </Stack>
        <Stack id="row2" direction="row">
          <ButtonGroup variant="outlined" aria-label="outlined button group" size="large">
              <Button id="a" style={lastLetter==="a"  && text  ? highlightStyle : null}>A</Button>
              <Button id="s" style={lastLetter==="s"  && text  ? highlightStyle : null}>S</Button>
              <Button id="d" style={lastLetter==="d"  && text  ? highlightStyle : null}>D</Button>
              <Button id="f" style={lastLetter==="f"  && text  ? highlightStyle : null}>F</Button>
              <Button id="g" style={lastLetter==="g"  && text  ? highlightStyle : null}>G</Button>
              <Button id="h" style={lastLetter==="h"  && text  ? highlightStyle : null}>H</Button>
              <Button id="j" style={lastLetter==="j"  && text  ? highlightStyle : null}>J</Button>
              <Button id="k" style={lastLetter==="k"  && text  ? highlightStyle : null}>K</Button>
              <Button id="l" style={lastLetter==="l"  && text  ? highlightStyle : null}>L</Button>
            </ButtonGroup>
        </Stack>
        <Stack id="row3" direction="row">
          <ButtonGroup variant="outlined" aria-label="outlined button group" size="large">
            <Button id="z" style={lastLetter==="z" && text ? highlightStyle : null}>Z</Button>
            <Button id="x" style={lastLetter==="x" && text ? highlightStyle : null}>X</Button>
            <Button id="c" style={lastLetter==="c" && text ? highlightStyle : null}>C</Button>
            <Button id="v" style={lastLetter==="v" && text ? highlightStyle : null}>V</Button>
            <Button id="b" style={lastLetter==="b" && text ? highlightStyle : null}>B</Button>
            <Button id="n" style={lastLetter==="n" && text ? highlightStyle : null}>N</Button>
            <Button id="m" style={lastLetter==="m"  && text? highlightStyle : null}>M</Button>
          </ButtonGroup>
        </Stack>        
      </Stack>
      <Modal
         aria-labelledby="modal-title"
         aria-describedby="modal-desc"
         open={open}
         onClose={handleClose}
      >
            <div id="modal-div">
                <h3 id="modal-title">Game Over</h3>
                <div id="modal-desc">
                    <h5> Score : {score}</h5>
                    <h5> Level : {level}</h5>
                    <Button variant='contained' color="success" onClick={()=>saveGame()}>Save</Button>
                    <Button variant='contained' onClick={()=>window.location.reload()}>New Game</Button>
                </div>
            </div>
      </Modal>
      </Stack>
    </>
  );
}

export default Game;

