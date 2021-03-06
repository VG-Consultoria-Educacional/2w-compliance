/*************************************/
//Função de redimensionameto de Iframe    
/*************************************/
function setIframeHeight(id, navWidth) {
    if (document.getElementById) {
        var theIframe = document.getElementById(id);
        if (theIframe) {
            var height = getWindowHeight();
            theIframe.style.height = Math.round(height) - navWidth + "px";
            theIframe.style.marginTop = Math.round(((height - navWidth) - parseInt(theIframe.style.height)) / 2) + "px";
        }
    }
}

function getWindowHeight() {
    var height = 0;
    if (window.innerHeight) {
        height = window.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        height = document.documentElement.clientHeight;
    }
    else if (document.body && document.body.clientHeight) {
        height = document.body.clientHeight;
    }
    return height;
}

function SetupIFrame() {
    //configure nosso iFrame para que o conteúdo ocupe a tela inteira, exceto nossa navegação
    var navWidth = 0;
    setIframeHeight("contentFrame", navWidth);
    //precisa disso em um setTimeout para evitar um erro de temporização no IE
    window.setTimeout('window.onresize = function() { setIframeHeight("contentFrame", ' + navWidth + '); }', 1000);
}

/*************************************/
//Definição do conteúdo 
//Importante trocar a quantidade de telas do array
//Importante verificar a localização dos arquivos, nesse explo a função funcionará 
//quando eles estiveram na mesma pasta do start
//trocar páginas aqui
/*************************************/
var pageArray = new Array(17);

pageArray[0] = "index.html";
pageArray[1] = "tela-01.html";
pageArray[2] = "tela-1.html";
pageArray[3] = "tela-2.html";
pageArray[4] = "tela-3.html";
pageArray[5] = "tela-4.html";
pageArray[6] = "tela-5.html";
pageArray[7] = "tela-6.html";
pageArray[8] = "tela-7.html";
pageArray[9] = "tela-8.html";
pageArray[10] = "tela-9.html";
pageArray[11] = "tela-10.html";
pageArray[12] = "tela-11.html";
pageArray[13] = "tela-12.html";
pageArray[14] = "tela-13.html";
pageArray[15] = "tela-14.html";
pageArray[16] = "tela-15.html";
pageArray[17] = "tela-16.html";


/*************************************/
//Funções de Navegação
/*************************************/

var currentPage = null;
var startTimeStamp = null;
var processedUnload = false;
var reachedEnd = false;

function goToPageOne(){
    //mude esse valor dependendo se sua home é localizada no index ou pagina um
    currentPage = 0;
    
    // salva o local atual como bookmark
    ScormProcessSetValue("cmi.core.lesson_location", currentPage);
    
    goToPage();
}


function doStart() {

    //obtenha o tamanho do iFrame corretamente e configure
    SetupIFrame();

    //registrar o tempo em que o aluno iniciou o SCO para que possamos relatar o tempo total
    startTimeStamp = new Date();

    //inicializar a comunicação com o LMS
    ScormProcessInitialize();

    //é uma prática recomendada definir o status da lição como incompleto quando
    //primeiro lançamento do curso (se o curso ainda não estiver concluído)
    var completionStatus = ScormProcessGetValue("cmi.core.lesson_status");
    if (completionStatus == "not attempted") {
        ScormProcessSetValue("cmi.core.lesson_status", "incomplete");
    }

    // veja se o usuário armazenou um marcador anteriormente (não verifique se há erros
    // porque a função cmi.core.lesson_location pode não ser inicializada
    var bookmark = ScormProcessGetValue("cmi.core.lesson_location");

    // se não houver um marcador armazenado, inicie o usuário na primeira página
    if (bookmark == "") {
        currentPage = 0;
      } else {
        // if there is a bookmark stored, resume from that bookmarked page 
        currentPage = parseInt(bookmark, 10);
      }

    goToPage();
}

//Funções de navegação de página do IFRAME
function goToPage() {

    var theIframe = document.getElementById("contentFrame");
    var prevButton = document.getElementById("butPrevious");
    var nextButton = document.getElementById("butNext");

    // navegue no iFrame para o conteúdo
    //se os arquivos estiverem em pastas anteriores ao start substitua nessa função o código
    // theIframe.src = "../" + pageArray[currentPage];
    theIframe.src = pageArray[currentPage];

    // desabilite os botões prev / next se estivermos na primeira ou na última página.
    if (currentPage == 0) {
        nextButton.disabled = false;
        prevButton.disabled = true;
    }
    else if (currentPage == (pageArray.length - 1)) {
        nextButton.disabled = true;
        prevButton.disabled = false;
    }
    else {
        nextButton.disabled = false;
        prevButton.disabled = false;
    }

    // salva o local atual como bookmark
    ScormProcessSetValue("cmi.core.lesson_location", currentPage);

    // neste exemplo de curso, o curso é considerado completo quando a última página é alcançada
    if (currentPage == (pageArray.length - 1)) {
        reachedEnd = true;
        ScormProcessSetValue("cmi.core.lesson_status", "completed");
    }

    
}

