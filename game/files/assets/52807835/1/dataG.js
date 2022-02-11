var Datag = pc.createScript('datag');

// initialize code called once per entity
Datag.prototype.initialize = function() {
    
};

// update code called every frame
Datag.prototype.update = function(dt) {
    
};

// VGUPGRADE
// Programação: Roger William
// SupervisÃ£o:  Ronny Myamoto

var musicPercent       = 50;
var msg_end            = '';
var points_end         = 0;
var language           = 1;

// TÍTULO DO GAME
var title              = 'Compliance';

// PERGUNTAS
var questions          = ['Conhecer a missão da empresa é indispensável para que os colaboradores se engajem em um programa de compliance. A missão da 2W Energia é reinventar a relação da sociedade com a energia. Para alcançar essa missão, a 2W Energia objetiva:','Todas as empresas precisam ter uma missão bem definida e os valores que dão suporte ao seu funcionamento. A 2W Energia evidencia seis valores. Assinale a alternativa que apresenta corretamente o valor indispensável para fornecer acesso à energia limpa, mudando o futuro com consciência e responsabilidade socioambiental interna e externamente.','O compliance é uma das ferramentas mais relevantes para o desenvolvimento de uma empresa. Pode-se afirmar que o compliance tem a função de fornecer segurança, mitigar riscos e antecipar a empresa e os seus colaboradores, de modo que eles:','Você recebeu um e-mail de um colaborador de nossos fornecedores. Ainda que você nunca tenha tido contato com ele, o e-mail é, de fato, institucional de nosso parceiro. No e-mail, o colaborador solicita informações estratégicas importantes para a 2W. Nesse caso, você deve:','Você é amigo(a) há bastante tempo de um agente público, e devido a um contrato de trabalho, será necessário agendar uma reunião presencial com ele. Diante desse caso, é correto afirmar que:','A construção de um programa de compliance não é o único passo que deve ser adotado por uma empresa. A manutenção desse programa, por exemplo, por meio da atualização de normas, é indispensável. Assinale a alternativa que apresenta corretamente a quem são dirigidas as normas de compliance.','Imagine que você trabalha com a contratação de fornecedores e, para um trabalho em específico, será necessária a contratação de um serviço para o qual o seu irmão é prestador, e você sabe que ser contratado o beneficiaria muito. Nesse caso, é correto afirmar que:','Os canais de denúncia são importantes vetores para a construção de um programa de compliance eficiente. Assinale a alternativa que apresenta corretamente uma das garantias a ser observada nos canais de denúncia.','Imagine que você tenha presenciado o seu superior imediato fazendo uma piada constrangedora em relação à orientação sexual de um colega na presença dele. Nesse caso, o correto a se fazer é:','A responsabilidade socioambiental está diretamente ligada ao valor ?olhar sustentável?, da 2W Energia, que visa a fornecer acesso à energia limpa e mudar o futuro com consciência e responsabilidade socioambiental interna e externamente. Sobre o conceito de responsabilidade socioambiental, é correto afirmar que:'];
    
