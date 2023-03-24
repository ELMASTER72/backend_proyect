import React from "react";
import { Link } from "react-router-dom";

export const Anchor = ({content,style,Route}) => {
    return <Link to={Route} className={style}>{content}</Link> 
}