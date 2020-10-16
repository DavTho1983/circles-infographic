import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  //circles[0] = r1
  //circles[1] = r2
  //circles[2] = r3

  const circles = [60, 60, 40];
  const colours = ["green", "blue", "red"];

  console.log("LENGTH", 2 * Math.sqrt(circles[0] * circles[1]))

  let circle2xPos =
    2 * Math.sqrt(circles[0] * circles[1]) + circles[0]; // What Dr E has

  let r1r2 = circles[0] + circles[1];
  let r1r3 = circles[0] + circles[2];
  let r2r3 = circles[1] + circles[2];

  let theta1 = Math.asin((circles[0] - circles[1]) / (circles[0] + circles[1]))
  let theta2 = Math.acos(((circles[1] + circles[2]) + (circles[0] + circles[1]) + (circles[0] + circles[2])) / (2 * (circles[1] + circles[2]) * (circles[0] + circles[1])))
  console.log("theta1", theta1, theta2)
  let zeta = theta1 + theta2
  let peta = (Math.PI / 2) - zeta
  console.log("ZPETA", zeta, peta)
  let H = Math.sin(zeta) * (circles[1] + circles[2])
  console.log("H", H)
  let X = circles[0] -circles[2] + (2 * Math.sqrt(circles[0] * circles[1])) - Math.sin(peta) * H
  console.log("X", X)

  // let ycoord = Math.cos(newAngle) * r1r3
  // let xcoord = Math.sin(newAngle) * r1r2

  const getCircleY = index => {
    let yPos = 0;
    if (index === 2) {
      yPos = H
    }
    console.log("YPos", yPos)
    return yPos;
  };

  const getCircleX = (index, x) => {
    let xPos = 0;

    console.log(circles);
    for (let i = 0; i < index + 1; i++) {
      console.log(circles[i]);
      if (i === 0) {
        xPos = circles[1];
      } else if (i === 1) {
        xPos = circle2xPos;
        console.log("xPos", xPos);
      } else if (i === 2) {
        xPos = X
      }
    }
    console.log("XPos", xPos)
    return xPos;
  };

  const getCircles = () => {
    return circles.map((item, index) => (
      <div
        className="circle"
        style={{
          position: "absolute",
          top: getCircleY(index),
          left: getCircleX(index, getCircleY(index)),
          height: 2 * item,
          width: 2 * item,
          padding: 0,
          margin: 0,
          backgroundColor: colours[index],
          borderRadius: "50%"
        }}
      />
    ));
  };
  return (
    <div className="App">
      <div className="circles">{getCircles()}</div>
    </div>
  );
}



