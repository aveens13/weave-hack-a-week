import React from "react";
import { getmonth } from "./util"
import './timeline.css'

function Timeline(){
    console.table(getmonth(5));
    return(
        <h1>Timeline</h1>
    )
}

export default Timeline;