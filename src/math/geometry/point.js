import { Geometry } from './geometry.js'
import { linear } from '../util.js'

export class GPoint extends Geometry{
    constructor(x, y){
        super();
        this.type = "Point";
        this.x = x;
        this.y = y;
        this.radius = 12;
        this.moving = false;
    }
    init(){
        let { w, h } = this.board;
        this.radius = Math.round(w*0.03);
    }
    isCheck(px, py){
        let { x, y, radius } = this;
        let len = Math.sqrt(Math.pow(x-px,2)+Math.pow(y-py,2));

        return len<=radius;
    }
    setDrag(px, py){
        let { x, y } = this;
        this.dragCachePos = { x, y };
        this.dragPos = { x:px, y:py };
    }
    drag(px, py){
        let { dragPos, dragCachePos } = this;
        this.x = dragCachePos.x + px - dragPos.x;
        this.y = dragCachePos.y + py - dragPos.y;
    }
    paintGeometry(){
        let { ctx, x, y, radius } = this;
        this.loop();
        ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI*2);
    }
    moveTo(point, t){
        let { x, y } = this;
        this.startTime = new Date().getTime();
        this.startPos = { x, y }
        this.lastTime = t;
        this.moving = true;
        this.target = point;
    }
    loop(){
        if(!this.moving)return;
        let { lastTime, startTime } = this;

        lastTime *= 1000;

        let t = (new Date().getTime()) - startTime;
        let d = lastTime;

        if(t>=d){
            this.moving = false;        
        }else{
            this.animLoop(t, lastTime);
        }
    }
    animLoop(t, d){
        let { x, y, target, startPos } = this;
        let progressX = linear(t, startPos.x, target.x-startPos.x, d);
        let progressY = linear(t, startPos.y, target.y-startPos.y, d);

        this.x = progressX;
        this.y = progressY;
    }
}

export class GCrossPoint extends GPoint{
    constructor(line1, line2){
        super();
        this.key = "GCrossPoint";
        this.line1 = line1;
        this.line2 = line2;
        let { x, y } = line1.calcIntersection(line2);
        this.x = x;
        this.y = y;
    }
    paintGeometry(){
        let { ctx, line1, line2, radius  } = this;
        let { x, y } = line1.calcIntersection(line2);
        this.x = x;
        this.y = y;
        ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI*2);
    }
}