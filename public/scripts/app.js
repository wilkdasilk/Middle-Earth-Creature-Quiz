console.log("sanity check: JS connected!");

  $(document).ready(function(){

    var mainDiv = $('.container.main-content');

    var takeQuiz = $('button');
    takeQuiz.click(function(event){
      clearPage();
      loadQuestion();
    });


  function clearPage(){
    mainDiv.html("");
  }

  function loadCreaturePage(){
    mainDiv.append(`
      <img class="creature" src='https://i.ytimg.com/vi/j-CtdZVZbcI/maxresdefault.jpg'>
      <div class="creature"><h1>You are a HOBBIT!</h1></div>
      <div class="userData">
        <form>
          <label>Name</label><input type="text"></input>
          <label>City</label><input type="text"></input>
          <label>Age</label><input type="text"></input>
          <label>Gender</label><input type="radio" value="male"><input type="radio" value="female"></input>
          <label>Favorite Color</label><input type="text"></input>
          <label>Favorite Food</label><input type="text"></input>
          <label>Weapon Name</label><input type="text"></input>
          <input type="hidden" name="creature" value="hobbit"></input>
          <input type="submit"></input>
        </form>
      </div>
      `);
  }

  function loadQuestion(){
    mainDiv.append(`

      <h1>Which creature are you?</h1>
      <div class="row">
        <div class="option col-md-6">Hooman</div>
        <div class="option col-md-6">Hobbit</div>
      </div>

    `);
    $('.option').click(function(){
      clearPage();
      loadCreaturePage();
    })
  }

});
