import React from 'react';
import Time from './utils/time';
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
  
  render(){
    return (
      <canvas id="time"></canvas>
    )
  }

  init(){
    this.board.canvas = document.querySelector('#time');
    this.board.context = this.board.canvas.getContext('2d');


    this.resizeCallback();
    this.draw();

    window.addEventListener('resize', () => {
      this.resizeCallback();
      this.draw();
    }, false);
  }

  // 绘画
  async draw() {
    await this.drawBg();
    this.drawCircularText('years', 0);
    this.drawCircularText('months', 80);
    this.drawCircularText('days', 150);
    this.drawCircularText('hours', 230);
    this.drawCircularText('minutes', 310);
    this.drawCircularText('seconds', 390);
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

  // 圆弧画字
  drawCircularText(key, radius) {
    const list = this.time.times[key];
    const currentTime = this.time.currentTime;
    const circle = {
      x: this.board.width / 2,
      y: this.board.height / 2
    };

    const context = this.board.context;
    
    let startAngle = Math.PI * 0;
    const endAngle = Math.PI * 2;
    const length = list.length;
    const angleDecrement = (startAngle - endAngle) / length; //每个节点占的弧度

    context.save();
    context.textAlign = 'center';
    context.textBaseLine = 'middle';
    context.fillStyle = this.style.TEXT_COLOR;
    context.font = this.style.FONT;

    list.forEach((e,idx) => {
      const angle = startAngle + (angleDecrement * idx)
      context.save();
      context.beginPath();
      if(e === currentTime[key]){
        context.fillStyle = this.style.TEXT_HIGHLIGHT_COLOR;
      }
      const x = circle.x + Math.cos(angle) * radius;
      const y = circle.y - Math.sin(angle) * radius
      context.translate(x, y);
      context.rotate(Math.PI * 2 - angle); //Math.PI/2为旋转90度  Math.PI/180*X为旋转多少度
      context.fillText(e,0,0);
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
}