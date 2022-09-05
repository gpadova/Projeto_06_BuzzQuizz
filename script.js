const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
const paginaDosQuizzes = lugarQuizesServidor.parentNode;
let telaQuizz = document.querySelector('.tela-quizz')
let quizz = document.querySelector('.quizz');
let resultado = document.querySelector('.resultado')
let reiniciar = document.querySelector('.reiniciar-quizz')
let arrayDeDados = [];
let quizzEscolhido;



const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(disponibilizarQuizzesNaTela);
let quizzCriado;
let escolherTitulo;
let escolherImagem;
let nDePerguntas;
let nDeNiveis;
let nota = 0;
let jogadas = 0;
let porcentagem = 0;
let arrayPerguntas = [];
let arrayNiveis = [];
const arrayLocalStorage = [];
let listaDeAcertos = [];

const quizzesLocaisDisponiveis = JSON.parse(localStorage.getItem('quizzLocal'))
let quizzLocal = localStorage.getItem('quizzLocal') !== null ? quizzesLocaisDisponiveis : []

function verificarQualDisplayInicial(){

    if(quizzesLocaisDisponiveis === undefined){
        document.querySelector('.seus-quizzes').classList.remove('escondido');
        // listaQuizzesLocais();
    }else{
		document.querySelector('.sem-quizz-criado').classList.remove('escondido');
	}
}
verificarQualDisplayInicial();


function pegarQuizzesAPI(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessa.then(disponibilizarQuizzesNaTela);
}


function disponibilizarQuizzesNaTela(resposta){
    const lugarQuizesServidor = document.querySelector(".fotos-todos-quizzes");
    document.querySelector('.todos-os-quizzes').classList.remove("escondido");
    
    for(let i = 0; i < 6; i++){
        lugarQuizesServidor.innerHTML += `
        <div id="${resposta.data[i].id}" class="imagem-do-quiz botao" onclick="escolherQuizz(this);">
            <img src="${resposta.data[i].image}" alt="">
            <div class="texto-em-cima-foto">${resposta.data[i].title}</div>
        </div>
        `;
        arrayDeDados.push(resposta.data[i]);
    }   
}

