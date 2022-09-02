let quizzCriado;
let escolherTitulo;
let escolherImagem;
let nDePerguntas;
let nDeNiveis;
let arrayPerguntas;
let arrayNiveis;
const arrayLocalStorage = []


function verificarQualDisplayInicial(){
    document.querySelector('.tela-quizzes-disponiveis.escondido').classList.remove('escondido')
    if(arrayLocalStorage.length !== 0){
        document.querySelector('.seus-quizes').classList.remove('escondido')
        listaQuizzesLocais()
    }
}
verificarQualDisplayInicial()


function pegarQuizzesAPI(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessa.then(disponibilizarQuizzesNaTela)   
}

pegarQuizzesAPI()

function disponibilizarQuizzesNaTela(resposta){
    const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
    document.querySelector('.todos-os-quizzes').classList.remove("escondido")
    
    for(let i = 0; i < 6; i++){
        lugarQuizesServidor.innerHTML += `
        <div class="imagem-do-quiz">
            <img src="${resposta.data[i].image}" alt="">
            <div class="texto-em-cima-foto">${resposta.data[i].title}</div>
        </div>
        `
    }
}

function vaiParaCriacaoQuiz(){
    document.querySelector('.tela-quizzes-disponiveis').classList.add('escondido');
    document.querySelector('.todos-os-quizzes').classList.add('escondido');
    document.querySelector('.tela-de-informacoes-quizz').classList.remove('escondido');
}

function validoURL(str) {
	var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	if(!regex .test(str)) {
	  return false;
	} else {
	  return true;
	}
  }

function carregarCriarPerguntas(){
	let everythingOK=true;
	escolherTitulo = document.querySelector(".titulo-do-quizz").value;
	if (escolherTitulo.length <20 || escolherTitulo.length >65) everythingOK = false;
    escolherImagem = document.querySelector(".url-da-imagem-quizz").value;
	if (validoURL(escolherImagem) == false) everythingOK = false;
    nDePerguntas = document.querySelector(".quantidade-perguntas-quizz").value;
	if(nDePerguntas < 3) everythingOK = false;
    nDeNiveis = document.querySelector(".quantidade-niveis-quizz").value;
	if (nDeNiveis < 2) everythingOK = false;
	if (everythingOK == true){
		const infoCriarQuizz = document.querySelector(".tela-de-informacoes-quizz");
		infoCriarQuizz.classList.add("escondido");
		const paginaCriarPerguntas = document.querySelector(".criando-perguntas-quizz");
		paginaCriarPerguntas.classList.remove("escondido");
		criarPerguntasHTML()
	}
	else{
		alert("Preencha os dados corretamente, por favor.")
	}
}
function criarPerguntasHTML(){
	const listaPerguntas = document.querySelector(".caixa-das-perguntas")
	for (i = 1; i <= nDePerguntas; i++){
		listaPerguntas.innerHTML = listaPerguntas.innerHTML + 
		`
		<div class="caixaPergunta caixaPergunta${i}">
			<p class="pergunta pergunta${i}">Pergunta ${i}</p>
			<ion-icon name="create-outline"></ion-icon>
			<input type="text" class="texto-da-pergunta${i}" placeholder="Texto da pergunta">
			<input type="text" class="cor-do-fundo-pergunta${i}" placeholder="Cor de fundo da pergunta">
		
			<div class="resposta-correta">
				<p class="resposta-correta">Resposta correta</p>
				<input type="text" class="texto-da-pergunta resposta-correta${i}" placeholder="Resposta correta">
				<input type="text" class="url-da-imagem-correta${i}" placeholder="URL da imagem">
			</div>
			<div class="resposta-incorreta">
				<p class="resposta-incorreta">Resposta correta</p>
				<input type="text" class="resposta-incorreta-1${i}" placeholder="Resposta incorreta 1">
				<input type="text" class="url-imagem-incorreta${i}" placeholder="URL da imagem 1 ">
				<input type="text" class="resposta-incorreta-2${i}" placeholder="Resposta incorreta 2">
				<input type="text" class="url-imagem-incorreta-2${i}" placeholder="URL da imagem 2">
				<input type="text" class="resposta-incorreta-3${i}" placeholder="Resposta incorreta 3">
				<input type="text" class="url-imagem-incorreta-3${i}" placeholder="URL de imagem 3">
			</div>
		</div>
		`
	}
    
}

