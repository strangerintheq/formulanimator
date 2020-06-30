function formulanimator(svg) {
    
  let script = document.createElement("script"), 
      count = 0;
    
  svg.querySelectorAll('*').forEach(function(e) {    
      for (let a in e.dataset) {
          let f = 'f' + count++;
          script.innerHTML += 'function '+f+'(t,i,e){\nreturn '+e.dataset[a]+'\n}\n';
          e.dataset[a] = f;
      }
  });
    
  svg.querySelectorAll('*[count]').forEach(function(e) {
      for (let i = 1; i < e.getAttribute('count'); i++) {
          let clone = e.cloneNode(true);
          clone.setAttribute('index', i);
          clone.querySelectorAll('*').forEach(function(child) {
              child.setAttribute('index', i); 
          });
          svg.append(clone);
      }
  });  
    
  let els = svg.querySelectorAll('*');
  document.body.append(script);
  requestAnimationFrame(redraw);
  
  function redraw(t) {
    t /= 1000;  
    els.forEach(function(e) {
        for (let a in e.dataset) {
          let i = e.getAttribute('index') || 0;
          let f = e.dataset[a];  
          f && e.setAttribute(a, window[f](t, i, e));
        }
    });
    requestAnimationFrame(redraw);
  }   
}
