import { useEffect, useState } from 'react'
import './App.css'
import PlayerInput from './PlayerInput'
import Timer from './Timer'
import Button from './Button'

function App() {
  const [nameValue, setNameValue] = useState("")
  const [foodValue, setFoodValue] = useState("")
  const [animalValue, setAnimalValue] = useState("")
  const [placeValue, setPlaceValue] = useState("")
  const [thingValue, setThingValue] = useState("")
  const [count, setCount] = useState(0)
  const [letter, setLetter] = useState("A")
  const [nameResponse, setNameResponse] = useState(false)
  const [foodResponse, setFoodResponse] = useState(false)
  const [animalResponse, setAnimalResponse] = useState(false)
  const [placeResponse, setPlaceResponse] = useState(false)
  const [thingResponse, setThingResponse] = useState(false)
  const [responseSubmitted1, setResponseSubmitted1] = useState(false)
  const inputArea = document.getElementById('input-area')
  const alphabet = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']
  
  
  const randomIndex = Math.floor(Math.random(alphabet)*alphabet.length)
  let randomLetter = alphabet[randomIndex]
  let countNumber = 0
  useEffect(() => {
    const interval = setInterval(() => {
    setCount(c => {
        if (c == 50) {
        clearInterval(interval);
        setTimeout(()=>{
          inputArea.style.display= 'flex'
          inputArea.style.animation='in 1.5s'
          inputArea.style.transition='ease-in'
        }, 500)
        return 50;
        }
        return c + 1;
        
    });
    }, 100);
    return () => clearInterval(interval)
  }, [count]);
  /*function countUp(){
    const intervalID = setInterval(()=>{
      if(countNumber < 50){
        console.log(count)
        countNumber++
        setCount(countNumber)
      }
      else{
        clearInterval(intervalID)
        gameArea.style.display= 'flex'
      }
    }, 100)
  }*/
   /* async function getWord(word) {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '7039d2b2e3msh78e52f99ec4aed5p1f600fjsnccea29994641',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if(result.message == "Sorry pal, we couldn't find definitions for the word you were looking for."){
          console.log("word does not exist")
          //setResponse(false)
        }
        else{
          console.log(result);
          console.log("word exists")
         // setResponse(true)
        }
      } catch (error) {
        console.error(error);
      }
    }*/
  useEffect(()=>{setLetter(randomLetter)}, [count, responseSubmitted1])

  let debounceTimeout;

function handleNameChange(event) {
    const word = event.target.value;
    setTimeout(()=>{
      setNameValue(word)
    }, 2000)
    ;

    // Clear the previous timer if there is one
    clearTimeout(debounceTimeout);

    // Set a new timeout to validate the word after a delay
    debounceTimeout = setTimeout(() => {
        getName(word); // Call getWord only after the user stops typing for 2 seconds
    }, 1000);
}

async function getName(word) {
  const apiKey = 'ho014135745'
    const url = `https://www.behindthename.com/api/lookup.json?name=${word}&key=${apiKey}`
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result[0].name)
        if (result.message === "Sorry pal, we couldn't find definitions for the word you were looking for.") {
            //console.log("word does not exist");
            setNameResponse(false);
        } else {
            //console.log(result);
            //console.log("word exists");
            setNameResponse(true);
        }
    } catch (error) {
        console.error(error);
    }
}
async function getFood(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7039d2b2e3msh78e52f99ec4aed5p1f600fjsnccea29994641',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!word ||result.message === "Sorry pal, we couldn't find definitions for the word you were looking for.") {
          //console.log("word does not exist");
          setFoodResponse(false);
      } else {
          //console.log(result);
          //console.log("word exists");
          setFoodResponse(true);
      }
  } catch (error) {
      console.error(error);
  }
}
async function getAnimal(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7039d2b2e3msh78e52f99ec4aed5p1f600fjsnccea29994641',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!word ||result.message === "Sorry pal, we couldn't find definitions for the word you were looking for.") {
          //console.log("word does not exist");
          setAnimalResponse(false);
      } else {
          //console.log(result);
          //console.log("word exists");
          setAnimalResponse(true);
      }
  } catch (error) {
      console.error(error);
  }
}
async function getPlace(word) {
  const apiKey = 'fee4854bc5a87d35ee3c13f620db46bf'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${word}&appid=fee4854bc5a87d35ee3c13f620db46bf`

  try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (word == "" ||result.message === "city not found" || word.charAt(0).toUpperCase() != letter.toUpperCase()) {
          //console.log("city does not exist");
          setPlaceResponse(false);
      } else {
          //console.log(result);
          //console.log("word exists");
          setPlaceResponse(true);
      }
  } catch (error) {
      console.error(error);
  }
}

async function getThing(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7039d2b2e3msh78e52f99ec4aed5p1f600fjsnccea29994641',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!word ||result.message === "Sorry pal, we couldn't find definitions for the word you were looking for.") {
          //console.log("word does not exist");
          setThingResponse(false);
      } else {
          //console.log(result);
          //console.log("word exists");
          setThingResponse(true);
      }
  } catch (error) {
      console.error(error);
  }
}

  /*function handleNameChange(event){
    setNameValue(e => event.target.value)
    setTimeout(getWord(nameValue), 2000)
  }*/
  function handleFoodChange(event){
    const word = event.target.value;
    setFoodValue(word);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        getFood(word);
    }, 1000);
  }
  function handleAnimalChange(event){
    const word = event.target.value;
    setAnimalValue(word);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        getAnimal(word);
    }, 1000);
  }
  function handlePlaceChange(event){
    const word = event.target.value;
    setPlaceValue(word);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        getPlace(word);
    }, 1000);
  }
  function handleThingChange(event){
    const word = event.target.value;
    setThingValue(word);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        getThing(word);
    }, 1000);
  }
  function resetGame(){
    setResponseSubmitted1(false)
    setNameValue("")
    setFoodValue("")
    setAnimalValue("")
    setPlaceValue("")
    setThingValue("")
    setNameResponse(false)
    setFoodResponse(false)
    setPlaceResponse(false)
    setAnimalResponse(false)
    setThingResponse(false)
    setCount(0)
  }

if(!responseSubmitted1){
  return (
    <>
    <div className='game-area' id='game-area'>
      <Timer innerText={letter.toUpperCase()} duration={60}/>  
      <div className='input-area' id='input-area'>
        <PlayerInput className="player-input" label="Name" placeHolder={letter.toUpperCase()} onChange={handleNameChange}  response={nameResponse}/>
        <PlayerInput className="player-input" label="Food" placeHolder={letter.toUpperCase()} value={foodValue} onChange={handleFoodChange} response={foodResponse} />
        <PlayerInput className="player-input" label="Animal" placeHolder={letter.toUpperCase()} value={animalValue} onChange={handleAnimalChange} response={animalResponse}/>
        <PlayerInput className="player-input" label="Place" placeHolder={letter.toUpperCase()} value={placeValue} onChange={handlePlaceChange} response={placeResponse}/>
        <PlayerInput className="player-input" label="Thing" placeHolder={letter.toUpperCase()} value={thingValue} onChange={handleThingChange} response={thingResponse}/>
        <Button onClick={()=>{setResponseSubmitted1(true)}}>Play</Button>
      </div>
        
    </div>
    </>
  )
}
else if(responseSubmitted1){
  return(
    <>
      <div className='game-area'>
        <div>
          <span>SCORE</span>
          <div>
            <span>Name</span>
            <span>{nameValue}</span>
            <span>{nameValue && nameResponse ? (nameValue.length)*100 : 0}</span>
          </div>
          <div>
            <span>Food</span>
            <span>{foodValue}</span>
            <span>{foodValue && foodResponse ? (foodValue.length)*100 : 0}</span>
          </div>
          <div>
            <span>Animal</span>
            <span>{animalValue}</span>
            <span>{animalValue && animalResponse ? (animalValue.length)*100 : 0}</span>
          </div>
          <div>
            <span>Place</span>
            <span>{placeValue}</span>
            <span>{placeValue && placeResponse ? (placeValue.length)*100 : 0}</span>
          </div>
          <div>
            <span>Thing</span>
            <span>{thingValue}</span>
            <span>{thingValue && thingResponse ? (thingValue.length)*100 : 0}</span>
          </div>
        </div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </>
  )
}
  
}

export default App
