const refs = {
  daysEl: document.querySelector('[data-value="days"]'),
  hoursEl: document.querySelector('[data-value="hours"]'),
  minsEl: document.querySelector('[data-value="mins"]'),
  secsEl: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ targetDate, onTick }) {
    this.timeId = null;
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.start();
    this.init();
    this.stop;
  }

  init() {
    const time = this.getTimesComponents(0);
    this.onTick(time);
  }

  start() {
    this.timeId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimesComponents(deltaTime);

      if (Number(this.targetDate) < Number(currentTime)) {
        this.stop();
      }

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.timeId);
    this.init();
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTimesComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}

function updateSpanValueFace({ days, hours, mins, secs }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minsEl.textContent = `${mins}`;
  refs.secsEl.textContent = `${secs}`;
}

const newTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 27, 2021"),
  onTick: updateSpanValueFace,
});
