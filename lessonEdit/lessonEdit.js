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