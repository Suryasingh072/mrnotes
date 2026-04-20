/* ═══════════════════════════════════════════
   MrNotes – script.js
═══════════════════════════════════════════ */

// ── Notes Data ──────────────────────────────────────────────────────────────
const NOTES = [
  {
    id: 1,
    cat: "coding",
    subject: "Data Structures",
    title: "DSA Complete Interview Notes",
    desc: "Arrays, Linked List, Trees, Graphs, DP — coding patterns + time complexity.",
    price: 149,
    original: 299,
    rating: 5.0,
    pages: 180,
    downloads: 5600,
    badge: "hot",
    icon: "💻",
    color: "#14b8a6"
  },
  {
    id: 2,
    cat: "coding",
    subject: "Computer Networks",
    title: "Computer Networks – GATE Notes",
    desc: "OSI, TCP/IP, Routing, Subnetting — GATE + interview prep.",
    price: 129,
    original: 249,
    rating: 4.7,
    pages: 110,
    downloads: 2200,
    badge: "",
    icon: "🌐",
    color: "#f97316"
  },
  {
    id: 3,
    cat: "coding",
    subject: "Java",
    title: "Java Complete Notes",
    desc: "OOPs, Collections, Multithreading — interview + college prep.",
    price: 99,
    original: 199,
    rating: 4.8,
    pages: 130,
    downloads: 3000,
    badge: "hot",
    icon: "☕",
    color: "#f59e0b"
  },
  {
    id: 4,
    cat: "coding",
    subject: "Python",
    title: "Python for Beginners to Advanced",
    desc: "Basics, OOP, File handling, Projects — full roadmap.",
    price: 89,
    original: 179,
    rating: 4.7,
    pages: 120,
    downloads: 3500,
    badge: "new",
    icon: "🐍",
    color: "#10b981"
  },
  {
    id: 5,
    cat: "coding",
    subject: "Web Development",
    title: "Full Stack Web Dev Notes",
    desc: "HTML, CSS, JS, React, Node — complete dev guide.",
    price: 119,
    original: 249,
    rating: 4.9,
    pages: 200,
    downloads: 4200,
    badge: "hot",
    icon: "🌍",
    color: "#6366f1"
  },
  {
    id: 6,
    cat: "coding",
    subject: "DBMS",
    title: "DBMS + SQL Notes",
    desc: "Normalization, Queries, Transactions — interview focused.",
    price: 79,
    original: 149,
    rating: 4.6,
    pages: 90,
    downloads: 2100,
    badge: "",
    icon: "🗄️",
    color: "#0ea5e9"
  },
  {
    id: 7,
    cat: "coding",
    subject: "Operating System",
    title: "OS Complete Notes",
    desc: "Process, Threads, Scheduling, Memory — interview prep.",
    price: 99,
    original: 199,
    rating: 4.8,
    pages: 140,
    downloads: 2600,
    badge: "",
    icon: "🖥️",
    color: "#8b5cf6"
  },
  {
    id: 8,
    cat: "coding",
    subject: "System Design",
    title: "System Design Basics",
    desc: "Scalability, Load balancing, Architecture — beginner friendly.",
    price: 149,
    original: 299,
    rating: 4.9,
    pages: 160,
    downloads: 2800,
    badge: "new",
    icon: "🏗️",
    color: "#ef4444"
  }
];

// ── State ────────────────────────────────────────────────────────────────────
let activeCategory = "all";
let searchQuery    = "";
let visibleCount   = 6;
const BATCH        = 3;

// ── UPI Config ───────────────────────────────────────────────────────────────
const UPI_ID   = "yourupiid@upi";
const UPI_NAME = "MrNotes";
const WA_NUMBER = "919431683881";

