import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = 'http://localhost:5000/posts';


export default function BieuDo (){

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(baseURL)
            .then (res => setData(res.data))
            .catch (err => {
                console.log("error: ", err);
            });
    }, []);
    return(
        <div>
            Tets
        </div>
    );
}