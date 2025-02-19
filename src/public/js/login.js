const token = window.localStorage.getItem('token');
if(token) window.location.replace('/');

const elForm = document.querySelector('.js-form');
const elLoginBtn = document.querySelector('.js-login');

const sendData = async (path, data) => {
    const req = await fetch(path, {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const res = await req.json();
    if(res.status > 300) return  alert(res.message);
    else {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user_name', JSON.stringify(res.user_name));
        window.location.replace('/')
    }
}

elLoginBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const formData = new FormData(elForm);
    const formObj = Object.fromEntries(formData.entries());
    sendData(`http://${api}:4000/api/auth/login`, formObj);
})