function doUnload(pressedExit) {

    // não chame essa função duas vezes
    if (processedUnload == true) { return; }

    processedUnload = true;

    // registra o tempo da sessão
    var endTimeStamp = new Date();
    var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp.getTime());
    var scormTime = ConvertMilliSecondsToSCORMTime(totalMilliseconds, false);

    ScormProcessSetValue("cmi.core.session_time", scormTime);

    // se o usuário fechar o navegador, usaremos o padrão para salvar
    // seus dados de progresso. Se o usuário pressionar exit, ele será solicitado.
    // Se o usuário chegou ao fim, a saída normall para enviar resultados.
    if (pressedExit == false && reachedEnd == false) {
        ScormProcessSetValue("cmi.core.exit", "suspend");
    }

    ScormProcessFinish();
}

function doPrevious() {
    if (currentPage > 0) {
        currentPage--;
    }
    goToPage();
}

function doNext() {
    if (currentPage < (pageArray.length - 1)) {
        currentPage++;
    }
    goToPage();
}

function setMenuPage(page) {
    if (page > pageArray.length - 1) {
        return;
    }

    currentPage = page;
    goToPage();
}

function doExit() {
    ScormProcessSetValue("cmi.core.exit", "");
    doUnload(true);
}
// devemos utilizar essa função quando tiver teste envolvido,  para modelar questões
// chamado da página para registrar os resultados de um teste
// passa na pontuação como porcentagem
function RecordTest() {
    // resgtar do botão id="user_score" a nota do aluno.
    nota = parseInt(document.getElementById('user_score').value);

    if(nota >= 60) {
        console.log('oi');
        ScormProcessSetValue('cmi.core.score.raw', nota);
        ScormProcessSetValue("cmi.core.lesson_status", "passed");
    }

    /*
    ScormProcessSetValue("cmi.core.score.raw", score); // Define o score para o elemto.
    ScormProcessSetValue("cmi.core.score.min", "0"); // Define nota minima
    ScormProcessSetValue("cmi.core.score.max", "100"); // Define nota maxima
    */

    // // se obtivermos um resultado do teste, defina o status da lição como aprovado / reprovado em vez de concluído
    /*
    // considere 70% de aprovação
    if (score >= 70) {
        ScormProcessSetValue("cmi.core.lesson_status", "passed"); // Define o valor aprovado
    }
    else {
        ScormProcessSetValue("cmi.core.lesson_status", "failed"); // Define o valor reprovado
    }
    */
}

// SCORM requer tempo para ser formatado de uma maneira específica
function ConvertMilliSecondsToSCORMTime(intTotalMilliseconds, blnIncludeFraction) {

    var intHours;
    var intintMinutes;
    var intSeconds;
    var intMilliseconds;
    var intHundredths;
    var strCMITimeSpan;

    if (blnIncludeFraction == null || blnIncludeFraction == undefined) {
        blnIncludeFraction = true;
    }

    // extrair partes do tempo
    intMilliseconds = intTotalMilliseconds % 1000;

    intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;

    intMinutes = ((intTotalMilliseconds - intMilliseconds - (intSeconds * 1000)) / 60000) % 60;

    intHours = (intTotalMilliseconds - intMilliseconds - (intSeconds * 1000) - (intMinutes * 60000)) / 3600000;

    /*
      lidar com casos excepcionais quando o conteúdo usou uma quantidade enorme de tempo e interpretou o CMITimstamp
      para permitir um número de intMinutos e segundos maiores que 60, ou seja, 9999: 99: 99,99 em vez de 9999: 60: 60: 99
      nota - este caso é permitido no SCORM, mas será excepcionalmente raro
      */


    if (intHours == 10000) {
        intHours = 9999;

        intMinutes = (intTotalMilliseconds - (intHours * 3600000)) / 60000;
        if (intMinutes == 100) {
            intMinutes = 99;
        }
        intMinutes = Math.floor(intMinutes);

        intSeconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000)) / 1000;
        if (intSeconds == 100) {
            intSeconds = 99;
        }
        intSeconds = Math.floor(intSeconds);

        intMilliseconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000) - (intSeconds * 1000));
    }

    // reduz a precisão extra dos milissegundos
    intHundredths = Math.floor(intMilliseconds / 10);

    // coloca 0 no preenchimento e concatena para obter o formato correto
    strCMITimeSpan = ZeroPad(intHours, 4) + ":" + ZeroPad(intMinutes, 2) + ":" + ZeroPad(intSeconds, 2);

    if (blnIncludeFraction) {
        strCMITimeSpan += "." + intHundredths;
    }

    // verifica o caso em que o total de milissegundos é maior que o máximo suportado por strCMITimeSpan
    if (intHours > 9999) {
        strCMITimeSpan = "9999:99:99";

        if (blnIncludeFraction) {
            strCMITimeSpan += ".99";
        }
    }

    return strCMITimeSpan;

}

function ZeroPad(intNum, intNumDigits) {

    var strTemp;
    var intLen;
    var i;

    strTemp = new String(intNum);
    intLen = strTemp.length;

    if (intLen > intNumDigits) {
        strTemp = strTemp.substr(0, intNumDigits);
    }
    else {
        for (i = intLen; i < intNumDigits; i++) {
            strTemp = "0" + strTemp;
        }
    }

    return strTemp;
}
