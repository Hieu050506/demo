const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

function show(item){
  var login=[item];
  var inputusername= document.getElementById('username').value;
  var inputpassword= document.getElementById('password').value;
  var check=true;
  for(let x of login){
      if(x.tk!=inputusername || x.mk!=inputpassword){
          check=false;
      }
  }

  if(check){
      return true;
  }
  else{
      alert("Tài khoản hoặc mật khẩu không chính sác!");
      return false;
  }
}

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

