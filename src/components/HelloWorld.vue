<template>
  <div class="hello">
    <div id="canvas"></div>
  </div>
</template>

<script>
import { GAngle, Board, GPoint, 
GPolygon, GSegmentLine, GCrossPoint } from '@/math/index.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    let board = new Board("canvas");
    let gPoint1 = new GPoint(100, 100);
    let gPoint2 = new GPoint(300, 100);
    // let gPoint3 = new GPoint(300, 200);
    // let gPoint4 = new GPoint(300, 200);

    let gLine1 = new GSegmentLine(gPoint1, gPoint2);
    // let gLine2 = new GSegmentLine(gPoint1, gPoint3);
    // let gCrossPoint = new GCrossPoint(gLine1, gLine2);

    // board.add(gCrossPoint);

    board.add(gLine1);
    // board.add(gLine2);
    board.add(gPoint1);
    board.add(gPoint2);

    gPoint1.moveTo({x:200,y:240}, 1);
    // board.add(gPoint2);
    // board.add(gPoint3);

    // let gAngle = new GAngle(gPoint1, gPoint2, gPoint3);
    // board.add(gAngle);


    // board.add(gPoint4);
    // let gPolygon = new GPolygon([gPoint1, gPoint2, gPoint3]);
    // board.add(gPolygon);
    // board.add(gPoint1);
    // board.add(gPoint2);
    // board.add(gLine);
    // board.add(gPoint3);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    height: 100%;
  }
  #canvas{
    height: 20rem;
    width: 20rem;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 20px;
  }
</style>
