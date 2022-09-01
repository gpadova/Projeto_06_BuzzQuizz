function pegarQuizzesAPI(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessa.then(disponibilizarNaTela)
    
}

pegarQuizzesAPI()

function disponibilizarNaTela(resposta){
    const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
    document.querySelector('.todos-os-quizes').classList.remove("escondido")
    
    for(let i = 0; i < resposta.data.length; i++){
        lugarQuizesServidor.innerHTML += `
        <div class="imagem-do-quiz">
            <img src="${resposta.data[i].image}" alt="">
            <div class="texto-em-cima-foto">${resposta.data[i].title}</div>
        </div>
        `
    }
}