// Live preview: shows the real page beside the editor, updating as you type.
(function () {
  var h = window.h || (window.CMS && window.CMS.h);
  function toJS(x) { return x && x.toJS ? x.toJS() : x; }

  function makePreview(which) {
    return function (props) {
      var data = toJS(props.entry.get ? props.entry.get('data') : props.entry.data) || {};
      var other = window.__otherData || {};
      var S = which === 'settings' ? data : other.settings;
      var K = which === 'stock' ? data : other.stock;
      if (!S || !K) return h('div', { style: { color: '#fff', padding: '20px' } }, 'Loading preview…');
      var html = window.buildPage(S, K, { raw: true });
      return h('div', { className: 'bg-[#04222b] text-white', dangerouslySetInnerHTML: { __html: html } });
    };
  }

  // Load the saved version of the file you are NOT editing, so the preview shows the whole page.
  Promise.all([
    fetch('/content/settings.json').then(function (r) { return r.json(); }),
    fetch('/content/stock.json').then(function (r) { return r.json(); })
  ]).then(function (d) { window.__otherData = { settings: d[0], stock: d[1] }; });

  CMS.registerPreviewStyle('/site.css');
  CMS.registerPreviewTemplate('stock', makePreview('stock'));
  CMS.registerPreviewTemplate('settings', makePreview('settings'));
})();
