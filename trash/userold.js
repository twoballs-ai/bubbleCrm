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
// const subelements={}
const EdgesId = listEdges()
const subedges = EdgesId.length
const audioIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill audioIcon" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg>`
const videoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube videoIcon" viewBox="0 0 16 16">
<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
</svg>`
const texIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fonts textIcon" viewBox="0 0 16 16">
<path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"/>
</svg>`
const imageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-image imageIcon" viewBox="0 0 16 16">
<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
<path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
</svg>`
function graphModel() {

  const startElements = {
    nodes: [
      { data: { id: 'el0', label: 'Этап 1', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s', audio:'1', video:'1' ,image:'1', text:'1'}, position: { x: 100, y: 150 } },
      { data: { id: 'el1', label: 'Этап 2', style:'bubbleWarning', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 250, y: 150 } },
      { data: { id: 'el2', label: 'Этап 3', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s', audio:'1',image:'1' }, position: { x: 400, y: 250 } },
      { data: { id: 'el3', label: 'Этап 4', style:'bubbleSecondary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 100, y: 550 } },
      { data: { id: 'el4', label: 'Этап 5', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 350, y: 350 } },
      { data: { id: 'el5', label: 'Этап 6', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s', audio:'1' }, position: { x: 450, y: 450 } },
      { data: { id: 'el6', label: 'Этап 7', style:'bubbleSecondary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s',image:'1' }, position: { x: 600, y: 550 } },
      { data: { id: 'el7', label: 'Этап 8', style:'bubblePrimary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s' }, position: { x: 800, y: 650 } },
      { data: { id: 'el8', label: 'Этап 9', style:'bubbleSecondary', link:'https://www.youtube.com/watch?v=O1C_fNlZDAU&t=1490s', video:'1', text:'1' }, position: { x: 750, y: 750 } },
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
function userDraw() {
  const TextBody = document.createElement('div')
  TextBody.id = 'TextBody'
  TextBody.innerHTML = `<h3 class="redactClass">Режим просмотра</h3>`;
  document.body.prepend(TextBody)
  
  for (let items = 0; items < num; items++) {
    // subnodes= NodesID[items]['subnodes']
         // console.log(subnodes)
    textIntoTheCircle = NodesID[items]['data']['label']
    link = NodesID[items]['data']['link']
    positionX = NodesID[items]['position']['x']
    positionY = NodesID[items]['position']['y']
    style = NodesID[items]['data']['style']
    audio = NodesID[items]['data']['audio']
    video = NodesID[items]['data']['video']
    image = NodesID[items]['data']['image']
    text = NodesID[items]['data']['text']
      // console.log(subnodes)
    // создание dom-элемента
    const element = document.createElement('div')
    // const textNode = document.createElement('p');
    // element.addEventListener('mousedown', onMouseDown)
    const id = 'el' + items
    element.id = id
    // console.log(id)
    // element.setAttribute('href', link);
    element.className = style;
  console.log(audio!=='')
  //  здесь тернарный оператор для отображения видео фото текстовых и фото иконок:
  const icons= (typeof audio !== "undefined" && audio !== "null" && typeof video !== "undefined" && video !== "null" && typeof text !== "undefined" && text !== "null" && typeof image !== "undefined" && image !== "null")?
    element.innerHTML = `${audioIcon}${videoIcon}${texIcon}${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` : 
      (typeof audio !== "undefined" && audio !== "null" && typeof video !== "undefined" && video !== "null" && typeof text !== "undefined" && text !== "null")?
      element.innerHTML = `${audioIcon}${videoIcon}${texIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>`:
        (typeof audio !== "undefined" && audio !== "null" && typeof video !== "undefined" && video !== "null"  && typeof image !== "undefined" && image !== "null")?
        element.innerHTML = `${audioIcon}${videoIcon}${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
          (typeof audio !== "undefined" && audio !== "null" && typeof text !== "undefined" && text !== "null" && typeof image !== "undefined" && image !== "null")?
          element.innerHTML = `${audioIcon}${texIcon}${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` : 
            (typeof video !== "undefined" && video !== "null" && typeof text !== "undefined" && text !== "null" && typeof image !== "undefined" && image !== "null")?
            element.innerHTML = `${videoIcon}${texIcon}${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
              (typeof audio !== "undefined" && audio !== "null" && typeof video !== "undefined" && video !== "null" ) ?
              element.innerHTML = `${audioIcon}${videoIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                (typeof audio !== "undefined" && audio !== "null"&& typeof text !== "undefined" && text !== "null")?
                element.innerHTML = `${audioIcon}${texIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` : 
                  (typeof audio !== "undefined" && audio !== "null" && typeof image !== "undefined" && image !== "null")?
                  element.innerHTML = `${audioIcon}${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                    (typeof video !== "undefined" && video !== "null" && typeof text !== "undefined" && text !== "null")?
                    element.innerHTML = `${videoIcon}${texIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                      (typeof video !== "undefined" && video !== "null"  && typeof image !== "undefined" && image !== "null")?
                      element.innerHTML = `${videoIcon}${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                        (typeof text !== "undefined" && text !== "null" && typeof image !== "undefined" && image !== "null")?
                        element.innerHTML = `${texIcon}${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                          (typeof audio !== "undefined" && audio !== "null")?
                          element.innerHTML = `${audioIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                            (typeof video !== "undefined" && video !== "null")?
                              element.innerHTML = `${videoIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                              (typeof text !== "undefined" && text !== "null")?
                              element.innerHTML = `${texIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                                (typeof image !== "undefined" && image !== "null")?
                                element.innerHTML = `${imageIcon}<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>` :
                                  element.innerHTML = `<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>`
                      
                
           
      
  
//   else if(typeof audio !== "undefined" && audio !== "null") {
//     element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill audioIcon" viewBox="0 0 16 16">
//     <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
//     <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
//     <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
// <div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>`
//   } else if(typeof video !== "undefined" && video !== "null") {
//     element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube videoIcon" viewBox="0 0 16 16">
//     <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
//   </svg>
// <div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>`
//   } else{
//     element.innerHTML = `<div class="textParent"><p class="textIntoTheCircle">${textIntoTheCircle}</p></div>`
//   }
    

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
  connect(elements)
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

// function onMouseDown(e) {
//   e.preventDefault()
// console.log(e)
//   // координаты нажатия мыши внутри элемента

//   elements[e.target.id].startX = e.x - elements[e.target.id].x
//   elements[e.target.id].startY = e.y - elements[e.target.id].y
// // console.log(elements[e.target.id].startX = e.x - elements[e.target.id].x)
//   current = e.target

//   document.body.addEventListener('mousemove', onMouseMove)
//   document.body.addEventListener('mouseup', onMouseUp)
// }

// function onMouseMove(e) {
//   context.clearRect(0, 0, width, height)
//   const x = elements[current.id].x = e.x - elements[current.id].startX
//   const y = elements[current.id].y = e.y - elements[current.id].startY
// console.log()
//   translate(current, x, y)
//   connect(elements)
//   // connectSub(elements,subelements)
// }

// function onMouseUp() {
//   document.body.removeEventListener('mousemove', onMouseMove)
//   document.body.removeEventListener('mouseup', onMouseUp)
// }

function onContextMenu(e){
  console.log('chlen')
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
  console.log(x,y)
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
function connect(elements) {
  
  for (let i = 0; i < subedges; i++) {
    source = EdgesId[i]['data'].source
    target = EdgesId[i]['data'].target
  //   console.log(EdgesId[i]['data'])
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




