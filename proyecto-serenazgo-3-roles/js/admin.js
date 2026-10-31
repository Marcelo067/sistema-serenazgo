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
if(!session || session.role!=="admin") location.href="index.html";
const KEY="serenazgoSolicitudesDemoV3",SERENOS_KEY="serenazgoSerenosDemoV3";
const estados=["Recibido","Asignado","En camino","Atendido"];

function list(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
function saveAll(v){localStorage.setItem(KEY,JSON.stringify(v))}
function serenos(){try{return JSON.parse(localStorage.getItem(SERENOS_KEY)||"[]")}catch{return[]}}
function saveSerenos(v){localStorage.setItem(SERENOS_KEY,JSON.stringify(v))}
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function showView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));document.getElementById(id).classList.add("active-view");document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.target===id));render()}
document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>showView(b.dataset.target));
document.getElementById("btnCerrarSesion").onclick=()=>{sessionStorage.removeItem("serenazgoSession");location.href="index.html"};
document.getElementById("btnRefrescar").onclick=()=>{render();toast("Panel actualizado.")};

function render(){
  const all=list(), s=serenos();
  document.getElementById("mTotal").textContent=all.length;
  document.getElementById("mPendientes").textContent=all.filter(x=>x.estado==="Recibido"||x.estado==="Asignado").length;
  document.getElementById("mCamino").textContent=all.filter(x=>x.estado==="En camino").length;
  document.getElementById("mAtendidas").textContent=all.filter(x=>x.estado==="Atendido").length;
  document.getElementById("mSerenos").textContent=s.filter(x=>x.habilitado).length;

  const ult=document.getElementById("ultimaSolicitud");
  ult.innerHTML=all.length?`<p><strong>${all[0].codigo}</strong> · ${all[0].incidente}${all[0].detalleOtro?": "+all[0].detalleOtro:""}</p><p>${all[0].ubicacion}</p><p>Estado: <strong>${all[0].estado}</strong></p>`:"No hay solicitudes.";

  const tbody=document.getElementById("tablaSolicitudes");tbody.innerHTML="";
  if(!all.length) tbody.innerHTML='<tr><td colspan="5">No hay solicitudes.</td></tr>';
  all.forEach((x,i)=>{
    const enabled=s.filter(z=>z.habilitado);
    const options='<option value="">Sin asignar</option>'+enabled.map(z=>`<option value="${z.codigo}" ${z.codigo===x.serenoCodigo?"selected":""}>${z.nombre} (${z.codigo})</option>`).join("");
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${x.codigo}</td><td>${x.incidente}${x.detalleOtro?": "+x.detalleOtro:""}</td><td><strong>${x.estado}</strong></td><td><select data-assign="${i}">${options}</select></td><td><button class="btn btn-soft" data-advance="${i}">${x.estado==="Atendido"?"Finalizada":"Avanzar"}</button></td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("[data-assign]").forEach(sel=>sel.onchange=()=>assign(Number(sel.dataset.assign),sel.value));
  tbody.querySelectorAll("[data-advance]").forEach(btn=>btn.onclick=()=>advance(Number(btn.dataset.advance)));

  const ts=document.getElementById("tablaSerenos");ts.innerHTML="";
  s.forEach((x,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${x.codigo}</td><td>${x.nombre}</td><td>${x.unidad}</td><td>${x.zona}</td><td><span class="status-pill ${x.habilitado?"ok":"off"}">${x.habilitado?"Habilitado":"Deshabilitado"}</span></td><td><button class="btn btn-soft" data-toggle="${i}">${x.habilitado?"Deshabilitar":"Habilitar"}</button></td>`;
    ts.appendChild(tr);
  });
  ts.querySelectorAll("[data-toggle]").forEach(btn=>btn.onclick=()=>toggleSereno(Number(btn.dataset.toggle)));
}
function assign(i,codigo){
  const arr=list(), s=serenos(), found=s.find(x=>x.codigo===codigo);
  arr[i].serenoCodigo=found?found.codigo:"";
  arr[i].serenoNombre=found?found.nombre:"";
  if(found && arr[i].estado==="Recibido") arr[i].estado="Asignado";
  saveAll(arr);render();toast(found?"Sereno asignado.":"Asignación retirada.");
}
function advance(i){
  const arr=list(),idx=estados.indexOf(arr[i].estado);
  if(idx>=estados.length-1){toast("La solicitud ya está atendida.");return}
  arr[i].estado=estados[idx+1];saveAll(arr);render();toast("Estado actualizado.");
}
function toggleSereno(i){
  const s=serenos();s[i].habilitado=!s[i].habilitado;saveSerenos(s);render();toast("Estado del sereno actualizado.");
}
render();
