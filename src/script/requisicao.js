function verificarInput() {
    let nameUser = document.getElementById('nameUser').value 
    
    if(nameUser.length > 0) {
      return chamarApi(nameUser)
    } 

    return alert("preencha o campo com o nome do usuário")
}

async function chamarApi(nameUser) {
    let resp = await fetch(`https://api.github.com/users/${nameUser}`)
    if(resp.status == 200) {
        let users = await resp.json()
        consumirApi(users)
    } else {
        return erroUser()
    }
}

async function consumirApi(users) {
    // Importar todos os repositorios de um perfil do GitHub
    let projetosAPI = await fetch(`${users.repos_url}`)

    if(projetosAPI.status != 200) {
        return erroUser()
    } else {
        // Variavel com todos os repositorios do perfil escolhido
        let projetos = await projetosAPI.json()

        //Importar a foto do perfil da pessoa
        let foto = document.getElementsByClassName('card-imagem')[0]
        foto.innerHTML = `<img src="${users.avatar_url}" alt="Foto do perfil" class="imagem-item">`

        //Importar as informações pessoais 
        let infoPerson = document.getElementsByClassName('informacoes-desc') 
            //Importando o nome do perfil da pessoa
            infoPerson[0].innerHTML = `${users.name}`

            //Inportar o login do perfil da pessoa
            infoPerson[1].innerHTML = `${users.login}`

            //Impotar o ID do perfil da pessoa
            infoPerson[2].innerHTML = `${users.id}`

        //Importar o link para redirecionar para o perfil do github da pessoa
        let botaoGH = document.getElementsByClassName('github-botao')[0]
        botaoGH.innerHTML = `<a href="${users.html_url}" target="_blank" class="github-item"> <span>GitHub</span> <i class="bi bi-github icon-github"></i> </a>`

        //Importar os repositorios de cada perfil do github da pessoa
        let cardProjeto = document.getElementsByClassName('card-projetos')[0]
        
        cardProjeto.innerHTML = ``
        for(var i = 0; i < projetos.length; i++) {
            cardProjeto.innerHTML += ` <a href="${projetos[i].html_url}" target="_blank" class="projetos-item">${projetos[i].name}</a>`
        }

        let card = document.getElementsByClassName('card')[0]
        card.classList.add('open')
    }

}
    

function erroUser() {
    let cardErro = document.getElementsByClassName('card-erro')[0]

    cardErro.classList.add('open')
    setTimeout( () => {
        cardErro.classList.remove('open')
    }, 3000)
}