import React from "react";
import { Anchor } from "../Anchor/Anchor";

export const Navbar = () =>{
    return(
        <nav className="navegator">
            <ul>
                <li><Anchor Route="/home" content="Home" style="Home"/></li>
                <li><Anchor Route="/login" content="Login" style="Login"/></li>
                <li><Anchor Route="/register" content="Register" style="Register"/></li>
            </ul>
        </nav>
    )
}