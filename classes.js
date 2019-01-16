/* Os arrays têm que estar aqui para estarem acessiveis em todoo lado */
let participantes = []
let equipas = []

class Participante {
    constructor(mail, nome, tele, linkSN, areasAtuacao, refeicoesGratuitas, id_equipa = null) {
        this.id = this.getId()
        this.mail = mail
        this.nome = nome
        this.telemovel = tele
        this.linkSN = linkSN
        this.areasAtuacao = areasAtuacao
        this.come = refeicoesGratuitas
        this.dataInscricao = new Date().toISOString().split('T')[0]
        this.id_equipa = id_equipa //if null é porque quer que lhe atribuiam uma equipa, se não é porque já tem uma
    }

    getId() {
        return participantes.length == 0 ? 1 : participantes[participantes.length - 1].id + 1
    }
}

class Equipa {
    constructor(nome, nomeJogo = "", desc = "") {
        this.id = this.getId()
        this.nome = nome
        this.nomeJogo = nomeJogo
        this.desc = desc
    }

    getId() {
        return equipas.length == 0 ? 1 : equipas[equipas.length - 1].id + 1
    }
}

/* Preencher os arrays se j estiverem em localStorage, depois isto vai ser feito indo buscar os dados à Base de Dados */
if (localStorage.getItem('participantes')) participantes = JSON.parse(localStorage.getItem('participantes'))
if (localStorage.getItem('equipas')) equipas = JSON.parse(localStorage.getItem('equipas'))
else {
    equipas.push(new Equipa('ai', 'ui', 'lalalalal'))
    equipas.push(new Equipa('ola', 'xau', 'olololololo'))
    equipas.push(new Equipa('xassus', 'tou só a ver', 'elelelelel'))
    console.log(equipas)
}

