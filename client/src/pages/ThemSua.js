
import axios from "axios";
import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

import "./ThemSua.css";
import { baseURL } from "../constants/baseURL";

export default function ThemSua (){
    
    function handlePost(){
        var cachViet = document.querySelector('#cachViet').value;
        var nguNghia = document.querySelector('#nguNghia').value;
        var phienAm = document.querySelector('#phienAm').value;
        var newWord = {
            cachViet: cachViet,
            nguNghia: nguNghia,
            phienAm: phienAm
        };
        if (cachViet === "" || nguNghia === "" || phienAm === "")
            {
                alert("Unsuccess");
                return;
            }
        axios.post(baseURL, newWord)
            .catch(err => {
                console.log(err);
                alert("Unsuccess");
            });
        console.log("Add new word: ", newWord);
        //Succes -> delete old data
        document.querySelector('#cachViet').value = "";
        document.querySelector('#nguNghia').value = "";
        document.querySelector('#phienAm').value = "";
        alert("Success");
    }

    return(
        <div>
            <div id="form">
                <h2>Add new word</h2>
                <FormGroup>
                    <Label for="cachViet">
                        Enter word
                    </Label>
                    <Input
                    id="cachViet"
                    name="cachViet"
                    type="text"
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phienAm">
                        Pronunciation
                    </Label>
                    <Input
                    id="phienAm"
                    name="phienAm"
                    type="text"
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="nguNghia">
                        Meaning
                    </Label>
                    <Input
                    id="nguNghia"
                    name="nguNghia"
                    type="text"
                    required
                    />
                </FormGroup>
                <Button onClick={handlePost}> Save</Button>    
            </div>
        </div>
    );
}