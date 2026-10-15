// Renders the page from content/settings.json and content/stock.json (edited via /admin).
// buildPage() is also used by the live preview in /admin.
function buildPage(S, K, opts) {
  opts = opts || {};
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const img = (p, q) => opts.raw ? p : '/.netlify/images?url=' + encodeURIComponent(p) + q;
  const mail = (subj, body) => 'mailto:' + S.email + (subj ? '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body) : '');
  const ig = '<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"></rect><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"></circle></svg>';
  const fb = '<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5"><path d="M15 8.5h-1.5c-.6 0-1 .5-1 1.1V11H15l-.3 2.2h-2.2V21h-2.4v-7.8H8.5V11h1.6V9.3c0-2 1.2-3.3 3.2-3.3H15v2.5Z" fill="currentColor"></path></svg>';
  const btnP = 'rounded-full bg-[#5fd6c4] px-6 py-3 text-sm font-semibold text-[#04222b] transition hover:bg-[#8ee8da]';
  const btnS = 'rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#5fd6c4] hover:text-[#5fd6c4]';

  const card = i => {
    const so = i.sold_out;
    return '<div class="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-[#5fd6c4]/50 hover:bg-white/[0.07]">' +
      '<div class="relative aspect-[4/3] w-full overflow-hidden bg-black/40"><img src="' + esc(img(i.image, '&w=480&h=360&fit=cover&fm=webp')) + '" alt="' + esc(i.name) +
      '" loading="lazy" class="h-full w-full object-cover transition duration-300 group-hover:scale-105 ' + '"' + (so ? ' style="opacity:0.08"' : '') + '>' +
      (so ? '<span style="background:#dc2626" class="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">Sold out</span>' : '') +
      '</div><div class="flex flex-1 flex-col gap-1 p-4"><h3 class="font-semibold text-white">' + esc(i.name) + '</h3><p class="text-sm text-white/60">' + esc(i.size) +
      '</p><div class="mt-2 flex items-center justify-between"><span class="text-lg font-bold text-[#5fd6c4]">' + esc(i.price) + '</span></div></div></div>';
  };

  // Section link IDs are generated from each category title (unique, no typing needed).
  const used = {};
  const cats = (K.categories || []).map(function (c, n) {
    let base = String(c.title || 'section').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
    let id = base, k = 2;
    while (used[id]) id = base + '-' + k++;
    used[id] = true;
    return Object.assign({}, c, { id: id });
  });
  const pill = 'rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/70 transition hover:border-[#5fd6c4] hover:text-[#5fd6c4]';
  return (
    '<header class="sticky top-0 z-40 border-b border-white/10 bg-[#04222b]/95 backdrop-blur"><div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">' +
    '<a href="#top" class="flex items-center gap-2"><span class="text-xl font-bold tracking-tight text-white">' + esc(S.brand_first) + ' <span class="text-[#5fd6c4]">' + esc(S.brand_second) + '</span></span></a>' +
    '<nav class="hidden flex-wrap items-center gap-5 text-sm font-medium text-white/80 lg:flex">' +
    cats.map(c => '<a href="#' + esc(c.id) + '" class="transition hover:text-[#5fd6c4]">' + esc(c.nav_label || c.title) + '</a>').join('') + '</nav>' +
    '<div class="flex items-center gap-3"><a href="' + esc(S.instagram) + '" target="_blank" rel="noreferrer" aria-label="Instagram" class="text-white/70 transition hover:text-[#5fd6c4]">' + ig + '</a>' +
    '<a href="' + esc(S.facebook) + '" target="_blank" rel="noreferrer" aria-label="Facebook" class="text-white/70 transition hover:text-[#5fd6c4]">' + fb + '</a>' +
    '<a href="#contact" class="rounded-full bg-[#5fd6c4] px-4 py-2 text-sm font-semibold text-[#04222b] transition hover:bg-[#8ee8da]">Place an order</a></div></div></header>' +

    '<section class="relative overflow-hidden border-b border-white/10"><img src="' + esc(img(S.hero_image, '&w=1600&fm=webp&q=80')) + '" alt="" class="absolute inset-0 h-full w-full object-cover opacity-40">' +
    '<div class="absolute inset-0 bg-gradient-to-b from-[#04222b]/60 via-[#04222b]/80 to-[#04222b]"></div>' +
    '<div class="relative mx-auto max-w-6xl px-5 py-16 text-center sm:py-24">' +
    (S.logo_image ? '<img src="' + esc(img(S.logo_image, '&w=480&fm=png')) + '" alt="' + esc(S.brand_first + ' ' + S.brand_second) + '" class="mx-auto" style="width:250px;max-width:65%;height:auto;margin-bottom:28px">' : '') +
    '<p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#5fd6c4]">' + esc(S.hero_eyebrow) + '</p>' +
    '<h1 class="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">' + esc(S.hero_title) + '</h1><p class="mx-auto mt-5 max-w-xl text-white/70">' + esc(S.hero_text) + '</p>' +
    '<div class="mt-8 flex flex-wrap items-center justify-center gap-4"><a href="#stock" class="' + btnP + '">Browse current stock</a><a href="#contact" class="' + btnS + '">Place an order</a></div></div></section>' +

    '<section class="border-b border-white/10 bg-[#062b36]"><div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-10 sm:grid-cols-2">' +
    (S.info_cards || []).map(c => '<div class="rounded-2xl border border-white/10 p-6"><h2 class="mb-1 font-semibold text-[#5fd6c4]">' + esc(c.title) + '</h2><p class="text-sm text-white/70">' + esc(c.text) + '</p></div>').join('') +
    '</div></section>' +

    '<section id="stock" class="mx-auto max-w-6xl px-5 py-14"><div class="mb-10 text-center"><h2 class="text-2xl font-bold sm:text-3xl">Current Stock</h2>' +
    '<p class="mt-2 text-sm text-white/50">As of ' + esc(K.stock_date) + '. ' + esc(S.stock_note) + '</p></div>' +
    '<nav class="mb-12 flex flex-wrap justify-center gap-2">' + cats.map(c => '<a href="#' + esc(c.id) + '" class="' + pill + '">' + esc(c.title) + '</a>').join('') + '</nav>' +
    '<div class="flex flex-col gap-16">' + cats.map(c =>
      '<div id="' + esc(c.id) + '"><div class="mb-5 flex items-baseline justify-between border-b border-white/10 pb-3"><h3 class="text-xl font-bold">' + esc(c.title) + '</h3>' +
      (c.description ? '<span class="text-sm text-white/50">' + esc(c.description) + '</span>' : '') + '</div>' +
      '<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">' + (c.items || []).map(card).join('') + '</div></div>').join('') +
    '</div></section>' +

    '<section id="contact" class="border-t border-white/10 bg-[#062b36] py-16"><div class="mx-auto max-w-2xl px-5 text-center"><h2 class="text-2xl font-bold">' + esc(S.contact_title) + '</h2>' +
    '<p class="mt-3 text-white/70">' + esc(S.contact_text).split(esc(S.email)).join('<a href="' + esc(mail()) + '" class="text-[#5fd6c4] underline">' + esc(S.email) + '</a>') + '</p><div class="mt-6 flex flex-wrap items-center justify-center gap-4">' +
    '<a href="' + esc(S.instagram) + '" target="_blank" rel="noreferrer" class="' + btnS + '">Instagram</a>' +
    '<a href="' + esc(S.facebook) + '" target="_blank" rel="noreferrer" class="' + btnS + '">Facebook</a></div></div></section>' +
    '<footer class="border-t border-white/10 py-6 text-center text-xs text-white/40">&copy; ' + new Date().getFullYear() + ' ' + esc(S.footer) + '</footer>'
  );
}

window.buildPage = buildPage;

if (document.getElementById('app')) {
  Promise.all([
    fetch('/content/settings.json').then(r => r.json()),
    fetch('/content/stock.json').then(r => r.json())
  ]).then(function (d) {
    document.getElementById('app').innerHTML = buildPage(d[0], d[1]);
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); t && t.scrollIntoView(); }
  });
}

// If Netlify image resizing isn't available (e.g. local preview), fall back to the original file.
document.addEventListener('error', function (e) {
  const t = e.target;
  if (t.tagName === 'IMG' && t.src.indexOf('/.netlify/images') > -1) {
    t.src = decodeURIComponent(new URL(t.src).searchParams.get('url'));
  }
}, true);
