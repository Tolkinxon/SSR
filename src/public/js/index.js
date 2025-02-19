const token = localStorage.getItem('token');
const userName = JSON.parse(localStorage.getItem('user_name'));
const userImg = JSON.parse(localStorage.getItem('user_img'));

const elItemTemplate = document.querySelector('.comments__item-template').content;
const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.input__input');
const elHeading = document.querySelector('.header__heading');
const elUserImg = document.querySelector('.header__img');
const elList = document.querySelector('.comments__list');

elHeading.textContent = `Welcome: ${userName}`;
elUserImg.src = userImg;


function render(arr, node){
    node.innerHTML = '';
    const fragment = new DocumentFragment();

    arr.forEach(({message, user_name, time})=>{
        const clone = elItemTemplate.cloneNode(true);
        clone.querySelector('.js-user-name').textContent = user_name;
        if(user_name == userName) clone.querySelector('.comments__item').style.marginLeft = 'auto';
        
        clone.querySelector('.js-user-message').textContent = message;
        clone.querySelector('.js-user-time').textContent = time;

        fragment.appendChild(clone);
    })
    node.appendChild(fragment);
}

const comments = async () => {
    const req = await fetch(`http://${api}:4000/api/comments`,{
        method: 'GET',
        headers:{
            token: token
        }
    });

    const res = await req.json();
    render(res, elList);
}
comments();

const postComments = async (body) => {
    const req = await fetch(`http://${api}:4000/api/comment`,{
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