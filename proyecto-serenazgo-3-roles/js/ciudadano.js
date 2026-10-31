const DEMO_KEY="serenazgoSolicitudesDemoV3";
const SERENOS_KEY="serenazgoSerenosDemoV3";

function ensureDemoData(){
  if(!localStorage.getItem(SERENOS_KEY)){
    localStorage.setItem(SERENOS_KEY,JSON.stringify([
      {codigo:"SERENO-014",nombre:"Juan Pérez Ramos",unidad:"CH-12",zona:"Chorrillos Centro",habilitado:true},
      {codigo:"SERENO-021",nombre:"María Torres Vega",unidad:"CH-08",zona:"Matellini",habilitado:true},
      {codigo:"SERENO-033",nombre:"Luis Cárdenas Ruiz",unidad:"CH-19",zona:"Villa",habilitado:false}
    ]));
  }
  if(!localStorage.getItem(DEMO_KEY)){
    localStorage.setItem(DEMO_KEY,JSON.stringify([
      {codigo:"SER-240812",incidente:"Robo",detalleOtro:"",ubicacion:"Av. Huaylas 2450, Chorrillos (simulado)",estado:"En camino",fecha:"31/10/2026, 11:10 a. m.",evidencia:false,serenoCodigo:"SERENO-014",serenoNombre:"Juan Pérez Ramos",informe:""},
      {codigo:"SER-531924",incidente:"Auxilio",detalleOtro:"",ubicacion:"Av. Defensores del Morro 880 (simulado)",estado:"Atendido",fecha:"30/10/2026, 8:42 p. m.",evidencia:true,serenoCodigo:"SERENO-014",serenoNombre:"Juan Pérez Ramos",informe:"Se brindó apoyo al ciudadano y se verificó que no requería atención médica adicional."},
      {codigo:"SER-408675",incidente:"Violencia",detalleOtro:"",ubicacion:"Jr. Guardia Civil 410 (simulado)",estado:"Asignado",fecha:"31/10/2026, 12:05 p. m.",evidencia:false,serenoCodigo:"SERENO-021",serenoNombre:"María Torres Vega",informe:""}
    ]));
  }
}
ensureDemoData();

const session=JSON.parse(sessionStorage.getItem("serenazgoSession")||"null");
if(!session || session.role!=="ciudadano") location.href="index.html";
const KEY="serenazgoSolicitudesDemoV3";
let current={incidente:"",detalleOtro:"",ubicacion:"",foto:false,audio:false};

function list(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
function saveAll(v){localStorage.setItem(KEY,JSON.stringify(v))}
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function speak(t){if("speechSynthesis" in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="es-PE";speechSynthesis.speak(u)}}
function showView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));
  document.getElementById(id).classList.add("active-view");
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.target===id));
  if(id==="historial") renderHistorial();
}
document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>showView(b.dataset.target));
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>showView(b.dataset.go));
document.getElementById("btnCerrarSesion").onclick=()=>{sessionStorage.removeItem("serenazgoSession");location.href="index.html"};

const cards=[...document.querySelectorAll(".incident-card")];
const btnContinuar=document.getElementById("btnContinuar");
const otroBox=document.getElementById("otroProblemaBox");
const otroInput=document.getElementById("otroProblema");
const counter=document.getElementById("otroCounter");

function updateContinue(){
  if(current.incidente==="Otros"){
    btnContinuar.disabled = !otroInput.value.trim();
  }else{
    btnContinuar.disabled = !current.incidente;
  }
}
cards.forEach(c=>c.addEventListener("click",()=>{
  cards.forEach(x=>{x.classList.remove("selected");x.setAttribute("aria-checked","false")});
  c.classList.add("selected");c.setAttribute("aria-checked","true");
  current.incidente=c.dataset.value;
  otroBox.classList.toggle("hidden",current.incidente!=="Otros");
  if(current.incidente!=="Otros"){otroInput.value="";current.detalleOtro="";counter.textContent="0";}
  updateContinue();
}));
otroInput.addEventListener("input",()=>{current.detalleOtro=otroInput.value.trim();counter.textContent=otroInput.value.length;updateContinue()});
document.getElementById("btnEscucharOpciones").onclick=()=>speak("Violencia. Robo. Accidente. Auxilio. Otros.");
btnContinuar.onclick=()=>{
  if(current.incidente==="Otros" && !current.detalleOtro){toast("Describe brevemente el problema.");return}
  document.getElementById("pasoIncidente").classList.add("hidden");
  document.getElementById("pasoUbicacion").classList.remove("hidden");
  document.getElementById("resumenIncidente").textContent=current.incidente==="Otros" ? `Otros: ${current.detalleOtro}` : current.incidente;
  document.querySelectorAll(".steps li")[0].className="done";
  document.querySelectorAll(".steps li")[1].className="active";
};

