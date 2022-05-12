(()=>{"use strict";const e=[{code:"Backquote",caseDown:"`",caseUp:"~"},{code:"Digit1",caseDown:"1",caseUp:"!"},{code:"Digit2",caseDown:"2",caseUp:"@"},{code:"Digit3",caseDown:"3",caseUp:"#"},{code:"Digit4",caseDown:"4",caseUp:"$"},{code:"Digit5",caseDown:"5",caseUp:"%"},{code:"Digit6",caseDown:"6",caseUp:"^"},{code:"Digit7",caseDown:"7",caseUp:"&"},{code:"Digit8",caseDown:"8",caseUp:"*"},{code:"Digit9",caseDown:"9",caseUp:"("},{code:"Digit0",caseDown:"0",caseUp:")"},{code:"Minus",caseDown:"-",caseUp:"_"},{code:"Equal",caseDown:"=",caseUp:"+"},{code:"Backslash",caseDown:"\\",caseUp:"|"},{code:"Backspace",caseDown:"←",caseUp:"←"},{code:"Tab",caseDown:"Tab",caseUp:"Tab"},{code:"KeyQ",caseDown:"q",caseUp:"Q"},{code:"KeyW",caseDown:"w",caseUp:"W"},{code:"KeyE",caseDown:"e",caseUp:"E"},{code:"KeyR",caseDown:"r",caseUp:"R"},{code:"KeyT",caseDown:"t",caseUp:"T"},{code:"KeyY",caseDown:"y",caseUp:"Y"},{code:"KeyU",caseDown:"u",caseUp:"U"},{code:"KeyI",caseDown:"i",caseUp:"I"},{code:"KeyO",caseDown:"o",caseUp:"O"},{code:"KeyP",caseDown:"p",caseUp:"P"},{code:"BracketLeft",caseDown:"[",caseUp:"{"},{code:"BracketRight",caseDown:"]",caseUp:"}"},{code:"Delete",caseDown:"Delete",caseUp:"Delete"},{code:"CapsLock",caseDown:"CapsLock",caseUp:"CapsLock"},{code:"KeyA",caseDown:"a",caseUp:"A"},{code:"KeyS",caseDown:"s",caseUp:"S"},{code:"KeyD",caseDown:"d",caseUp:"D"},{code:"KeyF",caseDown:"f",caseUp:"F"},{code:"KeyG",caseDown:"g",caseUp:"G"},{code:"KeyH",caseDown:"h",caseUp:"H"},{code:"KeyJ",caseDown:"j",caseUp:"J"},{code:"KeyK",caseDown:"k",caseUp:"K"},{code:"KeyL",caseDown:"l",caseUp:"L"},{code:"Semicolon",caseDown:";",caseUp:":"},{code:"Quote",caseDown:"'",caseUp:'"'},{code:"Enter",caseDown:"Enter",caseUp:"Enter"},{code:"ShiftLeft",caseDown:"Shift",caseUp:"Shift"},{code:"KeyZ",caseDown:"z",caseUp:"Z"},{code:"KeyX",caseDown:"x",caseUp:"X"},{code:"KeyC",caseDown:"c",caseUp:"C"},{code:"KeyV",caseDown:"v",caseUp:"V"},{code:"KeyB",caseDown:"b",caseUp:"B"},{code:"KeyN",caseDown:"n",caseUp:"N"},{code:"KeyM",caseDown:"m",caseUp:"M"},{code:"Comma",caseDown:",",caseUp:"<"},{code:"Period",caseDown:".",caseUp:">"},{code:"Slash",caseDown:"/",caseUp:"?"},{code:"ArrowUp",caseDown:"▲",caseUp:"▲"},{code:"ShiftRight",caseDown:"Shift",caseUp:"Shift"},{code:"ControlLeft",caseDown:"Ctrl",caseUp:"Ctrl"},{code:"MetaLeft",caseDown:"Win",caseUp:"Win"},{code:"AltLeft",caseDown:"Atl",caseUp:"Alt"},{code:"Space",caseDown:"Space",caseUp:"Space"},{code:"AltRight",caseDown:"Alt",caseUp:"Alt"},{code:"MetaRight",caseDown:"Win",caseUp:"Win"},{code:"ArrowLeft",caseDown:"◄",caseUp:"◄"},{code:"ArrowDown",caseDown:"▼",caseUp:"▼"},{code:"ArrowRight",caseDown:"►",caseUp:"►"},{code:"ControlRight",caseDown:"Ctrl",caseUp:"Ctrl"}],c=[{caseDown:"ё",caseUp:"Ё"},{},{caseUp:'"'},{caseUp:"№"},{caseUp:";"},{},{caseUp:":"},{caseUp:"?"},{},{},{},{},{},{caseUp:"/"},{},{},{caseDown:"й",caseUp:"Й"},{caseDown:"ц",caseUp:"Ц"},{caseDown:"у",caseUp:"У"},{caseDown:"к",caseUp:"К"},{caseDown:"е",caseUp:"Е"},{caseDown:"н",caseUp:"Н"},{caseDown:"г",caseUp:"Г"},{caseDown:"ш",caseUp:"Ш"},{caseDown:"щ",caseUp:"Щ"},{caseDown:"з",caseUp:"З"},{caseDown:"х",caseUp:"Х"},{caseDown:"ъ",caseUp:"Ъ"},{},{},{caseDown:"ф",caseUp:"Ф"},{caseDown:"ы",caseUp:"Ы"},{caseDown:"в",caseUp:"В"},{caseDown:"а",caseUp:"А"},{caseDown:"п",caseUp:"П"},{caseDown:"р",caseUp:"Р"},{caseDown:"о",caseUp:"О"},{caseDown:"л",caseUp:"Л"},{caseDown:"д",caseUp:"Д"},{caseDown:"ж",caseUp:"Ж"},{caseDown:"э",caseUp:"Э"},{caseDown:"Ввод",caseUp:"Ввод"},{},{caseDown:"я",caseUp:"Я"},{caseDown:"ч",caseUp:"Ч"},{caseDown:"с",caseUp:"С"},{caseDown:"м",caseUp:"М"},{caseDown:"и",caseUp:"И"},{caseDown:"т",caseUp:"Т"},{caseDown:"ь",caseUp:"Ь"},{caseDown:"б",caseUp:"Б"},{caseDown:"ю",caseUp:"Ю"},{caseDown:".",caseUp:","},{},{},{},{},{},{caseDown:"Пробел",caseUp:"Пробел"},{},{},{},{},{},{}];class a{#e;constructor(){this.#e=document.body}generate(){this.#e.innerHTML='<main>\n<h1>Virtual Keyboard</h1>\n<textarea ></textarea>\n<div class="keyboard"></div>\n<p>Клавиатура создана в операционной системе Windows</p>\n<p>Для переключения языка комбинация: ctrl + alt</p>\n</main>';const c=this.#e.querySelector(".keyboard");e.forEach(((a,s)=>{c.insertAdjacentHTML("beforeend",function(c){return`<button class="key ${e[c].code}"></button>`}(s))}))}}class s{#c;#a;#s;#o;constructor(){this.#c=document.querySelector(".keyboard"),this.#a=document.querySelector("textarea"),this.#o=localStorage.getItem("lang")??"en",this.#n("caseDown"),this.#c.addEventListener("mousedown",(e=>this.#t(e))),document.addEventListener("keydown",(e=>this.#d(e))),document.addEventListener("keyup",(e=>this.#p(e)))}#D(e){e.getModifierState("CapsLock")&&!e.getModifierState("Shift")||!e.getModifierState("CapsLock")&&e.getModifierState("Shift")?this.#n("caseUp"):this.#n("caseDown")}#n(a){!this.#c||a===this.#s&&localStorage.getItem("lang")===this.#o||(this.#s=a,this.#c.childNodes.forEach(((s,o)=>{const n=s;"en"===this.#o?n.textContent=e[o][a]??e[o].caseDown:n.textContent=c[o][a]??e[o][a]??e[o].caseDown})))}#t(e){"BUTTON"===e.target.nodeName&&this.#w(e.target.innerText)}#d(e){e.preventDefault(),e.getModifierState("Control")&&e.getModifierState("Alt")&&("en"===this.#o?this.#o="ru":this.#o="en"),this.#c.childNodes.forEach((c=>c.classList.contains(e.code)&&c.classList.add("active"))),this.#D(e),this.#w(e.key),localStorage.setItem("lang",this.#o)}#p(e){e.preventDefault(),this.#c.childNodes.forEach((c=>c.classList.contains(e.code)&&c.classList.remove("active"))),this.#D(e)}#w(e){1===e.length&&"←"!==e&&"▲"!==e&&"◄"!==e&&"▼"!==e&&"►"!==e&&(this.#a.textContent+=e)}}(new class{#i;#U;constructor(){this.#i=new a}run(){this.#i.generate(),this.#U=new s}}).run()})();