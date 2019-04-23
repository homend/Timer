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

// 获取一个月有多少天
const getMonthDay = (year,month) => {
  return new Date(year, month, 0).getDate();
}

// 格式化数字转换成中文
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
    this.initTimes();
    this.initCurrentTimes()
  }

  // 初始化
  initCurrentTimes() {
    let currentTimes = {}
    const updates = {
      years(){
        const num = new Date().getFullYear();
        this.value = num;
        this.label = num + timeUnit.year;
      },
      months(){
        const num = new Date().getMonth() + 1;
        this.value = num;
        this.label = formatNumber(num, timeUnit.month);
      },
      days(){
        const num = new Date().getDate();
        this.value = num;
        this.label = formatNumber(num, timeUnit.day);
      },
      hours(){
        const num = new Date().getHours();
        this.value = num;
        this.label = formatNumber(num, timeUnit.hour);
      },
      minutes(){
        const num = new Date().getMinutes();
        this.value = num;
        this.label = formatNumber(num, timeUnit.minute);
      },
      seconds(){
        const num = new Date().getSeconds();
        this.value = num;
        this.label = formatNumber(num, timeUnit.second);
      }
    }
    Object.keys(updates).forEach(key => {
      currentTimes[key] = {
        value: null,
        label:null,
        update: updates[key]
      }
      currentTimes[key].update()
    })
    setInterval(() => {
      Object.keys(this.currentTime).forEach(key => {
        this.currentTime[key].update()
      })
    }, 1000)
    this.currentTime = currentTimes
  }

  // 初始化时间
  initTimes() {
    this.times = {
      years: {
        list: [],
        update(){
          this.list = [new Date().getFullYear() + timeUnit.year];
        }
      },
      months: {
        list: Array(12).fill('').map((e,idx) => formatNumber(idx + 1, timeUnit.month))
      },
      days: {
        list: [],
        update(){
          const length = getMonthDay(new Date().getFullYear(), new Date().getMonth() + 1);
          this.list = Array(length).fill('').map((e,idx) => formatNumber(idx + 1, timeUnit.day));
        }
      },
      hours: {
        list: Array(24).fill('').map((e,idx) => formatNumber(idx, timeUnit.hour))
      },
      minutes: {
        list: Array(60).fill('').map((e,idx) => formatNumber(idx, timeUnit.minute))
      },
      seconds: {
        list: Array(60).fill('').map((e,idx) => formatNumber(idx, timeUnit.second))
      }
    }
    this.times.years.update()
    this.times.days.update()
  }
}