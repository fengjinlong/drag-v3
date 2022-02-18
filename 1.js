let el = Array.from(document.getElementByTagName("*"))
let elObj = {}
let reg = /^[h|s].+/gi
el.map(item => {
 const tagName = item.tagName
 if(reg.tast(tagName)){
    !elObj[tagName] ? elIbj[tagName] = 1 : elObj[tagName]
  }
})