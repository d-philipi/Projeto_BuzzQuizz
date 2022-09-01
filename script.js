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

    const promessa = axios.get(url + '1')
    promessa.then(renderQuizz)
    promessa.catch(printaErroQuizz)

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

        console.log(respostas)
        
        pergunta.answers.forEach(resposta => {
            respostas.innerHTML +=
            `<div class="resposta">
                <img src="${resposta.image}">
                <h4>${resposta.text}</h4>
            </div>`
        })
        return
    });
}
/*FUNÇÕES E VARIÁVEIS RELACIONADOS A TELA 3*/