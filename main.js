/* =========================================================
   Suraj Kumar — Portfolio
   Designed & built by Suraj Kumar (surajkumar805122@gmail.com)
   No external libraries — vanilla JS + canvas.
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

/* ---------- Boot loader ---------- */
(function boot() {
  document.body.classList.add("loading");
  const fill = $("#bootFill");
  const status = $("#bootStatus");
  const steps = ["loading neural weights", "compiling projects", "rendering interface"];
  let p = 0, i = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + 9 + Math.random() * 14);
    fill.style.width = p + "%";
    const idx = Math.min(steps.length - 1, Math.floor(p / 34));
    if (idx !== i) { i = idx; status.firstChild.textContent = steps[i]; }
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        $("#loader").classList.add("done");
        document.body.classList.remove("loading");
        startHero();
      }, 250);
    }
  }, reduceMotion ? 20 : 110);
})();

/* ---------- Neural-network particle background ---------- */
(function particles() {
  const c = $("#bg");
  const ctx = c.getContext("2d");
  let w, h, dpr, nodes = [];
  const mouse = { x: -9999, y: -9999 };
  const COLORS = ["34,211,238", "168,85,247", "244,114,182"];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = c.width = innerWidth * dpr;
    h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + "px";
    c.style.height = innerHeight + "px";
    const count = Math.round(Math.min(110, (innerWidth * innerHeight) / 14000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35 * dpr,
      vy: (Math.random() - 0.5) * 0.35 * dpr,
      r: (Math.random() * 1.6 + 0.6) * dpr,
      c: COLORS[Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2],
    }));
  }
  resize();
  addEventListener("resize", resize);
  addEventListener("mousemove", (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });

  const LINK = 130;
  function frame() {
    ctx.clearRect(0, 0, w, h);
    const link = LINK * dpr;
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      // gentle pull toward cursor
      const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
      if (d < 200 * dpr) { n.x += dx * 0.004; n.y += dy * 0.004; }
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / link) * 0.22})`;
          ctx.lineWidth = dpr * 0.7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < 180 * dpr) {
        ctx.strokeStyle = `rgba(34,211,238,${(1 - md / (180 * dpr)) * 0.45})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = `rgba(${a.c},0.85)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------- Cursor glow + scroll progress + nav ---------- */
const glow = $(".cursor-glow");
if (finePointer) {
  addEventListener("mousemove", (e) => {
    glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });
}
const progress = $(".scroll-progress");
const nav = $("#nav");
const sections = $$("main section[id]");
const navAnchors = $$(".nav-links a");
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  nav.classList.toggle("scrolled", scrollY > 30);
  let current = "";
  for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
  navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* mobile menu */
const burger = $("#burger"), navLinks = $("#navLinks");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navAnchors.forEach((a) => a.addEventListener("click", () => {
  burger.classList.remove("open");
  navLinks.classList.remove("open");
}));

/* resume dropdowns */
$$(".resume-menu").forEach((menu) => {
  const btn = $("button", menu);
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = !menu.classList.contains("open");
    $$(".resume-menu").forEach((m) => m.classList.remove("open"));
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  });
});
document.addEventListener("click", () => $$(".resume-menu").forEach((m) => m.classList.remove("open")));

/* ---------- Hero: typing roles + glitch ---------- */
function startHero() {
  $$(".hero .reveal").forEach((el, i) => setTimeout(() => el.classList.add("in"), 90 * i));
  const roles = [
    "AI / ML Engineer",
    "Deep Learning · NLP · Audio",
    "Data Science @ IIT Madras",
    "Full-Stack Developer",
    "Cybersecurity Researcher",
  ];
  const el = $("#typed");
  let r = 0, ch = 0, deleting = false;
  (function type() {
    const word = roles[r];
    el.textContent = word.slice(0, ch);
    if (!deleting && ch < word.length) { ch++; setTimeout(type, 70); }
    else if (!deleting) { deleting = true; setTimeout(type, 1700); }
    else if (ch > 0) { ch--; setTimeout(type, 35); }
    else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 300); }
  })();

  const name = $(".name");
  const glitch = () => {
    name.classList.add("glitch");
    setTimeout(() => name.classList.remove("glitch"), 380);
  };
  setTimeout(glitch, 600);
  if (!reduceMotion) setInterval(glitch, 5200);
}

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const siblings = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
    const idx = Math.max(0, siblings.indexOf(el));
    setTimeout(() => el.classList.add("in"), Math.min(idx, 6) * 90);
    io.unobserve(el);
    if (el.classList.contains("stat")) countUp($(".count", el));
    if (el.id === "terminal") typeTerminal();
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach((el) => { if (!el.closest(".hero")) io.observe(el); });

/* ---------- Counters ---------- */
function countUp(el) {
  const to = parseFloat(el.dataset.to);
  const dec = parseInt(el.dataset.dec || "0", 10);
  const dur = 1600, t0 = performance.now();
  (function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = (to * eased).toFixed(dec);
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}

/* ---------- Terminal JSON typing ---------- */
let termDone = false;
function typeTerminal() {
  if (termDone) return;
  termDone = true;
  const body = $("#termBody");
  const lines = [
    ['<span class="p">$</span> cat suraj.json', 0],
    ["{", 0],
    ['  <span class="k">"name"</span>: <span class="s">"Suraj Kumar"</span>,', 1],
    ['  <span class="k">"role"</span>: <span class="s">"AI/ML Engineer (aspiring)"</span>,', 1],
    ['  <span class="k">"studying"</span>: <span class="s">"BS Data Science @ IIT Madras"</span>,', 1],
    ['  <span class="k">"focus"</span>: [<span class="s">"Deep Learning"</span>, <span class="s">"NLP"</span>, <span class="s">"RAG"</span>, <span class="s">"Audio"</span>],', 1],
    ['  <span class="k">"best_score"</span>: { <span class="k">"macro_f1"</span>: <span class="n">0.825</span>, <span class="k">"model"</span>: <span class="s">"AST"</span> },', 1],
    ['  <span class="k">"also"</span>: [<span class="s">"Full-Stack"</span>, <span class="s">"Bug Bounty"</span>],', 1],
    ['  <span class="k">"location"</span>: <span class="s">"Gaya, Bihar, IN"</span>,', 1],
    ['  <span class="k">"open_to_work"</span>: <span class="n">true</span>', 1],
    ["}", 0],
  ];
  let i = 0;
  const cur = '<span class="cur"></span>';
  (function next() {
    if (i >= lines.length) { body.innerHTML = lines.map((l) => l[0]).join("\n") + "\n" + cur; return; }
    body.innerHTML = lines.slice(0, i + 1).map((l) => l[0]).join("\n") + cur;
    i++;
    setTimeout(next, reduceMotion ? 0 : 160);
  })();
}

/* ---------- 3D tilt + glass mouse glow ---------- */
if (finePointer && !reduceMotion) {
  $$(".tilt, .project.featured").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const strength = card.classList.contains("featured") ? 3 : 6;
      card.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  const photo = $("#tiltPhoto");
  addEventListener("mousemove", (e) => {
    if (scrollY > innerHeight) return;
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    photo.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  });

  $$(".magnetic").forEach((b) => {
    b.addEventListener("mousemove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener("mouseleave", () => { b.style.transform = ""; });
  });
}
$$(".glass").forEach((g) => {
  g.addEventListener("mousemove", (e) => {
    const r = g.getBoundingClientRect();
    g.style.setProperty("--mx", e.clientX - r.left + "px");
    g.style.setProperty("--my", e.clientY - r.top + "px");
  });
});

/* ---------- Project filters ---------- */
$$(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$(".project").forEach((p) => {
      const show = f === "all" || p.dataset.cat === f;
      p.classList.toggle("hide", !show);
      if (show) { p.classList.remove("in"); requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add("in"))); }
    });
  });
});

/* ---------- Project visuals ---------- */
// audio equalizer bars
(function eq() {
  const host = $(".eq");
  const n = 36;
  for (let i = 0; i < n; i++) {
    const bar = document.createElement("i");
    const base = 25 + Math.sin(i / 4) * 18 + Math.random() * 20;
    bar.style.setProperty("--a", Math.max(8, base - 20) + "%");
    bar.style.setProperty("--b", Math.min(100, base + 30 + Math.random() * 20) + "%");
    bar.style.animationDelay = -(Math.random() * 1.2) + "s";
    bar.style.animationDuration = 0.7 + Math.random() * 0.8 + "s";
    host.appendChild(bar);
  }
})();
// parking slots flip between free / booked
(function slots() {
  const s = $$(".slots i");
  if (reduceMotion) return;
  setInterval(() => s[Math.floor(Math.random() * s.length)].classList.toggle("on"), 900);
})();

/* ---------- Copy email ---------- */
const toast = $("#toast");
$("#copyEmail").addEventListener("click", async (e) => {
  const email = e.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "Email copied ✓";
  } catch {
    window.location.href = "mailto:" + email;
    return;
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
});

$("#year").textContent = new Date().getFullYear();
