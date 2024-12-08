import React, { useEffect, useState } from 'react';
import './Deadlock.css'
import { useMapglContext } from './MapglContext';

const baseList:Array<any> = [
    {
        "id": "0",
        "x1": 38.979371, 
        "y1": 45.039603,
        "x2": 38.979798, 
        "y2": 45.03955,
        "speed": 3,
        "street": "Северная-Коммунаров"
    },

    {
        "id": "1",
        "x1": 38.979552, 
        "y1": 45.039682,
        "x2": 38.979829, 
        "y2": 45.039644,
        "speed": 6,
        "street": "Северная"
    },

    {
        "id": "2",
        "x1": 38.979949,
        "y1": 45.039632,
        "x2": 38.980342, 
        "y2": 45.039566,
        "speed": 10,
        "street": "Коммунаров"
    },

    {
        "id": "3",
        "x1": 38.979727, 
        "y1": 45.039250,
        "x2": 38.979827, 
        "y2": 45.039518,
        "speed": 20,
        "street": "Коммунаров"
    },

    {
        "id": "4",
        "x1": 38.981622, 
        "y1": 45.039374,
        "x2": 38.982095, 
        "y2": 45.039304,
        "speed": 23,
        "street": "Северная-Митрофана Седина"
    }
]

const TrafficJamList = () => {
  // Состояние для хранения списка заторов
    const [trafficJams, setTrafficJams] = useState<any>([])

    useEffect(() => {
        setTrafficJams(baseList)
        trafficJams.forEach((element:any) => {
        const apiKey = 'e2f8db93-0614-42c7-b66d-c0911161dbcb'; // Замените на ваш ключ API
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
            element.speed = Math.round(data.result[0].total_distance / data.result[0].total_duration);
            console.log(trafficJams)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
  }, [setTrafficJams])

  const mapContext = useMapglContext();

  // Функция для обработки нажатия кнопки
  const handleButtonClick = (id:any) => {
    const deadlock = baseList.find(deadlock => deadlock.id === id);
    const x = (deadlock.x1 + deadlock.x2) / 2;
    const y = (deadlock.y1 + deadlock.y2) / 2;
    mapContext.center = [x, y];
  };

  return (
    <div className='deadlock-list'>
      <h1 className='deadlock-list-header'>Список заторов на дороге</h1>
      <ul className='deadlock-list-content'>
        {trafficJams.map((jam:any, index:number) => (
          <li key={index}>
            <h2>{jam.street}</h2>
            <p>Скорость: {jam.speed}км/ч</p>
            <button onClick={() => handleButtonClick(jam.id)}>Показать информацию</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficJamList;