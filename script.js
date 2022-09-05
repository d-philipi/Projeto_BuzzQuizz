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

const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/';

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
		<div class="boxone">
			<span>Seus Quizzes</span>
        	<ion-icon name="add-circle" onclick = "criarQuizz()"></ion-icon>
		</div>
        <ul class="meusQuizzes"></ul>
        <span>Todos os Quizzes</span>
        <ul class="quizzesGerais"></ul>`;

		listaGeral.innerHTML = listaGeral.innerHTML + item;

		const listaMeusQuizzes = document.querySelector('.meusQuizzes');

		for(let i = 0; i < meusQuizzes.length; i++){
			const quizzSerializada = localStorage.getItem(meusQuizzes[i]);

			const quizz = JSON.parse(quizzSerializada);

			const item = `
			<li onclick = "getQuizz(this)">
				<q class = "inativo">${meusQuizzes[i]}</q>
				<figure>
					<img src="${quizz[i].image}">
					<figcaption>${quizz[i].title}</figcaption>
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
let templateObjPerguntas;
let templateObjNiveis;
/*Variavel para montar as perguntas e colocar no objeto*/let templatePergResposta;
/*Variavel para montar o objeto*/ let objeto;
//Função para verificar as resposta do começo do quizz

function confereDados(){
	tituloQuizz = document.getElementById("tituloQuizzCreator").value;
	urlQuizz = document.getElementById("urlQuizzCreator").value;
	nPerguntas = Number(document.getElementById("qtePerguntasQuizzCreator").value);
	nNiveis = Number(document.getElementById("qteNiveisQuizzCreator").value);
	inserePerguntas(nPerguntas);
	insereNiveis(nNiveis);
	proxPagQuizzI();
}

//Função para inserir o box da pergunta reduzida
function inserePerguntas(resposta){
	let qteP = resposta;
	const perguntasItem = document.querySelector(".perguntasNovas");
		for (let i = 3; i <= qteP; i++){
			templatePerguntas = 
			`<li class="perguntaCurto">
				<div class="titulocontainer">
					<p class="nomePart">Pergunta ${i}</p>
					<ion-icon classe="iconeTask" onclick="mostrarCampos(this)" name="create-outline"></ion-icon>
				</div>
				<div class="perguntas${i} inativo caixinhaperguntas"> 
					<input class="p${i}" type="text"  required  required minlength="20" placeholder="Texto da pergunta">
					<input class="p${i}" required pattern="#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?"
					oninvalid="alert('O formato da cor inserida deve iniciar com #, os três primeiros valores devem variar entre as letra a-f e os números 0-9, os três últimos valores devem varias entre as letras a-f e os valores 0-9')" placeholder="Cor de fundo da pergunta" type="text" > 
					<div class="nomePart">Resposta correta</div>
					<input class="p${i}" required type="text" minlength="1" placeholder="Resposta correta">
					<input class="p${i}" required type="url" placeholder="URL da imagem"> 
					<div class="nomePart">Respostas incorretas</div>
					<input class="p${i}" required type="text" minlength="1" placeholder="Resposta incorreta 1">
					<input class="p${i}" required type="url" placeholder="URL da imagem 1">
					<input class="p${i}" type="text" minlength="1" placeholder="Resposta incorreta 2">
					<input class="p${i}" type="url" placeholder="URL da imagem 2">
					<input class="p${i}" type="text" minlength="1" placeholder="Resposta incorreta 3">
					<input class="p${i}" type="url" placeholder="URL da imagem 3">
				</div>
			</li>`;
			perguntasItem.innerHTML += templatePerguntas;
		}
}

/*Variavel das respostas dos inputs*/ let perguntsRespObj=[];

