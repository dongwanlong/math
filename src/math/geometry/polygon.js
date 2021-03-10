import { Geometry } from './geometry.js'

if (!CanvasRenderingContext2D.prototype.ellipse1) {
    CanvasRenderingContext2D.prototype.ellipse = function(x, y, radiusX, radiusY, rotation, startAngle, endAngle,
        anticlockwise) {
        var r = radiusX > radiusY ? radiusX : radiusY; //用打的数为半径
        var scaleX = radiusX / r; //计算缩放的x轴比例
        var scaleY = radiusY / r; //计算缩放的y轴比例
        this.save(); //保存副本                    
        this.translate(x, y); //移动到圆心位置
        this.rotate(rotation); //进行旋转
        this.scale(scaleX, scaleY); //进行缩放
        this.arc(0, 0, r, startAngle, endAngle, anticlockwise); //绘制圆形
        this.restore(); //还原副本
    }
}


export class GPolygon extends Geometry{
    constructor(points){
        super();
        this.type = "Polygon";
        this.points = points;
    }
    prePaint(){
        let { ctx, x, y } = this;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
    }
    isCheck(px, py){
        this.paint();
        return this.ctx.isPointInPath(px, py);
    }
    setDrag(px, py){
        this.dragCachePos = [];
        this.dragPos = [];
        for(let i=0;i<this.points.length;++i){
            let { x, y } = this.points[i];
            this.dragCachePos.push({x, y});
            this.dragPos.push({x:px, y:py});
        }
    }
    drag(px, py){
        let { dragPos, points, dragCachePos } = this;
        for(let i=0;i<dragPos.length;++i){
            this.points[i].x = dragCachePos[i].x + px - dragPos[i].x;
            this.points[i].y = dragCachePos[i].y + py - dragPos[i].y;
        }
    }
    paintGeometry(){
        let { ctx, points } = this;
        ctx.moveTo(points[0].x+0.5, points[0].y+0.5);
        for(let i=1;i<points.length;++i){
            ctx.lineTo(points[i].x+0.5, points[i].y+0.5);
        }
    }
}