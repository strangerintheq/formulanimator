function formulanimator(svg) {
  let script = document.createElement("script");
  svg.querySelectorAll('*').forEach(function(e) {
      let count = e.getAttribute('count');
      if (!count) return
      for (let i = 1; i < count; i++){
          let clone = e.cloneNode(true);
          clone.setAttribute('index', i)
          clone.querySelectorAll('*').forEach(function(child){
              child.setAttribute('index', i) 
          });
          svg.append(clone)
      }
  })
  let els = svg.querySelectorAll('*');
  els.forEach(function(e) {
    e.funcs = {};
    for (let attr in e.dataset) {
      let f = 'f' + Math.random().toString(36).substring(2);
      e.funcs[attr] = f;
      script.innerHTML += 'function '+f+'(t,i,e){\nreturn '+e.dataset[attr]+'\n}\n';
    }
  });
  document.body.append(script);
  requestAnimationFrame(redraw);
  
  function redraw(t) {
    t /= 1000;  
    els.forEach(function(e) {
        for (let a in e.dataset){
          let i = e.getAttribute('index') || 0;
          e.setAttribute(a, window[e.funcs[a]](t, i, e));
        }
    });
    requestAnimationFrame(redraw);
  }   
}
