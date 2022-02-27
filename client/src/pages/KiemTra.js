import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";

import "./KiemTra.css";
import { baseURL } from "../constants/baseURL";

export default function KiemTra (){
    const [data, setData] = useState([]);
    const [quiz, setQuiz] = useState({
        ques: [],
        ans: []
    });

    useEffect(() => {
        axios.get(baseURL)
            .then(res => setData(res.data))
            .catch(err => console.log("err: ", err));
    } ,[]);
   

    function makeQuestion(){
        const numberQuestion = document.querySelector("#numberQuestion").value;
        var ques = [];
        var ans = [];
        console.log(numberQuestion);
        if (numberQuestion > data.length || numberQuestion < 1)
        {
            alert("Số lượng câu hỏi không hợp lệ");
            return;
        }
        ques = random(-1,data.length, numberQuestion);
        console.log("question:", ques);
        for (var i = 0; i < numberQuestion; i++ ){
            var arr = random(ques[i], data.length, 4);
            ans.push(arr);
        }
        console.log(`question: ${ques}`);
        console.log("ans", ans);
        //set Quiz
        setQuiz({ans:ans,ques:ques});
    }

    //defautlChoice hay ansPosition is answer of question
    function random (defaultChoice, end, number){
        var arr = [];
        var ansPosition = Math.floor((Math.random() * 4));
        if (end < number) return arr;
        if (defaultChoice !== -1) {
            arr.push(defaultChoice);
            number--;
        }
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
           var run = arr[ansPosition];
           arr[ansPosition] = defaultChoice;
           arr[0] = run;
        }
        return arr;
    }

    function show(){
        return(
            <div>
                {
                    quiz.ques.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="headerQuestion">
                                {"Câu " + (index + 1) + ": " + data[item].cachViet}
                            </div>
                            <div className="bodyQuestion">
                                {/* Dap an A */}
                                <div className="bodyAnswer">
                                    {console.log("Ngu nghia (test)", data[quiz.ans[index][0]].nguNghia)}
                                    {data[quiz.ans[index][0]].nguNghia}
                                </div>
                                {/* Dap an B */}
                                <div className="bodyAnswer">
                                    {data[quiz.ans[index][1]].nguNghia}
                                </div>
                                {/* Dap an C */}
                                <div className="bodyAnswer">
                                    {data[quiz.ans[index][2]].nguNghia}
                                </div>
                                {/* Dap an D */}
                                <div className="bodyAnswer">
                                    {data[quiz.ans[index][3]].nguNghia}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

    return(
        <div>
            <div className="inputNumberQuestion">
                <h4>Nhập số câu hỏi muốn làm</h4>
                <Input 
                    type="number"
                    max={data.length} min={1}
                    id="numberQuestion"
                    placeholder={"Số câu tối đa " + data.length} 
                />
                <Button color="success" onClick={() => makeQuestion()}>OK</Button>
            </div>
            {
                (data.length !== 0 && quiz.ans.length !== 0) ? show()
                : console.log("end")
            }
        </div>
    );
}