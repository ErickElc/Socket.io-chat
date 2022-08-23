const socket = io('http://localhost:3000');

let user = null;

socket.on("update_message", (messages) => {

    updateMessagesOnScreen(messages)

})


function updateMessagesOnScreen(messages){
    const DivMessages = document.getElementById("messages");

    let listMessages = "<ul>"

    messages.forEach(message => {
        listMessages += `<li> ${message.user}: ${message.msg}</li>`       
    });
    listMessages += "</ul>";


    DivMessages.innerHTML= listMessages;
}


document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("sendForm");
    const form_user = document.getElementById("sendUserForm");

    form.addEventListener("submit", (e)=>{

        e.preventDefault();
       
        const message = document.forms["sendForm"]['msg'].value;
        if(!user){
            alert("defina usuario");
            return;
        }
       
        document.forms["sendForm"]['msg'].value = ''
       
        socket.emit("new_message", {user: user, msg: message})


        console.log(message);
    });
    form_user.addEventListener("submit", (e)=>{
        
        e.preventDefault();
       
        user = document.forms["sendUserForm"]['User'].value;
       
        
        
        form_user.parentNode.removeChild(form_user)
       
        
    });

})