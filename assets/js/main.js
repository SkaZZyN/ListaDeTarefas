const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

btnTarefa.addEventListener('click', function() { //Evento para o botão adicionar Tarefa 

    if (!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);

});

inputTarefa.addEventListener('keypress', function(e) { //Evento para criar tarefa com o botão ENTER

    if (e.keyCode === 13){

        if (!inputTarefa.value) return;
        criarTarefa(inputTarefa.value);

    }

});

document.addEventListener('click', function(e){ //Evento para apagar tarefa

    const el = e.target;
 
    if(el.classList.contains('apagar')){
 
         el.parentElement.remove();
         salvarTarefa();
 
    }
 
 });

function criaLi(){ //Função para criar uma linha (li) 

    const li = document.createElement('li');
    return li;

}

function criarTarefa(textoInput){ //Função para criar uma tarefa

    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotao(li);
    salvarTarefa();

}

function limpaInput(){ //Função para limpar o input

    inputTarefa.value = "";
    inputTarefa.focus();

}

function criaBotao(li){ //Função para criar o botão Apagar

    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar essa Tarefa');
    li.appendChild(botaoApagar);

}

function salvarTarefa(){ // Função para savar a tarefa

    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //trim serve para tirar espaços
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //Salvar as tarefas em um JSON
    localStorage.setItem('tarefas', tarefasJSON);

}

function adicionaTarefasSalvas(){ // Função para pegar as tarefas salvas do JSON e colocar em um na função criar tarefa

    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    

    for(let tarefa of listaDeTarefas){
        criarTarefa(tarefa);
    }
}

adicionaTarefasSalvas(); // chamando a função
