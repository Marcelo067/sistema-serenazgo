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
