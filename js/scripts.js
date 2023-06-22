const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = canvas.width = innerWidth
let height = canvas.height = innerHeight
// context.clearRect(0, 0, width, height)
const size = 100
let current = null
const NodesID = listNodes()
const num = NodesID.length
const elements={}
const subelements={}
const EdgesId = listEdges()
const subedges = EdgesId.length
function graphModel() {

  const startElements = {
    nodes: [
      { data: { id: 'el0', label: 'Этап 1', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 100, y: 150 } },
      { data: { id: 'el1', label: 'Этап 2', style:'bubbleWarning', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 250, y: 150 } },
      { data: { id: 'el2', label: 'Этап 3', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 400, y: 250 } },
      { data: { id: 'el3', label: 'Этап 4', style:'bubbleSecondary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 100, y: 550 } },
      { data: { id: 'el4', label: 'Этап 5', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 350, y: 350 } },
      { data: { id: 'el5', label: 'Этап 6', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 450, y: 450 } },
      { data: { id: 'el6', label: 'Этап 7', style:'bubbleSecondary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 600, y: 550 } },
      { data: { id: 'el7', label: 'Этап 8', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 800, y: 650 } },
      { data: { id: 'el8', label: 'Этап 9', style:'bubbleSecondary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 750, y: 750 } },
    ],
    edges: [
      { data: { id: 'ab', source: 'el0', target: 'el1', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'ab', source: 'el0', target: 'el3', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'bc', source: 'el1', target: 'el2', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'bc', source: 'el2', target: 'el3', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'ab', source: 'el3', target: 'el4', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'bc', source: 'el4', target: 'el5', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'bc', source: 'el5', target: 'el6', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'ab', source: 'el7', target: 'el8', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'bc', source: 'el6', target: 'el7', label: 'Edge from Node1 to Node2' } },
      { data: { id: 'bc', source: 'el6', target: 'el8', label: 'Edge from Node1 to Node2' } },

    ]
  }
  return startElements
}

// функция отрисовки рендеринга страниц, и рендеринга ссылок. 
function draw() {

  for (let items = 0; items < num; items++) {
    // subnodes= NodesID[items]['subnodes']
         // console.log(subnodes)
    textIntoTheCircle = NodesID[items]['data']['label']
    link = NodesID[items]['data']['link']
    positionX = NodesID[items]['position']['x']
    positionY = NodesID[items]['position']['y']
    style = NodesID[items]['data']['style']

      // console.log(subnodes)
    // создание dom-элемента
    const element = document.createElement('div')
    // const textNode = document.createElement('p');
    element.addEventListener('mousedown', onMouseDown)
    const id = 'el' + items
    element.id = id
    console.log(id)
    // element.setAttribute('href', link);
    element.className = style;
    
    element.innerHTML = `<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>`;
    document.body.prepend(element)
    // document.body.prepend(textNode)

  // console.log(element)
    // тут будут храниться и изменяться все его координаты
    elements[id] = {
      x: positionX,
      y: positionY,
      startX: 0,
      startY: 0
    }
  // console.log(textIntoTheCircle)
    // начальное положение
    translate(element, elements[id].x, elements[id].y)
    element.addEventListener("dblclick", {handleEvent: clickBubbles, link: link});
  }

  // connect(elements,subelements)
  connectEdges(elements)
  // connectSubAndParent(subelements, elements[parentId])
  // console.log(elements['el7'])
}

function listNodes() {
  let itemsNodesID = []
  const nodesValues = graphModel()['nodes']
  const listingNodes = () => {
    nodesValues.forEach(function (item, index, arr) {
      itemsNodesID.push(item)
    });
  }
  listingNodes()
  console.log(itemsNodesID)
  return itemsNodesID
}

function listEdges() {
  let itemsEdgesID = []
  const edgesValues = graphModel()['edges']
  const listingEdges = () => {
    edgesValues.forEach(function (item, index, arr) {
      itemsEdgesID.push(item)
    });
  }
  listingEdges()
  console.log(itemsEdgesID)
  return itemsEdgesID
}

function clickBubbles(event) {
  console.log('чмошник')
  console.log(this.link)
window.location.href =this.link
}
/*------------------------------------*/

function onMouseDown(e) {
  e.preventDefault()
console.log(e)
  // координаты нажатия мыши внутри элемента

  elements[e.target.id].startX = e.x - elements[e.target.id].x
  elements[e.target.id].startY = e.y - elements[e.target.id].y
// console.log(elements[e.target.id].startX = e.x - elements[e.target.id].x)
  current = e.target

  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
  context.clearRect(0, 0, width, height)
  const x = elements[current.id].x = e.x - elements[current.id].startX
  const y = elements[current.id].y = e.y - elements[current.id].startY

  translate(current, x, y)
  // connect(elements)
  // connectSub(elements,subelements)
}

function onMouseUp() {
  document.body.removeEventListener('mousemove', onMouseMove)
  document.body.removeEventListener('mouseup', onMouseUp)
}

/*------------------------------------*/

/*------------------------------------*/

// function onMouseDownSub(e) {
//   e.preventDefault()

//   // координаты нажатия мыши внутри элемента
  
//   subelements[e.target.id].startX = e.x - subelements[e.target.id].x
//   subelements[e.target.id].startY = e.y - subelements[e.target.id].y
// // console.log(elements[e.target.id].startX = e.x - elements[e.target.id].x)
//   current = e.target

//   document.body.addEventListener('mousemove', onMouseMoveSub)
//   document.body.addEventListener('mouseup', onMouseUpSub)
// }

// function onMouseMoveSub(e) {
//   context.clearRect(0, 0, width, height)
//   const x = subelements[current.id].x = e.x - subelements[current.id].startX
//   const y = subelements[current.id].y = e.y - subelements[current.id].startY

//   translateSub(current, x, y)
//   connect(elements)
//   connectSub(elements,subelements)
// }

// function onMouseUpSub() {
//   document.body.removeEventListener('mousemove', onMouseMoveSub)
//   document.body.removeEventListener('mouseup', onMouseUpSub)
// }

/*------------------------------------*/

function translate(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`
}
// function translateSub(el, x, y) {
//   el.style.transform = `translate(${x}px, ${y}px)`
// }
// function connect(elements) {
  
//   // context.clearRect(0, 0, width, height)
// // console.log(elements)
//   console.log('1')
//   for (let i = 0; i < num - 1; i++) {
//         drawLine(
//           elements['el' + i].x,
//           elements['el' + (i + 1)].x,
//           elements['el' + i].y,
//           elements['el' + (i + 1)].y
//         )
//       }

// }
function connectEdges(elements) {
  
  for (let i = 0; i < subedges; i++) {
    source = EdgesId[i]['data'].source
    target = EdgesId[i]['data'].target
    console.log(EdgesId[i]['data'])
   console.log(elements[source])
   console.log(elements[target])
  //  console.log(source)
  //  console.log(target)
    // parentidcycle = subelements['el0' + i].parentId
  // console.log(parentidcycle)
  // console.log(elements[parentidcycle].y)

      drawLine(
    elements[source].x,
    elements[target].x,
    elements[source].y,
    elements[target].y
  )

}


}




function drawLine(x1, x2, y1, y2) {
  context.beginPath()
  // из центра квадрата
  context.moveTo(x1 + size / 2, y1 + (size-120) / 2)
  // в центр другого квадрата
  context.lineTo(x2 + size / 2, y2 + (size-120) / 2)
  context.lineWidth = 4;
  context.strokeStyle = "rgba(166, 196, 255, 1)"
  context.stroke()
}

// function writeMessage(text, posx, posy) {
//   context.font = '18pt Calibri';
//   context.fillStyle = 'red';
//   // context.textAlign = 'center';
//   context.fillText(text, posx + size / 2, posy+ (size-120) / 2);
//   console.log(context.fillText)
// };
/*------------------------------------*/

// onResize = () => {
//   width = canvas.width = innerWidth
//   height = canvas.height = innerHeight
//   connect(elements)
//   connectSubAndParent(subelements)
// }

// window.addEventListener('resize', onResize, false);
//     onResize();




