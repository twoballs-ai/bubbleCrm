// import EditorJS from '@editorjs/editorjs'; 
const lesson_id = localStorage.getItem('lesson_id') 
const lesson_title = localStorage.getItem('title') 



const response = await fetch('http://127.0.0.1:8000/api/node-post-detail/'+lesson_id);
const data = await response.json();
console.log(data)


const inputTitle = ()=>{
  let div = document.getElementById('lesson_title');
  let text = lesson_title;
  div.insertAdjacentText("afterend", text);
}
inputTitle()

function getData(){
  
  for (let item in data['0']['post_blocks']){
  data['0']['post_blocks'][item]['data']
  let json = (data['0']['post_blocks'][item]['data'])
  var correctjson = json.replace((/'/g), "\"")
  let jsonparse = JSON.parse(correctjson)
  console.log(jsonparse)
  const TextBody = document.createElement('div')
  TextBody.className = 'TextBody'
  TextBody.innerHTML = `<p class="redactClass">${jsonparse.text}</p>`;
  document.body.appendChild(TextBody)
  }
}
getData()