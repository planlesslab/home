/* Planless Lab global nav. Edit PROJECTS below to add, rename or remove a game everywhere at once. */
(function () {
  if (window.__planlessNav) return;
  window.__planlessNav = true;

  var HOME = 'https://planlesslab.github.io/home/index.html';
  var PROJECTS = [
    ['WeBringo', 'https://planlesslab.github.io/WeBringo/'],
    ['ChaoticParty', 'https://planlesslab.github.io/ChaoticParty/'],
    ['Bauble-Shake', 'https://planlesslab.github.io/Bauble-Shake/']
  ];
  var H = 56; // nav height in px, exposed to pages as --planless-nav-h

  var d = document, head = d.head || d.documentElement;

  var font = d.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Figtree:wght@600&display=swap';
  head.appendChild(font);

  var page = d.createElement('style');
  page.textContent = ':root{--planless-nav-h:' + H + 'px}html{scroll-padding-top:var(--planless-nav-h)}body{padding-top:var(--planless-nav-h)!important}';
  head.appendChild(page);

  var CSS = `
    *{box-sizing:border-box}
    nav{height:${H}px;display:flex;align-items:center;gap:1.25rem;padding:0 max(1.5rem,calc((100% - 1280px)/2 + 1.5rem));
      background:rgba(238,240,255,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid #d5d9f7}
    .brand{font:800 1.2rem "Bricolage Grotesque","Trebuchet MS",sans-serif;letter-spacing:-.02em;color:#1c2155;text-decoration:none;white-space:nowrap}
    ul{flex:1;min-width:0;display:flex;justify-content:flex-end;gap:.2rem;list-style:none;margin:0;padding:0;overflow-x:auto;scrollbar-width:none}
    ul::-webkit-scrollbar{display:none}
    li a{display:block;padding:.4rem .85rem;border-radius:99px;font:600 .95rem "Figtree","Segoe UI",system-ui,sans-serif;color:#4b517f;text-decoration:none;white-space:nowrap}
    li a:hover,li a[aria-current]{background:#e3e6ff;color:#1c2155}
    a:focus-visible{outline:3px solid #ff6b57;outline-offset:2px}`;

  function mount() {
    var host = d.createElement('div');
    host.id = 'planless-nav';
    host.style.cssText = 'position:fixed;top:0;left:0;right:0;height:' + H + 'px;z-index:2147483000';
    var root = host.attachShadow({ mode: 'open' });
    var items = PROJECTS.map(function (p) {
      var here = location.href.indexOf(p[1]) === 0;
      return '<li><a href="' + p[1] + '"' + (here ? ' aria-current="page"' : '') + '>' + p[0] + '</a></li>';
    }).join('');
    root.innerHTML = '<style>' + CSS + '</style><nav aria-label="Main"><a class="brand" href="' + HOME + '">Planless Lab</a><ul>' + items + '</ul></nav>';
    d.body.prepend(host);
  }

  if (d.body) mount(); else d.addEventListener('DOMContentLoaded', mount);
})();
