document.addEventListener("DOMContentLoaded", function() {
    let inputUser=document.querySelector('#userInput');
    let inputPassword=document.querySelector('#passwordInput');
    let loginBtn=document.querySelector('#loginBtn');
    let errMail=document.querySelector('#errorMail');
    let usrIcon=document.querySelector('#userIcon');
    let usrSvg=document.querySelector('#userSvg');
    let usrFieldContainer=document.querySelector('#userFieldContainer');
    let errPass=document.querySelector('#errorPass');
    let passIcon=document.querySelector('#passIcon');
    let showPassIcon=document.querySelector('#showPassword');
    let passSvg=document.querySelector('#passSvg');
    let passFieldContainer=document.querySelector('#passFieldContainer');
    let togglePass = document.querySelector("#showPassword");
    





    loginBtn.addEventListener("click",(evnt)=>{
        evnt.preventDefault();
        console.log(inputUser.value);
        console.log(inputPassword.value);

        validation();
        
        
        
    })

    inputUser.addEventListener('focus',inputUserFocus);
    inputUser.addEventListener('blur', inputUserBlur);
    inputPassword.addEventListener('focus', inputPassFocus);
    inputPassword.addEventListener('blur', inputPassBlur);
    togglePass.addEventListener('click',togglePassword);



    
    

    function validation(){
        if( inputUser.value.length===0 && inputPassword.value.length===0){
            inputUserError();
            inputPassError();
            errPass.innerHTML='Please, complete the following fields'
        }else if(inputUser.value.length===0 ){
            inputUserError();;
            errPass.innerHTML='Please, complete the following fields'
        }else if(inputPassword.value.length===0){
            inputPassError();
            errPass.innerHTML='Please, complete the following fields'
        }else{

            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputUser.value)){
                login(inputUser.value, inputPassword.value);
                errMail.innerHTML=''
                inputUserBlur();
                errPass.innerHTML=''
                inputUserBlur();
                
            }else{
                errMail.innerHTML='Enter a valid email'
                inputUserError();
            }
            
        }
    }

    function inputUserBlur(){
        usrFieldContainer.style.color='#d1d1d1';
        usrFieldContainer.style.borderColor='#d1d1d1';
        usrSvg.style.fill='#d1d1d1';
        usrIcon.style.borderColor='#d1d1d1';


    }

    function inputUserFocus(){
        usrFieldContainer.style.color='white';
        usrFieldContainer.style.borderColor='white';
        usrSvg.style.fill='white';
        usrIcon.style.borderColor='white';
        errMail.innerHTML=''
    }

    function inputUserError(){
        usrFieldContainer.style.color='red';
        usrFieldContainer.style.borderColor='red';
        usrSvg.style.fill='red';
        usrIcon.style.borderColor='red';
    }

    function inputPassFocus(){
        passFieldContainer.style.color='white';
        passFieldContainer.style.borderColor='white';
        passSvg.style.fill='white';
        showPassIcon.style.color='white';
        passIcon.style.borderColor='white';
        errPass.innerHTML=''
    }

    function inputPassBlur(){
        passFieldContainer.style.color='#d1d1d1';
        passFieldContainer.style.borderColor='#d1d1d1';
        passSvg.style.fill='#d1d1d1';
        showPassIcon.style.color='#d1d1d1';
        passIcon.style.borderColor='#d1d1d1';

    }

    function inputPassError(){
        passFieldContainer.style.color='red';
        passFieldContainer.style.borderColor='red';
        passSvg.style.fill='red';
        passIcon.style.borderColor='red';

    }

    function togglePassword() {
        
        if (inputPassword.type === "password") {
            inputPassword.type = "text";
        } else {
            inputPassword.type = "password";
        }
    }






    function login(user, pass){
        fetch('http://localhost:3000/login',{
            method:'POST',
            body: JSON.stringify({
                email: user,
                password:pass
                }),
                headers:{'Content-Type': 'application/json'}
        })
        .then(res=>{
            if(res.ok){
                console.log('TEST',res.json())
                window.location.replace('http://localhost:5500/GameFinderAltimetrik/main/main.html');
                
            }else{
                console.log("ERRRORRR ");
                errMail.innerHTML='Enter a valid email';
                errPass.innerHTML='Enter a valid password';
                inputUserError();
                inputPassError();
                
            }
            
        })
    }

    




});