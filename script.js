const D = window.EGP;

function embed(id,title){
  if(!id) return `<div class="placeholder"><strong>Video coming soon</strong><span>YouTube embed will appear here.</span></div>`;
  return `<iframe loading="lazy" title="${title}" src="https://www.youtube-nocookie.com/embed/${id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

const days=document.querySelector("#days");
for(let i=1;i<=7;i++){
  const el=document.createElement("article"); el.className="day reveal";
  el.innerHTML=`<div class="day-label">DAY ${String(i).padStart(2,"0")}</div><div class="day-content"><h3>Day ${i}</h3><div class="video">${embed(D.videos["day"+i],`EGP Pilot Study Day ${i}`)}</div></div>`;
  days.appendChild(el);
}

document.querySelector("#ceremonyVideo").innerHTML=embed(D.videos.awardsCeremony,"EGP Pilot Study Awards Ceremony");

const rec=document.querySelector("#recognitions");
D.recognitions.forEach((r,i)=>{
  const el=document.createElement("article");el.className="honor reveal";
  el.innerHTML=`<div class="honor-index">${String(i+1).padStart(2,"0")}</div><div class="honor-title">${r.title}</div><div class="honor-person"><h3>${r.name}</h3><p>${r.note}</p></div>`;
  rec.appendChild(el);
});

const team=document.querySelector("#teamCards");
D.team.forEach(t=>{
  const el=document.createElement("article");el.className="person reveal";
  el.innerHTML=`<img src="${t.image}" alt="${t.name}"><div class="person-copy"><h3>${t.name}</h3><div class="person-role">${t.role}</div><p>${t.bio}</p></div>`;
  team.appendChild(el);
});

const gal=document.querySelector("#gallery");
if(!D.awardsPhotos.length) gal.innerHTML=`<div class="gallery-empty">Award ceremony photographs will appear here once added to <code>assets/images/awards/</code>.</div>`;
else D.awardsPhotos.forEach((src,i)=>{let im=document.createElement("img");im.src=src;im.alt=`Award ceremony photo ${i+1}`;im.loading="lazy";gal.appendChild(im)});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));

const menu=document.querySelector(".menu"),nav=document.querySelector(".topbar nav");
menu.onclick=()=>nav.classList.toggle("open");
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});


// V3: navbar morph on scroll
const topbar = document.querySelector(".topbar");
window.addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", window.scrollY > 45);
}, {passive:true});

// V3: subtle parallax for the giant 50 and background EGP lettering
const giant50 = document.querySelector(".fifty");
const bgEGP = document.querySelector(".numbers-bg");
let ticking = false;
function auraParallax(){
  const y = window.scrollY;
  if(giant50){
    const r = giant50.getBoundingClientRect();
    const delta = (window.innerHeight/2 - (r.top+r.height/2)) * 0.035;
    giant50.style.transform = `translateX(-4vw) translateY(${delta}px)`;
  }
  if(bgEGP){
    const r = bgEGP.parentElement.getBoundingClientRect();
    const delta = (window.innerHeight/2 - (r.top+r.height/2)) * 0.045;
    bgEGP.style.transform = `translateY(${delta}px)`;
  }
  ticking=false;
}
window.addEventListener("scroll",()=>{
  if(!ticking){requestAnimationFrame(auraParallax);ticking=true}
},{passive:true});
auraParallax();

// V3: award gallery lightbox
const lightbox=document.querySelector("#lightbox");
const lightboxImage=document.querySelector("#lightboxImage");
const closeLightbox=document.querySelector(".lightbox-close");
function shutLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true")}
document.querySelector("#gallery").addEventListener("click",e=>{
  if(e.target.tagName==="IMG"){
    lightboxImage.src=e.target.src;
    lightboxImage.alt=e.target.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  }
});
closeLightbox.addEventListener("click",shutLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox) shutLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape") shutLightbox()});


// V4 — restrained premium motion
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktopMotion = window.matchMedia("(min-width: 901px)").matches;

if(!reducedMotion && desktopMotion){
  let v4Tick=false;
  const heroTitle=document.querySelector(".hero h1");
  window.addEventListener("scroll",()=>{
    if(v4Tick) return;
    v4Tick=true;
    requestAnimationFrame(()=>{
      const y=window.scrollY;
      if(heroTitle && y < window.innerHeight*1.2){
        heroTitle.style.transform=`translateY(${y*.035}px)`;
        heroTitle.style.opacity=String(Math.max(.25,1-y/(window.innerHeight*1.15)));
      }
      v4Tick=false;
    });
  },{passive:true});
}

// Stagger direct children in key editorial sequences.
document.querySelectorAll(".number-grid,.recognitions").forEach(group=>{
  [...group.children].forEach((el,i)=>{
    el.style.transitionDelay=`${Math.min(i*70,280)}ms`;
  });
});


// V6 safety: the hero lines remain structurally separated at all times.
document.querySelectorAll(".v6-hero-title > span, .v6-hero-title > em").forEach(el=>{
  el.style.transform="";
});

// V6: process rows deliberately have no right-side glyphs/arrows.


// FINAL: keep hero motion cinematic, never distorted.
const finalHeroTitle = document.querySelector(".v6-hero-title");
if(finalHeroTitle){
  window.addEventListener("scroll",()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const y = window.scrollY;
    if(y < window.innerHeight){
      finalHeroTitle.style.opacity = String(Math.max(.55,1-y/(window.innerHeight*1.55)));
    }
  },{passive:true});
}
