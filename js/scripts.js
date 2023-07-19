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


async function graphModel() {
  const url = 'http://127.0.0.1:8000/api/canvas/10'
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
function getElementId(elemId, buttonId) {
  elementId.elid = elemId
  elementId.butid = buttonId
  console.log(elementId)
}


async function addNode(value) {

  console.log(value)
  const url = 'http://127.0.0.1:8000/api/node-list/10'
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(value)
  })
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

async function editNode(value) {
  id = value.id
  console.log(value)


  const url = 'http://127.0.0.1:8000/api/node-detail/10/'
  return await fetch(url+id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(value)
  })
}
async function deleteNode(e) {
  // console.log(elementId)
  const url = 'http://127.0.0.1:8000/api/node-detail/10/'
  console.log(url)

  return await fetch(url + elementId['elid'], {
    method: 'DELETE'
  })
    .then(console.log('succesful delete'));
}

async function addEdge(value) {

  console.log(value)
  const url = 'http://127.0.0.1:8000/api/edge-list/10'
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(value)
  })
}



async function getEdgeList() {
  const url = 'http://127.0.0.1:8000/api/edge-list/10'
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
  let circles = await graphModel()
  let itemsEdgesID = []
  const edgesValues = circles['edges']
  const listingEdges = () => {
    edgesValues.forEach(function (item, index, arr) {
      itemsEdgesID.push(item)
    });
  }
  listingEdges()
  // console.log(itemsEdgesID)
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
    element.addEventListener('mousedown', onMouseDown)
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
    element.addEventListener("contextmenu", { handleEvent: onContextBubbleMenu, buttonId: buttonId, elemId:elemId });
  }
  console.log(elements)
  // console.log(Object.keys(elements).length)
  // connect(elements,subelements)
  connect(elements)
}

// async function drawingBubblesAfterEdit() {
//   // let num = Object.keys(elements).length

//   for (items in elements) {
//     searchDuplicate(items).then((res)=>{
//       if (res===true) {
//         console.log(items)

//     textIntoTheCircle = elements[items]['label']
//     console.log(textIntoTheCircle)
//     // link = (await NodesID)[items]['link']
//     positionX = elements[items]['x']
//     positionY = elements[items]['y']
//     style = elements[items]['style']
//     buttonId = items
//     // создание dom-элемента
//     const element = document.createElement('div')
//     // const textNode = document.createElement('p');
//     element.addEventListener('mousedown', onMouseDown)
//     const id = buttonId
//     element.id = id
//     // console.log(id)
//     // element.setAttribute('href', link);
//     element.className = style;
//     element.innerHTML = `<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p><br><p class="textIntoTheCircle">id:${buttonId}</p></div>`;
//     document.body.prepend(element)
//     // document.body.prepend(textNode)
//     // console.log(element)
//     // тут будут храниться и изменяться все его координаты

//     console.log(element)
//     elements[id] = {
//       x: positionX,
//       y: positionY,
//       startX: 0,
//       startY: 0,
//       label: textIntoTheCircle,
//       style: style
//     }

//     // начальное положение
//     translate(element, elements[id].x, elements[id].y)
//     // element.addEventListener("dblclick", { handleEvent: clickBubbles, link: link });
//     element.addEventListener("contextmenu", { handleEvent: onContextBubbleMenu, buttonId: buttonId });
//       }
//       else{
//         console.log('ошибка')
//       }

//     })

//   }

//   // console.log(num)
//   console.log(elements)
//   // connect(elements,subelements)
//   connect(elements)
// }



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
    console.log(elements[e.target.id].startX = e.x - elements[e.target.id].x)
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
  // console.log(current)
  translate(current, x, y)
  connect(elements)
  // console.log(elements);
  // console.log('mouse onMove');

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
  getElementId(this.elemId, this.buttonId)
  console.log(this)
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

}


function onContextEditNode(e) {
  e.preventDefault()

  let contextAddNode = document.querySelector('.edit-node-open');
  contextAddNode.style.left = e.clientX + 'px';
  contextAddNode.style.top = e.clientY + 'px';
  contextAddNode.style.display = 'block';

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


function translate(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`
  // console.log(el,x,y)
}

async function connect(elements) {

  const subedges = (await EdgesId).length
  // console.log(EdgesId)
  for (let i = 0; i < subedges; i++) {
    source = (await EdgesId)[i].source
    target = (await EdgesId)[i].target

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

/*------------------------------------*/

// onResize = () => {
//   width = canvas.width = innerWidth
//   height = canvas.height = innerHeight
//   connect(elements)
//   connectSubAndParent(subelements)
// }

// window.addEventListener('resize', onResize, false);
//     onResize();

// отправка данных для ноды, отрефакторить:

// async function searchDuplicate(key){
//   for (let item of (await NodesID)) {
//     console.log(item)
//     console.log(key)
//     if (Object.values(item).includes(key)) {
//       console.log('exist')
//       return false
//     }
//     else{

//       console.log('notexist')
//       continue
//     }

//   }
//   console.log('fdf')
//   return true
// }

/////////////
async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  data.append('canvas', '10');
  data.append('posX', '500');
  data.append('posY', '70');
  const value = Object.fromEntries(data.entries());
  const response = await addNode(value)
  if (response.status === 200 || response.status === 201) {
    let result = await response.json();
    console.log(result.id);
    window.location.reload()
  }
}

const form = document.getElementById('addNode');
form.addEventListener('submit', handleSubmit);

//////////////
async function handleEditNodeSubmit(event) {
  event.preventDefault();
  
 
  console.log(elements[elementId['butid']])
  x = elements[elementId['butid']]['x']
  y = elements[elementId['butid']]['y']
  console.log(x,y)
  const data = new FormData(event.target);
  data.append('canvas', '10');
  data.append('prevNodeId', elementId['butid']);
  data.append('id', elementId['elid']);
  data.append('posX', x);
  data.append('posY', y);
  const value = Object.fromEntries(data.entries());
  const response = await editNode(value)
  console.log(event);
}

const formEditNode = document.getElementById('editNode');
formEditNode.addEventListener('submit', handleEditNodeSubmit);
//////////////


async function handleAddEdgeSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  data.append('canvas', '10');
  const value = Object.fromEntries(data.entries());
  const response = await addEdge(value)
  console.log(data);
}

const formAddEdge = document.getElementById('addEdge');
formAddEdge.addEventListener('submit', handleAddEdgeSubmit);

//////////////

// сохраняем карту шаров
async function saveMovementBubbles(event) {
  for (items in elements) {
    console.log(elements[items]['label'])
    elemID = elements[items]['elemId']
    textIntoTheCircle = elements[items]['label']
    console.log(textIntoTheCircle)
    positionX = elements[items]['x']
    positionY = elements[items]['y']
    style = elements[items]['style']
    buttonId = items
    const formData = new FormData();
    formData.append('canvas', '10');
    formData.append('posX', positionX)
    formData.append('posY', positionY)
    formData.append('label', textIntoTheCircle)
    formData.append('node_id', buttonId)
    formData.append('style', style)
    const response = await fetch('http://127.0.0.1:8000/api/node-detail/10/' + elemID, {
      method: 'PUT',
      body: formData
    }).then(response => response.json())
  }
  window.location.reload()
}
