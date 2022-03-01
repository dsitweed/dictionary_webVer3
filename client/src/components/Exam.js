import React, {useEffect, useState} from "react";
import axios from "axios";
import { baseURL } from "../constants/baseURL"; 
import { Button, Input } from "reactstrap";

export default function Exam({numberQuestion}) {
    const [data, setData] = useState([]);
    const [submit, setSubmit] = useState(true);
    const [quiz, setQuiz] = useState({
        ques: [],
        ans: []
    });
    const [saveAnswer, setSaveAnswer] = useState([]);

    useEffect(() => {
        axios.get(baseURL)
            .then(res => setData(res.data))
            .catch(err => console.log("err: ", err));
    } ,[]);

    useEffect(() => {
        makeQuestion(data.length);
    }, [data]);
    
    function makeQuestion(dataLength){
        const number = numberQuestion;
        var ques = [];
        var ans = [];
        ques = random(-1,dataLength, number);
        for (var i = 0; i < number; i++ ){
            var arr = random(ques[i], dataLength, 4);
            ans.push(arr);
        }
        //set Quiz
        setQuiz({ans:ans,ques:ques});
    }

    const handleSubmit = () => {
        var score = 0;
        for (var i = 0; i< numberQuestion; i++){
            if (saveAnswer[i] === true) score++;
        }
        var result = {"score" : score,"maxScore": numberQuestion};
        axios.post(`${baseURL}/up-result-exam`, result)
        .catch(err => {
            console.log(err);
            alert("Không thành công");
        });
        alert(`Result: ${score}/${numberQuestion}`);
        setSubmit(false);
    };

    const takeAnswer = (e) => {
        var key = e.target.name;
        // == kiem tra gia  tri thoi
        //          string                number
        var value = (e.target.value == quiz.ques[key]) ? true : false;
        // console.log(`${e.target.value} === ${quiz.ques[key]}`); 
        setSaveAnswer((values) => ({...values, [key]: value}));
        // console.log(saveAnswer);
    };

    return(
        <div>
            {
                quiz.ques.map((item, index) => (
                    <div className="card" key={index}>
                        <div className="headerQuestion">
                            {"Ques" + (index + 1) + ": " + data[item].cachViet}
                        </div>
                        <div className="bodyQuestion">
                            {/* Dap an A */}
                            <label className="radio-inline">
                            <Input type="radio" name={index} value={`${quiz.ans[index][0]}`}
                                onChange={takeAnswer}/>
                                {data[quiz.ans[index][0]].nguNghia}
                            </label>
                            {/* Dap an B */}
                            <label className="radio-inline">
                            <Input type="radio" name={index} value={`${quiz.ans[index][1]}`}
                                onChange={takeAnswer}/>{data[quiz.ans[index][1]].nguNghia}
                            </label>
                            {/* Dap an C */}
                            <label className="radio-inline">
                            <Input type="radio" name={index} value={`${quiz.ans[index][2]}`}
                                onChange={takeAnswer}/>{data[quiz.ans[index][2]].nguNghia}
                            </label>
                            {/* Dap an D */}
                            <label className="radio-inline">
                            <Input type="radio" name={index} value={`${quiz.ans[index][3]}`}
                                onChange={takeAnswer}/>{data[quiz.ans[index][3]].nguNghia}
                            </label>
                        </div>
                    </div>
                ))
            }
        <Button type="submit" onClick={handleSubmit} 
            disabled={!(Object.keys(saveAnswer).length == numberQuestion && submit)}
        >Result</Button>   
        </div>
    );
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