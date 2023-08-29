// import EditorJS from '@editorjs/editorjs'; 
const lesson_id = localStorage.getItem('lesson_id')
const lesson_title = localStorage.getItem('title')



const response = await fetch('http://127.0.0.1:8000/api/node-post-detail/' + lesson_id);
const data = await response.json();
// console.log(data['0']['metadata'])


const inputTitle = () => {
  let lessonTitle = document.getElementById('lesson_title');
  let text = lesson_title;
  lessonTitle.insertAdjacentText("afterend", text);
}
inputTitle()

function getData() {
  let cardBody = document.querySelector('.card-body');
  let metadata = data['0']['metadata']
  let jsonparse = JSON.parse(metadata)
  console.log(jsonparse['blocks'])
  for (let item in jsonparse['blocks']) {
    let data = jsonparse['blocks'][item]['data']
    console.log(data)
    if (jsonparse['blocks'][item]['type'] === 'paragraph') {
      let content = document.createTextNode(data.text);
      console.log(typeof (content))
      const parser = new DOMParser();
      const html = parser.parseFromString(data.text, 'text/html');
      content = html.body.firstChild
      let divContent = document.createElement("div");
      divContent.className = 'card-text'
      const $elem = document.createElement('p');
      $elem.append(content)
      divContent.appendChild($elem);
      cardBody.appendChild(divContent);

    } else if (jsonparse['blocks'][item]['type'] === 'header') {
      let content = document.createTextNode(data.text);
      const parser = new DOMParser();
      const html = parser.parseFromString(data.text, 'text/html');
      content = html.body.firstChild
      let divContent = document.createElement("div");
      divContent.className = 'card-text'
      const $elem = document.createElement(`h${data.level}`);
      $elem.append(content)
      divContent.appendChild($elem);
      cardBody.appendChild(divContent);
    } else if (jsonparse['blocks'][item]['type'] === 'list') {
      let divContent = document.createElement("div");
      divContent.className = 'card-text'
      if (data.style === 'ordered') {
        let ol = document.createElement('ol');
        divContent.appendChild(ol);
        cardBody.appendChild(divContent);
        // console.log(data.items)
        data.items.forEach((element) => {
          let li = document.createElement('li');
          ol.appendChild(li);
          li.append(element)

        });

      } else if (data.style === 'unordered') {
        let ul = document.createElement('ul');
        divContent.appendChild(ol);
        cardBody.appendChild(divContent);
        // console.log(data.items)
        data.items.forEach((element) => {
          let li = document.createElement('li');
          ul.appendChild(li);
          li.append(element)

        });
      }
      // console.log(data.style ==='ordered')
    } else if (jsonparse['blocks'][item]['type'] === 'image') {
      let url = document.createTextNode(data.url);
      let alt = document.createTextNode(data.caption);
      console.log(url)
      let imgContent= document.createElement("img");
      imgContent.className = 'img-thumbnail'
      imgContent.setAttribute('src',url.textContent);
      imgContent.setAttribute('alt', alt.textContent);
      cardBody.appendChild(imgContent);
    } else if (jsonparse['blocks'][item]['type'] === 'quote') {
      let content = document.createTextNode(data.text);
      let caption = document.createTextNode(data.caption);
      let figureContent = document.createElement("figure");
      figureContent.className = 'text-center'
      let blockqueContent = document.createElement("blockquote");
      blockqueContent.className = 'blockquote'
      let figcaptionContent = document.createElement("figcaption");
      figcaptionContent.className = 'blockquote-footer'
      let p = document.createElement("p");
      p.append(content);
      figcaptionContent.appendChild(caption);
      figureContent.appendChild(blockqueContent);
      figureContent.appendChild(figcaptionContent);
      blockqueContent.appendChild(p);
      cardBody.appendChild(figureContent);
    }
  }
}
getData()