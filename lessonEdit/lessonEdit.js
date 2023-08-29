// import EditorJS from '@editorjs/editorjs'; 
const lesson_id = localStorage.getItem('lesson_id') 
const lesson_title = localStorage.getItem('title') 
const response = await fetch('http://127.0.0.1:8000/api/node-post-detail/'+lesson_id);
const data = await response.json();
let metadata = data['0']['metadata']
  let jsonparse = JSON.parse(metadata)
console.log(jsonparse)
const editor = new EditorJS({ 
  /** 
   * Id of Element that should contain the Editor 
   */ 
  holder: 'editorjs', 
  placeholder: 'Начните вводить текст или вставьте ссылку',
  tools: { 
    header: Header, 
    list: List,
    embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true
          }
        }
      },
    raw: RawTool,
    image: SimpleImage,
    quote: Quote,
  }, 
  data: jsonparse
  // autofocus: true
})




const inputTitle = ()=>{
  let div = document.getElementById('lesson_title');
  let text = lesson_title;
  div.insertAdjacentText("afterend", text);
}
inputTitle()

const element = document.getElementById('buttonSave')
function handleClickFunction(event) {
  
  editor.save().then((outputData) => {
    outputData.lesson = data['0']['id']
    console.log('Article data: ', outputData)
    let dataToSave = JSON.stringify(outputData)
    const url = 'http://127.0.0.1:8000/api/post-detail/'
    let canvas = data['0']['canvas']['id']
    let node = data['0']['node']['id']
    // const url = 'http://127.0.0.1:8000/api/blocks-list/'
    fetch(url+ canvas+'/'+data['0']['id'], {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body:JSON.stringify({
        id:data['0']['id'],
        canvas:canvas,
        node:node,
        metadata:dataToSave
   })
    }).then(response => {
     if (response.status === 200 || response.status === 204) {
     console.log(response)

   }});
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });

  // window.location.href = '/index.html';
  
}
element.addEventListener('click', handleClickFunction)