// RESPOSTAS
var answer             = [['incentivar o consumidor a vender a sua energia de forma criativa.','explorar e gerenciar fontes de energia não renováveis.','promover experiências tradicionais e antigas aos consumidores.','criar oportunidades econômicas, sustentabilidade e gestão do uso da energia.','distribuir energia elétrica a toda a população de forma gratuita.'],['Promover Novas Experiências.','Olhar Sustentável.','Empatia Genuína.','Fazer a Coisa Certa.','Inovar.'],['evitem possíveis equívocos, vícios, erros e, consequentemente, transtornos.','conheçam o mercado e consigam competir com outras empresas do mesmo ramo.','entendam a relevância da empresa para a sociedade e para o meio ambiente.','criem normas para regular e orientar as relações entre os colaboradores.','estabeleçam normas para ampliar a eficiência da empresa frente ao mercado competitivo.'],['responder ao e-mail com todas as informações solicitadas na hora.','enviar as informações ao colaborador deste parceiro com o qual você já tem contato.','consultar os seus superiores e, eventualmente, o departamento de compliance antes de compartilhar as informações.','compartilhar as informações, mas somente por meio de uma ligação telefônica.','responder ao e-mail com as informações solicitadas, copiando o seu superior imediato.'],['você pode realizar a reunião a sós com ele, pois já possuem intimidade.','vocês podem discutir o assunto da reunião previamente via WhatsApp.','os e-mails enviados para relatar a reunião podem ter um tom informal.','não é necessário copiar o seu gestor nos e-mails trocados com ele.','você deverá seguir todas as práticas de conduta independente de sua relação com ele.'],['Aos colaboradores que trabalham com os contratos da empresa.','A todos os colaboradores.','Aos colaboradores do setor jurídico.','Aos colaboradores do "alto escalão".','Aos colaboradores que lidam com outras empresas.'],['mesmo tendo um grau de parentesco, ele deverá ser tratado de forma igual a todos os outros candidatos, evitando qualquer conflito de interesse.','você pode beneficiá-lo no processo de contratação, contanto que você se responsabilize por ele.','por ser seu irmão, ele estará proibido de participar do processo de contratação.','você poderá contratá-lo diretamente, por ser seu irmão e estar precisando do trabalho.','ele poderá participar do processo de contratação, mas dificilmente será contratado.'],['Apenas canais remotos.','Identificação do setor da denúncia.','Apenas canais presenciais.','Anonimato da fonte.','Controle das denúncias pelo alto escalão.'],['ignorar, pois a denúncia deve partir do seu colega caso ele tenha se constrangido, e não de você.','denunciar somente caso o seu colega peça para que você seja testemunha.','denunciar ao departamento de compliance, pois esse tipo de conduta é antiético.','fingir que não viu nada, pois ele é o seu superior, e você pode ter problemas se denunciar.','defender o seu superior caso ele seja denunciado, por causa de sua hierarquia.'],['diz respeito à necessidade de a empresa ter um valor escrito pautado no tema, independentemente de ter ou não políticas de concretização.','diz respeito exclusivamente ao compromisso de, anualmente, plantar determinada quantidade de árvores.','diz respeito a praticar o bem, a justiça, a verdade, o respeito e a solidariedade na sociedade.','diz respeito exclusivamente ao combate das queimadas e do desmatamento, não tendo vínculo com as atividades da empresa em si.','diz respeito ao compromisso que a empresa tem com a sociedade e com o meio ambiente, independentemente das obrigações legais e econômicas.']];
    