//Função para verificar as perguntas das respostas
function conferePerguntas(){
	templatePergResposta = `{
		title: perguntsperguntsRespObj[],
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
	}`

	for(let i = 0; i < (nPerguntas + 1); i++ ){
		//For para rodar de acordo com o container de uma pergunta
		let textInputs = document.querySelectorAll(`.p${i}`);
		console.log(textInputs);
		let numerodeRespostas = textInputs.length;
		console.log(numerodeRespostas);
		for(let index = i+2; index < numerodeRespostas; index++){
			let valoresInputs = textInputs[index].value;
			if(valoresInputs !== ""){
			console.log(valoresInputs);
			perguntsRespObj.push(valoresInputs);/*Esse array tem todos os valores que o input coletou*/}
			if(valoresInputs === ""){
				break
			}
			/*templatePergResposta = `{
				title: perguntsperguntsRespObj[${i}],
				color: perguntsperguntsRespObj[${i+1}],
				answers: [
					{
						text: perguntsperguntsRespObj[${index}],
						image: perguntsperguntsRespObj[${index+1}],
						isCorrectAnswer: true
					},
					{
						text: perguntsperguntsRespObj[${i}],
						image: perguntsperguntsRespObj[${i+6}],
						isCorrectAnswer: false
					}
				]
			}`*/	
		}					
	}

	console.log(perguntsRespObj)
	proxPagQuizzII();	

}

let inputsNiveis; //let para guardar os valores dos inputs
//Função para verificar as respostas dos niveis

function confereNiveis(){

	for(let i = 0; i < (nNiveis + 1); i++ ){
		let nivelInputs = document.querySelectorAll(`.n${i}`);
		console.log(nivelInputs);
		let numerodeNiveis = nivelInputs.length;
		console.log(numerodeNiveis);
		for(let index = i+2; index < numerodeNiveis; index++){
			let valoresInputsN = textInputs[index].value;
			if(valoresInputsN !== ""){
			console.log(valoresInputsN);
			inputsNiveis.push(valoresInputsN);
		}/*Esse array tem todos os valores que o input coletou*/
			if(valoresInputsN === ""){
				break
			}
		}
	}

	for (let i =0; i<(nNiveis+1); i++){
		let templateNivelobj = `{
			title: inputsNiveis[i],
			image: inputsNiveis[i+1]
			text: inputsNiveis[i+2],
			minValue: inputsNiveis[i+3]
			}`
	}

	proxPagQuizzIII();
}


/*const quizzCriado = {
	title: tituloQuizz,
	image: urlQuizz,
	questions: [
		{
			title: p1,
			color: color1,
			answers: [
				{
					text: resCp1,
					image: urlRCp1,
					isCorrectAnswer: true
				},
				{
					text: respE11,
					image: urlrespE11,
					isCorrectAnswer: false
				}
			]
		},
		{
			title: p2,
			color: color2,
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
*/

function insereNiveis(resposta){
	let qteN = resposta;
	const niveisItem = document.querySelector(".niveisNovos");
		for (let i = 3; i <= qteN; i++){
			templateNiveis = 
			`<li class="perguntaCurto">
			<div class="titulocontainer"><p class="nomePart>Nível ${i}</p> <ion-icon class="iconeTask" onclick="mostrarCampos(this)" name="create-outline"></ion-icon></div>
			<div class="niveis ${i} inativo"> <input class="tituloNivelQuizzCreator" id="titN${i}" required type="text" minlength="10" placeholder="Título do nível">
			<input class="n${i}" required type="text" min="0" max="100" placeholder="% de acerto mínima"> 
			<input class="n${i}" required type="url" placeholder="URL da imagem">                             
			<input class="n${i}" required type="text" minlength="30" placeholder="Descrição do nível">
			</div></li>`;
			niveisItem.innerHTML += templateNiveis;
		}}
function mostrarCampos(perguntaN){
	const camposP = perguntaN;
	const divP = camposP.parentNode;
	const divPP = divP.parentNode;
	const divF = divPP.childNodes;
	const divPerguntas = divF[3];
	divPerguntas.classList.toggle("inativo")}
let perguntasObj = [];
function proxPagQuizzI(){
    const p1 = document.querySelector('.comecoQuizzCreator');
    const p2 = document.querySelector('.perguntasQuizzCreator');
	p1.classList.add("inativo");
	p2.classList.remove("inativo");}
function proxPagQuizzII(){
	const p2 = document.querySelector('.perguntasQuizzCreator');
	const p3 = document.querySelector('.niveisQuizzCreator');
	p2.classList.add("inativo");
	p3.classList.remove("inativo");}
function proxPagQuizzIII(){	
	const p3 = document.querySelector('.niveisQuizzCreator');
	const p4 = document.querySelector('.fimQuizzCreator');
	p3.classList.add("inativo");
	p4.classList.remove("inativo");
}