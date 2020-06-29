function formulanimator(svg) {
  let script = document.createElement("script");
  let elements = svg.querySelectorAll('*');
  svg.querySelectorAll('*').forEach(function(e) {
    e.funcs = {};
    for (let attr in e.dataset) {
      let f = 'f' + Math.random().toString(36).substring(2);
      e.funcs[attr] = f;
      script.innerHTML += 'function '+f+'(t,el){return '+e.dataset[attr]+'}\n';
    }
  });
  document.body.append(script);
  requestAnimationFrame(redraw);
  
  function redraw(t) {
    elements.forEach(function(element) {
        for (let attr in element.dataset)
          element.setAttribute(attr, window[element.funcs[attr]](t/1000, element));
    });
    requestAnimationFrame(redraw);
  }   
}