// RESPOSTA FEEDBACK
var answerFeedback     = [['Incorreta.','Incorreta','Incorreta','A 2W Energia tem a missão de reinventar a relação da sociedade com a energia. Para isso, a partir da democratização do acesso à informação, a empresa objetiva reinventar a relação da sociedade com a energia, desmistificando o setor elétrico, criando mais oportunidades de economia, sustentabilidade e gestão sobre o uso de um dos bens mais preciosos do mundo: a energia.','Incorreta'],['Incorreta','Seis são os pilares do funcionamento da 2W Energia: Inovar; Promover Novas Experiências; Olhar Sustentável; Fazer a Coisa Certa; Empatia Genuína; e Todos Somos Donos da Companhia. O "Olhar Sustentável" é o valor indispensável para fornecer acesso à energia limpa, mudando o futuro com consciência e responsabilidade socioambiental interna e externamente.','Incorreta','Incorreta','Incorreta'],['O compliance é uma ferramenta empresarial que serve para gerir e evitar possíveis condutas ilegais ou antiéticas, fazendo com que a empresa adote políticas de prevenção de danos. Pode-se afirmar que o compliance tem a função de fornecer segurança, mitigar riscos e antecipar a empresa e os seus colaboradores, de modo que eles evitem possíveis equívocos, vícios, erros e, consequentemente, transtornos.','Incorreta','Incorreta','Incorreta','Incorreta'],['Incorreta','Incorreta','Nem todos os colaboradores de nossos parceiros de negócios devem ter acesso a todas as informações relacionadas aos negócios mantidos com a 2W Energia. Antes de compartilhar informações de natureza sigilosa ou estratégica com pessoas que não estejam reconhecidamente aptas a recebê-las, consulte seus superiores. Caso tenha dúvidas sobre o caráter sigiloso de determinada informação, o mais prudente é considerar que sejam sigilosas e adotar as precauções necessárias.','Incorreta','Incorreta'],['Incorreta','Incorreta','Incorreta','Incorreta','Nossas relações com agentes públicos devem ser muito cuidadosas, além disso, é necessário seguir todas as boas práticas descritas no Código de Conduta quando tratamos profissionalmente com eles, independente de existir uma relação pessoal, ou não. O registro de todas as conversas em reunião, a presença de um colega em encontros presenciais, o compartilhamento de e-mails com o seu gestor, o tom de formalidade, tudo isso deve estar presente no trato com agentes públicos.'],['Incorreta','É possível afirmar que todo e qualquer colaborador da empresa, independentemente de cargo ou função, deverá se submeter e cumprir as regras de compliance. Se essas regras visam a prevenir e detectar todas as possíveis falhas dentro da empresa, qualquer envolvido nela deverá pactuar com o programa, sob pena de ele ser consideravelmente comprometido.','Incorreta','Incorreta','Incorreta'],['Não é proibido que pessoas que possuam um grau de parentesco sejam contratadas, no entanto é necessário manter a imparcialidade e a igualdade no tratamento e na avaliação dos candidatos durante a seleção, para que não incorra em conflito de interesses. Caso tenha dúvidas, comunique a situação ao departamento de compliance.','Incorreta','Incorreta','Incorreta','Incorreta'],['Incorreta','Incorreta','Incorreta','Os colaboradores precisam ter acesso aos canais de denúncia, de forma simples e com a garantia do anonimato, como uma maneira de assegurar que a empresa seja alertada sobre eventuais fraudes e condutas danosas. A anonimização dos dados do denunciante é um dos modos de evitar a retaliação frente ao uso desses canais, ao passo que a retaliação é uma das práticas que mais prejudica os programas de compliance.','Incorreta'],['Incorreta','Incorreta','Sempre que você presenciar uma atitude que vá contra o Código de Conduta e nossos valores éticos, nesse caso, a discriminação, você deve fazer uma denúncia ao departamento de compliance utilizando nossos canais, mesmo que você tenha apenas presenciado a ação ou que ela envolva seus superiores imediatos. Lembre-se de que as denúncias são anonimizadas, ou seja, medidas sempre são tomadas para garantir a sua segurança e para impedir que você seja identificado(a).','Incorreta','Incorreta'],['Incorreta','Incorreta','Incorreta','Incorreta','A responsabilidade socioambiental deve estar disposta em todos os espaços, inclusive nas práticas da empresa, reforçando seu compromisso com a sociedade e com o meio ambiente para além das obrigações legais e econômicas.']];

// RESPOSTA CERTA OU ERRADA

var correctAnswers     = [[false,false,false,true,false],[false,true,false,false,false],[true,false,false,false,false],[false,false,true,false,false],[false,false,false,false,true],[false,true,false,false,false],[true,false,false,false,false],[false,false,false,true,false],[false,false,true,false,false],[false,false,false,false,true]];

// PONTUAÃ‡ÃƒO DA PERGUNTA
var answerScore        = [10,10,10,10,10,10,10,10,10,10];

// MENSAGEM DE PORCENTAGEM DE ACERTOS
var msg_0              = 'Você precisa estudar mais.';
var msg_25             = 'Quase! Estude mais e tente novamente.';
var msg_50             = 'Parabéns pela pontuação!';
var msg_75             = 'Woww, parabéns pela pontuação!';
var msg_100            = 'Parabéns! Você conseguiu a melhor pontuação.';


// RESPOSTA FEEDBACK QUANDO SEM MENSAGEM
var answerFeedbackNull = ['Errou!','Correto!'];
var answerWait         = 'Selecione uma alternativa.';

//ARMAZENAMENTO DA RESPOSTA DE CADA QUESTÃƒÆ’O
var chosenAnswers      = ['','','','','','','','','',''];

var chosenAnswersMult  = [[false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false],
                          [false,false,false,false,false,false]];

var allitens           = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var questionsIndex     = -1;

//Criando array para itens na mesa com quantidade de perguntas
var itensArray     = [];
for(var i =0; i<questions.length; i++){
    itensArray.push(i+1);
}

document.title = title;