function lerInputCriarPerguntas(){
	let everythingOK=true;
	for (i = 1; i <= nDePerguntas; i++){
		let arrayRespostas;
		arrayRespostas[0] = {
			text: document.querySelector(`.resposta-correta${i}`).value,
			image: document.querySelector(`.url-da-imagem-correta${i}`).value,
			isCorrectAnswer: true
		}
		for (cont = 1; cont <=3; cont++){
			const res = document.querySelector(`.resposta-incorreta-${cont}${i}`).value;
			const img = document.querySelector(`.url-imagem-incorreta-${cont}${i}`).value;
			if (res != null & img != null){
				const member = {
					text:res,
					image:img,
					isCorrectAnswer: false
				}
				arrayRespostas.push(member);
			}

		}
		arrayPerguntas[i-1] = {
			title: document.querySelector(`.texto-da-pergunta${1}`).value,
			color: document.querySelector(`.cor-do-fundo-pergunta${i}`).value,
			answers: arrayRespostas
		}
	}
	if (everythingOK == true){
		const paginaCriarPerguntas= document.querySelector(".criando-perguntas-quizz");
		paginaCriarPerguntas.classList.add("escondido");
		const paginaCriarNiveis = document.querySelector(".niveis-quizz");
		paginaCriarNiveis.classList.remove("escondido");
		carregarCriarNiveis()
	}
	else{
		alert("Preencha os dados corretamente, por favor.")
	}
}
function carregarCriarNiveis(){
	const listaNiveis = document.querySelector(".caixa-info-niveis");
	for(i = 1; i<=nDeNiveis;i++)
	{
	listaNiveis.innerHTML = listaNiveis.innerHTML +
	`			
	<div class="nivel${i}">
		<p>Nível ${i}</p>
		<ion-icon name="create-outline"></ion-icon>
		<input type="text" class="titulo-nivel${i}" placeholder="Título do nível">
		<input type="number" class="porcentagem-minima${i}" placeholder="% de acerto mínima">
		<input type="url" class="url-imagem-nivel${i}" placeholder="URL da imagem do nível">
		<input type="text" class="descricao-nivel${i}" placeholder="Descrição do nível">
	</div>
	`
	}
}

function lerInputCriarNiveis(){
	let everythingOK=true;
	for(i = 1; i<=nDeNiveis;i++){
		const titleCheck = document.querySelector(`.titulo-nivel${i}`).value;
		const imageCheck =document.querySelector(`.url-imagem-nivel${i}`).value;
		const textCheck = document.querySelector(`.descricao-nivel${i}`).value;
		const minValueCheck = parseInt(document.querySelector(`.porcentagem-minima${i}`).value);
		arrayNiveis[i-1] = {
			title: document.querySelector(`.titulo-nivel${i}`).value,
			image: document.querySelector(`.url-imagem-nivel${i}`).value,
			text: document.querySelector(`.descricao-nivel${i}`).value,
			minValue: parseInt(document.querySelector(`.porcentagem-minima${i}`).value),
		}
		
	}
	if (everythingOK == true){
		const paginaCriarNiveis= document.querySelector(".niveis-quizz");
		paginaCriarNiveis.classList.add("escondido");
		const paginaQuizzPronto = document.querySelector(".quizz-esta-pronto");
		paginaCriarNiveis.classList.remove("escondido");
		carregarCriarQuizzPronto()
	}
	else{
		alert("Preencha os dados corretamente, por favor.")
	}
}

function carregarCriarQuizzPronto(){
	quizzCriado = {
		title: escolherTitulo,
		image: escolherImagem,
		questions: arrayPerguntas,
		levels: arrayNiveis,
	}
	
}

function uploadQuizzNaApi(){
	const promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', 
	quizzCriado = {
		title: escolherTitulo,
		image: escolherImagem,
		questions: arrayPerguntas,
		levels: arrayNiveis,
	})
	promessa.then(alert('Enviado com sucesso!'))
	promessa.catch(alert('Erro no envio'))
}