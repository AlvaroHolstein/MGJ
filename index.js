
// import require from "./node_modules/requirejs/require.js"
// let $ = require("./node_modules/jquery/dist/jquery.js")
function ActivePage() {
    let navlinks = document.getElementsByClassName('nav-item')
    console.log(navlinks)
    let winLocation = window.location.pathname
    let indexPage = 0
    switch (winLocation) {
        case '/index.html':
            indexPage = 0
            break;
        case '/informacoes.html':
            indexPage = 1
            break;

        case '/inscricoes.html':
            indexPage = 2
            break;
    }
    // navlinks[2].className = 'nav-item active'
    console.log(indexPage)
    console.log(winLocation)

    for (let i = 0; i < navlinks.length; i++) {
        if (i == indexPage) {
            navlinks[i].className += ' active'
            console.log(navlinks[i].className)
        }
    }
}

function sendEmail() {
    let form = {
        nome: '',
        nomeEquipa: '',
        mail: '',
        mensagem: ''
    };
    if (document.getElementById('contact-us') != undefined) {
        document.getElementById('contact-us').addEventListener('submit', event => {
            event.preventDefault()

            //Preparado para mandar o form por mail
            form.nome = document.getElementById('nome').value
            form.nomeEquipa = document.getElementById('nomeequipa').value
            form.mail = document.getElementById('mail').value
            form.mensagem = document.getElementById('msg').value

            emailjs.send("gmail", "mgj_contact_form", form).
                then(response => {
                    console.log('Boa ', response.status, response.text)
                },
                    error => {
                        console.log('Ups ', error)
                    }
                )
        })
    }
}

window.onload = function () {
    window.addEventListener('keypress', event => {
        if (event.key == '?') {
            $('#manualsobrevivenciaModal').modal('show');
        }
        if (event.key == 'Enter') {
            $('#manualsobrevivenciaModal').modal('hide');
        }
    })

    //Verificar a página que está ativa
    ActivePage()

    //Mandar E-mail para adholstein@gmail.com, por agora está a mandar para o meu mail
    sendEmail()
}

