function getVertexPosition(el) {
    let currentTarget = el
    let top = 0
    let left = 0
    while (currentTarget !== null) {
        top += currentTarget.offsetTop
        left += currentTarget.offsetLeft
        currentTarget = currentTarget.offsetParent
    }
    return { top, left }
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
})();

export class Board{
    constructor(id){
        this.fpsConf = {
            lastTime:0,
            fpsNum:60,
            count:0,
        };
        this.w = 0;
        this.h = 0;
        this.touchX = 0;
        this.touchY = 0;
        this.geometrys = [];
        
        this.frameLoop = this.frameLoop.bind(this);
    
        this.initCanvas(id);
        this.frameLoop();
    }
    frameLoop(){
        let nowTime = new Date().getTime();
        let diffTime = nowTime-this.fpsConf.lastTime;
        this.paint(diffTime);
        this.fpsConf.lastTime = nowTime;
        window.requestAnimationFrame(this.frameLoop);
    }
    initCanvas(id){
        this.outerDom = document.getElementById(id);
        let wrapW = this.outerDom.offsetWidth;
        let wrapH = this.outerDom.offsetHeight;
        let rate = window.devicePixelRatio;

        this.canvasDom = document.createElement('canvas');
        this.ctx = this.canvasDom.getContext('2d');
        this.canvasDom.width = wrapW;
        this.canvasDom.height = wrapH;
        this.w = wrapW;
        this.h = wrapH;
        this.outerDom.append(this.canvasDom);
        // this.ctx.scale(rate, rate);
        this.canvasDom.addEventListener("mousedown", this.handleMouseEvent.bind(this,'mousedown'));
        this.canvasDom.addEventListener("mousemove", this.handleMouseEvent.bind(this,'mousemove'));
        this.canvasDom.addEventListener("mouseup", this.handleMouseEvent.bind(this,'mouseup'));

        this.canvasDom.addEventListener("touchstart", this.handleMouseEvent.bind(this,'mousedown'));
        this.canvasDom.addEventListener("touchmove", this.handleMouseEvent.bind(this,'mousemove'));
        this.canvasDom.addEventListener("touchend", this.handleMouseEvent.bind(this,'mouseup'));

    }
    checkGeometry(px, py){
        let { geometrys } = this;
        let points = [], polygons = [];

        for(let it of geometrys){
            if(it.type=="Point"){
                points.push(it);
            }else{
                polygons.push(it);
            }
        }

        for(let i=0;i<points.length;++i){
            if(points[i].isCheck(px, py))return points[i];
        }

        for(let i=0;i<polygons.length;++i){
            if(polygons[i].isCheck(px, py))return polygons[i];
        }
    }
    getMousePos(e){
        if(e.touches){//移动端
            if(e.touches.length==0)return {};
            let rate = 1;//window.devicePixelRatio;
            let vertex = getVertexPosition(this.canvasDom);
            let offsetX = e.touches[0].pageX-vertex.left;
            let offsetY = e.touches[0].pageY-vertex.top;
            return { px:offsetX, py:offsetY }
        }else{//PC端
            let px = e.offsetX;
            let py = e.offsetY;
            return { px, py }
        }
    }
    handleMouseEvent(eventName, e){
        let { w, h, geometrys } = this;
        let { px, py } = this.getMousePos(e);

        e.preventDefault();

        if(eventName=='mousedown'){
            this.geometryChecked = this.checkGeometry(px, py);
            if(!this.geometryChecked)return;
            this.geometryChecked.setDrag(px, py);
        }else if(eventName=='mousemove'){
            if(!this.geometryChecked)return;
            this.geometryChecked.drag(px, py);
        }else if(eventName=='mouseup'){
            this.geometryChecked = null;
        }
    }
    add(geometry){
        geometry.initBoard(this);
        this.geometrys.push(geometry);
    }
    paint(){
        let { ctx, w, h, geometrys } = this;
        ctx.clearRect(0, 0, w, h);
        
        for(let i=0,len=geometrys.length;i<len;++i){
            geometrys[i].paint();
        }
    }
}