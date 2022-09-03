/*FUNÇÕES E VARIÁVEIS GLOBAIS*/

let meusQuizzes = [];
let meuNovoQuizz = {};
let quizzesGerais = [];
let quizzSelecionado;
let index;
let tituloQuizz;
let urlQuizz;
let nPerguntas;
let nNiveis;

const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/'

function trocarTela(botaolecionado){
    const telaselecionada = document.querySelector('.selecionada');

    const b1 = document.querySelector('.b1');
    const b2 = document.querySelector('.b2');
    const b3 = document.querySelector('.b3');

    const tela1 = document.querySelector('.tela-1');
    const tela2 = document.querySelector('.tela-2');
    const tela3 = document.querySelector('.tela-3');

    if(botaolecionado === b1){
        telaselecionada.classList.remove('selecionada');
        tela1.classList.add('selecionada');
    }
    if(botaolecionado === b2){
        telaselecionada.classList.remove('selecionada');
        tela2.classList.add('selecionada');
    }
    if(botaolecionado === b3){
        telaselecionada.classList.remove('selecionada');
        tela3.classList.add('selecionada');
    }
}

/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 1*/
function requisicaoQuizzes(){
	const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
	promessa.then(carregarQuizzes);
	promessa.catch(erroCarregarQuizzes);
}

requisicaoQuizzes();

function carregarQuizzes(resposta){

	const listaGeral = document.querySelector('.container');
	let novoQuizz = {};

	if(meusQuizzes.length !== 0){
		const item = `
		<span>Seus Quizzes</span>
        <ion-icon name="add-circle" onclick = "criarQuizz()"></ion-icon>
        <ul class="meusQuizzes"></ul>
        <span>Todos os Quizzes</span>
        <ul class="quizzesGerais"></ul>`;

		listaGeral.innerHTML = listaGeral.innerHTML + item;

		const listaMeusQuizzes = document.querySelector('.meusQuizzes');

		for(let i = 0; i < meusQuizzes.length; i++){
			const item = `
			<li onclick = "getQuizz(this)">
				<q class = "inativo">${meusQuizzes[i].id}</q>
				<figure>
					<img src="${meusQuizzes[i].image}">
					<figcaption>${meusQuizzes[i].title}</figcaption>
				</figure>
			</li>`;

			listaMeusQuizzes.innerHTML = listaMeusQuizzes.innerHTML + item;
		}

		const listaQuizzesGerais = document.querySelector('.quizzesGerais');

		for(let i = 0; i < 6; i++){

			novoQuizz = resposta.data[i]

			quizzesGerais.push(novoQuizz);

			const item = `
			<li onclick = "getQuizz(this)">
				<q class = "inativo">${resposta.data[i].id}</q>
				<figure>
					<img src="${resposta.data[i].image}">
					<figcaption>${resposta.data[i].title}</figcaption>
				</figure>
			</li>`

			listaQuizzesGerais.innerHTML = listaQuizzesGerais.innerHTML + item;
		};

	}else{
		const item = `
		<section>
            <span>Você não criou nenhum <br> quizz ainda :(</span>
            <button onclick = "criarQuizz()">Criar Quizz</button>
        </section>
        <span>Todos os Quizzes</span>
        <ul class="quizzesGerais"> 
        </ul>`;

		listaGeral.innerHTML = listaGeral.innerHTML + item;
		
		const listaQuizzesGerais = document.querySelector('.quizzesGerais');

		for(let i = 0; i < 6; i++){

			novoQuizz = resposta.data[i]

			quizzesGerais.push(novoQuizz);

			const item = `
			<li onclick = "getQuizz(this)">
				<q class = "inativo">${resposta.data[i].id}</q>
				<figure>
					<img src="${resposta.data[i].image}">
					<figcaption>${resposta.data[i].title}</figcaption>
				</figure>
			</li>`

			listaQuizzesGerais.innerHTML = listaQuizzesGerais.innerHTML + item;
		};

	}

}

