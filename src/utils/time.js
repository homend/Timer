const timeUnit = {
  year: '年',
  month: '月',
  day: '号',
  hour: '点',
  minute: '分',
  second: '秒'
};

const formatNumberOptions = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十'
};

const getMonthDay = (year,month) => {
  return new Date(year, month, 0).getDate();
}

const formatNumber = (num,unit) => {
  let result = '';
  if(num < 10){
    result = formatNumberOptions[num];
  }else{
    let integer = Math.floor(num / 10);
    integer = integer === 1 ? '' : formatNumberOptions[integer]
    let remainder = num % 10;
    remainder = remainder === 0 ? '' : formatNumberOptions[remainder];
    result = integer + formatNumberOptions[10] + remainder
  }
  return result + unit;
};

export default class {
  constructor() {
    this.times = {
      years: [],
      months: Array(12).fill('').map((e,idx) => formatNumber(idx + 1, timeUnit.month)),
      days: [],
      hours: Array(24).fill('').map((e,idx) => formatNumber(idx, timeUnit.hour)),
      minutes: Array(60).fill('').map((e,idx) => formatNumber(idx, timeUnit.minute)),
      seconds: Array(60).fill('').map((e,idx) => formatNumber(idx, timeUnit.second))
    }

    this.updateYear();
    this.updateDays(5);

    this.currentTime = {
      years: this.times.years[0],
      months: this.times.months[0],
      days: this.times.days[0],
      hours: this.times.hours[0],
      minutes: this.times.minutes[0],
      seconds: this.times.seconds[0]
    }
  }

  updateYear(){
    this.times.years = [new Date().getFullYear() + timeUnit.year];
  }

  updateDays(month){
    const length = getMonthDay(new Date().getFullYear(), month === undefined ? new Date().getMonth() + 1 : month);
    this.times.days = Array(length).fill('').map((e,idx) => formatNumber(idx + 1, timeUnit.day));
  }
}