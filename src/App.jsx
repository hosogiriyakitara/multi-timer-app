import { useState } from "react";
import Timer from "./components//Timer";

export default function App() {
  const [timers, setTimers] = useState([]);
  const [nextIndex, setNextIndex] = useState(1);  // 追加するタイマーの連番

  const addTimer = () => {
    setTimers([...timers, { index: nextIndex }]);  // 連番を適用
    setNextIndex(nextIndex + 1);
  };

  const removeTimer = (index) => {
    setTimers(timers.filter((timer) => timer.index !== index));
  };

  return (
    <div
      className={`timer ${running ? "running" : ""} ${timeLeft < 300 ? "warning" : ""} ${timeLeft === 0 ? "flashing" : ""}`}
    >
 
      <h1>カウントダウン君</h1>
      <button onClick={addTimer}>+</button>
      <div className="timer-grid">
        {timers.map((timer) => (
          <Timer key={timer.index} index={timer.index} removeTimer={removeTimer} />
        ))}
      </div>
    </div>
  );
}
