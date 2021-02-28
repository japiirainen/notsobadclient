// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".pagination {\n\tmargin: 1rem auto;\n\tlist-style: none;\n\tdisplay: flex;\n\tjustify-content: space-evenly;\n\twidth: 50%;\n}\n.active {\n\tborder: 1px solid black;\n\tborder-radius: 100%;\n\tpadding: 0 3px;\n\toutline: none;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}