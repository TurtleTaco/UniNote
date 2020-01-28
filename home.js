import {MDCList} from '@material/list';
import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCSnackbar} from '@material/snackbar';
// import * as monaco from 'monaco-editor';

//////////////// Side Drawer ////////////////
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
// by defualt, this drawer is opened if browser window width >= 950, otherwise closed
const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

if (width < 950) drawer.open = false;
else drawer.open = true;

//////////////// Top App Bar ////////////////
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

//////////////// Window Resize Response ////////////////
window.addEventListener('resize', function(event){
  // get current window
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

  if (width < 950){
    if (drawer.open){
      drawer.open = false;
    }
  } else {
    if (!drawer.open){
      drawer.open = true;
    }
  }
});

//////////////// Bottom Save Status Bar ////////////////
// TODO: trigger whenever git push successfully completes
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
snackbar.timeoutMs = 4000;
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    snackbar.open();
  }
}, false);

//////////////// Monaco Editor ////////////////
// var editor = monaco.editor.create(document.getElementById("container"), {
// 	value: "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
// 	language: "javascript",

// 	lineNumbers: "off",
// 	roundedSelection: false,
// 	scrollBeyondLastLine: false,
// 	readOnly: false,
// 	theme: "vs-dark",
// });
// setTimeout(function() {
// 	editor.updateOptions({
// 		lineNumbers: "on"
// 	});
// }, 2000);

// monaco.editor.create(document.getElementById('container'), {
//   value: [
//     'function x() {',
//     '\tconsole.log("Hello world!");',
//     '}'
//   ].join('\n'),
//   language: 'javascript'
// });