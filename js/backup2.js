const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = canvas.width = innerWidth
let height = canvas.height = innerHeight

const size = 100
let current = null
const NodesID = listNodes()
const num = NodesID.length
// const elements={}

function graphModel() {

  const elements = {
    nodes: [
      { data: { id: '0', label: 'Этап 1', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 100, y: 150 }, 
        subnodes: [
          { data: { id: '01', label: 'Этап 01', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 300, y: 300 } },
          { data: { id: '02', label: 'Этап 02', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 300, y: 300 } },
                  ] 
      },
      { data: { id: '1', label: 'Этап 2', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 250, y: 150 },
        subnodes: [
          { data: { id: '11', label: 'Этап 11', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 400, y: 400 } },
          { data: { id: '12', label: 'Этап 12', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 400, y: 400 } },
                  ] 
       },
      { data: { id: '2', label: 'Этап 3', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 400, y: 150 } },
      { data: { id: '3', label: 'Этап 4', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 550, y: 150 } },
      { data: { id: '4', label: 'Этап 5', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 750, y: 250 } },
      { data: { id: '5', label: 'Этап 6', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 750, y: 400 } },
      { data: { id: '6', label: 'Этап 7', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 600, y: 400 } },
      { data: { id: '7', label: 'Этап 8', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 450, y: 400 } },
    ],
    // edges: [
    //   { data: { id: '0-1', label: 'Этап 1-1' }, position: { x: 120, y: 170 } },

    // ]
  }
  return elements
}

function drawSub(subnodes, items) {
        for (let itemssub = 0; itemssub < subnodes.length; itemssub++) {

            console.log('g1111')
              textIntoTheCircleSub = subnodes[itemssub]['data']['label']
              linkSub = subnodes[itemssub]['data']['link']
              positionX = subnodes[itemssub]['position']['x']
              positionY = subnodes[itemssub]['position']['y']
              const element = document.createElement('div')
    // const textNode = document.createElement('p');
              element.addEventListener('mousedown', onMouseDown)
              const id = 'el' +items+ itemssub
              element.id = id
              // element.setAttribute('href', link);
              element.className = "bubbleSub";
              element.innerHTML = `<div class="textParentSub"><p class="textIntoTheCircleSub">${textIntoTheCircleSub}</p></div>`;
              document.body.prepend(element)
              // document.body.prepend(textNode)

            // console.log(element)
              // тут будут храниться и изменяться все его координаты
  // elements[items][id] = {
  //     x: positionX,
  //     y: positionY,
  //     startX: 0,
  //     startY: 0,

  //   }
    // translate(element, elements[id].x, elements[id].y)
      }
}


// функция отрисовки рендеринга страниц, и рендеринга ссылок. 
function draw() {

  for (let items = 0; items < num; items++) {
    subnodes= NodesID[items]['subnodes']
         // console.log(subnodes)
    textIntoTheCircle = NodesID[items]['data']['label']
    itemid = NodesID[items]['data']['id']
    link = NodesID[items]['data']['link']
    positionX = NodesID[items]['position']['x']
      positionY = NodesID[items]['position']['y']

      // console.log(subnodes)
    // создание dom-элемента
    const element = document.createElement('div')
    // const textNode = document.createElement('p');
    element.addEventListener('mousedown', onMouseDown)
    const id = 'el' + items
    element.id = id
    // element.setAttribute('href', link);
    element.className = "bubble";
    element.innerHTML = `<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>`;
    document.body.prepend(element)
    // document.body.prepend(textNode)

  // console.log(NodesID[items]['position']['x'])
    // тут будут храниться и изменяться все его координаты
    elements[id] = {
      x: positionX,
      y: positionY,
      startX: 0,
      startY: 0
    }
  console.log(textIntoTheCircle)
    // начальное положение
    // translate(element, elements[id].x, elements[id].y)
    element.addEventListener("dblclick", {handleEvent: clickBubbles, link: link});
      if (typeof subnodes !== "undefined" && subnodes !== "null") {
        // const elements={}
        console.log(id)
drawSub(subnodes, items)
      
    } else{
      console.log('g2222')
    }

  }
// соединяем линиями
connect(elements)

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
  // console.log(itemsNodesID)
  return itemsNodesID
}


function clickBubbles(event) {
  console.log('чмошник')
  console.log(this.link)
window.location.href =this.link
}
/*------------------------------------*/

function onMouseDown(e) {
  e.preventDefault()

  // координаты нажатия мыши внутри элемента
  elements[e.target.id].startX = e.x - elements[e.target.id].x
  elements[e.target.id].startY = e.y - elements[e.target.id].y
console.log(e.target)
  current = e.target

  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
  const x = elements[current.id].x = e.x - elements[current.id].startX
  const y = elements[current.id].y = e.y - elements[current.id].startY

  translate(current, x, y)
  connect(elements)
}

function onMouseUp() {
  document.body.removeEventListener('mousemove', onMouseMove)
  document.body.removeEventListener('mouseup', onMouseUp)
}

/*------------------------------------*/

function translate(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`
}

function connect(elements) {
  context.clearRect(0, 0, width, height)
console.log(elements)
  for (let i = 0; i < num - 1; i++) {
    drawLine(
      elements['el' + i].x,
      elements['el' + (i + 1)].x,
      elements['el' + i].y,
      elements['el' + (i + 1)].y
    )
  }
}


function connectSub(elements) {
  context.clearRect(0, 0, width, height)
console.log(elements)
  // for (let i = 0; i < num - 1; i++) {
  //   drawLine(
  //     elements['el' + i].x,
  //     elements['el' + (i + 1)].x,
  //     elements['el' + i].y,
  //     elements['el' + (i + 1)].y
  //   )
  // }
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

onresize = () => {
  width = canvas.width = innerWidth
  height = canvas.height = innerHeight
  connect(elements)
}


