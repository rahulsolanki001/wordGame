import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button} from "@mui/material";
import { useEffect,useState } from "react";
import "./Scores.css";
import { Link } from "react-router-dom";


const Scores=()=>{
    const[data,setData]=useState([])
    useEffect(()=>{
        getScores()
    },[])
    const getScores=async ()=>{
        const res=await fetch(`/`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            }
        
        })
         const dataReturned=await res.json()
         setData(dataReturned)
    }

const avg=arr=>(arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(2)
    
    return (
        <>
        <TableContainer component={Paper} id="table">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Max Level</TableCell>
                        <TableCell align="right">Average Score</TableCell>
                        <TableCell align="right">Games Played</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((user,index)=>(
                        <TableRow key={index}>
                            <TableCell><strong>{user.username}</strong></TableCell>
                            <TableCell align="right">{user.maxLevel>1 ? user.maxLevel : 1}</TableCell>
                            <TableCell align="right">{user.scores.length>0 ? avg(user.scores) : 0}</TableCell>
                            <TableCell align="right">{user.scores.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Link to="/"><Button variant="contained" color="success" id="button">New Game</Button></Link>
        </>
    )
}

export default Scores;