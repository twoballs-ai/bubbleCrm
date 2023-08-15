const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = canvas.width = innerWidth
let height = canvas.height = innerHeight
// context.clearRect(0, 0, width, height)
const size = 100
let current = null
const NodesID = listNodes()
const elements = {}
const newElements = {}
const EdgesId = listEdges()
let elementId = {}
let numBubbles = 0

async function canvas_page() {

  // const name = await 1;

  return 1
}


async function graphModel() {
  let canvas_id = await canvas_page();
  
  const url = 'http://127.0.0.1:8000/api/canvas/'+canvas_id
  console.log(url)
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
  
}

// function serializeForm(formNode) {
//   return new FormData(formNode)
// }

// async function handleAddNodeFormSubmit(event) {
//   // Просим форму не отправлять данные самостоятельно
//   event.preventDefault()
//   // const data = serializeForm(event.target)
//   console.log(data)
//   const response = await addNode(data)
// }
// const applicantForm = document.getElementById('add-node')
// applicantForm.addEventListener('submit', handleAddNodeFormSubmit)
// console.log('Отправка!')
function getElementId(elemId, buttonId, textIntoTheCircle) {
  elementId.elid = elemId
  elementId.butid = buttonId
  elementId.lesson_id = textIntoTheCircle
  console.log(elementId)
  return elementId.elid 
}


// async function UpdateBubblesMap(value) {

//   console.log(JSON.stringify(value))
//   const url = 'http://127.0.0.1:8000/api/node-detail/1/el1'
//   // return await fetch(url, {
//   //   method: 'PUT',
//   //   headers: { 'Content-Type': 'application/json;charset=utf-8' },
//   //   body:  JSON.stringify(value)
//   // })
// }


async function getEdgeList() {
  let canvas_id = await canvas_page();
  const url = 'http://127.0.0.1:8000/api/edge-list/'+canvas_id
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
// функция отрисовки рендеринга страниц, и рендеринга ссылок. 
function userDraw() {
  // const TextBody = document.createElement('div')
  // TextBody.id = 'TextBody'
  // TextBody.innerHTML = `<h3 class="redactClass">Режим редактора</h3>`;
  // document.body.prepend(TextBody)

  drawingBubblesFromServer()
  // connectSubAndParent(subelements, elements[parentId])
  // console.log(elements['el7'])
}
async function listNodes() {
  // graphModel().then(bubbles => {
  //   console.log(bubbles) // fetched movies
  // });
  let circles = await graphModel()
  // const graph = graphModel()
  // console.log(circles)
  let itemsNodesID = []
  const nodesValues = circles['nodes']
  const listingNodes = () => {
    nodesValues.forEach(function (item, index, arr) {
      itemsNodesID.push(item)
      // console.log(item)
    });
  }
  listingNodes()
  console.log(itemsNodesID)
  return itemsNodesID
}
async function listEdges() {
  let circles = await getEdgeList()
  let itemsEdgesID = []
  const edgesValues = circles
  const listingEdges = () => {
    edgesValues.forEach(function (item, index, arr) {
      itemsEdgesID.push(item)
    });
  }
  listingEdges()
  console.log(itemsEdgesID)
  return itemsEdgesID
}
// функция рисования шаров
async function drawingBubblesFromServer() {
  let num = (await NodesID).length
  // console.log(num)
  for (let items = 0; items < num; items++) {
    // subnodes= NodesID[items]['subnodes']
    //  console.log(await NodesID)
    textIntoTheCircle = (await NodesID)[items]['label']
    // console.log(textIntoTheCircle)
    // link = (await NodesID)[items]['link']
    positionX = (await NodesID)[items]['posX']
    positionY = (await NodesID)[items]['posY']
    style = (await NodesID)[items]['style']
    buttonId = (await NodesID)[items]['node_id']
    elemId= (await NodesID)[items]['id']
    // создание dom-элемента
    const element = document.createElement('div')
    // const textNode = document.createElement('p');
    const id = buttonId
    element.id = id
    // console.log(id)
    // element.setAttribute('href', link);
    element.className = style;
    element.innerHTML = `<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p><br><p class="textIntoTheCircle">id:${buttonId}</p></div>`;
    document.body.prepend(element)
    // document.body.prepend(textNode)
    // console.log(element)
    // тут будут храниться и изменяться все его координаты
    elements[id] = {
      elemId: elemId,
      x: positionX,
      y: positionY,
      startX: 0,
      startY: 0,
      label: textIntoTheCircle,
      style: style
    }
    // начальное положение
    translate(element, elements[id].x, elements[id].y)
    // element.addEventListener("dblclick", { handleEvent: clickBubbles, link: link });
  }
  console.log(elements)
  // console.log(Object.keys(elements).length)
  // connect(elements,subelements)
  connect(elements)
}

function clickBubbles(event) {
  console.log('чмошник')
  console.log(this.link)
  window.location.href = this.link
}
/*------------------------------------*/






function translate(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`
  // console.log(el,x,y)
}

async function connect(elements) {
  const subedges = (await EdgesId).length
  // console.log(subedges)
  for (let i = 0; i < subedges; i++) {
    source = (await EdgesId)[i].source.node_id
    target = (await EdgesId)[i].target.node_id
    // console.log(source, target)
    // console.log(elements[source],elements[target])
    if(typeof elements[source] !== 'undefined' && typeof elements[target] !== 'undefined'){
      // console.log(elements[source],elements[target])
          drawLine(
      elements[source].x,
      elements[target].x,
      elements[source].y,
      elements[target].y
    )
    }
// console.log(elements[source],elements[target])
    // drawLine(
    //   elements[source].x,
    //   elements[target].x,
    //   elements[source].y,
    //   elements[target].y
    // )
  }
}
function drawLine(x1, x2, y1, y2) {
  context.beginPath()
  // из центра квадрата
  context.moveTo(x1 + size / 2, y1 + (size - 120) / 2)
  // в центр другого квадрата
  context.lineTo(x2 + size / 2, y2 + (size - 120) / 2)
  context.lineWidth = 4;
  context.strokeStyle = "rgba(166, 196, 255, 1)"
  context.stroke()
}





