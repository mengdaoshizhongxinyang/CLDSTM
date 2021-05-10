/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-05-08 17:27:32
 * @Description: 
 */
import { defineComponent } from "vue";
type Particle={
  radians:number
  x :number
  y :number
  speed:number
  radius :number
  size :number
  hue :number
  brightness :number
  alpha:number
}
export default defineComponent({
  setup(){
    let canvas = document.getElementById('myCanvas')! as HTMLCanvasElement;
    let context = canvas.getContext('2d')!;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    clearCanvas();

    function clearCanvas() {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function mouseDownHandler(e:MouseEvent) {
      let x = e.clientX;
      let y = e.clientY;
      fire(x, y);
    }
    let rid:number;

    function fire(x:number, y:number) {
      createFireworks(x, y);

      function tick() {
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0,0,0,' + 1 + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'screen';
        drawFireworks();
        rid = requestAnimationFrame(tick);
      }
      cancelAnimationFrame(rid);
      tick();
    }
    let particles:Particle[] = [];

    function createFireworks(sx:number, sy:number) {
      particles = [];
      let hue = Math.floor(Math.random() * 51) + 150;
      let hueVariance = 30;
      let count = 100;
      for (let i = 0; i < count; i++) {
        let angle = Math.floor(Math.random() * 360);
        let speed=(Math.random() * 5) + .4
        let p:Particle = {
          radians:angle * Math.PI / 180,
          x:sx,
          y:sy,
          speed:speed,
          radius:speed,
          size:Math.floor(Math.random() * 3) + 1,
          hue: Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance),
          brightness : Math.floor(Math.random() * 31) + 50,
          alpha : (Math.floor(Math.random() * 61) + 40) / 100
        };
        particles.push(p);
      }
    }

    function drawFireworks() {
      clearCanvas();
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let vx = Math.cos(p.radians) * p.radius;
        let vy = Math.sin(p.radians) * p.radius + 0.4;
        p.x += vx;
        p.y += vy;
        p.radius *= 1 - p.speed / 100;
        p.alpha -= 0.005;
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = 'hsla(' + p.hue + ', 100%, ' + p.brightness + '%, ' + p.alpha + ')';
        context.fill();
      }
    }
    document.addEventListener('mousedown', mouseDownHandler, false);
    return ()=><canvas style={{width:"100%",height:"100%"}} id="myCanvas"></canvas>
  }
})