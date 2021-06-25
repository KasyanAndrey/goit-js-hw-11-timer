// new CountdownTimer({
//   selector: "#timer-1",
//   targetDate: new Date("Jul 17, 2019"),
// });

const refs = {
  wrapper: document.querySelector("#timer-1"),
  fieldEl: document.querySelector(".field"),

  daysEl: document.querySelector('[data-value="days"]'),
  hoursEl: document.querySelector('[data-value="hours"]'),
  minsEl: document.querySelector('[data-value="mins"]'),
  secsEl: document.querySelector('[data-value="secs"]'),

  labelEl: document.querySelector(".label"),
};

const timer = {
  start() {
    const startTime = Date.now();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = getTimesComponents(deltaTime);
      // console.log("текущее время", currentTime);
      updateSpanValueFace(time);

      // console.log(time);
    }, 1000);
  },
};

timer.start();

function updateSpanValueFace({ days, hours, mins, secs }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minsEl.textContent = `${mins}`;
  refs.secsEl.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function getTimesComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}
