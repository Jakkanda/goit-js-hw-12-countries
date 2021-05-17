class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.start();
    this.ref = document.querySelector(`${selector}`);
    this.refs = {
      days: this.ref.querySelector('span[data-value="days"]'),
      hours: this.ref.querySelector('span[data-value="hours"]'),
      minsEl: this.ref.querySelector('span[data-value="mins"]'),
      secsEl: this.ref.querySelector('span[data-value="secs"]'),
    };
  }

  calcDeltaTime() {
    let dateNow = Date.now();
    let deltaTime = this.targetDate - dateNow;
    this.calcDays(deltaTime);
  }

  calcDays(deltaTime) {
    const days = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
    this.updateComponents(days, hours, mins, secs);
  }

  updateComponents(days, hours, mins, secs) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.minsEl.textContent = mins;
    this.refs.secsEl.textContent = secs;
  }

  pad(value) {
    return value.toString().padStart(2, '0');
  }

  start() {
    setInterval(() => {
      this.calcDeltaTime();
    }, 1000);
  }
}

const timeToIndependenceDay = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 24 2021'),
});
