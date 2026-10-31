const USERS = [
  { correo:"ciudadano@demo.com", password:"Ciudadano123", role:"ciudadano", nombre:"Ciudadano Demo" },
  { correo:"sereno@demo.com", password:"Sereno123", role:"serenazgo", nombre:"Juan Pérez Ramos", codigo:"SERENO-014" },
  { correo:"admin@demo.com", password:"Admin123", role:"admin", nombre:"Administrador Demo" }
];

const form = document.getElementById("loginForm");
const error = document.getElementById("loginError");

const existing = sessionStorage.getItem("serenazgoSession");
if(existing){
  const s=JSON.parse(existing);
  location.href = s.role==="admin" ? "admin.html" : s.role==="serenazgo" ? "serenazgo.html" : "ciudadano.html";
}

form.addEventListener("submit",e=>{
  e.preventDefault();
  error.classList.add("hidden");
  const correo=document.getElementById("correo").value.trim().toLowerCase();
  const password=document.getElementById("password").value;
  if(!correo || !password){
    error.textContent="Completa correo y contraseña.";
    error.classList.remove("hidden");
    return;
  }
  const u=USERS.find(x=>x.correo===correo && x.password===password);
  if(!u){
    error.textContent="Credenciales incorrectas.";
    error.classList.remove("hidden");
    return;
  }
  sessionStorage.setItem("serenazgoSession",JSON.stringify(u));
  location.href = u.role==="admin" ? "admin.html" : u.role==="serenazgo" ? "serenazgo.html" : "ciudadano.html";
});
