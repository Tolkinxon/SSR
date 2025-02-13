"use strict";
const elForm = document.querySelector('.js-form');
const elLoginBtn = document.querySelector('.js-login');
elLoginBtn?.addEventListener('click', () => {
    const formData = new FormData(elForm);
    const formObj = formData.entries();
});
