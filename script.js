const D=window.EGP;

function embed(id,title){
  if(!id) return `<div class="placeholder"><b>VIDEO COMING SOON</b><span>YouTube embed will appear here.</span></div>`;
  return `<iframe loading="lazy" title="${title}" src="https://www.youtube-nocookie.com/embed/${id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

// Seven days
const days=document.querySelector("#days");
for(let i=1;i<=7;i++){
  const el=document.createElement("article");
  el.className="day reveal";
  el.innerHTML=`<div class="day-head"><span>DAY ${String(i).padStart(2,"0")}</span><h3>Day ${i}</h3></div><div class="video">${embed(D.videos["day"+i],`EGP Pilot Study Day ${i}`)}</div>`;
  days.appendChild(el);
}

// Finale
document.querySelector("#finaleVideo").innerHTML=embed(D.videos.finale,"EGP Pilot Study 50-Digit Finale");

// Recognition
const rec=document.querySelector("#recognitions");
D.recognitions.forEach((r,i)=>{
  const el=document.createElement("article");
  el.className="honor reveal";
  el.innerHTML=`<div class="honor-index">${String(i+1).padStart(2,"0")}</div><div class="honor-title">${r.title}</div><div class="honor-person"><h3>${r.name}</h3><p>${r.note}</p></div>`;
  rec.appendChild(el);
});

// Team
const team=document.querySelector("#teamCards");
D.team.forEach(t=>{
  const el=document.createElement("article");
  el.className="person reveal";
  el.innerHTML=`<img src="${t.image}" alt="${t.name}"><div class="person-copy"><h3>${t.name}</h3><div class="person-role">${t.role}</div><p>${t.bio}</p></div>`;
  team.appendChild(el);
});

// Gallery
const gallery=document.querySelector("#gallery");
if(!D.awardsPhotos.length){
  gallery.innerHTML=`<div class="gallery-empty">Award session photographs will appear here once added.</div>`;
}else{
  D.awardsPhotos.forEach((src,i)=>{
    const img=document.createElement("img");
    img.src=src;img.alt=`Award session photograph ${i+1}`;img.loading="lazy";
    gallery.appendChild(img);
  });
}

// Reveal
const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}
}),{threshold:.07});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

// Header
const topbar=document.querySelector(".topbar");
const menu=document.querySelector(".menu");
const nav=document.querySelector(".topbar nav");
addEventListener("scroll",()=>topbar.classList.toggle("scrolled",scrollY>45),{passive:true});
menu.onclick=()=>nav.classList.toggle("open");
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

// Glow
const glow=document.querySelector(".cursor-glow");
addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

// Lightbox
const lb=document.querySelector("#lightbox"),lbimg=lb.querySelector("img");
gallery.addEventListener("click",e=>{
  if(e.target.tagName==="IMG"){lbimg.src=e.target.src;lb.classList.add("open");lb.setAttribute("aria-hidden","false")}
});
function closeLB(){lb.classList.remove("open");lb.setAttribute("aria-hidden","true")}
lb.querySelector("button").onclick=closeLB;
lb.onclick=e=>{if(e.target===lb)closeLB()};
addEventListener("keydown",e=>{if(e.key==="Escape")closeLB()});
