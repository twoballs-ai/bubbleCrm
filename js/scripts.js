const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let elementslist = []

  canvas.addEventListener('click', function(e) {


        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;

        elementslist.forEach(function(element){
          // let circleId = element.id
          let circleText = element.circleText
          console.log(element)
            if(Math.pow(x-element.x,2) + Math.pow(y-element.y,2) < Math.pow(element.circleSize,2)) {
               element.clicked(circleText); 
            }
        });

    });


function draw() {
  renderingCircles()
  renderingLines()
// renderingCircleS()
// console.log(listEdges())
// console.log(itemsNodesID)
}

function graphModel() {

  const elements = {
    nodes: [
      { data: { id: '0', label: 'Этап 1' }, position: { x: 100, y: 150 } },
      { data: { id: '1', label: 'Этап 2' }, position: { x: 250, y: 150 } },
      { data: { id: '2', label: 'Этап 3' }, position: { x: 400, y: 150 } },
      { data: { id: '3', label: 'Этап 4' }, position: { x: 550, y: 150 } },
      { data: { id: '4', label: 'Этап 5' }, position: { x: 750, y: 250 } },
      { data: { id: '5', label: 'Этап 6' }, position: { x: 750, y: 400 } },
      { data: { id: '6', label: 'Этап 7' }, position: { x: 600, y: 400 } },
      { data: { id: '7', label: 'Этап 8' }, position: { x: 450, y: 400 } },
      ],
    edges: [
      { data: { source: '0', target: '1', label: 'переход с айди0 на айди1' } },
      { data: { source: '1', target: '2', label: 'переход с айди0 на айди1' } },
      { data: { source: '2', target: '3', label: 'переход с айди0 на айди1' } },
      { data: { source: '3', target: '4', label: 'переход с айди0 на айди1' } },
      { data: { source: '4', target: '5', label: 'переход с айди0 на айди1' } },
      { data: { source: '5', target: '6', label: 'переход с айди0 на айди1' } },
      { data: { source: '6', target: '7', label: 'переход с айди0 на айди1' } },

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

function writeMessage(text,posx,posy) {
        ctx.font = '18pt Calibri';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(text, positionX, positionY);
    };

function renderCircle(x, y){
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2, true);
        ctx.fillStyle = '#FFFF99';
        ctx.fill();
        ctx.closePath();
}

function renderLine(posXstart,posYstart, posXend,posYend){
  ctx.beginPath();
ctx.moveTo(posXstart,posYstart);
ctx.lineTo(posXend,posYend);
ctx.stroke();
}

function renderingCircles(){
        const NodesID = listNodes()
        console.log()
  for (let items = 0; items <= NodesID.length-1; items++) {
      const circle = new Path2D(items);
      positionX= NodesID[items]['position']['x']
      positionY= NodesID[items]['position']['y']
      textIntoTheCircle= NodesID[items]['data']['label']
      circleId =  NodesID[items]['data']['id']
      renderCircle(positionX,positionY)
      writeMessage(textIntoTheCircle,positionX,positionY)
      // elementslist.push(circle)
      elementslist.push({
        id: circleId,
        circleText:textIntoTheCircle,
        color: '#05EFFF',
        circleSize: 50,
        x: positionX,
        y: positionY,
        clicked: function(label) {
            // alert(`Вы выбрали ${label} для обучения`)
            console.log(`Вы выбрали ${label} для обучения`)
        }
    });
  }
// console.log(elementslist)
}

function renderingLines(){
        const NodesID = listNodes()
        const EdgeID = listEdges()
        // console.log('sa')

   
  for (let items = 0; items <= EdgeID.length-1; items++) {
          positionXstart= NodesID[items]['position']['x']
          positionYstart= NodesID[items]['position']['y']
          positionXend= NodesID[(items+1)]['position']['x']
          positionYend= NodesID[(items+1)]['position']['y']
          // console.log(positionXstart,positionYstart,positionXend,positionYend)
// console.log(EdgeID[items])
renderLine(positionXstart,positionYstart, positionXend,positionYend)
  }

}


