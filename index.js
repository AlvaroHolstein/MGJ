
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


/*function alterarNumElementos() {

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
        let escolaLabel = document.createElement('label')
        let escola = document.createElement('input')

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
        escola.setAttribute('id', 'escola')
        escola.className = 'form-control escola'
        escola.setAttribute('required', '')
        escolaLabel.innerHTML = "Escola"
        escolaLabel.setAttribute('for', escola.id)
        //
        article.appendChild(nomeLabel)
        article.appendChild(nome)
        article.appendChild(mailLabel)
        article.appendChild(mail)
        article.appendChild(escolaLabel)
        article.appendChild(escola)
        article.appendChild(espaco)
        //
        divPai.appendChild(article)
    }
}*/

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

        //enviar email para avisar que mais uma equipa se inscrever
        // emailjs.send("gmail", "mgj_contact_form", form).
        // then(response => {
        //     console.log('Boa ', response.status, response.text)
        // },
        //     error => {
        //         console.log('Ups ', error)
        //     }
        // )
    }
    else {
        Swal('O que pode estar mal', 'Tens que ter pelo menos um membro na equipa e a tua equipa tem que ter um nome', 'error')
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


/* Array que vai conter as áreas de atuação, de maneira a facilitar a vida no formulario */
let areasAtuacao = ['Artista2D', 'Artista3D', 'Sound Designer', 'Programador', 'Game Designer'] //Falta a só a opção (outra)
let areasAtuacaoSelected = []
/* Preencher os elementos do formulárioo quando for preciso */
function fillOptions() {
    let areas = document.getElementsByClassName('area')
    areasAtuacao.sort()
    for (let i = 0; i < areas.length; i++) {
        if (areasAtuacao[i] == undefined) areas[i].style.display = 'none'
        else areas[i].style.display = 'block'
        areas[i].innerHTML = areasAtuacao[i]
        areas[i].addEventListener('click', selectArea)
    }
}
/* Função para encher as tags, ou "apaga-las" */
function filltags() {
    let tags = document.getElementsByClassName('areaTags')
    if (areasAtuacaoSelected.length > 0) {
        for (let i = 0; i < tags.length; i++) {
            if (areasAtuacaoSelected[i] == undefined) {
                tags[i].style.display = 'none'
            }
            else {
                console.log(areasAtuacaoSelected[i])
                tags[i].innerHTML = areasAtuacaoSelected[i] + '<i class="far fa-times-circle"></i>'
                tags[i].style.display = 'inline-block';
            }
        }
    }
    else {
        for (let tag of tags) {
            tag.style.display = "none"
        }
    }
}
function eleminateTags(e) {
    let tagRemove = e.target.innerText
    console.log(tagRemove)
    for (let i = 0; i < areasAtuacaoSelected.length; i++) {
        if (areasAtuacaoSelected[i] == tagRemove) {
            let put = areasAtuacaoSelected.splice(i, 1)
            areasAtuacao.push(put)
        }
    }

    /* Atualizar o que é visto no formulário */
    fillOptions()
    filltags()
}
/* Mover a tag consoante o utilizador carregar ou não */
function selectArea(e) {
    let selectedArea = e.target.innerHTML

    let index = areasAtuacao.findIndex(tag => tag == selectedArea)
    let ohmy = areasAtuacao.splice(index, 1)[0]
    areasAtuacaoSelected.push(ohmy)
    /* Atualizar o que é visto no formulário */
    fillOptions()
    filltags()
}
/* Função para mostrar a tag da "outra: area" */
function showOutra(value) {
    let tag_ = document.getElementsByClassName('areaOutra')[0]
    let input_label = document.getElementById('outraLi')

    input_label.style.display = 'none'

    tag_.style.display = 'inline-block'
    tag_.innerHTML = `${value} <i class="far fa-times-circle eli"></i>`
    tag_.addEventListener('click', removeOutraTag)
    console.log(outraAreaFilled)
}
/* Função para ler os saber qual é o botão que está selecionado sobre a comida */
function eatInSchool() {
    let sim = document.getElementById('s').checked
    let nao = document.getElementById('n').checked

    return sim == true ? true : false
}
/* Função para remover a tag e mostrar o o Li da Outra */
function removeOutraTag() {
    console.log('ata')
    let tag_ = document.getElementsByClassName('areaOutra')[0]
    let input_label = document.getElementById('outraLi')

    input_label.style.display = 'inline-block'
    tag_.style.display = 'none'
    outraAreaFilled = null
    console.log('outraAreaFilled = ' + outraAreaFilled)
}
let progressVar = 1
let btnEscolhido = null
/* Ajustar a Progress Bar ao numero que está no titulo do form */
function progress() {
    let progressbar = document.getElementsByClassName('progress-bar')[0]
    let progressNumber = document.getElementsByClassName('progessNumber')[0].innerHTML
    let width = 0
    if (btnEscolhido != 'Solo Adventure') {

        switch (progressNumber) {
            case "1": width = 33; break;
            case "2": width = 66; break;
            case "3": width = 100; break;
        }
    }
    else {
        switch (progressNumber) {
            case "1": width = 50; break;
            case "2": width = 100; break;
            default: width = 100; break;
        }
    }


    progressbar.style.width = `${width}%`
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
    // alterarNumElementos()

    //
    getTeamNameHome()

    //Vai ativar os botões e tratar de todo o processo de inscrever uma equipa/participante
    if (window.location.pathname == "/inscricoes.html") {
        fillTabelTeams()
        let teamRow = document.getElementsByClassName('teamrow')
        for (let row of teamRow) {
            row.addEventListener('click', choseTeam)
        }
        fillOptions()
        filltags()
        register()
        document.getElementsByClassName('progessNumber')[0].innerHTML = progressVar
        progress()
        document.getElementById('btn-next-step').addEventListener('click', readForm)
        document.getElementById('cancel').addEventListener('click', close)
        /* Botão para fechar o form */
        let btnClose = document.getElementById('closeForm')
        btnClose.addEventListener('click', close)
        document.getElementById('buttons').style.display = "none"
        document.getElementsByClassName('formInicial')[0].style.display = 'none'
    }
}

function close() {
    console.log('ata')
    document.getElementsByClassName('formInicial')[0].style.display = 'none'
    document.getElementById('form-particiapnte').reset()

    document.getElementById('help1').className = 'collapse'
    document.getElementById('help2').className = 'collapse'
    document.getElementById('help3').className = 'collapse'

    document.getElementsByClassName('progessNumber')[0].innerHTML = progressVar
    document.getElementById('escolherEquipa').style.display = 'none'
    document.getElementById('criarEquipa').style.display = 'none'
    document.getElementById('divFinal').style.display = 'none'
    document.getElementById('buttons').style.display = 'none'
    if (sessionStorage.getItem('participante-em-registo')) sessionStorage.removeItem('participante-em-registo')
    progressVar = 1
    areasAtuacaoSelected = []
    areasAtuacao = ['Artista2D', 'Artista3D', 'Sound Designer', 'Programador', 'Game Designer']
    document.getElementsByClassName('progessNumber')[0].innerHTML = progressVar
    progress()
}
//Main function
function register() {
    let btnsIniciateReg = document.getElementsByClassName('iniciarInscricao')
    let btnsCollapse = document.getElementsByClassName('regulamentobtn')
    let btnsAreas = document.getElementsByClassName('area')
    let btnsTags = document.getElementsByClassName('areaTags')

    for (let btn of btnsCollapse) { /* Não deizar aparecer as duas caixas de informação ao mesmo tempo */
        btn.addEventListener('click', (e) => {
            if (e.target.id == 'btn1') document.getElementById('Avisosimportantes').className = "collapse"
            if (e.target.id == 'btn2') document.getElementById('regulamentoText').className = "collapse"
        })
    }
    for (let btn of btnsIniciateReg) {
        btn.addEventListener('click', showForm);
    }

    for (let area of btnsAreas) {
        area.addEventListener('click', selectArea)
    }

    for (let btntag of btnsTags) {
        btntag.addEventListener('click', eleminateTags)
    }
}
function showForm(e) {
    let btnsIniciateReg = document.getElementsByClassName('iniciarInscricao')
    let btnPress = e.target.innerHTML
    let forminicial = document.getElementsByClassName('formInicial')[0]
    let divsHelp = document.getElementsByClassName('help')

    //Div's em variáveis para ser mais fácil não me perder
    let formInit = document.getElementById('divFormInit')
    let divCriarEquipa = document.getElementById('criarEquipa')
    let escolherEquipa = document.getElementById('escolherEquipa')
    let divFinal = document.getElementById('divFinal')


    formInit.style.display = 'block'
    // forminicial.style.display = 'block'

    for (let i = 0; i < btnsIniciateReg.length; i++) {
        if (btnsIniciateReg[i].innerHTML != btnPress) {
            if (i == 0) document.getElementById('help1').className = 'collapse'
            if (i == 1) document.getElementById('help2').className = 'collapse'
            if (i == 2) document.getElementById('help3').className = 'collapse'
        }
    }
    btnEscolhido = e.target.innerHTML
    sessionStorage.setItem('opcaoInscricao', JSON.stringify(btnEscolhido))
    console.log('SessionStorage - ' + JSON.parse(sessionStorage['opcaoInscricao']))
    close()
    // progress()
    document.getElementById('buttons').style.display = 'block'
    forminicial.style.display = 'block'
    document.getElementById('form-particiapnte').reset()


}
//Como se vai sempre primeiro para o formulário de inscrição de um participante esta função
//é sempre a primeira a ser chamada
function readForm() {
    let guardar = true;
    /* Valores a guardar num participante */
    if (progressVar == 1) {
        this.email = document.getElementById('mail').value
        this.nome = document.getElementById('nome').value
        this.nTele = document.getElementById('tele').value
        this.linkSn = document.getElementById('linkSN').value
        this.areasAtuacaoFinal = areasAtuacaoSelected
        if (outraAreaFilled != null) this.areasAtuacaoFinal.push(outraAreaFilled)
        this.refeicoes = eatInSchool()

        if (outraAreaFilled == null) guardar = false
        else guardar = true;

        if (areasAtuacaoSelected.length == 0) guardar = false
        else guardar = true

        if (this.email == "" || this.nome == "") guardar = false;
    }

    if (progressVar == 2) {
        if (document.getElementById('CriarEquipa').value == "") guardar = false
        else {
            sessionStorage.setItem('nomeEquipaGuardar', JSON.stringify(document.getElementById('CriarEquipa').value))
        }
    }
    // guardar = true
    if (guardar) {
        let option = JSON.parse(sessionStorage.getItem('opcaoInscricao'))

        if (option != "Solo Adventure") {
            if (progressVar < 3) progressVar++
        }
        else {
            if (progressVar < 2) progressVar++
        }


        //Div's em variáveis para ser mais fácil não me perder
        let formInit = document.getElementById('divFormInit')
        let divCriarEquipa = document.getElementById('criarEquipa')
        let escolherEquipa = document.getElementById('escolherEquipa')
        let divFinal = document.getElementById('divFinal')
        let participant = null
        // console.log('pro - ' + progressVar)
        if (progressVar == 2) {

            participant = new Participante(this.email, this.nome, this.nTele, this.linkSn, this.areasAtuacaoFinal, this.refeicoes)

            // participantes.push(participant)
            // localStorage.setItem('participantes', JSON.stringify(participantes))
            // console.log(participantes)
            // console.log(participant)
            participantes.push(participant)

            sessionStorage.setItem('participante-em-registo', JSON.stringify(participant))

            if (option == "Solo Adventure") {
                //Div Final
                formInit.style.display = 'none'
                divFinal.style.display = 'block'
                //Função para preencher o div Final
                fillDivFinal()
            }
            else if (option == "Formar equipa") {
                //Formulário para criar equipa e depois progressVar++ (Div Final)
                formInit.style.display = 'none'
                divCriarEquipa.style.display = 'block'
                console.log("form e div final")
            }
            else if (option == "Juntar-se a uma Equipa") {
                //Tabela com as equipas e depois Div Final
                formInit.style.display = 'none'
                escolherEquipa.style.display = 'block'
                // console.log("tabela e div final")
            }

        }

        if (progressVar == 3) {
            console.log('kakakkaka')
            escolherEquipa.style.display = 'null'
            divCriarEquipa.style.display = 'null'
            fillDivFinal()
            divFinal.style.display = 'block'
            document.getElementById('criarEquipa').style.display = 'none'
        }

        document.getElementsByClassName('progessNumber')[0].innerHTML = progressVar
        progress()

        //Função para atualizar o formulário
    }
    else {
        Swal('Verifica se não tens nenhum campo por preencher', '', 'error');
    }

    console.log()
}
let equipaSave = null
function fillDivFinal() {
    document.getElementById('buttons').style.display = 'none'
    /* Registo final de um Participante */
    let part = JSON.parse(sessionStorage.getItem('participante-em-registo'))

    let name = "Por definir"
    if (part.id_equipa != null) {
        name = equipas.filter(eq => eq.id == part.id_equipa)[0].nome
        // console.log(name)
    }
    let equipa = null

    if (sessionStorage.getItem('nomeEquipaGuardar')) {
        if (sessionStorage.getItem('nomeEquipaGuardar')) {
            equipa = new Equipa(JSON.parse(sessionStorage.getItem('nomeEquipaGuardar')))
            equipaSave = equipa
            part.id = equipa.id
            name = equipa.nome
            equipas.push(equipa)
            // localStorage.setItem('equipas', JSON.stringify('equipas'))
        }
    }

    let registoFinal = { //O que é que vai ser guardado na base de dados.....
        mail: part.mail,
        nome: part.nome,
        tele: part.telemovel,
        link: part.linkSN,
        areas: part.areasAtuacao,
        come: part.come,
        data: part.dataInscricao,
        id_equipa: part.id,
        nome_equipa: name
    }

    console.log(registoFinal)

    //Encher o Html
    document.getElementById('nomePatFinal').innerHTML = registoFinal.nome
    document.getElementById('mailFinal').innerHTML = registoFinal.mail
    document.getElementById('nTeleFinal').innerHTML = registoFinal.tele
    let ulFinal = document.getElementById('areasFinal')
    ulFinal.innerHTML = ""
    /* Areas atucao */
    console.log(registoFinal.areas)
    for (let area of registoFinal.areas) {
        let li = document.createElement('li')
        li.innerHTML = area
        ulFinal.appendChild(li)
    }
    let pretende = "Pretender usufruir da comida gratuita na Faculdade?\n "
    document.getElementById('nomeEquipaFinal').innerHTML = registoFinal.nome_equipa
    document.getElementById('comerFinal').innerHTML = registoFinal.come ? pretende += "Sim" : pretende += "Não"
}

let outraAreaFilled = null
function outraArea(e) {
    let value = document.getElementById('outra').value
    console.log(value)

    if (e.key == "Enter" && value != "") {
        /* if longo para guardar a variável, remover o input, mostra-lo numa tag e adicionar um event listener a essa tag */
        showOutra(value)
        outraAreaFilled = value
        console.log('outraAreaFilled = ' + outraAreaFilled)
        console.log('ata')
    }
}
/* Função para preencher a tabela */
function fillTabelTeams() {
    let tbody = document.getElementById('tabelaEquipas')
    tbody.innerHTML = []
    for (let i = 0; i < equipas.length; i++) {
        let nElementos = 0
        let tr = document.createElement('tr')

        tr.className = 'teamrow'
        let tdNome = document.createElement('td')
        // let tdJogo = document.createElement('td')
        let tdNelementos = document.createElement('td')

        tdNome.innerHTML = equipas[i].nome
        // tdJogo.innerHTML = equipas[i].nomeJogo

        for (let j = 0; j < participantes.length; j++) {
            if (participantes[j].id_equipa == equipas[i].id) nElementos++
        }

        tdNelementos.innerHTML = nElementos

        tr.appendChild(tdNome)
        // tr.appendChild(tdJogo)
        tr.appendChild(tdNelementos)
        tbody.appendChild(tr)
    }
}
/* Função para ver qual é a equipa escolhida */
function choseTeam(e) {
    let participanteEmRegisto = JSON.parse(sessionStorage.getItem('participante-em-registo'))
    let teamName = e.path[1].childNodes[0].innerHTML //Nome da equipa
    // console.log(teamName)

    let numberElements = e.path[1].childNodes[1].innerHTML
    // console.log(numberElements)

    console.log(participanteEmRegisto)
    if (numberElements < 5) {
        //Encontrar a equipa
        for (let team of equipas) {
            if (teamName == team.nome) {
                participantes.filter(part => {
                    // console.log(part.id)
                    if (part.id == participanteEmRegisto.id) {
                        part.id_equipa = team.id
                        // console.log(team.id)
                        //Guardar em localStorage
                        sessionStorage.setItem('participante-em-registo', JSON.stringify(part))
                    }
                })
            }
        }

        //Fazer aqui a parte de esconder um div e mostrar outro
        readForm()
        fillDivFinal()
        document.getElementById('escolherEquipa').style.display = 'none'
    }
    else {
        Swal('Esta Equipa tá cheia', 'Qualquer duvida contacta-nos', 'error')
    }
}
function submeter() {
    //Enviar os dados para a base de dados
    let participanteGuardar = JSON.parse(sessionStorage.getItem('participante-em-registo'))
    console.log(participanteGuardar)
    console.log('Biba55')

    console.log(equipaSave)

    Swal({
        position: 'top-end',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => location.reload() //Quando a animação acabar dá reload à página
    })
}