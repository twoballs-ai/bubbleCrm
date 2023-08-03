// import EditorJS from '@editorjs/editorjs'; 

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

const lesson_id = localStorage.getItem('lesson_id') 
const lesson_title = localStorage.getItem('title') 

const inputTitle = ()=>{
  let div = document.getElementById('lesson_title');
  let text = lesson_title;
  div.insertAdjacentText("afterend", text);
}
inputTitle()

const element = document.getElementById('buttonSave')
function handleClickFunction(event) {
  
  editor.save().then((outputData) => {
    console.log('Article data: ', outputData)
    outputData.lesson = lesson_id
    const url = 'http://127.0.0.1:8000/api/data'
    fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json;charset=utf-8' },
         body: JSON.stringify(outputData)
       }).then(response => {
        if (response.status === 200 || response.status === 204) {
        // let result = await response.json();
        // console.log(result);
        // console.log('.[[ee')
        window.location.href = '/index.html';
      }});
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });


  
}
element.addEventListener('click', handleClickFunction)