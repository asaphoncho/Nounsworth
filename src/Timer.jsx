import React, {useState, useEffect} from 'react'

function Timer({duration, innerText}){
  const timerEl = document.getElementById('timer-el')
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeout(()=>{
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval); // Stop timer when it reaches zero
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, 5000)
    
  }, [duration]);
  function color(){
    if (prevTime > 30){
      return "#163523"
    }
    else if(prevTime <= 30){
      return "#f9f871"
    }
    else{
      return "red"
    }
  }

  // Calculate the stroke-dashoffset based on the time left
  const radius = 60; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / duration) * circumference;

  return (
    <div id='timer-el' style={{ width: "auto", height: "auto", position: "relative" }}>
      <svg width="125" height="125">
        {/* Background Circle */}
        <circle
          cx="62.5"
          cy="62.5"
          r={radius}
          stroke="#DCD072"
          strokeWidth="4"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="62.5"
          cy="62.5"
          r={radius + 1}
          stroke={timeLeft > 30 ? "#62FB74" : "#FF7165"}
          strokeWidth="2"
          fill="#163523"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{
            transition: "stroke-dashoffset 0.5s linear",
          }}
        />
      </svg>
      {/* Time Text */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "3rem",
          color: "#DCD072",
          fontWeight:"bold"
        }}
      >
        {innerText}
      </div>
    </div>
  );
}

export default Timer