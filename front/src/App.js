import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Card from './components/Card/Card';

function App() {
  const arrQuestiion = [{
    correctAnswer: 1,
    title: "Пикачу",
    data:
      [
        { id: 4, src: 'https://i.pinimg.com/564x/f1/a8/6a/f1a86a14b892480eeaf2a4d1f98af5c2.jpg' },
        { id: 1, src: 'https://i.pinimg.com/564x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg' },

        { id: 3, src: 'https://i.pinimg.com/564x/38/61/6f/38616f4a0f45ba196a176620cd564e87.jpg' },
        { id: 2, src: 'https://i.pinimg.com/564x/cc/22/2c/cc222ccced0cc5475d955a9f13dd03ba.jpg' },
      ]
  },
  {
    correctAnswer: 2,
    title: "Пикачу2",
    data:
      [{ id: 3, src: 'https://i.pinimg.com/564x/38/61/6f/38616f4a0f45ba196a176620cd564e87.jpg' },
      { id: 1, src: 'https://i.pinimg.com/564x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg' },
      { id: 2, src: 'https://i.pinimg.com/564x/cc/22/2c/cc222ccced0cc5475d955a9f13dd03ba.jpg' },

      { id: 4, src: 'https://i.pinimg.com/564x/f1/a8/6a/f1a86a14b892480eeaf2a4d1f98af5c2.jpg' }]
  }, {
    correctAnswer: 3,
    title: "Пикачу3",
    data:
      [
        { id: 2, src: 'https://i.pinimg.com/564x/cc/22/2c/cc222ccced0cc5475d955a9f13dd03ba.jpg' },
        { id: 3, src: 'https://i.pinimg.com/564x/38/61/6f/38616f4a0f45ba196a176620cd564e87.jpg' },
        { id: 4, src: 'https://i.pinimg.com/564x/f1/a8/6a/f1a86a14b892480eeaf2a4d1f98af5c2.jpg' },
        { id: 1, src: 'https://i.pinimg.com/564x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg' },]
  }]

  const [question, setQuestion] = useState({})
  // const question = {
  //   correctAnswer: 1,
  //   title: "Пикачу",
  //   data:
  //     [{ id: 1, src: 'https://i.pinimg.com/564x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg' },
  //     { id: 2, src: 'https://i.pinimg.com/564x/cc/22/2c/cc222ccced0cc5475d955a9f13dd03ba.jpg' },
  //     { id: 3, src: 'https://i.pinimg.com/564x/38/61/6f/38616f4a0f45ba196a176620cd564e87.jpg' },
  //     { id: 4, src: 'https://i.pinimg.com/564x/f1/a8/6a/f1a86a14b892480eeaf2a4d1f98af5c2.jpg' }]
  // }

  const [maxCount, setMaxCount] = useState(0);

  useEffect(()=>{
    const apiUrl = 'http://192.168.0.104:5000/countPokemons'
    axios.get(apiUrl).then((resp) => {
      setMaxCount(resp?.data?.count)
    })
  }, [])
  const changeIndex = () => {
    const min = 0;
    const max = arrQuestiion.length - 1;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(rand)
    setQuestion(arrQuestiion[rand])
  }
  useEffect(() => {
    changeIndex()
  }, [])

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* {arr.map((number) => */}
      <Card question={question} changeIndex={changeIndex} />
      {/* )} */}

    </div>
  );
}

export default App;