function erroCarregarQuizzes(erro){
	console.log(erro.response);
}

function criarQuizz(){
	meuNovoQuizz = {};

	const b3 = document.querySelector('.b3');

    trocarTela(b3)
}

function voltarHome(){
	requisicaoQuizzes();

	const b1 = document.querySelector('.b1');

    trocarTela(b1)
}
/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 2*/

function getQuizz(quizz){

    const id = Number(quizz.querySelector('q').innerHTML);
    const promessa = axios.get(url + id)
    promessa.then(renderQuizz)

}

function renderQuizz(response){

    const b2 = document.querySelector('.b2');

    trocarTela(b2)
    const banner = document.querySelector('.banner')

    banner.style.backgroundImage= `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${response.data.image})`

    banner.innerHTML = `<h2>${response.data.title}</h2>`

    const perguntas = document.querySelector('.tela-2 .perguntas')

    let i = 0
    response.data.questions.forEach(pergunta => {
        perguntas.innerHTML += 
        `<div class=pergunta>
            <div class=titulo style="background-color:${pergunta.color}">
                ${pergunta.title}
            </div>
           <div class="respostas-${i}">
           </div>
        </div>`

        const respostas = document.querySelector(`.tela-2 .respostas-${i}`)
        
        pergunta.answers.forEach(resposta => {
            respostas.innerHTML +=
            `<div class="resposta" onclick="selecionaResposta(this, )">
                <img src="${resposta.image}">
                <h4>${resposta.text}</h4>
            </div>`
        })

        i++
    });
}

function selecionaResposta(){
}

/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 3*/
let templatePerguntas;
let templateNiveis;
function confereDados(){
	tituloQuizz = document.querySelector(".tituloQuizzCreator").value;
	console.log(tituloQuizz)
	const ver = tituloQuizz.length;
	/*const ver3 = 20 < ver;
		if (ver3 === false) {
			alert("O título do quizz deve ter no minimo 20 caracteres e no máx 65");
			erroPreenchimento()
		}
			console.log(ver3)*/

	urlQuizz = document.querySelector(".urlQuizzCreator").value;
	nPerguntas = document.querySelector(".qtePerguntasQuizzCreator").value;
	console.log(nPerguntas)
	nNiveis = document.querySelector(".qteNiveisQuizzCreator").value;
		if((urlQuizz !== null) && (nPerguntas !== null) && (nNiveis !== null)){
			console.log("Tudo Preenchido")
			proxPagQuizzI();
			inserePerguntas(nPerguntas);
			insereNiveis(nNiveis);
		} else{erroPreenchimento()}
}

