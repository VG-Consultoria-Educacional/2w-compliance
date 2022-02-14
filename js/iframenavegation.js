function nextPage(){
    //chama o outro iframe
    next = parent.document.getElementById('butNext');
    //aciona a funcao next do outro iframe
    next.onclick();
  }
  
  function backPage(){
    back = parent.document.getElementById('butPrevious');
    back.onclick();
  }
  
  function exitCourse(){
    exit = parent.document.getElementById('butExit');
    exit.onclick();  
    document.getElementById("btn-finalizar").style.visibility='hidden';  
  }
  //Nesse material dessa empresa a home page é considerado a pagina 1
  function homePage(){
    home = parent.document.getElementById('butHome');
    home.onclick();
  }
  