import React, { useEffect, useState } from 'react';
import { getRandomColor } from '../utils/utils';
const RADIUS = 50;

const Circle = ({ top, left, background }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: '50%',
        top,
        left,
        background,
      }}
    ></div>
  );
};

const DetectCircle = () => {
  const [circleCords, setCircleCords] = useState([]);
  useEffect(() => {
    document.addEventListener('click', drawCircle);

    () => document.removeEventListener('click', drawCircle);
  }, []);

  const drawCircle = (e) => {
    const { clientX, clientY } = e;
    const newCircleCords = {
      top: clientY - RADIUS,
      left: clientX - RADIUS,
      right: clientX - RADIUS + RADIUS * 2,
      bottom: clientY - RADIUS + RADIUS * 2,
      background: 'red',
    };
    setCircleCords((oldCircleCoords) => {
      for(let i = 0; i < oldCircleCoords.length; i++) {
        const collides = circleOverlaps(newCircleCords, oldCircleCoords[i])
        if(collides){
          newCircleCords.background = getRandomColor()
          break;
        }
      }
      return [...oldCircleCoords, newCircleCords]
    });
  };

  const circleOverlaps = (c1, c2) => {
    // circle colliding condition
    const collides = !(
      c1.top > c2.bottom ||
      c1.right < c2.left ||
      c1.bottom < c2.top ||
      c1.left > c2.right
    );

    return collides;
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h1 style={{ textAlign: 'center' }}>DetectCircle</h1>
      {circleCords.map((coords) => {
        return (
          <Circle {...coords} key={coords.top + coords.left + coords.bottom} />
        );
      })}
    </div>
  );
};

export default DetectCircle;
