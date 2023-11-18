// enabled react intelli sense
import React from "react";
import Navbar from "./Navbar";
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';


const Home = () =>{
    return(
        <div className="home-container">
            <Navbar/>
            <div className="texts">
            <TextField className="text-field" placeholder="Search Item Here"></TextField>
            <button className="textbtn">Search</button>
            </div>
        </div>
    )
};
export default Home;