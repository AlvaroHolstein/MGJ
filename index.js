
// import require from "./node_modules/requirejs/require.js"
// let $ = require("./node_modules/jquery/dist/jquery.js")

function ActivePage() {
    let navlinks = document.getElementsByClassName('nav-item')
    console.log(navlinks)
    let winLocation = window.location.pathname
    let indexPage = 0
    switch (winLocation) {
        case '/edicoesAnteriores.html':
            indexPage = 0
            break;
        case '/informacoes.html':
            indexPage = 1
            break;

        case '/inscricoes.html':
            indexPage = 2
            break;

        default: indexPage = 7
            break;
    }
    // navlinks[2].className = 'nav-item active'
    // console.log(indexPage)
    console.log(winLocation)

    for (let i = 0; i < navlinks.length; i++) {
        if (i == indexPage) {
            navlinks[i].className += ' active'
            // console.log(navlinks[i].className)
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

function selectYear() {
    let edicoes = document.getElementsByClassName('button')
    for (let i = 0; i < edicoes.length; i++) {
        edicoes[i].addEventListener('click', event => {
            let anoEscolhido = event.target.innerHTML

            localStorage.setItem('ano', JSON.stringify(anoEscolhido))
        })
    }
}
function edition() {
    if (document.getElementById('containerEdicoesAnteriores') != undefined) {

        let edition2017 = [{
            nome: 'NeonSwitch',
            descricaoJogo: 'É um jogo rápido com feel de arcade, situado num ambiente neon futurístico que envolve dois jogadores numa experiência 2D onde com o poder de alterar a gravidade dos objetos temos que derrotar o nosso oponente.',
            nomeEquipa: "Games's Oven",
            elementos: [{
                nome: 'Beatriz Abreu'
            },
            {
                nome: 'José Ribeiro'
            },
            {
                nome: 'Igor Lima'
            },
            {
                nome: 'Diogo Pereira'
            },
            {
                nome: 'Pedro Fernandes'
            }],
            images: ['img1', 'img2', 'img3']
        }]

        let ano = 0
        if (localStorage.getItem('ano')) ano = parseInt(JSON.parse(localStorage.getItem('ano')))
        else {
            ano = "por Definir"
        }

        document.getElementById('tituloEA').innerHTML = 'Edição de ' + ano
    }
}


function alterarNumElementos() {

    if (document.getElementById('containerInscricoes') != undefined) {

        if (localStorage.getItem('novaEquipa')) {
            let novaEquipa = JSON.parse(localStorage.getItem('novaEquipa'))
            document.getElementById('nomeEquipa').value = novaEquipa.nomeEquipa
            document.getElementById('nElementos').value = novaEquipa.nElementos
            console.log(typeof novaEquipa.nElementos)
            inserirCampos(Number(novaEquipa.nElementos))
        }

        document.getElementById('formEquipa').addEventListener('submit', event => {
            event.preventDefault()
        })

        document.getElementById('nElementos').addEventListener('input', event => {
            inserirCampos(event.target.value)
        })

        let elementosInscrever = document.getElementById('containerElementos')
        // elementosInscrever.innerHTML = ""
        localStorage.removeItem('novaEquipa')
    }
}
function inserirCampos(nCampos) {
    console.log(nCampos)
    let divPai = document.getElementById('containerElementos')
    divPai.innerHTML = ""
    if (nCampos > 5) nCampos = 5
    if (nCampos == 0 || nCampos == undefined) nCampos = 1 //Não sei se isto é boa ideia aqui.

    for (let i = 0; i < nCampos; i++) {
        console.log('nCampos')

        //Criar a "estrutura" dos "Elementos"
        let article = document.createElement('article')
        let nomeLabel = document.createElement('label')
        let nome = document.createElement('input')
        let mailLabel = document.createElement('label')
        let mail = document.createElement('input')
        let espaco = document.createElement('hr')

        //
        article.className = "remove"
        nome.id = "el" + i
        nome.className = "form-control name"
        nome.setAttribute('required', '')
        nomeLabel.innerHTML = "Nome:"
        nomeLabel.setAttribute('for', nome.id)
        mail.id = "elmail" + i
        mail.className = "form-control mail"
        mail.setAttribute('required', '')
        mailLabel.innerHTML = "Mail:"
        mailLabel.setAttribute('for', mail.id)
        espaco.className = 'espaco'
        //
        article.appendChild(nomeLabel)
        article.appendChild(nome)
        article.appendChild(mailLabel)
        article.appendChild(mail)
        article.appendChild(espaco)

        //
        divPai.appendChild(article)
    }
}

function getTeamNameHome() {
    if (document.getElementById('criarEquipaHome') != undefined) {
        document.getElementById('criarEquipaHome').addEventListener('submit', event => {
            event.preventDefault()
            let form = {
                nomeEquipa: '',
                nElementos: ''
            }

            form.nomeEquipa = document.getElementById('nomeEquipaHome').value
            form.nElementos = document.getElementById('nEquipaHome').value

            console.log(form)

            localStorage.setItem('novaEquipa', JSON.stringify(form));
            window.location.href = "./inscricoes.html";
        })
    }
}

function getTeamMembers(event) {
    event.preventDefault()
    let continuar = true
    //Nome da Equipa
    let nomeEquipa = document.getElementById('nomeEquipa').value

    //Nome Elemtos da Equipa
    let elementosHtml = document.getElementsByClassName('name')
    let mailelementos = document.getElementsByClassName('mail')
    if (nomeEquipa == '' || elementosHtml.length == 0) {
        continuar = false
    }

    if (continuar) {
        //Equipa
        let equipa = {
            nome: "",
            elementos: []
        }


        for (let i = 0; i < elementosHtml.length; i++) {
            equipa.elementos.push({ nome: elementosHtml[i].value, mail: mailelementos[i].value })
        }

        equipa.nome = nomeEquipa
        localStorage.setItem('ano', '2018')
        Swal({
            type: 'success',
            title: 'Parabéns!!!',
            text: 'A tua equipa ' + equipa.nome + ' está inscrita na Mad Game Jam',
            footer: '<a href="./edicoesAnteriores.html">Podes ir ver a Edição do ano passado<a>'
        })
        console.log(equipa)
    }
    else{
        Swal('O que pode estar mal','Tens que ter pelo menos um membro na equipa e a tua equipa tem que ter um nome', 'error')
    }
}

function clear() {
    document.getElementById('nomeEquipa').value = ""
    document.getElementById('nElementos').value = "1"

    let theFather = document.getElementById('containerElementos')
    let elementos = document.getElementsByClassName('remove')

    for (let i = elementos.length; i > 1; i--) {
        theFather.removeChild(elementos[i - 1])
    }
}
if (document.getElementById('clear')) document.getElementById('clear').addEventListener('click', clear)

//Tem que estar fora do window.onload
function Mapa() {
    let location = new google.maps.LatLng(41.366858, -8.738309);

    // Posicionar o mapa
    let map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 14,

    });

    // Ponto no mapa....
    let mark = new google.maps.Marker({
        position: location,
        map: map
    });
    //var map = new google.maps.Map(document.getElementById("mapa"), mapProp);
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

    if (document.getElementById('nomeElementos')) {
        inserirCampos(1);
        document.getElementById('nomeElementos').addEventListener('submit', getTeamMembers)
    }
    //Verificar a página que está ativa
    ActivePage()

    //Mandar E-mail para adholstein@gmail.com, por agora está a mandar para o meu mail
    sendEmail()

    //Guardar em localStorage o ano da edição que o user quer ver
    selectYear()
    //Caso esteja na página Edições Anteriores
    edition()

    //Atualizar o
    alterarNumElementos()

    //
    getTeamNameHome()


}
