
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Input, 
    InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label } from "reactstrap";

import './TraCuu.css';
import { baseURL } from "../constants/baseURL";

export default function TraCuu (){

    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);//ket qua tra ve sau khi tim thay
    const [toggle, setToggle] = useState(false);
    const [updateWord, setUpdateWord] = useState({});
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        axios.get(baseURL)
        .then (res => setData(() => res.data))
        .catch (err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({...values, [name] : value}));
        console.log(inputs);
    };

    function searchData() {
        var searchInput = document.querySelector("#input").value;
        searchInput = searchInput.toLowerCase();
        var result = [];
       for (var i = 0; i < data.length; i++){
           var buffer = data[i].cachViet.toLowerCase(); 
           if (buffer.search(searchInput) !== -1)
           result.push(data[i]);
        }
        if (result.length === 0) 
            result.push({_id: "empty",cachViet:"Cant't find"});
        console.log("result", result);
        setResult(() => result);
    }

    function openUpdateToggle(word){
        console.log(word);
        handleToggle();
        //updateWord = word
        setUpdateWord(() => word);
    }

    async function handleUpdate(word){
        var cachViet = document.querySelector('#cachViet').value;
        var nguNghia = document.querySelector('#nguNghia').value;
        var phienAm = document.querySelector('#phienAm').value;
        var updateWord = {
            _id: word._id,
            cachViet: cachViet,
            nguNghia: nguNghia,
            phienAm: phienAm
        };
        if (cachViet === "" || nguNghia === "" || phienAm === "")
            {
                alert("Không thành công");
                return;
            }
        await axios.post(`${baseURL}/update`, updateWord)
            .catch(err => {
                console.log(err);
                alert("Không thành công");
            });
        console.log("Update word: ", updateWord);
        //refresh data from server
        refreshData();
         //Set lai hien thi
         for (var i = 0; i < result.length; i++){
            if (result[i]._id === word._id)
                result[i] = updateWord;
        }
        handleToggle();
        // Tim cach toi uu hon
    }

    function handleDelete(e)
    {
        var newResult = [];
        var wrap = e.target.parentElement.childNodes[0];
        var word = wrap.innerText || wrap.innerHTML;
        var item ;
        for (var i = 0; i < result.length;i++){
            if (result[i].cachViet === word){
                item = result[i];break;
            }
        }
        axios.post(`${baseURL}/delete`, item)
        .catch(err => {
            console.log(err);
        });
        
        newResult = result.filter((item) => {
            return item.cachViet !== word;
        });
        setResult(() => newResult);
        console.log(newResult);
        refreshData();//refresh data
    }

    async function refreshData(){
        //Set lai data tu server
        await axios.get(baseURL)
        .then (res => setData(() => res.data))
        .catch (err => console.log(err));
    }

    function handleToggle(){
        setToggle(() => !toggle);
    }
    
    return(
        <div>
             <div className="inputGroup">
                <InputGroup>
                    <Input name="keyword" className="input" id="input" onChange={handleChange}/>
                    <Button
                        onClick={searchData}
                        disabled={!inputs.keyword}
                    >
                    Search</Button>
                </InputGroup>
            </div>
            <div>
                {
                    result.map((e) => (
                        <Card key={e._id}>
                            <CardBody>
                                <CardTitle tag="h5"> 
                                    {e.cachViet}
                                </CardTitle>
                                <CardSubtitle>Pronunciation: {e.phienAm}</CardSubtitle>
                                <CardText>Meaning: {e.nguNghia}</CardText>
                                <Button size="sm" onClick={() => openUpdateToggle(e)} className="edit-bt">Edit</Button>
                                <Button size="sm" color="danger" onClick={handleDelete} className="delete-bt">Delete</Button>
                            </CardBody>
                        </Card>
                    ))
                }

                {/* Modal for update Word */}
                <Modal isOpen={toggle}>
                    <ModalHeader>Edit word</ModalHeader>
                    <ModalBody>
                        <div id="form">
                            <FormGroup>
                                <Label for="cachViet">
                                    Enter word
                                </Label>
                                <Input
                                id="cachViet"
                                name="cachViet"
                                type="text"
                                defaultValue={updateWord.cachViet}
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
                                defaultValue={updateWord.phienAm}
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
                                defaultValue={updateWord.nguNghia}
                                />
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button  size="sm" onClick={handleToggle}>Cancel</Button>
                        <Button color="success" size="sm" onClick={() => handleUpdate(updateWord)}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}