self.addEventListener("message", (e) => {
  let remainTime = e.data.time;
  const intervalId = setInterval(() => {
    remainTime--;
    if (remainTime <= 0) {
      clearInterval(intervalId);
      self.postMessage({ remainTime });
    } else {
      self.postMessage({ remainTime });
    }
  }, 1000);
});
