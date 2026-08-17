const D=window.EGP_V5;

function video(id,title){
  if(!id) return `<div class="video-empty"><b>VIDEO COMING SOON</b>YOUTUBE ARCHIVE</div>`;
  return `<iframe loading="lazy" title="${title}" src="https://www.youtube-nocookie.com/embed/${id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

// Day archive
const archive=document.querySelector("#dayArchive");
D.days.forEach((d,i)=>{
  const row=document.createElement("article");
  row.className="day-row reveal";
  row.innerHTML=`<div class="day-no">${d.day}</div><div class="day-copy"><h3>${d.title}</h3><p>${d.note}</p></div><div class="video">${video(D.videos["day"+(i+1)],`EGP Pilot Study Day ${i+1}`)}</div>`;
  archive.appendChild(row);
});

// Recognition
const recognition=document.querySelector("#recognitionList");
D.recognitions.forEach((r,i)=>{
  const el=document.createElement("article");
  el.className="recognition-item reveal";
  el.innerHTML=`<div class="idx">${String(i+1).padStart(2,"0")}</div><div class="honor">${r.title}</div><div><h3>${r.name}</h3><p>${r.note}</p></div>`;
  recognition.appendChild(el);
});

// Ceremony
document.querySelector("#ceremony").innerHTML=video(D.videos.awardsCeremony,"EGP Awards Ceremony");

// Photos
const strip=document.querySelector("#photoStrip");
if(!D.awardsPhotos.length) strip.innerHTML=`<div class="photo-empty">AWARD SESSION PHOTOGRAPHS WILL APPEAR HERE.</div>`;
else D.awardsPhotos.forEach((src,i)=>{const im=document.createElement("img");im.src=src;im.alt=`Award session photograph ${i+1}`;im.loading="lazy";strip.appendChild(im)});

// Team
const team=document.querySelector("#teamGrid");
D.team.forEach(t=>{
  const el=document.createElement("article");el.className="team-person reveal";
  el.innerHTML=`<img src="${t.image}" alt="${t.name}"><div class="info"><h3>${t.name}</h3><div class="role">${t.role}</div><p>${t.bio}</p></div>`;
  team.appendChild(el);
});

// Reveal
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".reveal").forEach((e,i)=>{e.style.transitionDelay=(i%3)*70+"ms";io.observe(e)});

// Navigation
const trigger=document.querySelector(".nav-trigger"),panel=document.querySelector(".nav-panel");
function toggleNav(force){
  const open=force ?? !panel.classList.contains("open");
  panel.classList.toggle("open",open);trigger.classList.toggle("open",open);panel.setAttribute("aria-hidden",String(!open));
}
trigger.onclick=()=>toggleNav();
panel.querySelectorAll("a").forEach(a=>a.onclick=()=>toggleNav(false));

// Scene label
const sceneName=document.querySelector("#sceneName");
const scenes=[...document.querySelectorAll("[data-scene]")];
const sceneIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)sceneName.textContent=e.target.dataset.scene});
},{threshold:.5});
scenes.forEach(s=>sceneIO.observe(s));

// Scroll progress + horizontal study documentary
const progress=document.querySelector(".progress span");
const study=document.querySelector(".study");
const track=document.querySelector(".study-track");
let ticking=false;
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(scrollY/max*100)+"%";
  if(study && track && innerWidth>850){
    const r=study.getBoundingClientRect();
    const available=study.offsetHeight-innerHeight;
    const local=Math.min(1,Math.max(0,-r.top/available));
    const maxShift=Math.max(0,track.scrollWidth-innerWidth*.78);
    track.style.transform=`translateX(${-local*maxShift}px)`;
  }
  ticking=false;
}
addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(onScroll);ticking=true}},{passive:true});onScroll();

// Lightbox
const lb=document.querySelector("#lightbox"),lbimg=lb.querySelector("img");
strip.addEventListener("click",e=>{if(e.target.tagName==="IMG"){lbimg.src=e.target.src;lb.classList.add("open");lb.setAttribute("aria-hidden","false")}});
function closeLB(){lb.classList.remove("open");lb.setAttribute("aria-hidden","true")}
lb.querySelector("button").onclick=closeLB;lb.onclick=e=>{if(e.target===lb)closeLB()};addEventListener("keydown",e=>{if(e.key==="Escape")closeLB()});
