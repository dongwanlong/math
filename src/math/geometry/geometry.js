
export class Geometry{
    constructor(){
    }
    initBoard(board){
        this.ctx = board.ctx;
        this.board = board;
        if(this.init)this.init();
    }
    dragEnd(){
        this.dragCachePos = null;
        this.dragPos = null;
    }
    isCheck(px, py){ return false }
    prePaint(){
        let { ctx, x, y } = this;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#F00";
    }
    paint(){
        this.prePaint();
        this.paintGeometry();
        this.paintEnd();
    }
    paintEnd(){
        let { ctx } = this;
        ctx.closePath();
        // ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}