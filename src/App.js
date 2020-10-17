import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  //circles[0] = r1
  //circles[1] = r2
  //circles[2] = r3

  let circles = [40, 40, 40];
  circles = circles.sort()
  const colours = ["green", "blue", "red"];

  let circle2xPos =
    2 * Math.sqrt(circles[0] * circles[1]); // What Dr E has

  let theta1 = Math.asin((circles[0] - circles[1]) / (circles[0] + circles[1]))
  let theta2 = Math.acos(((circles[1] + circles[2]) + (circles[0] + circles[1]) + (circles[0] + circles[2])) / (2 * (circles[1] + circles[2]) * (circles[0] + circles[1])))
  console.log("theta1", theta1, theta2)
  let zeta = theta1 + theta2
  let peta = (Math.PI / 2) - zeta
  console.log("ZPETA", zeta, peta)
  let H = Math.sin(zeta) * (circles[1] + circles[2])
  console.log("H", H)
  let X = -circles[2] + (2 * Math.sqrt(circles[0] * circles[1])) - Math.sin(peta) * H
  console.log("X", X)

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
      console.log(circles[0]);
      if (i === 0) {
        xPos = 0;
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
    let _circles = circles.reverse().map((item, index) => (
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
          borderRadius: "50%",
        }}
      />
    ));
    let _shiftx = 0
    for (let circle of _circles) {
      console.log(circle.props.style)
      if (circle.props.style.left < 0) {
        console.log("SHIFT RIGHT", 1 - circle.props.style.left)
        _shiftx = 1 - circle.props.style.left
      }
      if (circle.props.style.top > (circles[0] + circles[1])) {
        circle.props.style.top = (circles[0])
      }
    }
    if (_shiftx !== 0) {
      for (let circle of _circles) {
        circle.props.style.left = circle.props.style.left + _shiftx
      }
    }
    console.log("NEW CIRCLES", _circles)
    return _circles
  };
  return (
    <div className="App">
      <div className="circles" ref={el => {
        // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
        if (!el) return;

        console.log("Bounding RECT", el.getBoundingClientRect().width); // prints 200px
        
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 300,
        width: 300,
        padding: 0,
        margin: 0
      }}>{getCircles()}</div>
    </div>
  );
}



