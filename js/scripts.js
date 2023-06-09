const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = canvas.width = innerWidth
let height = canvas.height = innerHeight
// context.clearRect(0, 0, width, height)
const size = 100
let current = null
const NodesID = listNodes()
const elements = {}
const EdgesId = listEdges()
let elementId = {}
async function graphModel() {
  const url = 'http://127.0.0.1:8000/api/canvas/1'
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}



// отправка данных для ноды, отрефакторить:
async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  data.append('canvas', '1');
 const value = Object.fromEntries(data.entries());
 const response = await addNode(value)
  console.log(data);
}

const form = document.getElementById('addNode');
form.addEventListener('submit', handleSubmit);

async function handleAddEdgeSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  data.append('canvas', '1');
 const value = Object.fromEntries(data.entries());
 const response = await addEdge(value)
  console.log(data);
}

const formAddEdge = document.getElementById('addEdge');
formAddEdge.addEventListener('submit', handleAddEdgeSubmit);
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
function getElementId(elemId) {
  elementId.elid = elemId
  console.log(elementId)
}

async function addNode(value) {
 
  console.log(value)
  const url = 'http://127.0.0.1:8000/api/node-list/1'
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body:  JSON.stringify(value)
  })
}

async function addEdge(value) {
 
  console.log(value)
  const url = 'http://127.0.0.1:8000/api/edge-list/1'
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body:  JSON.stringify(value)
  })
}

async function deleteNode(e) {
    // console.log(elementId)
    const url = 'http://127.0.0.1:8000/api/node-detail/1/'
    console.log(url)

  return await fetch(url+elementId['elid'], {
    method: 'DELETE'
  })
  .then(console.log('succesful delete'));
}

async function getEdgeList() {
  const url = 'http://127.0.0.1:8000/api/edge-list/1'
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


// функция отрисовки рендеринга страниц, и рендеринга ссылок. 
function draw() {
  const TextBody = document.createElement('div')
  TextBody.id = 'TextBody'
  TextBody.innerHTML = `<h3 class="redactClass">Режим редактора</h3>`;
  document.body.prepend(TextBody)
  canvas.addEventListener("contextmenu", onContextMenu);
  drawingBubbles()
  // connectSubAndParent(subelements, elements[parentId])
  // console.log(elements['el7'])
}

// функция рисования шаров
async function drawingBubbles() {
  const num = (await NodesID).length
  // console.log(num)
  for (let items = 0; items < num; items++) {
    // subnodes= NodesID[items]['subnodes']
    //  console.log(await NodesID)
    textIntoTheCircle = (await NodesID)[items]['label']
    // console.log(textIntoTheCircle)
    link = (await NodesID)[items]['link']
    positionX = (await NodesID)[items]['posX']
    positionY = (await NodesID)[items]['posY']
    style = (await NodesID)[items]['style']
    buttonId = (await NodesID)[items]['id']
    // создание dom-элемента
    const element = document.createElement('div')
    // const textNode = document.createElement('p');
    element.addEventListener('mousedown', onMouseDown)
    const id = 'el' + items
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
      x: positionX,
      y: positionY,
      startX: 0,
      startY: 0
    }

    // начальное положение
    translate(element, elements[id].x, elements[id].y)
    element.addEventListener("dblclick", { handleEvent: clickBubbles, link: link });
    element.addEventListener("contextmenu", { handleEvent: onContextBubbleMenu, buttonId: buttonId });
  }
  // console.log(elements)
  // connect(elements,subelements)
  connect(elements)
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
  let circles = await graphModel()
  let itemsEdgesID = []
  const edgesValues = circles['edges']
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
  window.location.href = this.link
}
/*------------------------------------*/

function onMouseDown(e) {
  if (e.which == 1) {
    console.log('mouse down state with left click');
    e.preventDefault()
    console.log(e)
    // координаты нажатия мыши внутри элемента
    elements[e.target.id].startX = e.x - elements[e.target.id].x
    elements[e.target.id].startY = e.y - elements[e.target.id].y
    // console.log(elements[e.target.id].startX = e.x - elements[e.target.id].x)
    current = e.target
    document.body.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseup', onMouseUp)
  } else if (e.which == 3) {
    // console.log('hui')
  }

}

function onMouseMove(e) {
  context.clearRect(0, 0, width, height)
  const x = elements[current.id].x = e.x - elements[current.id].startX
  const y = elements[current.id].y = e.y - elements[current.id].startY
  console.log()
  translate(current, x, y)
  connect(elements)
  // connectSub(elements,subelements)
}

function onMouseUp() {
  document.body.removeEventListener('mousemove', onMouseMove)
  document.body.removeEventListener('mouseup', onMouseUp)
}
// меню для шаров
function onContextBubbleMenu(e) {
  e.preventDefault()
  // console.log(this.buttonId)
  // let bubbleId = this.buttonId
  let contextBubbleMenuOpen = document.querySelector('.bubble-menu-open');
  contextBubbleMenuOpen.style.left = e.clientX + 'px';
  contextBubbleMenuOpen.style.top = e.clientY + 'px';
  contextBubbleMenuOpen.style.display = 'block';
  getElementId(this.buttonId)
  window.addEventListener('click', function () {
    contextBubbleMenuOpen.style.display = 'none';
  });
}
// меню для канваса
function onContextMenu(e) {
  e.preventDefault()
  let contextMenuOpen = document.querySelector('.context-menu-open');
  contextMenuOpen.style.left = e.clientX + 'px';
  contextMenuOpen.style.top = e.clientY + 'px';
  contextMenuOpen.style.display = 'block';
  window.addEventListener('click', function () {
    contextMenuOpen.style.display = 'none';
  });
}
function onContextAddNode(e) {
  e.preventDefault()
 
  let contextAddNode = document.querySelector('.add-node-open');
  contextAddNode.style.left = e.clientX + 'px';
  contextAddNode.style.top = e.clientY + 'px';
  contextAddNode.style.display = 'block';
  console.log('dbdf')
}

function onContextAddEdge(e) {
  e.preventDefault()
 
  let contextAddNode = document.querySelector('.add-edge-open');
  contextAddNode.style.left = e.clientX + 'px';
  contextAddNode.style.top = e.clientY + 'px';
  contextAddNode.style.display = 'block';
  console.log('edge')
}

function onContextDeleteEdge(e) {
  e.preventDefault()
 
  let contextAddNode = document.querySelector('.delete-edge-open');
  contextAddNode.style.left = e.clientX + 'px';
  contextAddNode.style.top = e.clientY + 'px';
  contextAddNode.style.display = 'block';
  console.log('deleteedge')
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
  // console.log(x,y)
}

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
async function connect(elements) {

  const subedges = (await EdgesId).length
  // console.log(EdgesId)
  for (let i = 0; i < subedges; i++) {
    source = (await EdgesId)[i].source
    target = (await EdgesId)[i].target
    // console.log((await EdgesId)[i].target)
    //  console.log(elements[source])
    //  console.log(elements[target])
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
  context.moveTo(x1 + size / 2, y1 + (size - 120) / 2)
  // в центр другого квадрата
  context.lineTo(x2 + size / 2, y2 + (size - 120) / 2)
  context.lineWidth = 4;
  context.strokeStyle = "rgba(166, 196, 255, 1)"
  context.stroke()
}
// function addBubble() {
//   NodesID.push({ data: { id: 'el9', label: 'Этап 10', style: 'bubbleSecondary', link: 'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 850, y: 850 } })
//   console.log(NodesID)

// }
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




