const elForm = document.querySelector('.js-form');
const elLoginBtn = document.querySelector('.js-login');

const mainPage = async (accessToken) => {
    const req = await fetch('http://localhost:4000', {
        method: "GET",
        headers:{
            token: accessToken
        }
    });
    const res = req.json();
    console.log(res);
    
    return alert(res.message)
}

const sendData = async (path, data) => {
    const req = await fetch(path, {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    if(res.status > 300) return alert(res.message.split(':')[1]); 
    else {
        localStorage.setItem('token', res.accessToken);
        mainPage(res.accessToken);
    }
}

elLoginBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const formData = new FormData(elForm);
    const formObj = Object.fromEntries(formData.entries());
    sendData('http://localhost:4000/api/auth/register', formObj);
})
