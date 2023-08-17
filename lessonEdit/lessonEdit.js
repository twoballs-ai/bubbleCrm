// import EditorJS from '@editorjs/editorjs'; 
const lesson_id = localStorage.getItem('lesson_id') 
const lesson_title = localStorage.getItem('title') 

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
  }, 
  // autofocus: true
})

const response = await fetch('http://127.0.0.1:8000/api/node-post-detail/'+lesson_id);
const data = await response.json();
console.log(data['0']['id'])


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
    
    const url = 'http://127.0.0.1:8000/api/blocks-list/'
    for(let items in outputData['blocks']){
      let type = outputData['blocks'][items]['type']
      let id = outputData['blocks'][items]['id']
      let content = outputData['blocks'][items]['data']
      console.log(content)
         fetch(url+ data['0']['id'], {
         method: 'POST',
         headers: { 'Content-Type': 'application/json;charset=utf-8' },
         body: JSON.stringify({
          type:type,
          post:outputData.lesson,
          id: id,
          data: content

      })
       }).then(response => {
        if (response.status === 200 || response.status === 204) {
        // let result = await response.json();
  
        // console.log('.[[ee')

      }});
    }

  }).catch((error) => {
    console.log('Saving failed: ', error)
  });

  window.location.href = '/index.html';
  
}
element.addEventListener('click', handleClickFunction)