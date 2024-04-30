import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ----------------------- カード情報 -----------------------
const cardInfo = [
  {"number":0, "name": "堀", "type": "Reaction", "cost": 2},
  {"number":1, "name": "礼拝堂", "type": "None", "cost": 2},
  {"number":2, "name": "地下貯蔵庫", "type": "None", "cost": 2},
  {"number":3, "name": "村", "type": "None", "cost": 3},
  {"number":4, "name": "木こり", "type": "None", "cost": 3},
  {"number":5, "name": "宰相", "type": "None", "cost": 3},
  {"number":6, "name": "工房", "type": "None", "cost": 3},
  {"number":7, "name": "役人", "type": "Attack", "cost": 4},
  {"number":8, "name": "泥棒", "type": "Attack", "cost": 4},
  {"number":9, "name": "祝宴", "type": "None", "cost": 4},
  {"number":10, "name": "金貸し", "type": "None", "cost": 4},
  {"number":11, "name": "民兵", "type": "Attack", "cost": 4},
  {"number":12, "name": "鍛冶屋", "type": "None", "cost": 4},
  {"number":13, "name": "密偵", "type": "Attack", "cost": 4},
  {"number":14, "name": "玉座の間", "type": "None", "cost": 4},
  {"number":15, "name": "改築", "type": "None", "cost": 4},
  {"number":16, "name": "書庫", "type": "None", "cost":5},
  {"number":17, "name": "魔女", "type": "Attack", "cost": 5},
  {"number":18, "name": "祝祭", "type": "None", "cost": 5},
  {"number":19, "name": "研究所", "type": "None", "cost": 5},
  {"number":20, "name": "市場", "type": "None", "cost": 5},
  {"number":21, "name": "鉱山", "type": "None", "cost": 5},
  {"number":22, "name": "議事堂", "type": "None", "cost": 5},
  {"number":23, "name": "冒険者", "type": "None", "cost": 6},
  {"number":24, "name": "庭園", "type": "Victory", "cost": 4},
]
const CardContext = createContext(cardInfo);
// ----------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CardContext.Provider value={cardInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CardContext.Provider>
);

export default CardContext;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