function escolherQuizz(escolha){

    for (let i = 0; i < arrayDeDados.length; i++) {
        if (arrayDeDados[i].id == escolha.id){
            quizzEscolhido = (arrayDeDados[i]);
        }
    }
    paginaDosQuizzes.classList.add('escondido');
	telaQuizz.classList.remove('escondido');
	document.querySelector('.tela-quizzes-disponiveis').classList.add('escondido')
	mostrarQuizz();
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
		criarPerguntasHTML();
	}
	else{
		alert("Preencha os dados corretamente, por favor.");
	}
	
}
function criarPerguntasHTML(){
	const listaPerguntas = document.querySelector(".caixa-das-perguntas");
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
		`;
	}
	scrollUp();
    
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
	}
	if (everythingOK == true){
		const paginaCriarPerguntas= document.querySelector(".criando-perguntas-quizz");
		paginaCriarPerguntas.classList.add("escondido");
		const paginaCriarNiveis = document.querySelector(".niveis-quizz");
		paginaCriarNiveis.classList.remove("escondido");
		carregarCriarNiveis()
	}
	else{
		alert("Preencha os dados corretamente, por favor.");
	}
}
function carregarCriarNiveis(){
	const listaNiveis = document.querySelector(".caixa-info-niveis");
	for(i = 1; i<=nDeNiveis;i++)
	{
	listaNiveis.innerHTML +=
	`
	<div class="nivel${i}">
		<p>Nível ${i}</p>
		<ion-icon name="create-outline"></ion-icon>
		<input type="text" class="titulo-nivel${i}" placeholder="Título do nível (minimo 10 caracteres)">
		<input type="number" class="porcentagem-minima${i}" placeholder="% de acerto mínima">
		<input type="url" class="url-imagem-nivel${i}" placeholder="URL da imagem do nível">
		<input type="text" class="descricao-nivel${i}" placeholder="Descrição do nível (minimo 30 caracteres)">
	</div>
	`;
	}
}

function lerInputCriarNiveis(){
	let everythingOK=true;
	let existeZero=false;
	for(i = 1; i<=nDeNiveis;i++){
		let tituloDescricao = document.querySelector(`.titulo-nivel${i}`).value;
		let urlDescricao = document.querySelector(`.url-imagem-nivel${i}`).value;
		let minValueCheck = parseInt(document.querySelector(`.porcentagem-minima${i}`).value);
		let descricaoNivel = document.querySelector(`.descricao-nivel${i}`).value;
		// if(descricaoNivel.length<10){everythingOK=false};
		// if(validoURL(urlDescricao) === false){everythingOK=false};
		// if(descricaoNivel.length>30)everythingOK=false;
		arrayNiveis[i-1] = {
			title: tituloDescricao,
			image: urlDescricao,
			descricao: descricaoNivel,
			minValue: minValueCheck
		}
		// if(arrayNiveis[i-1].minValue == 0){existeZero=true};
	}
	if (everythingOK == true){
		const paginaCriarNiveis= document.querySelector(".niveis-quizz");
		paginaCriarNiveis.classList.add("escondido");
		const paginaQuizzPronto = document.querySelector(".quizz-esta-pronto");
		paginaQuizzPronto.classList.remove("escondido");
		const infoDoQuizRecemCriado = document.querySelector('.imagem-e-titulo')
		infoDoQuizRecemCriado.innerHTML += `
		<p>${escolherTitulo}</p>
		<img src="${escolherImagem}" alt="">
		`

	quizzCriado = {
		title: escolherTitulo,
		image: escolherImagem,
		questions: arrayPerguntas,
		levels: arrayNiveis
	}
	console.log(quizzCriado)
	}
	else{
		alert("Preencha os dados corretamente, por favor.")
	}
	uploadQuizzNaApi()
}


function uploadQuizzNaApi(){
	const promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizzCriado);
	promessa.then(insereQuizzNoLocalStorage);
	promessa.catch(alert('Erro no envio'));
}

function insereQuizzNoLocalStorage(quizz){
	alert('Enviado com sucesso!')
	localStorage.setItem('quizzLocal', JSON.stringify(quizz))
	console.log(quizz)
	console.log(quizzCriado)
}



function mostrarQuizz(){
	console.log(quizzEscolhido)
	document.querySelector('.sem-quizz-criado').classList.add('escondido')
	scrollUp();

    quizz.classList.remove('escondido');
	reiniciar.classList.remove('escondido')
	function comparador() { 
		return Math.random() - 0.5; 
	}

	quizz.innerHTML += `
		<div class="nome-do-quizz">
			<img src="${quizzEscolhido.image}" alt="">
			<p>${quizzEscolhido.title}</p>
		</div>
	`;
	for (let i = 0; i < quizzEscolhido.questions.length; i++){
		quizzEscolhido.questions[i].answers.sort(comparador);

		quizz.innerHTML += `
		<div class="questao">
			<div class="titulo-da-questao cor-do-titulo${i}">
				<p>>${quizzEscolhido.questions[i].title}</p>
			</div>
			<div class="opcoes">
				<div id="${quizzEscolhido.questions[i].answers[0].isCorrectAnswer}" class="opcao botao" onclick="EscolhaResposta(this);">
					<img src="${quizzEscolhido.questions[i].answers[0].image}">
					<p>${quizzEscolhido.questions[i].answers[0].text}</p>	
				</div>
				<div id="${quizzEscolhido.questions[i].answers[1].isCorrectAnswer}" class="opcao botao" onclick="EscolhaResposta(this);">
					<img src="${quizzEscolhido.questions[i].answers[1].image}">
					<p>${quizzEscolhido.questions[i].answers[1].text}</p>
				</div>
				<div id="${quizzEscolhido.questions[i].answers[2].isCorrectAnswer}" class="opcao botao" onclick="EscolhaResposta(this);">
					<img src="${quizzEscolhido.questions[i].answers[2].image}">
					<p>${quizzEscolhido.questions[i].answers[2].text}</p>
				</div>
				<div id="${quizzEscolhido.questions[i].answers[3].isCorrectAnswer}" class="opcao botao" onclick="EscolhaResposta(this);">
					<img src="${quizzEscolhido.questions[i].answers[3].image}">
					<p>${quizzEscolhido.questions[i].answers[3].text}</p>
				</div>
			</div>
		</div>
		`;

		quizz.querySelector(`.cor-do-titulo${i}`).style.backgroundColor=`${quizzEscolhido.questions[i].color}`;
	}
}


function EscolhaResposta(escolhido){
	jogadas += 1;
	escolhido.classList.add('escolhido');
	let alternativas = escolhido.parentNode.querySelectorAll('.opcao');
	escolhido= escolhido.innerHTML;
	alternativas.forEach(element => {
		if(element.id == 'true'){
			element.classList.add('certo');
		}else{
			element.classList.add('errado');
		}
		if (!element.classList.contains('escolhido')){
			element.classList.add('esbranquicar');
		}
		if (element.classList.contains('certo') && (element.classList.contains('escolhido'))){
			listaDeAcertos.push(element.id);
		}
	});

	
	console.log(quizzEscolhido.questions.length)
	console.log(jogadas)
	setTimeout(scrollDown, 2000);
	if(jogadas == (quizzEscolhido.questions.length)){
		
		porcentagem  = listaDeAcertos.length / quizzEscolhido.questions.length;
		porcentagem = porcentagem * 100
		console.log(porcentagem)
		nota = Math.ceil(porcentagem)
		nivel()

	}
	
}

function nivel(){
	notaFinal = 0;
	resultado.classList.remove('escondido');
	for (let i = 0; i < quizzEscolhido.levels.length; i++){
		let valorMinimo = Number(quizzEscolhido.levels[i].minValue);
		notaFinal = valorMinimo
		if ((nota == 0) || (nota > notaFinal)){
			notaFinal = nota;
			console.log([i])
			console.log(nota)
			console.log(notaFinal);
			resultado.innerHTML = `
			<div class="titulo-resultado">
				<p>${notaFinal} de acerto: ${quizzEscolhido.levels[i].title}</p>
			</div>
			<div class="conteudo-resultado">
				<img src="${quizzEscolhido.levels[i].image}" alt="resultado">
				<p>${quizzEscolhido.levels[i].text}</p>
			</div>
			`
			console.log(resultado.innerHTML)
		}
	}
	
}

function scrollDown(){
	window.scrollBy(0, 800);
}

function scrollUp(){
	window.scrollBy(0,-1000);
}

function reiniciarQuizz(botaoDeReiniciar){
	console.log(botaoDeReiniciar)
	resultado.classList.add('escondido')
	quizz.innerHTML = ''
	resultado.innerHTML = ''
	nota = 0;
	jogadas = 0;
	notaFinal = 0;
	mostrarQuizz()
}