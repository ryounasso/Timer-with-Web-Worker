import { useState, useRef, useEffect } from "react";

const convertToTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (String(seconds).length < 2) {
    return minutes + ":" + "0" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
};

export default function Home() {
  const [time, setTime] = useState(1800);
  const [isCounting, setIsCounting] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./worker/worker.js", import.meta.url)
    );

    workerRef.current.addEventListener("message", (e) => {
      if (e.data.remainTime === 0) {
        setTime(e.data.remainTime);
        alert("Time is up!");
        setTime(1800);
        setIsCounting(false);
      } else {
        setTime(e.data.remainTime);
      }
    });

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const startTimer = () => {
    setIsCounting(!isCounting);
    workerRef.current.postMessage({ time });
  };

  return (
    <div>
      <button onClick={startTimer} disabled={isCounting}>
        Start Timer
      </button>
      {time && <p>{convertToTime(time)}</p>}
    </div>
  );
}
