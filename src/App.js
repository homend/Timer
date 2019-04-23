import React from 'react';
import Time from './utils/time';
import loop from './utils/loop';
import "./App.css";

export default class extends React.Component {
  bg = {
    src: require('./assets/images/sky.png'),
    img: null,
    loaded: false,
  }

  time = new Time();

  board = {
    canvas: null,
    context: null,
    width: window.innerWidth,
    height: window.innerHeight
  };

  style = {
    TEXT_COLOR: 'rgba(255,255,255,1)',
    FONT: '14px Lucida Sans',
    TEXT_HIGHLIGHT_COLOR: 'rgba(255,0,0,1)',
  };

  init() {
    this.board.canvas = document.querySelector('#time');
    this.board.context = this.board.canvas.getContext('2d');

    console.log(this.time)

    this.resizeCallback();
    this.draw();

    window.addEventListener('resize', () => {
      this.resizeCallback();
      this.draw();
    }, false);


    loop(() => {
      this.draw()
    })
  }

  // 绘画
  async draw() {
    await this.drawBg();
    this.drawCircularText('years', 0);
    this.drawCircularText('months', 50);
    this.drawCircularText('days', 120);
    this.drawCircularText('hours', 210);
    this.drawCircularText('minutes', 300);
    this.drawCircularText('seconds', 400);
  }

  // 绘制背景图
  drawBg() {
    const draw = () => {
      this.board.context.drawImage(this.bg.img, 0, 0, this.board.width, this.board.height)
    }
    return new Promise(resolve => {
      if(!this.bg.loaded){
        this.bg.img = document.createElement('img')
        this.bg.img.src = this.bg.src
        this.bg.img.onload = e => {
          draw()
          this.bg.loaded = true
          resolve(true)
        }
      } else{
        draw()
        resolve(true)
      }
    })
  }

  // 圆弧画字 (Math.PI/2为旋转90度  Math.PI/180*X为旋转多少度)
  drawCircularText(key, radius) {
    const list = this.time.times[key].list;

    const currentTime = this.time.currentTime[key];

    // 圆中心
    const circle = {
      x: this.board.width / 2,
      y: this.board.height / 2
    };

    const context = this.board.context;

    const angleDecrement = (Math.PI * 2) / list.length; //每个节点占的弧度

    context.save();
    context.textAlign = key === 'years' ? 'center' : 'left';
    context.textBaseLine = 'middle';
    context.fillStyle = this.style.TEXT_COLOR;
    context.font = this.style.FONT;

    let startAngle = 0;
    list.forEach((e,idx) => {
      let angle = startAngle - (angleDecrement * idx)
      if(key !== 'years'){
        const flag = (key === 'months' || key === 'days' ? -1 : 0)
        angle += angleDecrement * (currentTime.value + flag)
      }
      context.save();
      context.beginPath();
      if(angle === 0){
        context.fillStyle = this.style.TEXT_HIGHLIGHT_COLOR;
      }
      const x = circle.x + Math.cos(angle) * radius;
      const y = circle.y - Math.sin(angle) * radius;
      const rotateAngle = Math.PI * 2 - angle
      context.translate(x, y);
      context.rotate(rotateAngle);
      context.fillText(e, 0, 0);
      context.closePath();
      context.restore();
    });

    context.restore();
  }

  // 浏览器窗口大小变化执行
  resizeCallback() {
    this.board.width = window.innerWidth;
    this.board.height = window.innerHeight;
    this.board.canvas.width = this.board.width;
    this.board.canvas.height = this.board.height;
  }

  // 初始化
  componentDidMount() {
    this.init();
  }

  render(){
    return (
      <canvas id="time"></canvas>
    )
  }
}