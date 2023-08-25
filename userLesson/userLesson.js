// import EditorJS from '@editorjs/editorjs'; 
const lesson_id = localStorage.getItem('lesson_id') 
const lesson_title = localStorage.getItem('title') 



const response = await fetch('http://127.0.0.1:8000/api/node-post-detail/'+lesson_id);
const data = await response.json();
console.log(data)


const inputTitle = ()=>{
  let lessonTitle = document.getElementById('lesson_title');
  let text = lesson_title;
  lessonTitle.insertAdjacentText("afterend", text);
}
inputTitle()

function getData(){
  let cardBody = document.querySelector('.card-body');
  for (let item in data['0']['post_blocks']){
    let json = (data['0']['post_blocks'][item]['data'])
    let jsonparse = JSON.parse(json)
    

    if(data['0']['post_blocks'][item]['type']==='paragraph'){

    
      let content = document.createTextNode(jsonparse.text);
      const parser = new DOMParser();
      const html = parser.parseFromString(jsonparse.text, 'text/html');
      content = html.body.firstChild
    let divContent = document.createElement("div");
    divContent.className = 'card-text'

      const $elem = document.createElement('p');
      $elem.append(content)
      divContent.appendChild($elem);
      cardBody.appendChild(divContent);
    
    }else if(data['0']['post_blocks'][item]['type']==='header'){
      let content = document.createTextNode(jsonparse.text);
      const parser = new DOMParser();
      const html = parser.parseFromString(jsonparse.text, 'text/html');
      content = html.body.firstChild
      let divContent = document.createElement("div");
      divContent.className = 'card-text'
  
        const $elem = document.createElement(`h${jsonparse.level}`);
      $elem.append(content)
      divContent.appendChild($elem);
      cardBody.appendChild(divContent);
    }else if(data['0']['post_blocks'][item]['type']==='list'){
          let style = document.createTextNode(jsonparse.style);
          console.log(style)
        console.log(style ==='ordered')
    }
  }
}
getData()