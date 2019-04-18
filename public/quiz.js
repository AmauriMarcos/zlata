document.addEventListener("DOMContentLoaded", criaQuestao, false);

const quizArray = [];
var pos = 0;
var correto = 0; 
console.log(correto);
var pergunta; 
var op1; 
var op2; 
var op3; 
var resp;

const Quiz = function(question, opcao1, opcao2, opcao3, resposta){
     this.question = question;
     this.opcao1   = opcao1;
     this.opcao2   = opcao2;
     this.opcao3   = opcao3;
     this.resposta = resposta;
}

const primeira = new Quiz('When can we meet again?', "When are you free?", "It was two days ago.", "Can you help me?", 'A');
const segunda  = new Quiz('My aunt is going to stay with me.', "How do you do?", "How long for?", "How was it?", 'B');
const terceira = new Quiz('When do you study?', "at school", "in the evenings", "in the library", 'B');
const quarta   = new Quiz('Would you prefer lemonade or orange juice?', "Have you got anything else?", "If you like.", "Are you sure about that?", 'A');
const quinta   = new Quiz("Let's have dinner now.", "You aren't eating.", "There aren't any.", "Tom isn't here yet", 'C');
const sexta    = new Quiz("The snow was ...... heavily when I left the house.", "dropping", "landing", "falling", 'C');
const setima   = new Quiz("I can't find my keys anywhere - I ...... have left them at work.", "can", "must", "would", 'B');
const oitava   = new Quiz("When a car pulled out in front of her, Jane did well not to ...... control of her bicycle.", "miss", "lose", "drop", 'B');
const nona     = new Quiz("According to Richard's ...... the train leaves at 7 o'clock.", "information", "knowledge", "opinion", 'A');
const decima   = new Quiz("When you stay in a country for some time you get used to the people's ...... of life.", "habit", "way", "system", 'B');
const decima1  = new Quiz("The builders are ...... good progress with the new house.", "getting", "doing", "making", 'C');
const decima2  = new Quiz("She is now taking a more positive ...... to her studies and should do well.", "attitude", "behaviour", "style", 'A');
const decima3  = new Quiz("My father ...... his new car for two weeks now.", "has had", "has", "is having", 'A');
const decima4  = new Quiz("What differences are there ...... the English spoken in the UK and the English spoken in the US?", "among", "between", "with", 'B');
const decima5  = new Quiz("At 6 p.m. I started to get angry with him because he was late ......", "as usual.", "typically.", "usually.", 'A');
const decima6  = new Quiz("...... you get your father's permission, I'll take you skiing next weekend.", "Provided", "As", "Unless", 'B');
const decima7  = new Quiz("A local company has agreed to ...... the school team with football shirts.", "supply", "give", "produce", 'A');
const decima8  = new Quiz("I really enjoy stories that are ...... in the distant future.", "placed", "put", "set", 'A');
const decima9  = new Quiz("That old saucepan will come in ...... when we go camping.", "fitting", "convenient", "suitable", 'B');
const vigesima = new Quiz("Anyone ...... after the start of the play is not allowed in until the interval.", "arrives", "arriving", "arrived", 'B');

quizArray.push(primeira, segunda, terceira, quarta, quinta, sexta, setima, oitava,
    nona, decima, decima1, decima2, decima3, decima4, decima5, decima6, decima7,
    decima8, decima9, vigesima);


function seleciona(x){
    return document.getElementById(x);
};

function criaQuestao() {
    var myDiv = seleciona('teste');
    var h6 = seleciona('progresso');

    if(pos >= quizArray.length){
        myDiv.innerHTML = "<h1 id='finalizado'>Finalizado <i id='meuIcone' class='fas fa-check'></i></h1>"
      
        myDiv.innerHTML += "<h2 id='subMsg'>Você acertou " + correto + ' de ' + quizArray.length + " questões</h2>"
        var nivel = document.createElement("h3");
        nivel.classList.add('finalQuiz');
        if(correto <= 11){
            var txt = document.createTextNode("Seu nível é iniciante.");
            nivel.classList.add('advertencia');
            nivel.appendChild(txt);
            myDiv.appendChild(nivel);
        } else if(correto > 12 && correto <= 17){
            var txt = document.createTextNode("Seu nível é intermediário");
            nivel.classList.add('advertencia');
            nivel.appendChild(txt);
            myDiv.appendChild(nivel);
        } else if(correto > 17){
            var txt = document.createTextNode("Seu nível é avançado.");
            nivel.classList.add('advertencia');
            nivel.appendChild(txt);
            myDiv.appendChild(nivel);
        }
        myDiv.innerHTML +=  "<button onClick='document.location.reload(true)' class='btn btn-danger btn-sm'>Refazer</button>";
        
       
        pos = 0;
        correto = 0;
        return false;
    }

    h6.innerHTML = 'Questão ' + (pos + 1) + ' de ' + quizArray.length;
   
    pergunta = quizArray[pos].question;
    op1      = quizArray[pos].opcao1;
    op2      = quizArray[pos].opcao2;   
    op3      = quizArray[pos].opcao3; 
    resposta = quizArray[pos].resposta;
        
    myDiv.innerHTML = "<h2 id='perguntaQuiz'>" + pergunta + "</h2><br>";
    myDiv.innerHTML += "<input class='alternativas' type='radio' name='opcoes' value='A'> " + op1 + "<br>";
    myDiv.innerHTML += "<input class='alternativas' type='radio' name='opcoes' value='B'> " + op2 + '<br>';
    myDiv.innerHTML += "<input class='alternativas' type='radio' name='opcoes' value='C'> " + op3 + '<br><br>';
    myDiv.innerHTML +=  "<button onclick='verificaResposta()' class='btn btn-danger btn-sm'>Submit Answer</button>";

};

var opcoes = document.getElementsByName('opcoes');
for(var i = 0; i < opcoes.length; i++){
   opcoes[i].addEventListener('click', ()=>{
      document.querySelector("#teste button").disabled = false;

   });
}


function verificaResposta(){
    var opcoes = document.getElementsByName('opcoes');
    var botao_clicado = false;
    var opcao;
    for(var i = 0; i < opcoes.length; i++){
        if(opcoes[i].checked){
            opcao = opcoes[i].value;
            botao_clicado = true;
         
        } 
    }

    var myDiv = seleciona('teste');
    if(!botao_clicado && !myDiv.querySelector("h4")){
        var no = document.createElement("h4");
        var txt = document.createTextNode("Selecione uma opção antes de seguir");
        no.classList.add('advertencia');
        no.appendChild(txt);
        myDiv.appendChild(no);
        quizArray[pos].resposta
     
        return;
     }


    if(opcao === resposta){
        correto++;
        console.log(correto);
    }

    if(botao_clicado){
        pos++;
        criaQuestao();
    }

    
};

