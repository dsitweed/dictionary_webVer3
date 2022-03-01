import React, {useEffect, useState} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { ListGroup } from "reactstrap";

import "./BieuDo.css";  


export default function Test (){
    const [results, setResults] = useState([]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    useEffect(() => {
        axios.get(`${baseURL}/get-results`)
            .then(res => setResults(res.data))
            .catch(err => console.log("err: ", err));
    }, []);
      
        const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Result Chart',
          },
        },
      };
      
      const labels = setLabels(results);
      const data = {
        labels,
        datasets: [
          {
            label: 'Did',
            data: setData(results, "maxScore"),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Right',
            data: setData(results,"score"),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    return(
        <div>
            <div className="chart-title">Result Chart</div>
           <Line options={options} data={data} className="line-chart"></Line>
        </div>
    );
}

function setLabels(result){ 
    var arr = [];
    for (var i = 0; i< result.length; i++){
        var date = new Date(result[i].createdAt);
        date = date.getDate() +'/' + (date.getMonth() + 1) +'/' + date.getFullYear();
        if (arr.find(e => e === date) === undefined) 
            arr = [...arr, date];
    }
    return arr;
}

function setData(result , type){
    var arr = [], i = result.length - 1;
    var labels = setLabels(result);
    for (var j = 0; j < labels.length;j++) arr[j] = 0;
    while (i >= 0){
        var date = new Date(result[i].createdAt);
        date = date.getDate() +'/' + (date.getMonth() + 1) +'/' + date.getFullYear();
        var index = labels.findIndex((e) => e === date);
        if (index != -1){
            if (type === "score")
                arr[index] = arr[index] + result[i].score;
            if (type === "maxScore")
                arr[index] = arr[index] + result[i].maxScore;
        } 
        i--;
    }
    console.log(arr);
    return arr;
}