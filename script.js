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
