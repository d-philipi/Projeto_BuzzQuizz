/*FUNÇÕES E VARIÁVEIS GLOBAIS*/

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
        getQuizz();
    }
    if(botaolecionado === b3){
        telaselecionada.classList.remove('selecionada');
        tela3.classList.add('selecionada');
    }
}

/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 1*/
/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 2*/

function getQuizz(){

    const promessa = axios.get(url + '2')
    promessa.then(renderQuizz)

}

function renderQuizz(response){
    const banner = document.querySelector('.banner')

    banner.style.backgroundImage= `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${response.data.image})`

    banner.innerHTML = `<h2>${response.data.title}</h2>`

    const perguntas = document.querySelector('.tela-2 .perguntas')

    let i = 0
    response.data.questions.forEach(pergunta => {

        console.log(i)

        perguntas.innerHTML += 
        `<div class=pergunta>
            <div class=titulo style="background-color:${pergunta.color}">
                ${pergunta.title}
            </div>
           <div class="respostas-${i}">
           </div>
        </div>`

        const respostas = document.querySelector(`.tela-2 .respostas-${i}`)

        console.log(pergunta)
        
        pergunta.answers.forEach(resposta => {
            respostas.innerHTML +=
            `<div class="resposta">
                <img src="${resposta.image}">
                <h4>${resposta.text}</h4>
            </div>`
        })

        i++
    });
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

