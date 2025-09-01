
function getUsers(){return JSON.parse(localStorage.getItem('users')||'[]');}
function saveUsers(u){localStorage.setItem('users',JSON.stringify(u));}

function register(){
  const u=document.getElementById('r-user').value.trim();
  const p=document.getElementById('r-pass').value.trim();
  if(u.length<3||p.length<8){document.getElementById('rMsgErr').innerText='Datos inválidos';document.getElementById('rMsgErr').style.display='block';return;}
  let users=getUsers();
  if(users.find(x=>x.user===u)){document.getElementById('rMsgErr').innerText='Usuario ya existe';document.getElementById('rMsgErr').style.display='block';return;}
  users.push({id:Date.now(),user:u,pass:p,robux:0,friends:[]});
  saveUsers(users);
  document.getElementById('rMsgOk').style.display='block';
}

function login(){
  const u=document.getElementById('l-user').value.trim();
  const p=document.getElementById('l-pass').value.trim();
  let users=getUsers();
  let acc=users.find(x=>x.user===u&&x.pass===p);
  if(!acc){document.getElementById('lMsgErr').innerText='Credenciales inválidas';document.getElementById('lMsgErr').style.display='block';return;}
  localStorage.setItem('currentUser',acc.id);
  window.location='home.html';
}

function currentUser(){
  let id=+localStorage.getItem('currentUser');let users=getUsers();
  return users.find(x=>x.id===id);
}

function logout(){localStorage.removeItem('currentUser');window.location='index.html';}

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
}

function goCatalog(){alert('Catálogo en construcción');}
function goInventory(){alert('Inventario en construcción');}
function goProfile(){let u=currentUser();if(u)window.location='profile.html?id='+u.id;}

window.onload=function(){
  if(document.getElementById('username')){
    let u=currentUser();
    if(!u){window.location='index.html';return;}
    document.getElementById('username').innerText=u.user;
    document.getElementById('robuxTop').innerText='R$ '+u.robux;
    let fl=document.getElementById('friendsList');
    if(fl){fl.innerHTML='';u.friends.forEach(fid=>{
      let all=getUsers();let f=all.find(x=>x.id===fid);
      if(f){let li=document.createElement('li');li.innerText=f.user;fl.appendChild(li);}
    });}
  }
}
