import { useState, useEffect, useRef } from "react";

export default function Timer({ index, removeTimer }) {
  const [name, setName] = useState(`卓${index}`);  // 初期値を「卓X」に変更
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(55);  // ← 初期値を55分に変更
  const [seconds, setSeconds] = useState(0);   // ← 初期値を0秒に変更
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(55 * 60);  // ← 55分（3300秒）に設定
  const [showDropdown, setShowDropdown] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  const alarmAudio = useRef(new Audio(process.env.PUBLIC_URL + "/alarm.mp3"));

  useEffect(() => {
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alarmAudio.current.play();
      setIsFlashing(true);
    }
    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const startTimer = () => {
    setShowDropdown(false);
    setRunning(true);
  };

  const resetTimer = () => {
    setRunning(false);
    setShowDropdown(true);
    setIsFlashing(false);
    setTimeLeft(55 * 60); // ← 55分（3300秒）にリセット
    alarmAudio.current.pause();
    alarmAudio.current.currentTime = 0;
  };

  const formatTime = (t) => {
    const h = String(Math.floor(t / 3600)).padStart(2, "0");
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
  
    return (
      <>
        <span className="time-number">{h}</span>
        <span className="time-colon">:</span>
        <span className="time-number">{m}</span>
        <span className="time-colon">:</span>
        <span className="time-number">{s}</span>
      </>
    );
  };
  
  // JSX内の時間表示部分
  <p className="time-display">{formatTime(timeLeft)}</p>
  

  return (
    <div
      className={`timer ${running ? "running" : ""} ${timeLeft < 300 ? "warning" : ""} ${timeLeft === 0 ? "flashing" : ""}`}
      >
      <div className="timer-header">
        <input type="text" className="timer-name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="remove-btn" onClick={() => removeTimer(index)}>✖</button>
      </div>

      <div className="timer-body">
        <div className="time-container">
          {showDropdown ? (
            <div className="time-select">
              <select value={hours} onChange={(e) => setHours(Number(e.target.value))}>
                {[...Array(24).keys()].map((h) => (<option key={h} value={h}>{String(h).padStart(2, "0")}</option>))}
              </select>
              <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
                {[...Array(60).keys()].map((m) => (<option key={m} value={m}>{String(m).padStart(2, "0")}</option>))}
              </select>
              <select value={seconds} onChange={(e) => setSeconds(Number(e.target.value))}>
                {[...Array(60).keys()].map((s) => (<option key={s} value={s}>{String(s).padStart(2, "0")}</option>))}
              </select>
            </div>
          ) : (
            <p className="time-display">{formatTime(timeLeft)}</p>
          )}

          <div className="button-group">
            <button className="start-btn" onClick={startTimer} disabled={running}>START</button>
            <button className="reset-btn" onClick={resetTimer}>RESET</button>
          </div>
        </div>
      </div>
    </div>
  );
}
