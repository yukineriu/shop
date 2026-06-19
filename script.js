/* ========================================
   YUKINERIU ORIGIN STORE - SCRIPT
   ======================================== */

// ---- PRODUCT DATA ----
const GOOGLE_FORM_URL = 'https://forms.gle/Ris5S5k7Qk4FvLqs5';

const products = [
  {
    id: 'acrylic-board',
    name: 'オリジナルアクリルボード',
    jpycPrice: '¥3,000',
    normalPrice: '¥3,500',
    discount: '14%',
    image: 'riusta-pr.png-noplice.png',
    images: ['riusta-pr.png-noplice.png', 'asi.png'],
    badge: 'New!',
    badgeType: 'new',
    badge2: 'JPYCで14%おトク',
    badge2Type: 'sale',
    description: '夏の思い出を、いつでもそばに。高透明度クリア仕様のオリジナルアクリルボード。鮮やかで美しい高精細印刷。約190mm×約190mmサイズ。デスクや棚にぴったり！プレゼントにもおすすめ♪ ※スタンド部分は金属ポール2本（小）によるスタンドです ※画像はイメージです',
    tags: ['約190mm×190mm', 'アクリルボード', 'クリア仕様', 'JPYC対応'],
  },
  {
    id: 'monster-tee',
    name: 'RIURIU MONSTER TEE',
    jpycPrice: '¥4,200',
    normalPrice: '¥5,000',
    discount: '16%',
    image: 'riut.png',
    badge: 'New!',
    badgeType: 'new',
    badge2: 'JPYCで16%おトク',
    badge2Type: 'sale',
    description: '遊び心と個性をまとう一枚。フロントに大胆なモンスタープリント、袖にアクセントの雪音りうシンボル。国内製造で快適な着心地、ユニセックスサイズ展開（M/L/XL）。しっかりした高品質ボディ、洗濯 OKでデイリーに活躍！ ※画像はイメージです',
    tags: ['Tシャツ', 'M/L/XL', 'ユニセックス', 'JPYC対応'],
  },
  {
    id: 'badge-cross',
    name: 'オリジナル缶バッジ（ヘアピン）',
    jpycPrice: '¥450',
    normalPrice: '¥500',
    discount: '10%',
    image: '23685066-7354-44a7-a578-e962c467dd0d.png',
    badge: 'New!',
    badgeType: 'new',
    badge2: 'JPYCで10%おトク',
    badge2Type: 'sale',
    description: '雪音りうプロジェクトのオリジナル缶バッジ。ヘアピンデザイン。44mmサイズで推し活やコレクションにぴったり！カバンや小物のワンポイントにも◎ ※画像はイメージです',
    tags: ['44mm', '缶バッジ', 'JPYC対応'],
  },
  {
    id: 'badge-monster',
    name: 'オリジナル缶バッジ（ミミックワイバーン）',
    jpycPrice: '¥450',
    normalPrice: '¥500',
    discount: '10%',
    image: '5f8f1e85-affd-4645-b3b1-127a477f05ae.png',
    badge: 'New!',
    badgeType: 'new',
    badge2: 'JPYCで10%おトク',
    badge2Type: 'sale',
    description: '雪音りうプロジェクトのオリジナル缶バッジ。かわいいミミックワイバーンデザイン。イラストがふちまで綺麗にプリント！推し活やコレクションにぴったり♡ ※画像はイメージです',
    tags: ['44mm', '缶バッジ', 'JPYC対応'],
  },
  {
    id: 'badge-rabbit',
    name: 'オリジナル缶バッジ（ゆきもち）',
    jpycPrice: '¥450',
    normalPrice: '¥500',
    discount: '10%',
    image: '9ba13003-d362-40d0-9bfa-6af6d00d11f7.png',
    badge: 'New!',
    badgeType: 'new',
    badge2: 'JPYCで10%おトク',
    badge2Type: 'sale',
    description: '雪音りうプロジェクトのオリジナル缶バッジ。ぷっくりかわいいゆきもちデザイン。推し活にぴったり！44mmサイズ。 ※画像はイメージです',
    tags: ['44mm', '缶バッジ', 'JPYC対応'],
  },
  {
    id: 'badge-riu',
    name: 'オリジナル缶バッジ（雪音りう）',
    jpycPrice: '¥450',
    normalPrice: '¥500',
    discount: '10%',
    image: 'ff70d8c4-c4ae-4a15-97ca-309095ddbac3.png',
    badge: 'New!',
    badgeType: 'new',
    badge2: 'JPYCで10%おトク',
    badge2Type: 'sale',
    description: '雪音りうプロジェクトのオリジナル缶バッジ。雪音りうデザイン。推し活やコレクションに！44mmサイズ。 ※画像はイメージです',
    tags: ['44mm', '缶バッジ', 'JPYC対応'],
  },
  {
    id: 'badge-set',
    name: 'オリジナル缶バッジ 全4種セット',
    jpycPrice: '¥1,600',
    normalPrice: '¥1,800',
    discount: '11%',
    image: 'jhgsagd.png-noplice.png',
    badge: 'セット',
    badgeType: 'set',
    badge2: 'JPYCで11%おトク',
    badge2Type: 'sale',
    description: '全4種のオリジナル缶バッジをセットにしたお得パック！ヘアピン・ミミックワイバーン・ゆきもち・雪音りうの4デザイン。並べるとかわいい…！♡ カバンや小物のワンポイントにも◎ ※画像はイメージです',
    tags: ['44mm', 'お得セット', '全4種', 'JPYC対応'],
  },
];

