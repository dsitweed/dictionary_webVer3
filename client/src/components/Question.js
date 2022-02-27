import React, {useEffect, useState} from "react";
import axios from "axios";
import { baseURL } from "../constants/baseURL";


export default function Question(props) {
    const data = props.data;
    const answer = props.answer;
    var arr= [];

    useEffect(() => {
        arr = random(-1, data.length, 4);
        console.log("arr", arr);
        console.log("answer", answer);
    }, []);

    function random (defaultChoice, end, number){
        var arr = [];
        if (end < number) return [];
        for (var i = 0; i < number ; i++){
            //random 0 -> end (not contain end)
            var run;
            do {
                run = Math.floor((Math.random() * end));
            } while (arr.find(e => e === run) !== undefined);
            arr.push(run);
        }
        //defaultChoice is answer of question if have
        if (defaultChoice !== -1) {
            var run = Math.floor((Math.random() * 4));
            arr[run] = defaultChoice;
        }
        return arr;
    }

    return(
       <div className="question">
                <div className="quesHeader">
                    {answer}
                </div>
                <div className="ansContainer">
                   {
                       
                   }
                </div>
        </div>
    );
}