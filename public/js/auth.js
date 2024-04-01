//Login form
const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const logObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(logObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
        
           location.href = "/profile"
        } else {
            alert("trumpet sound")
        }
    })
})

//Signup form
const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj = {
        name:document.querySelector("#signupName").value,
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
    }
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
         
           location.href = "/profile"
        } else {
            alert("trumpet sound")
        }
    })
})