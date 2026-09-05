const collections = window.PORTFOLIO_COLLECTIONS;
const params = new URLSearchParams(window.location.search);
const key = params.get('collection') || 'lukang';
const collection = collections[key];

const title = document.querySelector('#project-title');
const count = document.querySelector('#project-count');
const description = document.querySelector('#project-description');
const jump = document.querySelector('#project-jump');
const stream = document.querySelector('#art-stream');

function imageCount(data) {
  if (data.items) return data.items.length;
  return data.timeline.reduce((total, section) => total + section.items.length, 0);
}

function createArtwork(item, folder, index) {
  const [filename, caption] = item;
  const figure = document.createElement('figure');
  figure.className = 'art-item';

  const image = document.createElement('img');
  image.src = `../src/assets/images/projects/${folder}/${filename}`;
  image.alt = `${caption}作品`;
  image.loading = index < 2 ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.addEventListener('load', () => {
    // Small character stickers should keep their intended physical scale instead
    // of being enlarged to the full gallery column and becoming visibly soft.
    if (image.naturalWidth < 900) {
      image.classList.add('native-size-art');
      image.style.maxWidth = `${image.naturalWidth}px`;
    }
  }, { once: true });

  const figcaption = document.createElement('figcaption');
  const name = document.createElement('span');
  const number = document.createElement('span');
  name.textContent = caption;
  number.textContent = String(index + 1).padStart(2, '0');
  figcaption.append(name, number);
  figure.append(image, figcaption);
  return figure;
}

function renderNavigation() {
  Object.entries(collections).forEach(([collectionKey, data]) => {
    const link = document.createElement('a');
    link.href = `project.html?collection=${collectionKey}`;
    link.textContent = data.title;
    if (collectionKey === key) link.setAttribute('aria-current', 'page');
    jump.append(link);
  });
}

function renderCollection(data) {
  let artworkIndex = 0;
  if (data.timeline) {
    data.timeline.forEach((period) => {
      const group = document.createElement('section');
      group.className = 'timeline-group';
      const heading = document.createElement('h2');
      heading.className = 'timeline-title';
      heading.textContent = period.label;
      group.append(heading);
      period.items.forEach((item) => group.append(createArtwork(item, data.folder, artworkIndex++)));
      stream.append(group);
    });
    return;
  }
  data.items.forEach((item) => stream.append(createArtwork(item, data.folder, artworkIndex++)));
}

if (!collection) {
  document.title = '找不到作品 — S. Ann Xiao';
  title.textContent = '找不到這本畫冊';
  description.textContent = '請回到作品集重新選擇。';
  stream.innerHTML = '<p class="empty-state">這個作品分類不存在。</p>';
} else {
  const total = imageCount(collection);
  document.title = `${collection.title} — S. Ann Xiao`;
  document.querySelector('meta[name="description"]').content = collection.description;
  count.textContent = `${collection.number} · ${String(total).padStart(2, '0')} PIECES`;
  title.textContent = collection.title;
  description.textContent = collection.description;
  renderNavigation();
  renderCollection(collection);
}
