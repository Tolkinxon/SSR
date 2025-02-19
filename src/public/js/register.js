const token = window.localStorage.getItem('token');
if(token) window.location.replace('/')


const elForm = document.querySelector('.js-form');
const elRegisterBtn = document.querySelector('.js-register');

const sendData = async (path, data) => {
    const req = await fetch(path, {
        method: "POST",
        body: data
    });
    const res = await req.json();
    if(res.status > 300) return  alert(res.message.split(':')[1]);
    else {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user_name', JSON.stringify(res.user_name));
        localStorage.setItem('user_img', JSON.stringify(res.user_img));
        window.location.replace('/')
    }
}

elRegisterBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const formData = new FormData(elForm);
    sendData(`http://${api}:4000/api/auth/register`, formData);
})
