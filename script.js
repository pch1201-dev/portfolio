var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var bootLines = [{text: '$ system_boot --target=EMBEDDED_DEV', cls: 'dim'}, {text: '[OK] MCU init ................ HONG_GILDONG_V1', cls: 'ok'}, {text: '[OK] loading peripherals ..... SKILLS, PROJECTS', cls: 'ok'}, {text: '[OK] mounting resume.bin ..... SUCCESS', cls: 'ok'}, {text: 'STATUS: READY_', cls: 'ok'}];
function typeLine(el, text, cls, done){
  if(cls) el.classList.add(cls);
  if(reduceMotion){ el.textContent = text; if(done) done(); return; }
  var i = 0;
  (function step(){ el.textContent = text.slice(0, i); i++; if(i <= text.length){ setTimeout(step, 14); } else if(done){ done(); } })();
}
function runBoot(){
  var ids = ['tline1','tline2','tline3','tline4','tline5'], idx = 0;
  (function next(){ if(idx >= ids.length) return; typeLine(document.getElementById(ids[idx]), bootLines[idx].text, bootLines[idx].cls, function(){ idx++; setTimeout(next, 120); }); })();
  var last = document.getElementById('tline5'), cursor = document.createElement('span'); cursor.className = 'cursor';
  setTimeout(function(){ last.appendChild(cursor); }, ids.length * 700);
}
runBoot();

var sections = document.querySelectorAll('main section[id]'), navItems = document.querySelectorAll('.pin-nav-list .pin-item'), mobileLinks = document.querySelectorAll('.pin-nav-mobile a');
var spyObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      var id = entry.target.getAttribute('id');
      navItems.forEach(function(item){ item.classList.remove('active'); }); mobileLinks.forEach(function(a){ a.classList.remove('active'); });
      var link = document.querySelector('.pin-nav-list a[href="#' + id + '"]'); if(link) link.parentElement.classList.add('active');
      var mLink = document.querySelector('.pin-nav-mobile a[href="#' + id + '"]'); if(mLink){ mLink.classList.add('active'); mLink.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'}); }
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach(function(sec){ spyObserver.observe(sec); });

var revealObserver = new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('in'); revealObserver.unobserve(entry.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function(el){ revealObserver.observe(el); });