function inserePerguntas(resposta){
	let qteP = resposta;
	const perguntasItem = document.querySelector(".perguntasNovas");
		for (let i = 3; i <= qteP; i++){
			templatePerguntas = 
			`<li class="perguntaCurto" onclick="mostrarCamposP(this)"> 
			<div class="nomePart">Pergunta ${i}</div> <ion-icon class="iconeTask" name="create-outline"></ion-icon>
			</li>`;
			perguntasItem.innerHTML += templatePerguntas;
		}

}
function insereNiveis(resposta){
	let qteN = resposta;
	const niveisItem = document.querySelector(".niveisNovos");
		for (let i = 3; i <= qteN; i++){
			templateNiveis = 
			`<li class="perguntaCurto"onclick="mostraCamposN(this)">
			<div class="nomePart">Nível ${i}</div> <ion-icon class="iconeTask" name="create-outline"></ion-icon>
			</li>`;
			niveisItem.innerHTML += templateNiveis;
		}
}
function mostrarCamposP(perguntaN){
	const nPergunta = perguntaN;	
	nPergunta.classList.add('containerQuizzCreatorPerguntas');
	nPergunta.classList.remove('perguntaCurto');
	const perguntNN = perguntaN.querySelector(".nomePart").innerHTML;
	let templateCamposPerguntas = `<div class="containerQuizzCreatorPerguntas">
	<div class="nomePart">${perguntNN}</div>
	<input class="perguntaQuizzCreator" type="text"  required  required minlength="20" placeholder="Texto da pergunta">
	<input class="corQuizzCreator"  required  placeholder="Cor de fundo da pergunta" type="color" > 
	<div class="nomePart">Resposta correta</div>
	<input class="resCorretaQuizzCreator" type="text"  required  minlength="1" placeholder="Resposta correta">
	<input class="urlImgQuizzCreator" type="url"  required  placeholder="URL da imagem"> 
	<div class="nomePart">Respostas incorretas</div>
	<input class="resInCorretaQuizzCreator" type="text"  required  minlength="1" placeholder="Resposta incorreta 1">
	<input class="urlImgQuizzCreator" type="url"  required  placeholder="URL da imagem 1">
	<input class="resInCorretaQuizzCreator" type="text"  required  minlength="1" placeholder="Resposta incorreta 2">
	<input class="urlImgQuizzCreator" type="url"  required  placeholder="URL da imagem 2">
	<input class="resInCorretaQuizzCreator" type="text"  required  minlength="1" placeholder="Resposta incorreta 3">
	<input class="urlImgQuizzCreator" type="url"  required  placeholder="URL da imagem 3">
</div>`;
	nPergunta.innerHTML = templateCamposPerguntas;
}
function mostraCamposN(resposta){
	const nNivel = resposta;	
	nNivel.classList.add('containerNiveisQuizzCreator');
	nNivel.classList.remove('perguntaCurto');
	const nivelExtendido = nNivel.querySelector(".nomePart").innerHTML;
	let templateNivel = `<div class="containerNiveisQuizzCreator">
	<div class="nomePart">${nivelExtendido}</div>
	<input class="tituloNivelQuizzCreator" type="text"  required  minlength="10" placeholder="Título do nível">
	<input class="qteAcertosQuizzCreator" type="text"  required  min="0" max="100" placeholder="% de acerto mínima"> 
	<input class="urlNivelImgQuizzCreator" type="url"  required  placeholder="URL da imagem">                             
	<input class="descricaoQuizzCreator" type="text"  required  minlength="30" placeholder="Descrição do nível">
	</div>`;
	nNivel.innerHTML = templateNivel;
}

function erroPreenchimento() {
	alert("Preencha todos os campos de forma correta");
	confereDados();
}
function proxPagQuizzI(){
    const p1 = document.querySelector('.comecoQuizzCreator');
    const p2 = document.querySelector('.perguntasQuizzCreator');
	p1.classList.add("inativo");
	p2.classList.remove("inativo");
}
function proxPagQuizzII(){
	const p2 = document.querySelector('.perguntasQuizzCreator');
	const p3 = document.querySelector('.niveisQuizzCreator');
	p2.classList.add("inativo");
	p3.classList.remove("inativo");
}
function proxPagQuizzIII() {	
	const p3 = document.querySelector('.niveisQuizzCreator');
	const p4 = document.querySelector('.fimQuizzCreator');
	p3.classList.add("inativo");
	p4.classList.remove("inativo");   
}

/*    (alimentar em variaveis e dps passar pro obj)
Criar função para repetir os campos de inputs conforme a quantidade de perguntas inseridas, e a quantidade de niveis também
function verificacaoInput {
    if (não estiverem todos preenchidos){
        alert("Por favor, preencha os dados corretamente");
        verificacaoInput();
    }
    adicionarDados();
}
função que confere se o quizz foi preenchido, se for preenchido -> armarzenar dados -> passar de página, talvez criar em 3 funções diferentes
function adicionarDados(){
    const dados = document.querySelector(...)
    const quizzCriado = {
	title: tituloQuizz,
	image: urlQuizz,
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

salvarTodosDados()
}
function salvarTodosDados(){
telasQuizz()
}
function telasQuizz() {
}*/