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

function confereDados(){
	tituloQuizz = document.querySelector(".tituloQuizzCreator").value;
	urlQuizz = document.querySelector(".urlQuizzCreator").value;
	nPerguntas = document.querySelector(".qtePerguntasQuizzCreator").value;
	nNiveis = document.querySelector(".qteNiveisQuizzCreator").value;
	if((tituloQuizz !== null) && (urlQuizz !== null) && (nPerguntas !== null) && (nNiveis !== null)){
		console.log("Tudo Preenchido")
		proxPagQuizz();
		//colocar a função de ir para a próxima pagina
	} else{erroPreenchimento()}
}
function erroPreenchimento() {
	alert("Preencha todos os campos de forma correta")
	//verificar se preciso dar reload na pagina
}
function proxPagQuizz(){
    const pagSelecionada = document.querySelector(".selecionada");
	console.log(pagSelecionada)
    const p1 = document.querySelector('.comecoQuizzCreator');
	console.log(p1);
    const p2 = document.querySelector('.perguntasQuizzCreator');
	console.log(p2);
   /* const p3 = document.querySelector('.niveisQuizzCreator');
	const p4 = document.querySelector('.fimQuizzCreator');*/
   // p1.classList.remove("selecionada");
	p1.classList.add("inativo");
	p2.classList.remove("inativo");
    //p2.classList.add("selecionada");
    /*}
    if(botaolecionado === b2){
        telaselecionada.classList.remove('selecionada');
        tela2.classList.add('selecionada');
    }
    if(botaolecionado === b3){
        telaselecionada.classList.remove('selecionada');
        tela3.classList.add('selecionada');
    }*/
}
/* 
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

