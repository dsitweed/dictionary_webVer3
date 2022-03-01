
import React, {useEffect, useState} from "react";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import "./Result.css"

export default function Test (){
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/get-results`)
                .then(res => setData(res.data.reverse()))
                .catch(err => console.log("err: ", err));
        
    }, []);
    console.log(data);
    return(
        <div>
            <div className="header-content">Recent result</div>
            {
                data ? 
                data.map((e) => {
                    return (
                        <div key={e._id} className="content">
                            <div className="score">Result: {e.score}/{e.maxScore}</div>
                            <div className="time">{toDate(new Date(e.createdAt))}</div>
                        </div>
                    );
                })
                : <div></div>
            }
        </div>
    );
}


function toDate(data) {
    console.log(data);
	return (
		data.getDate() +
		'/' +
		(data.getMonth() + 1) +
		'/' +
		data.getFullYear() +
		' - ' +
		data.getHours() +
		':' +
		data.getMinutes()
	);
}