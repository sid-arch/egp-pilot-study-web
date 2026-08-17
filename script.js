const data = window.EGP_DATA;

function youtubeEmbed(id, title) {
  if (!id) {
    return `<div class="video-placeholder"><strong>Video coming soon</strong><span>Add the YouTube video ID in <code>data/site-data.js</code>.</span></div>`;
  }
  return `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

const videoGrid = document.getElementById("videoGrid");
for (let i = 1; i <= 7; i++) {
  const id = data.videos[`day${i}`];
  const card = document.createElement("article");
  card.className = "day-card reveal";
  card.innerHTML = `
    <div class="video-shell">${youtubeEmbed(id, `Euler's Golden Pie Pilot Study Day ${i}`)}</div>
    <div class="copy">
      <div class="day-num">DAY ${String(i).padStart(2,"0")}</div>
      <h3>Day ${i}</h3>
      <p>Replace this with the final Day ${i} session description.</p>
    </div>`;
  videoGrid.appendChild(card);
}

document.getElementById("awardsVideo").innerHTML =
  youtubeEmbed(data.videos.awardsCeremony, "Euler's Golden Pie Pilot Study Awards Ceremony");

const winnerGrid = document.getElementById("winnerGrid");
data.winners.forEach(w => {
  const el = document.createElement("article");
  el.className = "winner reveal";
  el.innerHTML = `<div class="place">${w.place}</div><h3>${w.name}</h3><p>${w.title}</p>`;
  winnerGrid.appendChild(el);
});

const teamGrid = document.getElementById("teamGrid");
data.team.forEach(t => {
  const el = document.createElement("article");
  el.className = "team-card reveal";
  el.innerHTML = `
    <img src="${t.image}" alt="${t.name}">
    <div class="team-copy">
      <h3>${t.name}</h3>
      <div class="role">${t.role}</div>
      <p>${t.description}</p>
    </div>`;
  teamGrid.appendChild(el);
});

const gallery = document.getElementById("awardsGallery");
if (!data.awardsPhotos.length) {
  gallery.innerHTML = `<div class="empty-gallery">Award photos will appear here after you add them to <code>assets/images/awards/</code> and list the filenames in <code>data/site-data.js</code>.</div>`;
} else {
  data.awardsPhotos.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Euler's Golden Pie award ceremony photo ${i+1}`;
    img.loading = "lazy";
    gallery.appendChild(img);
  });
}

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

document.querySelectorAll(".section, .day-card, .winner, .team-card").forEach(el => el.classList.add("reveal"));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
