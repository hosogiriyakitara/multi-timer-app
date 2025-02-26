import { useState } from "react";
import Timer from "./Timer";

export default function TimerList() {
  const [timers, setTimers] = useState([]);

  const addTimer = () => {
    setTimers([...timers, { id: Date.now() }]);
  };

  const removeTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  return (
    <div className="container">
      <button className="add-btn" onClick={addTimer}>＋</button>
      <div className="timer-grid">
        {timers.map((timer) => (
          <Timer
            key={timer.id}
            id={timer.id}
            removeTimer={removeTimer}
          />
        ))}
      </div>
    </div>
  );
}
