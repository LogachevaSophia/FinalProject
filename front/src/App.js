import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Card from './components/Card/Card';

function App() {
  const [question, setQuestion] = useState({})
  const apiUrl = 'http://192.168.0.104:5000'
  const getQuestion = async() =>{
    axios.get(`${apiUrl}/getQuestion`).then((resp) => {
      console.log(resp)
      setQuestion(resp.data)
 
     });
  }
  useEffect(() => {
    getQuestion();
    

  }, [])


  const changeIndex = () => {
    getQuestion();
  }

  return (
    <div className="App">
      <Card question={question} changeIndex={changeIndex} />
    </div>
  );
}

export default App;
