const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
const paginaDosQuizzes = lugarQuizesServidor.parentNode
let telaQuizz = document.querySelector('.quizz')
let arrayDeDados = []
let quizzEscolhido;


const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(disponibilizarQuizzesNaTela)
let quizzCriado;
let escolherTitulo;
let escolherImagem;
let nDePerguntas;
let nDeNiveis;
let arrayPerguntas = [];
let arrayNiveis = [];
const arrayLocalStorage = []


function verificarQualDisplayInicial(){
    document.querySelector('.tela-quizzes-disponiveis .escondido').classList.remove('escondido')
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


function disponibilizarQuizzesNaTela(resposta){
    const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
    document.querySelector('.todos-os-quizzes').classList.remove("escondido")
    
    for(let i = 0; i < 6; i++){
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

    for (let i = 0; i < arrayDeDados.length; i++) {
        if (arrayDeDados[i].id == escolha.id){
            quizzEscolhido = (arrayDeDados[i]);
        }
    }
    paginaDosQuizzes.classList.add('escondido')
	telaQuizz.classList.remove('escondido')
	fazerQuizz()
}

function fazerQuizz(){
	console.log(quizzEscolhido)
	
    telaQuizz.classList.remove('escondido')
	
	telaQuizz.innerHTML += `
		<div class="nome-do-quizz">
			<img src="${quizzEscolhido.image}" alt="">
			<p>${quizzEscolhido.title}</p>
		</div>
	`
	for (let i = 0; i < quizzEscolhido.questions.length; i++){
		telaQuizz.innerHTML += `
		<div class="questao">
			<div class="titulo-da-questao">
				<p>>${quizzEscolhido.title}</p>
			</div>
			<div class="opcoes">
				<div class="opcao">
					<img src="${quizzEscolhido.questions[i].answers[0].image}">
					<p>${quizzEscolhido.questions[i].answers[0].text}</p>
				</div>
				<div class="opcao">
					<img src="${quizzEscolhido.questions[i].answers[1].image}">
					<p>${quizzEscolhido.questions[i].answers[1].text}</p>
				</div>
				<div class="opcao">
					<img src="${quizzEscolhido.questions[i].answers[2].image}">
					<p>${quizzEscolhido.questions[i].answers[2].text}</p>
				</div>
				<div class="opcao">
					<img src="${quizzEscolhido.questions[i].answers[3].image}">
					<p>${quizzEscolhido.questions[i].answers[3].text}</p>
				</div>
			</div>
		</div>
		`
	}
	
	telaQuizz.innerHTML += '</div>'
	console.log(telaQuizz.innerHTML)
}
function vaiParaCriacaoQuiz(){
    document.querySelector('.tela-quizzes-disponiveis').classList.add('escondido');
    document.querySelector('.todos-os-quizzes').classList.add('escondido');
    document.querySelector('.tela-de-informacoes-quizz').classList.remove('escondido');
	document.querySelector('.criando-quizz').classList.remove('escondido');
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
	console.log( everythingOK)
	escolherTitulo = document.querySelector(".titulo-do-quizz").value;
	if (escolherTitulo.length <20 || escolherTitulo.length >65) everythingOK = false;
	console.log( everythingOK)
    escolherImagem = document.querySelector(".url-da-imagem-quizz").value;
	if (validoURL(escolherImagem) == false) everythingOK = false;
	console.log( everythingOK)
    nDePerguntas = document.querySelector(".quantidade-perguntas-quizz").value;
	if(nDePerguntas < 3) everythingOK = false;
	console.log( everythingOK)
    nDeNiveis = document.querySelector(".quantidade-niveis-quizz").value;
	if (nDeNiveis < 2) everythingOK = false;
	console.log( everythingOK)
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
			<input type="text" class="texto-da-pergunta${i}" placeholder="Texto da pergunta (minimo 20 caracteres)">
			<input type="color" class="cor-do-fundo-pergunta${i}" placeholder="Cor de fundo da pergunta">
		
			<div class="resposta-correta">
				<p class="resposta-correta">Resposta correta</p>
				<input type="text" class="texto-da-pergunta resposta-correta${i}" placeholder="Resposta correta (obrigatoria)">
				<input type="url" class="url-da-imagem-correta${i}" placeholder="URL da imagem correta (obrigatoria)">
			</div>
			<div class="resposta-incorreta">
				<p class="resposta-incorreta">Respostas incorretas</p>
				<input type="text" class="resposta-incorreta-1${i}" placeholder="Resposta incorreta 1 (obrigatoria)">
				<input type="url" class="url-imagem-incorreta-1${i}" placeholder="URL da imagem 1 (obgrigatoria)">
				<input type="text" class="resposta-incorreta-2${i}" placeholder="Resposta incorreta 2">
				<input type="url" class="url-imagem-incorreta-2${i}" placeholder="URL da imagem 2">
				<input type="text" class="resposta-incorreta-3${i}" placeholder="Resposta incorreta 3">
				<input type="url" class="url-imagem-incorreta-3${i}" placeholder="URL de imagem 3">
			</div>
		</div>
		`
	}
    
}

function lerInputCriarPerguntas(){
	let everythingOK=true;
	for (i = 1; i <= nDePerguntas; i++){
		let arrayRespostas=[];
		arrayRespostas[0] = {
			text: document.querySelector(`.resposta-correta${i}`).value,
			image: document.querySelector(`.url-da-imagem-correta${i}`).value,
			isCorrectAnswer: true
		}
		if (arrayRespostas[0].text == null || validoURL(arrayRespostas[0].image) == false)everythingOK = false;
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
				if (arrayRespostas[1].text == null || validoURL(arrayRespostas[1].image) == false)everythingOK = false;
			}

		}
		if (document.querySelector(`.texto-da-pergunta${1}`).value.length<20)everythingOK=false;
		arrayPerguntas[i-1] = {
			title: document.querySelector(`.texto-da-pergunta${1}`).value,
			color: document.querySelector(`.cor-do-fundo-pergunta${i}`).value,
			answers: arrayRespostas
		}
		console.log(arrayPerguntas)
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
		<input type="text" class="titulo-nivel${i}" placeholder="Título do nível (minimo 10 caracteres)">
		<input type="number" class="porcentagem-minima${i}" placeholder="% de acerto mínima">
		<input type="url" class="url-imagem-nivel${i}" placeholder="URL da imagem do nível">
		<input type="text" class="descricao-nivel${i}" placeholder="Descrição do nível (minimo 30 caracteres)">
	</div>
	`
	}
}

function lerInputCriarNiveis(){
	let everythingOK=true;
	let existeZero=false;
	for(i = 1; i<=nDeNiveis;i++){
		const titleCheck = document.querySelector(`.titulo-nivel${i}`).value;
		if(textCheck.length<10)everythingOK=false;
		const imageCheck =document.querySelector(`.url-imagem-nivel${i}`).value;
		if(validoURL(imageCheck) == false)everythingOK=false;
		const textCheck = document.querySelector(`.descricao-nivel${i}`).value;
		if(textCheck.length<30)everythingOK=false;
		const minValueCheck = parseInt(document.querySelector(`.porcentagem-minima${i}`).value);
		arrayNiveis[i-1] = {
			title: document.querySelector(`.titulo-nivel${i}`).value,
			image: document.querySelector(`.url-imagem-nivel${i}`).value,
			text: document.querySelector(`.descricao-nivel${i}`).value,
			minValue: parseInt(document.querySelector(`.porcentagem-minima${i}`).value),
		}
		if(arrayNiveis[i-1].minValue == 0)existeZero=true;
	}
	if (existeZero == false) everythingOK =false;
	if (everythingOK == true){
		const paginaCriarNiveis= document.querySelector(".niveis-quizz");
		paginaCriarNiveis.classList.add("escondido");
		const paginaQuizzPronto = document.querySelector(".quizz-esta-pronto");
		paginaQuizzPronto.classList.remove("escondido");
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