// ── DOM Helpers ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function getFilteredNotes() {
  return NOTES.filter(n => {
    const matchCat  = activeCategory === "all" || n.cat === activeCategory;
    const matchSearch = !searchQuery ||
      n.title.toLowerCase().includes(searchQuery) ||
      n.subject.toLowerCase().includes(searchQuery) ||
      n.desc.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

// ── Render Notes ─────────────────────────────────────────────────────────────
function renderNotes(animate = false) {
  const grid    = $("notesGrid");
  const noRes   = $("noResults");
  const lmWrap  = $("loadMoreWrap");
  const filtered = getFilteredNotes();
  const visible  = filtered.slice(0, visibleCount);

  grid.innerHTML = "";

  if (filtered.length === 0) {
    noRes.classList.remove("d-none");
    lmWrap.classList.add("d-none");
    return;
  }
  noRes.classList.add("d-none");

  visible.forEach((note, idx) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    if (animate) col.style.animationDelay = `${idx * 0.07}s`;
    col.innerHTML = buildCardHTML(note);
    grid.appendChild(col);
  });

  // Load more button
  if (filtered.length > visibleCount) {
    lmWrap.classList.remove("d-none");
  } else {
    lmWrap.classList.add("d-none");
  }
}

function buildCardHTML(note) {
  const stars   = "★".repeat(Math.floor(note.rating)) + (note.rating % 1 ? "½" : "");
  const badgeHTML = note.badge
    ? `<span class="note-badge ${note.badge}">${note.badge === "hot" ? "🔥 Hot" : "✨ New"}</span>`
    : "";
  const discount = Math.round((1 - note.price / note.original) * 100);

  return `
    <div class="note-card h-100" data-id="${note.id}">
      <div class="note-card-header">
        <div class="note-icon" style="background:${note.color}22; font-size:1.8rem; width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center;">
          ${note.icon}
        </div>
        <div style="text-align:right">
          ${badgeHTML}
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">-${discount}% off</div>
        </div>
      </div>
      <div class="note-card-body">
        <div class="note-subject">${note.subject}</div>
        <div class="note-title">${note.title}</div>
        <div class="note-desc">${note.desc}</div>
        <div class="note-meta">
          <span class="note-rating">★ ${note.rating}</span>
          <span><i class="bi bi-file-earmark-text"></i> ${note.pages} pages</span>
          <span><i class="bi bi-download"></i> ${note.downloads.toLocaleString()}</span>
        </div>
      </div>
      <div class="note-card-footer">
        <div class="note-price">
          <span class="currency">₹</span>${note.price}
          <span class="original">₹${note.original}</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-buy" onclick="openPayModal(${note.id})">
            <i class="bi bi-bag-fill me-1"></i>Buy
          </button>
          <a href="${buildWaLink(note.title)}" target="_blank" class="btn btn-wa" title="WhatsApp">
            <i class="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>`;
}

// ── WhatsApp Link ─────────────────────────────────────────────────────────────
function buildWaLink(noteName) {
  const msg = encodeURIComponent(`Hi! I have paid for "${noteName}". Please send the notes. 🙏`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// ── UPI Link ──────────────────────────────────────────────────────────────────
function buildUpiLink(price) {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${price}&cu=INR`;
}

// ── Pay Modal ─────────────────────────────────────────────────────────────────
function openPayModal(noteId) {
  const note = NOTES.find(n => n.id === noteId);
  if (!note) return;

  $("payAmountDisplay").textContent = `₹${note.price}`;
  $("payNoteName").textContent      = note.title;
  $("upiLink").href                 = buildUpiLink(note.price);
  $("waAfterPay").href              = buildWaLink(note.title);

  const modal = new bootstrap.Modal($("payModal"));
  modal.show();
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg, type = "info") {
  const el = $("liveToast");
  $("toastMsg").textContent = msg;
  el.className = `toast align-items-center border-0 ${type}`;
  const toast = new bootstrap.Toast(el, { delay: 3000 });
  toast.show();
}

// ── Dark Mode ─────────────────────────────────────────────────────────────────
function initDarkMode() {
  const saved = localStorage.getItem("nbTheme") || "light";
  setTheme(saved);

  [$("darkToggleMobile"), $("darkToggleDesktop")].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  });
}

function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("nbTheme", t);
  const icon = t === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill";
  document.querySelectorAll(".dark-toggle-btn i").forEach(i => {
    i.className = `bi ${icon}`;
  });
}

// ── Navbar Scroll ─────────────────────────────────────────────────────────────
function initNavScroll() {
  const nav = $("mainNav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ── Active Nav Link ───────────────────────────────────────────────────────────
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove("active"));
        const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add("active");
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

// ── Search ────────────────────────────────────────────────────────────────────
function initSearch() {
  const input = $("searchInput");
  const clear = $("clearSearch");

  input.addEventListener("input", () => {
    searchQuery = input.value.trim().toLowerCase();
    visibleCount = 6;
    clear.style.display = searchQuery ? "block" : "none";
    renderNotes(true);
  });

  clear.addEventListener("click", () => {
    input.value = "";
    searchQuery = "";
    clear.style.display = "none";
    renderNotes(true);
    input.focus();
  });
}

// ── Filter Chips ──────────────────────────────────────────────────────────────
function initFilters() {
  $("filterChips").addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.cat;
    visibleCount   = 6;
    renderNotes(true);
  });
}

// ── Load More ─────────────────────────────────────────────────────────────────
function initLoadMore() {
  $("loadMoreBtn").addEventListener("click", () => {
    visibleCount += BATCH;
    renderNotes();
    const filtered = getFilteredNotes();
    if (visibleCount >= filtered.length) $("loadMoreWrap").classList.add("d-none");
  });
}

// ── Loader ────────────────────────────────────────────────────────────────────
function hideLoader() {
  const loader = $("loader");
  setTimeout(() => loader.classList.add("hidden"), 900);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  hideLoader();
  initDarkMode();
  initNavScroll();
  initScrollSpy();
  renderNotes();
  initSearch();
  initFilters();
  initLoadMore();
  // Scroll reveal needs slight delay for DOM to paint
  setTimeout(initScrollReveal, 200);
});
