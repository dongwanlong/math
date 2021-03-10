import { Geometry } from './geometry.js'
import { getAngle, rotateByPoint } from '../util.js'


export class GAngle extends Geometry{
    constructor(point1, point2, point3){
        super();
        this.type = "Angle";
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.radius = 20;
    }
    init(){
        let { w, h } = this.board;
    }
    paintEnd(){
        let { ctx } = this;
        // ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    paintGeometry(){
        let { ctx,  radius, point1, point2, point3 } = this;
        let angle1 = getAngle(point1, point2);
        let angle2 = getAngle(point1, point3);
        let rAngle1 = (angle1-90)/360*Math.PI*2;
        let rAngle2 = (angle2-90)/360*Math.PI*2;

        let { x, y } = point1;
        let pos = rotateByPoint(point1, {
            x:point1.x,
            y:point1.y-radius*2,
        }, (angle1+(angle2-angle1)/2) );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `16px Helvetica`;

        ctx.fillText(20, pos.x, pos.y);
        ctx.ellipse(x, y, radius, radius, 0, rAngle1, rAngle2);
    }
}
