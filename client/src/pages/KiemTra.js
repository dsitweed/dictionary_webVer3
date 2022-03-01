import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import Exam from "../components/Exam"

import "./KiemTra.css";
import { baseURL } from "../constants/baseURL";

export default function KiemTra (){
    const [numberQuestion, setNumberQuestion] = useState(0);
    const [data, setData] = useState([]);
    const [again, setAgain] = useState(false);

    useEffect(() => {
        axios.get(baseURL)
            .then(res => setData(res.data))
            .catch(err => console.log("err: ", err));

    } ,[]);

    function makeQuestion(){
        const value = document.querySelector("#numberQuestion").value || 0;
        if (value > data.length || value < 1)
        {
            alert("Number of question is unavailable");
            return;
        }
        setNumberQuestion(value);
    }


    return(
        <div>
            {
                (numberQuestion > 0) ? 
               <div>
                    <Exam numberQuestion={numberQuestion}
                        handleAgain={setNumberQuestion}
                    >
                    </Exam>
                    <Button onClick={() => {setNumberQuestion(0)}}>Do exam again</Button>
                </div>
                : <div className="inputNumberQuestion">
                    <h4>Enter number of question</h4>
                    <Input 
                        type="number"
                        max={data.length} min={1}
                        id="numberQuestion"
                        placeholder={"Maximum " + data.length}
                    />
                    <Button color="success" 
                        onClick={() => makeQuestion()}
                    >
                    OK</Button>
                </div>
            }
        </div>
    );
}