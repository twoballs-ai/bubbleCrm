const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');



function draw() {
renderingCircle()
// console.log(listEdges())
}

function graphModel() {

  const elements = {
    nodes: [
      { data: { id: '0', label: 'Этап 1' }, position: { x: 100, y: 150 } },
      { data: { id: '1', label: 'Этап 2' }, position: { x: 250, y: 150 } },
      { data: { id: '3', label: 'Этап 3' }, position: { x: 400, y: 150 } },
      { data: { id: '4', label: 'Этап 4' }, position: { x: 550, y: 150 } },
      { data: { id: '5', label: 'Этап 5' }, position: { x: 750, y: 250 } },
      { data: { id: '6', label: 'Этап 7' }, position: { x: 750, y: 400 } },
      { data: { id: '7', label: 'Этап 8' }, position: { x: 600, y: 400 } },
      { data: { id: '8', label: 'Этап 9' }, position: { x: 450, y: 400 } },
      ],
    edges: [
      { data: { source: '0', target: '1', label: 'переход с айди0 на айди1' } }
      ]
  }
  return elements
}
function listNodes() {
  let itemsNodesID=[]
  const nodesValues = graphModel()['nodes']
  const listingNodes = ()=> {
    nodesValues.forEach(function(item, index, arr) {
    itemsNodesID.push(item)
  });
  }
  listingNodes()
console.log(itemsNodesID)
 return itemsNodesID
}

function listEdges() {
  let itemsEddgesID=[]
  const nodesValues = graphModel()['edges']
  const listingEdges = ()=> {
    nodesValues.forEach(function(item, index, arr) {
    itemsEddgesID.push(item)
  });
  }
  listingEdges()
console.log(itemsEddgesID)
 return itemsEddgesID
}

function renderingCircle(){
  const NodesID = listNodes()
  console.log(NodesID)

   for (let items = 0; items <= NodesID.length-1; items++) {
      const circle = new Path2D();
      positionX= NodesID[items]['position']['x']
      positionY= NodesID[items]['position']['y']
      circle.arc(positionX, positionY, 50, 0, 2 * Math.PI)
      ctx.fillStyle = '#FFFF99';
      ctx.fill(circle)
      console.log(circle)
      
      canvas.addEventListener('mousemove', function(event) {
  // Check whether point is inside circle
  if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
    ctx.fillStyle = '#33FFFF';
  }
  else {
    ctx.fillStyle = '#FFFF99';
  }
  ctx.fill(circle);
});
    }

// ctx.fillStyle = 'red';
// ctx.fill(circle)
// canvas.addEventListener('mousemove', function(event) {
//   // Check whether point is inside circle
//   if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
//     ctx.fillStyle = 'green';
//   }
//   else {
//     ctx.fillStyle = 'red';
//   }

//   // Draw circle
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fill(circle);
// });
}

function myFunction() {

  const nodesValues = graphModel()['nodes']
  const position = ()=> {
    nodesValues.forEach(function(item, i, arr) {
      let x = item['position']['x']
      let y = item['position']['y']
    ctx.beginPath();
    ctx.fillStyle = "#7fffd4"
    ctx.arc(x, y, 50, 0, Math.PI * 2)
    // ctx.stroke()
    ctx.fill()
    // ctx.closePath();
    
    ctx.font = '12pt Calibri';
    ctx.fillStyle = 'Black';
    ctx.textAlign = 'center';
    ctx.fillText(item['data']['label'], x+0, y+3)

    // ctx.fillStyle = "#FF0000"

    // ctx.font = '8pt Calibri';
    // ctx.fillStyle = 'white';
    // ctx.textAlign = 'center';
    // ctx.fillText('0', x, y+3);
    // ctx.closePath();
  console.log(x)
  });
  }
  position()
 
  console.log('граф добавлен')
  console.log(graphModel())

}