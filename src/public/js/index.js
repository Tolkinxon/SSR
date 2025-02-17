const token = localStorage.getItem('token');
const userName = localStorage.getItem('user_name');
const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.input__input');
const elHeading = document.querySelector('.header__heading');

elHeading.textContent = `Welcome: ${JSON.parse(userName)}`;



const comments = async () => {
    const req = await fetch('http://localhost:4000/api/comments',{
        method: 'GET',
        headers:{
            token: token
        }
    });

    const res = await req.json();
    console.log(res);   

}
comments();

const postComments = async (body) => {
    const req = await fetch('http://localhost:4000/api/comment',{
        method: 'POST',
        headers:{
            "Content-type": "application/json",
            token: token
        },
        body: JSON.stringify(body)
    });

    const res = await req.json();
    console.log(res);   

}



elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const formData = new FormData(elForm);
    const formObj = Object.fromEntries(formData.entries());
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes()
    const time = `${hours}:${minutes}`
    formObj.time = time;

    if(formObj.message) postComments(formObj);

    elInput.value = '';
})