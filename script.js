const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
const paginaDosQuizzes = lugarQuizesServidor.parentNode
let telaQuizz = document.querySelector('.tela-quiz')
let arrayDeDados = []


const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(disponibilizarQuizzesNaTela)


function disponibilizarQuizzesNaTela(resposta){

    // document.querySelector('.todos-os-quizes').classList.remove("escondido")
    
    for(let i = 0; i < resposta.data.length; i++){
        lugarQuizesServidor.innerHTML += `
        <div id="${resposta.data[i].id}" class="imagem-do-quiz" onclick="escolherQuizz(this);">
            <img src="${resposta.data[i].image}" alt="">
            <div class="texto-em-cima-foto">${resposta.data[i].title}</div>
        </div>
        `
        arrayDeDados.push(resposta.data[i])
    }
    console.log(resposta)
}

function escolherQuizz(escolha){
    let objeto;
    for (let i = 0; i < arrayDeDados.length; i++) {
        if (arrayDeDados[i].id == escolha.id){
            objeto = (arrayDeDados[i]);
        }
    }
    paginaDosQuizzes.classList.add('escondido')
}

function fazerQuizz(){
    telaQuizz.classList.remove('escondido')
    for (let i = 0; i < objeto.length; i++){
        quizz.innerHTML += `
        <div class="questao">
            <div class="titulo-da-questao titulo">
                <p>${objeto.questions[i].title}</p>
            </div>
            <div class="opcoes">
                <div class="opcao">
                    <img src="${objeto.questions[i].img}">
                    <p>Gatíneo</p>
                </div>
            </div>
        </div>
       `
    }
    
}

// 