// ---- RENDER PRODUCTS ----
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.id = `product-card-${product.id}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${product.name}の詳細を見る`);

    let badgeHTML = '';
    if (product.badge) {
      const badgeClass = product.badgeType === 'new' ? 'badge-new' :
                         product.badgeType === 'sale' ? 'badge-sale' :
                         product.badgeType === 'set' ? 'badge-set' : '';
      badgeHTML += `<span class="product-card-badge ${badgeClass}">${product.badge}</span>`;
    }
    if (product.badge2) {
      const badge2Class = product.badge2Type === 'new' ? 'badge-new' :
                          product.badge2Type === 'sale' ? 'badge-sale' :
                          product.badge2Type === 'set' ? 'badge-set' : '';
      badgeHTML += `<span class="product-card-badge badge-second ${badge2Class}">${product.badge2}</span>`;
    }

    const priceHTML = `
      <div class="price-jpyc-row">
        <span class="price-jpyc-label">💰 JPYC</span>
        <span class="price-jpyc-value">${product.jpycPrice}－</span>
        <span class="price-tax">（税込）</span>
        <span class="price-discount">（${product.discount}おトク）</span>
      </div>
      <div class="price-normal-row">
        <span class="price-normal-label">通常価格</span>
        <span class="price-normal-value">${product.normalPrice}</span>
        <span class="price-tax">（税込）</span>
      </div>
    `;

    card.innerHTML = `
      <div class="product-card-image-wrap">
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-card-info">
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-price">${priceHTML}</div>
        <div class="product-card-desc-short">${product.description}</div>
        <div class="product-card-tap-hint">
          <span>👆</span> タップして詳細を見る
        </div>
      </div>
    `;

    card.addEventListener('click', () => openModal(product));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(product);
      }
    });

    // Add entrance animation delay
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;

    grid.appendChild(card);

    // Trigger entrance
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    });
  });
}

// ---- MODAL ----
function openModal(product) {
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body');

  const priceHTML = `
    <div class="price-jpyc-row modal-jpyc-row">
      <span class="price-jpyc-label">💰 JPYC</span>
      <span class="price-jpyc-value">${product.jpycPrice}－</span>
      <span class="price-tax">（税込）</span>
      <span class="price-discount">（${product.discount}おトク）</span>
    </div>
    <div class="price-normal-row">
      <span class="price-normal-label">通常価格</span>
      <span class="price-normal-value">${product.normalPrice}</span>
      <span class="price-tax">（税込）</span>
    </div>
  `;

  let tagsHTML = product.tags.map(tag => {
    const cls = tag === 'JPYC対応' ? 'modal-tag jpyc' : 'modal-tag';
    return `<span class="${cls}">${tag}</span>`;
  }).join('');

  // Build image section: gallery if multiple images, single image otherwise
  const images = product.images || [product.image];
  let imageHTML = '';

  if (images.length > 1) {
    const thumbnailsHTML = images.map((img, i) =>
      `<button class="gallery-thumb${i === 0 ? ' active' : ''}" data-index="${i}" onclick="switchGalleryImage(${i})">
        <img src="${img}" alt="${product.name} 画像${i + 1}">
      </button>`
    ).join('');

    imageHTML = `
      <div class="modal-gallery">
        <div class="gallery-main-wrap">
          <img src="${images[0]}" alt="${product.name}" class="modal-image" id="gallery-main-img">
          <div class="gallery-counter">
            <span id="gallery-current">1</span> / ${images.length}
          </div>
        </div>
        <div class="gallery-thumbs" id="gallery-thumbs">
          ${thumbnailsHTML}
        </div>
      </div>
    `;
  } else {
    imageHTML = `<img src="${product.image}" alt="${product.name}" class="modal-image">`;
  }

  body.innerHTML = `
    ${imageHTML}
    <div class="modal-info">
      <div class="modal-name">${product.name}</div>
      <div class="modal-price">${priceHTML}</div>
      <div class="modal-tags">${tagsHTML}</div>
      <div class="modal-desc">${product.description}</div>
      <button class="modal-cta-btn" id="modal-cart-btn" onclick="goToForm()">
        🛒 カートに進む（Googleフォーム）
      </button>
      <p class="modal-notice">⚠ 必ずフォーム送信後に送金してください</p>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ---- GALLERY IMAGE SWITCH ----
function switchGalleryImage(index) {
  const mainImg = document.getElementById('gallery-main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const counter = document.getElementById('gallery-current');

  if (!mainImg) return;

  // Get new image src from the thumbnail
  const newSrc = thumbs[index].querySelector('img').src;

  // Fade transition
  mainImg.style.opacity = '0';
  mainImg.style.transform = 'scale(0.97)';

  setTimeout(() => {
    mainImg.src = newSrc;
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
  }, 180);

  // Update active thumb
  thumbs.forEach(t => t.classList.remove('active'));
  thumbs[index].classList.add('active');

  // Update counter
  if (counter) counter.textContent = index + 1;
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- QR CODE OVERLAY ----
function showQR() {
  const overlay = document.getElementById('qr-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQR(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('qr-close-btn')) return;
  const overlay = document.getElementById('qr-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    const qrOverlay = document.getElementById('qr-overlay');
    if (qrOverlay) {
      qrOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }
});

// ---- GOOGLE FORM ----
function goToForm() {
  window.open(GOOGLE_FORM_URL, '_blank', 'noopener');
}

// ---- COPY ADDRESS ----
function copyAddress() {
  const addressEl = document.getElementById('jpyc-address');
  const text = addressEl.textContent.trim();

  navigator.clipboard.writeText(text).then(() => {
    showToast();
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast();
  });
}

function showToast() {
  const toast = document.getElementById('copy-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ---- PAYMENT TABS ----
document.querySelectorAll('.payment-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove all active
    document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.payment-tab-content').forEach(c => c.classList.remove('active'));

    // Set active
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.getElementById(`content-${target}`).classList.add('active');
  });
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
