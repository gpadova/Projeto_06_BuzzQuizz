function pegarQuizzesAPI(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessa.then(disponibilizarQuizzesNaTela)
    
}

pegarQuizzesAPI()

function disponibilizarQuizzesNaTela(resposta){
    const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
    // document.querySelector('.todos-os-quizes').classList.remove("escondido")
    
    for(let i = 0; i < resposta.data.length; i++){
        lugarQuizesServidor.innerHTML += `
        <div class="imagem-do-quiz">
            <img src="${resposta.data[i].image}" alt="">
            <div class="texto-em-cima-foto">${resposta.data[i].title}</div>
        </div>
        `
    }
}

let escolherTitulo;
let escolherImagem;
let nDePerguntas;
let nDeNiveis;
let arrayPerguntas;
let arrayNiveis;

function comecePeloComeco(){
    escolherTitulo = document.querySelector(".titulo-do-quiz").value;
    escolherImagem = document.querySelector(".url-da-imagem-quizz").value;
    nDePerguntas = document.querySelector(".quantidade-perguntas-quizz").value;
    nDeNiveis = document.querySelector(".quantidade-niveis-quiz").value;
    criarPerguntas()
}

function criarPerguntas(){
    
}

const quizTeste = {
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}