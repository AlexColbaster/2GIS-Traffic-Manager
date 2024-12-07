import React, { useEffect, useState } from 'react';
import './Deadlock.css'

const trafficJams= 
    [
        {
            "id": "0",
            "x1": 45.039603, 
            "y1": 38.979371,
            "x2": 45.03955, 
            "y2": 38.979798,
            "speed": 13,
            "street": "Северная-Коммунаров"
        },
    
        {
            "id": "1",
            "x1": 45.039682, 
            "y1": 38.979552,
            "x2": 45.039644, 
            "y2": 38.979829,
            "speed": 12,
            "street": "Северная"
        },
    
        {
            "id": "2",
            "x1": 45.039632,
            "y1": 38.979949,
            "x2": 45.039566, 
            "y2": 38.980342,
            "speed": 16,
            "street": "Коммунаров"
        },
    
        {
            "id": "3",
            "x1": 45.039250, 
            "y1": 38.979727,
            "x2": 45.039518, 
            "y2": 38.979827,
            "speed": 55,
            "street": "Северная-Митрофана Седина"
        }
]

const TrafficJamList = () => {
  // Состояние для хранения списка заторов
  

  useEffect(() => {
    
  }, [])

  // Функция для обработки нажатия кнопки
  const handleButtonClick = (id:any) => {
    trafficJams.forEach((element:any) => {
        const apiKey = ''; // Замените на ваш ключ API
        const url = `https://routing.api.2gis.com/truck/6.0.0/global?key=${apiKey}`;

        const data = {
            points: [
                {
                    type: "walking",
                    x: element.x1,
                    y: element.y1
                },
                {
                    type: "walking",
                    x: element.x2,
                    y: element.y2
                }
            ],
            type: "truck_jam"
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
  };

  return (
    <div className='deadlock-list'>
      <h1>Список заторов на дороге</h1>
      <ul>
        {trafficJams.map((jam:any) => (
          <li key={jam.street}>
            <h2>{jam.street}</h2>
            <p>Скорость: {jam.speed}</p>
            <button onClick={() => handleButtonClick(jam.id)}>Показать информацию</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficJamList;