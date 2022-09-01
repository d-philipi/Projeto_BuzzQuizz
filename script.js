/*FUNÇÕES E VARIÁVEIS GLOBAIS*/

let meusQuizzes = [];
let quizzesGerais = [];
let quizzSelecionado = {};
let index;


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

	const listaQuizzes = document.querySelector('ul');
	let novoQuizz = {};

	for(let i = 0; i < 6; i++){

		novoQuizz = resposta.data[i]

		quizzesGerais.push(novoQuizz);

		const item = `
		<li onclick = "selecionarQuizz(this)">
			<q class = "inativo">${resposta.data[i].id}</q>
            <figure>
                <img src="${resposta.data[i].image}">
                <figcaption>${resposta.data[i].title}</figcaption>
            </figure>
        </li>`

		listaQuizzes.innerHTML = listaQuizzes.innerHTML + item;
	};
}

function erroCarregarQuizzes(erro){
	console.log(erro.response);
}

function selecionarQuizz(quizz){
	const ident = Number(quizz.querySelector('q').innerHTML);

	for(let i = 0; i < quizzesGerais.length; i++){
		index = quizzesGerais[i].id;

		if(ident === index){
			console.log('Passou aqui');
			quizzSelecionado = quizzesGerais[i];
		}
	}

	console.log(ident);
	console.log(index);
	console.log(quizzSelecionado);
	console.log(quizzesGerais);

	//Agora só mandar o "quizzSelecionado" para a função que vai exibir ele
}
/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 2*/
/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 3*/
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

salvarTodosDados()
}
function salvarTodosDados(){
telasQuizz()
}
function telasQuizz() {
}*/