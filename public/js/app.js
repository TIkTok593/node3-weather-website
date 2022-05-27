
// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     console.log(response.json);
//     response.json().then((data)=>{
//         if(data.error)
//             console.log(data.err);
//         else{
//             console.log(data.location);

//         }
//     })
// })

const weatherForm = document.querySelector('form');//take the first form

const search = document.querySelector('input');
const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();//prevent the refreshing of the site.

    const location = search.value;
    message_1.textContent='Loading....'
    message_2.textContent='';

    fetch('/weather?address='+location).then((response)=>{
    console.log(response.json);
    response.json().then((data)=>{
        if(data.err)
            message_1.textContent=data.err;
        else{
            message_1.textContent=data.location;
            message_2.textContent=data.temperature+' '+data.wind_dir+' '+data.wind_speed;
            
        }
    })
})

})