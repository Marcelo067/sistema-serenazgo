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
if(!session || session.role!=="serenazgo") location.href="index.html";
const KEY="serenazgoSolicitudesDemoV3";
const estados=["Recibido","Asignado","En camino","Atendido"];

document.getElementById("serenoNombre").textContent=`${session.nombre} · ${session.codigo}`;
function list(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
function saveAll(v){localStorage.setItem(KEY,JSON.stringify(v))}
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function showView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));document.getElementById(id).classList.add("active-view");document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.target===id));render()}
document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>showView(b.dataset.target));
document.getElementById("btnCerrarSesion").onclick=()=>{sessionStorage.removeItem("serenazgoSession");location.href="index.html"};
document.getElementById("btnRefrescarSereno").onclick=()=>{render();toast("Casos actualizados.")};

function assigned(){return list().filter(x=>x.serenoCodigo===session.codigo)}
function render(){
  const all=assigned();
  const activos=all.filter(x=>x.estado!=="Atendido"), atendidos=all.filter(x=>x.estado==="Atendido");
  document.getElementById("perfilActivos").textContent=activos.length;
  document.getElementById("perfilAtendidos").textContent=atendidos.length;

  const casos=document.getElementById("casosAsignados");
  casos.innerHTML=activos.length?"":"<div class='panel'>No tienes casos activos asignados.</div>";
  activos.forEach(x=>casos.appendChild(caseCard(x,false)));

  const hist=document.getElementById("historialAtendidos");
  hist.innerHTML=atendidos.length?"":"<div class='panel'>Aún no tienes casos atendidos.</div>";
  atendidos.forEach(x=>hist.appendChild(caseCard(x,true)));
}
function caseCard(x,readonly){
  const d=document.createElement("article");d.className="case-card";
  d.innerHTML=`<div class="case-top"><div><h3>${x.codigo}</h3><p>${x.incidente}${x.detalleOtro?": "+x.detalleOtro:""}</p></div><span class="status-pill ok">${x.estado}</span></div>
  <div class="case-meta"><div><small>Ubicación</small>${x.ubicacion}</div><div><small>Fecha</small>${x.fecha}</div><div><small>Evidencia</small>${x.evidencia?"Sí":"No"}</div></div>
  ${readonly && x.informe?`<div class="case-report"><strong>Informe final</strong><p>${x.informe}</p></div>`:""}
  ${readonly?"":`<div class="case-actions">
    <button class="btn btn-soft" data-action="advance">Avanzar estado</button>
    <button class="btn btn-outline" data-action="report">Registrar informe</button>
  </div>
  <div class="report-editor hidden">
    <label>Informe o descripción del cierre</label>
    <textarea rows="4" maxlength="500" placeholder="Describe cómo terminó el caso...">${x.informe||""}</textarea>
    <button class="btn btn-primary" data-action="save-report">Guardar informe</button>
  </div>`}`;
  if(!readonly){
    d.querySelector('[data-action="advance"]').onclick=()=>advance(x.codigo);
    d.querySelector('[data-action="report"]').onclick=()=>d.querySelector(".report-editor").classList.toggle("hidden");
    d.querySelector('[data-action="save-report"]').onclick=()=>saveReport(x.codigo,d.querySelector("textarea").value.trim());
  }
  return d;
}
function advance(code){
  const arr=list(),i=arr.findIndex(x=>x.codigo===code),idx=estados.indexOf(arr[i].estado);
  if(idx>=estados.length-1){toast("El caso ya está atendido.");return}
  arr[i].estado=estados[idx+1];
  saveAll(arr);render();toast("Estado actualizado a "+arr[i].estado);
}
function saveReport(code,text){
  if(!text){toast("Escribe un informe.");return}
  const arr=list(),i=arr.findIndex(x=>x.codigo===code);
  arr[i].informe=text;saveAll(arr);render();toast("Informe guardado.");
}
render();