function setLoc(t){
  current.ubicacion=t;
  document.getElementById("ubicacionTexto").textContent=t;
  document.getElementById("resumenUbicacion").textContent=t;
  document.getElementById("locationFeedback").classList.remove("hidden");
  document.getElementById("btnConfirmarUbicacion").disabled=false;
}
document.getElementById("btnUbicacion").onclick=()=>setLoc("Av. Defensores del Morro, Chorrillos (simulado)");
document.getElementById("btnBuscarDireccion").onclick=()=>{
  const v=document.getElementById("direccion").value.trim();
  if(!v){toast("Escribe una dirección.");return}
  setLoc(v+" (simulado)");
};
document.getElementById("btnFoto").onclick=()=>document.getElementById("fotoInput").click();
document.getElementById("btnAudio").onclick=()=>document.getElementById("audioInput").click();
document.getElementById("fotoInput").onchange=e=>{if(e.target.files.length){current.foto=true;document.getElementById("btnFoto").textContent="✓ Fotografía seleccionada"}};
document.getElementById("audioInput").onchange=e=>{if(e.target.files.length){current.audio=true;document.getElementById("btnAudio").textContent="✓ Audio seleccionado"}};
document.getElementById("btnVolverIncidente").onclick=()=>{
  document.getElementById("pasoUbicacion").classList.add("hidden");
  document.getElementById("pasoIncidente").classList.remove("hidden");
};
document.getElementById("btnConfirmarUbicacion").onclick=()=>{
  if(!current.ubicacion){toast("Confirma una ubicación.");return}
  const codigo="SER-"+Math.floor(100000+Math.random()*900000);
  const fecha=new Date().toLocaleString("es-PE",{dateStyle:"short",timeStyle:"short"});
  const req={codigo,incidente:current.incidente,detalleOtro:current.detalleOtro,ubicacion:current.ubicacion,referencia:document.getElementById("referencia").value.trim(),estado:"Recibido",fecha,evidencia:current.foto||current.audio,serenoCodigo:"",serenoNombre:"",informe:""};
  const all=list();all.unshift(req);saveAll(all);
  document.getElementById("codigoSolicitud").textContent=codigo;
  document.getElementById("fechaSolicitud").textContent=fecha;
  document.getElementById("pasoUbicacion").classList.add("hidden");
  document.getElementById("pasoConfirmacion").classList.remove("hidden");
  document.querySelectorAll(".steps li")[1].className="done";
  document.querySelectorAll(".steps li")[2].className="active";
};
document.getElementById("btnNuevaSolicitud").onclick=()=>location.reload();

document.getElementById("btnBuscarSolicitud").onclick=()=>{
  const code=document.getElementById("codigoBusqueda").value.trim().toUpperCase();
  const fb=document.getElementById("busquedaFeedback"),res=document.getElementById("resultadoSeguimiento");
  fb.className="feedback hidden";res.classList.add("hidden");
  const found=list().find(x=>x.codigo===code);
  if(!code){fb.textContent="Ingresa un código.";fb.className="feedback error";return}
  if(!found){fb.textContent="No se encontró una solicitud con ese código.";fb.className="feedback error";return}
  fb.textContent="Solicitud encontrada.";fb.className="feedback success";
  res.innerHTML=`<h3>${found.codigo}</h3>
    <p><strong>Incidente:</strong> ${found.incidente}${found.detalleOtro?": "+found.detalleOtro:""}</p>
    <p><strong>Ubicación:</strong> ${found.ubicacion}</p>
    <p><strong>Estado:</strong> ${found.estado}</p>
    <p><strong>Sereno asignado:</strong> ${found.serenoNombre||"Pendiente"}</p>
    <p><strong>Fecha:</strong> ${found.fecha}</p>
    ${found.informe?`<div class="case-report"><strong>Informe final:</strong><p>${found.informe}</p></div>`:""}`;
  res.classList.remove("hidden");
};

function renderHistorial(){
  const box=document.getElementById("historialCiudadano"),all=list();
  box.innerHTML=all.length?"":"<div class='panel'>No hay solicitudes registradas.</div>";
  all.forEach(x=>{
    const d=document.createElement("article");d.className="case-card";
    d.innerHTML=`<div class="case-top"><div><h3>${x.codigo}</h3><p>${x.incidente}${x.detalleOtro?": "+x.detalleOtro:""}</p></div><span class="status-pill ok">${x.estado}</span></div>
    <div class="case-meta"><div><small>Ubicación</small>${x.ubicacion}</div><div><small>Sereno</small>${x.serenoNombre||"Pendiente"}</div><div><small>Fecha</small>${x.fecha}</div></div>`;
    box.appendChild(d);
  });
}
