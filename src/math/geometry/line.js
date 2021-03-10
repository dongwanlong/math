import { Geometry } from './geometry.js'


export class GLine extends Geometry{
    constructor(point1, point2){
        super();
        this.type = "Line";
        this.point1 = point1;
        this.point2 = point2;
    }
    prePaint(){
        let { ctx, x, y } = this;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
    }
    paintEnd(){
        let { ctx } = this;
        ctx.closePath();
        // ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    calcIntersection(line){
        let { a, b } = this.calcEquation();
        let equation = line.calcEquation();

        let c = equation.a;
        let d = equation.b;

        let x = (d-b)/(a-c);
        let y = a*x+b;
        
        return { x, y:400-y }
    }
    calcEquation(){
        let { point1, point2 } = this;
        let y1 = 400-point1.y;
        let y2 = 400-point2.y;
        let x1 = point1.x;
        let x2 = point2.x;

        let a = (y1-y2)/(x1-x2);
        let b = y1-a*x1;

        return { a, b }
    }
}
 
//线段
export class GSegmentLine extends GLine{
    constructor(point1, point2){
        super(point1, point2);
        this.key = "GSegmentLine";
    }
    paintGeometry(){
        let { ctx, point1, point2 } = this;
        ctx.moveTo(point1.x+0.5, point1.y+0.5);
        ctx.lineTo(point2.x+0.5, point2.y+0.5);
    }
}

//射线
export class GRayLine extends GLine{
    constructor(point1, point2){
        super(point1, point2);
        this.key = "GRayLine";
    }
}

//直线
export class GStraightLine extends GLine{
    constructor(point1, point2){
        super(point1, point2);
        this.key = "GStraightLine";
    }
}