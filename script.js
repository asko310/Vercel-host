const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event =>{
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    console.log(data);
    fetch('https://vercel-host-ten.vercel.app/products', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => console.log)
    .catch(error => console.log(error));
});