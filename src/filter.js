if (localStorage['showBernie'] == undefined) {
  localStorage['showBernie'] = true
}

document.onreadystatechange = function(e) {
  if (document.readyState != "complete") return
  var showBernieText = (localStorage['showBernie'] == "true") ? 'on' : 'off'
  showHide()
 
  var toggleLink = document.createElement("a")
  toggleLink.href = "javascript:void(0)"
  toggleLink.id = "toggleBernie"
  toggleLink.innerText = "[Bernie " + showBernieText + "]"
  
  var separator = document.createElement("span")
  separator.className = "separator"
  separator.innerText = "|"
  
  var preferences = document.querySelector('a.pref-lang').parentNode.parentNode
  preferences.parentNode.insertBefore(toggleLink, preferences.nextSibling)
  preferences.parentNode.insertBefore(separator, toggleLink)
  
    
    
  document.querySelector('#toggleBernie').addEventListener('click', function(e) {
    toggleBernie()
    this.innerText = '[Bernie ' + (localStorage['showBernie'] == "true" ? 'on' : 'off') + ']'
  }, false)
}

// Warning: Since this works with NodeLists, changes will be made to the actual
// NodeList object (as opposed to Array.map() which returns a new Array
// object), so this is NOT a pure function, unlike most map() functions
NodeList.prototype.map = function(fn) {
  for (i in this) {
    fn(this[i])
  }
  return this
}

function toggleBernie() {
  localStorage['showBernie'] = localStorage['showBernie'] == "true" ? "false" : "true"
  showHide()
}
function hide(element) {
  if (element.style != undefined) return element.style["display"] = "none"
}
function show(element) {
  if (element.style != undefined) return element.style["display"] = "inline"
}
function isBerniePost(element) {
  return element.innerText.search(/bernie sanders/i) > 0;
}
function showHide() {
  var bernies = [].slice.call(document.querySelectorAll('div.thing.link')).filter(isBerniePost);
  if (localStorage['showBernie'] == 'true') {
    bernies.map(show)
  } else {
    bernies.map(hide)
  }
}
window.addEventListener('hashchange', showHide)
