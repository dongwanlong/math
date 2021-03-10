export function getAngle(p2, p1){//p2为中心点
    let px = p2.x;
    let py = p2.y;
    let mx = p1.x;
    let my = p1.y;
    var x = Math.abs(px-mx);
    var y = Math.abs(py-my);
    var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    if(z==0)return 0;//
    var cos = y/z;
    var radina = Math.acos(cos);
    var angle = Math.floor(180/(Math.PI/radina));

    if(mx>px&&my>py){
        angle = 180 - angle;
    }
    if(mx==px&&my>py){
        angle = 180;
    }
    if(mx>px&&my==py){
        angle = 90;
    }
    if(mx<px&&my>py){
        angle = 180+angle;
    }
    if(mx<px&&my==py){
        angle = 270;
    }
    if(mx<px&&my<py){
        angle = 360 - angle;
    }

    return angle;
    // return (angle-90)/360*Math.PI*2;
}

export function linear(t,b,c,d){ return c*t/d + b; }

export function rotateByPoint(p1, p2, angle){
    angle = Math.PI*(angle/180);
    let x = p2.x - p1.x;
    let y = p2.y - p1.y;

    let tx = x*Math.cos(angle) - y*Math.sin(angle);
    let ty = x*Math.sin(angle) + y*Math.cos(angle);

    tx += p1.x;
    ty += p1.y;

    return {x:tx,y:ty}
}