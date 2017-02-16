console.log("sanity check: JS connected!");

  $(document).ready(function(){
    
    var takeQuiz = $('button');
    takeQuiz.click(function(event){
      clearPage();
    });


  function clearPage(){
    $('.container.main-content').html("");
  }

});
