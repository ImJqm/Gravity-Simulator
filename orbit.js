setSize(1000,750)

let sun = initobj(50,getWidth()/2,getHeight()/2,"grey")
let r = Randomizer.nextInt(sun.getRadius()+10,getHeight()/2-25)
let angle = Randomizer.nextInt(0,360)
let planet = initobj(10,getWidth()/2+(r*Math.cos(angle)),getHeight()/2+(r*Math.sin(angle)),"grey")
planet.layer=100
//let planet = initobj(10,getWidth()-50,50,"grey")
let vx = 1
let vy = 1
let G = 500
//let num = readInt("How many planets?")
let d
let f
let vm = 90
let a
let ve
let b=0
let id = getDistance(planet.getX(),planet.getY(),sun.getX(),sun.getY())
let vt = Math.sqrt((2*planet.getRadius()*G)/(Math.PI*planet.getRadius()**2))-(0.03*id)
let vt2 = vt +2
if (vt<0) {
    vt = Math.abs(vt*1/10)
}
if (vt>2) {
    vt = 2
}
//console.log(vt)
//console.log(id)
let count = 0
let vx1
let vy1
let ang
let vt1


//setTimer(initialv,10)

setTimer(update, 1)
setTimer(orbit,1)
function initialv() {
    if (count==100) {
        stopTimer(initialv)
    }
    planet.move(vx,vy)
    count+=1
}
function initobj(m,x,y,col) {
    let obj = new Circle(m);
    obj.setColor(col);
    obj.setPosition(x,y);
    add(obj)
    return obj
}
function addball(x,y) {
    let ball = new Circle(1)
    ball.setColor("black")
    ball.setPosition(x,y)
    add(ball)
}
function update() {
    ve = Math.sqrt((2*G*sun.getRadius())/getDistance(sun.getX(), sun.getY(), planet.getX(), planet.getY())**3)
    //console.log(ve)
    let x1 = planet.getX()
    let y1 = planet.getY()
    a = Math.atan2((planet.getY()-sun.getY()),(planet.getX()-sun.getX()))// * (180/Math.PI)
    //if (a>=-180&&a<0) {
      //  a = 360+a
    //}
    //a = Math.abs(a-360)
    vx = (Math.cos(a)*attraction())/planet.getRadius()
    vy = (Math.sin(a)*attraction())/planet.getRadius()
    if (vx >vt) {
        vx = vt2
    }
    if (vy>vt2) {
        vy = vt2
    }
    if (vx<-vt2) {
        vx = -vt2
    }
    if (vy<-vt2) {
        vy = -vt2
    }
    //console.log(a)
    //vx += attraction()/planet.getRadius()
    //vy += attraction()/planet.getRadius()
    
    planet.move(-vx,-vy)
    let ln = new Line(x1,y1,planet.getX()+Math.cos(Math.atan2((planet.getY()-sun.getY()),(planet.getX()-sun.getX()))+(90*(Math.PI/180)))*(Math.sqrt((G*sun.getRadius())/getDistance(sun.getX(), sun.getY(), planet.getX(), planet.getY()))),planet.getY()+Math.sin(Math.atan2((planet.getY()-sun.getY()),(planet.getX()-sun.getX()))+(90*(Math.PI/180)))*(Math.sqrt((G*sun.getRadius())/getDistance(sun.getX(), sun.getY(), planet.getX(), planet.getY()))));
    ln.setColor("black")
    ln.setLineWidth(1)
    add(ln)
    //console.log(vx)
}
function orbit() {
    
    if (vx1 >vt) {
        vx1 = vt
    }
    if (vy1>vt) {
        vy1 = vt
    }
    if (vx1<-vt) {
        vx1 = -vt
    }
    if (vy1<-vt) {
        vy1 = -vt
    }
    ang = Math.atan2((planet.getY()-sun.getY()),(planet.getX()-sun.getX()))+(90*(Math.PI/180))
    vx1 = Math.cos(ang)*(Math.sqrt((G*sun.getRadius())/getDistance(sun.getX(), sun.getY(), planet.getX(), planet.getY())));
    vy1 = Math.sin(ang)*(Math.sqrt((G*sun.getRadius())/getDistance(sun.getX(), sun.getY(), planet.getX(), planet.getY())));
    planet.move(vx1,vy1)
    
}
function attraction() {
    d = getDistance(sun.getX(), sun.getY(), planet.getX(), planet.getY())
    if (d == 0) {
        d=1
    }
    f = (((G)*sun.getRadius()*planet.getRadius())/d**2)
    
    return f
}