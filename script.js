/*FUNÇÕES E VARIÁVEIS GLOBAIS*/

let meusQuizzes = [];
let quizzesGerais = [];
let quizzSelecionado;
let index;
const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/'

let acertos = 0;
let niveis;

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
	const promessa = axios.get(url);
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
		<li onclick = "getQuizz(this)">
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

/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 2*/

function getQuizz(quizz){

    const id = Number(quizz.querySelector('q').innerHTML);
    const promessa = axios.get(url + id)
    promessa.then(verQuizz)

}

function verQuizz(response){
    const b2 = document.querySelector('.b2')
    trocarTela(b2)

    renderQuizz(response)
}

function renderQuizz(response){

    quizzSelecionado = response;

    acertos = 0
    
    const banner = document.querySelector('.banner')

    banner.style.backgroundImage= `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${response.data.image})`

    banner.innerHTML = `<h2>${response.data.title}</h2><q class="inativo">${response.data.id}</q>`

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

        let respostas_servidor = pergunta.answers.slice()

        respostas_servidor.sort(comparador)
        
        respostas_servidor.forEach(resposta => {
            respostas.innerHTML +=
            `<div class="resposta enabled" onclick="selecionaResposta(this)">
                <img src="${resposta.image}">
                <h4>${resposta.text}</h4>
                <q class="inativo">${resposta.isCorrectAnswer}</q>
            </div>`
        })

        i++
    });

    niveis = response.data.levels
}

function comparador() { 
	return Math.random() - 0.5; 
}

function selecionaResposta(respostaSelecionada){

    if(!respostaSelecionada.classList.contains('enabled')) return 

    const respostasDaQuestao = respostaSelecionada.parentNode;
    const opcoes = respostasDaQuestao.children

    for(let i = 0; i < opcoes.length; i++){
        let isCorrectAnswer = opcoes[i].querySelector('q').innerHTML;
        let texto = opcoes[i].querySelector(':nth-child(2)')

        if(isCorrectAnswer === 'true'){
            texto.style.color = '#009C22'
            if(respostaSelecionada === opcoes[i]) acertos++;
        }else{
            texto.style.color = '#FF4B4B'
        }

        if(respostaSelecionada !== opcoes[i]){
            opcoes[i].classList.add('resposta-nao-selecionada')
        }
        opcoes[i].classList.remove('enabled')
    }

    const proximaPergunta = respostasDaQuestao.parentNode.nextSibling

    if(proximaPergunta) setTimeout(scrollProximaPergunta, 2000, proximaPergunta)
    else setTimeout(mostraResultado, 2000)

}

function scrollProximaPergunta(proximaPergunta){
    proximaPergunta.scrollIntoView()
}

function mostraResultado(){

    const resultado = document.querySelector('.resultado')

    const quantidadeDePerguntas = document.querySelectorAll('.pergunta').length

    let pontuacao = parseInt((acertos/quantidadeDePerguntas)*100)
    let nivelDaPontuacao = 0

    niveis.forEach(nivel => {
        if((nivel.minValue <= pontuacao) && (nivel.minValue >= nivelDaPontuacao)) nivelDaPontuacao = nivel
    });

    resultado.innerHTML = `
    <div class="pontuacao">
        <h3>${pontuacao}% de acerto: ${nivelDaPontuacao.title}</h3>
    </div>
    <div class="descricao">
        <img src="${nivelDaPontuacao.image}">
       ${nivelDaPontuacao.text}
    </div>`

    resultado.parentNode.classList.remove('hide')
    resultado.scrollIntoView()
}

function reiniciarQuizz(){
/*     const respostas = document.querySelectorAll('.resposta')

    let i = 0
    respostas.forEach( resposta => {

        if(resposta.classList.contains('resposta-nao-selecionada')) resposta.classList.remove('resposta-nao-selecionada')

        resposta.classList.add('enabled')
        let text = resposta.querySelector(':nth-child(2)')
        text.style.color = '#000000'

        const respostasDaQuestao = document.querySelectorAll(`.tela-2 .respostas-${i} .resposta`)

        if(respostasDaQuestao){
            const embaralhaRespostas = Array.from(respostasDaQuestao)
            embaralhaRespostas.sort(comparador)
        }
        
    }) */

    const header = document.querySelector('.tela-2 header')
    header.scrollIntoView()

    const final = document.querySelector('.final')
    final.classList.add('hide')

    renderQuizz(quizzSelecionado) 
    
}



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

