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
  i18n: {
    /**
     * @type {I18nDictionary}
     */
    messages: {
      /**
       * Other below: translation of different UI components of the editor.js core
       */
      ui: {
        "blockTunes": {
          "toggler": {
            "Click to tune": "Нажмите, чтобы настроить",
            "or drag to move": "или перетащите"
          },
        },
        "inlineToolbar": {
          "converter": {
            "Convert to": "Конвертировать в"
          }
        },
        "toolbar": {
          "toolbox": {
            "Add": "Добавить"
          }
        }
      },
  
      /**
       * Section for translation Tool Names: both block and inline tools
       */
      toolNames: {
        "Text": "Параграф",
        "Heading": "Заголовок",
        "List": "Список",
        "Warning": "Примечание",
        "Checklist": "Чеклист",
        "Quote": "Цитата",
        "Code": "Код",
        "Delimiter": "Разделитель",
        "Raw HTML": "HTML-фрагмент",
        "Table": "Таблица",
        "Link": "Ссылка",
        "Marker": "Маркер",
        "Bold": "Полужирный",
        "Italic": "Курсив",
        "InlineCode": "Моноширинный",
      },
  
      /**
       * Section for passing translations to the external tools classes
       */
      tools: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
         * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
         */
        "warning": { // <-- 'Warning' tool will accept this dictionary section
          "Title": "Название",
          "Message": "Сообщение",
        },
  
        /**
         * Link is the internal Inline Tool
         */
        "link": {
          "Add a link": "Вставьте ссылку"
        },
        /**
         * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
         */
        "stub": {
          'The block can not be displayed correctly.': 'Блок не может быть отображен'
        }
      },
  
      /**
       * Section allows to translate Block Tunes
       */
      blockTunes: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
         * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
         *
         * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
         */
        "delete": {
          "Delete": "Удалить"
        },
        "moveUp": {
          "Move up": "Переместить вверх"
        },
        "moveDown": {
          "Move down": "Переместить вниз"
        }
      },
    }
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