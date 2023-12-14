import './Card.css';
import React, { useEffect, useState } from 'react'
const Card = ({ question, changeIndex }) => {

    const [failClick, setFailClick] = useState({ id: null })
    const [currentClick, setCurrentClick] = useState({id: null})
    const [next, setNext] = useState(true)


    const handleClick = (elem) => {
        const cur_id = elem.currentTarget.getAttribute("id");
        if (cur_id == question?.correctAnswer) {
            alert("Верно!")
            setCurrentClick((prevState) => ({
                ...prevState,
                id: cur_id,
            }));
            setFailClick({ id: null })
            setNext(false)
        }
        else {
            setFailClick((prevState) => ({
                ...prevState,
                id: cur_id,
            }));
            // elem.currentTarget.classList.toggle("fail")
        }

    }

    const handleClickNext = () => {
        setFailClick({ id: null })
        setCurrentClick({id:null})
        setNext(true)
        changeIndex()
    }


    return (
        <div className="card">
            <label>{question?.title}</label>
            <div className="container">
                {question?.data?.map((elem) =>
                    <img key={elem.id} id={elem.id} src={elem.src} onClick={handleClick} className={failClick.id == elem.id ? "fail" : currentClick.id==elem.id ? "correct" : ""}></img>
                )}
            </div>
            <button disabled={next} onClick={handleClickNext}>Далее</button>



        </div>
    )

}

export default Card;