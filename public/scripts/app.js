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
      <div class="creature">
        <img src='https://i.ytimg.com/vi/j-CtdZVZbcI/maxresdefault.jpg'>
        <h1>You are a HOBBIT!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada erat diam, et scelerisque massa tincidunt quis. Nulla finibus convallis sem eget ornare. Fusce aliquet massa at quam tincidunt ultricies. Morbi tristique, lectus in ultrices ultricies, lacus felis semper erat, id euismod urna enim sit amet augue. Etiam tincidunt imperdiet ipsum ut maximus. Curabitur at risus vulputate nisl sollicitudin consectetur vel quis nulla.</p>
      </div>
      <div class="userData">
        <form>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Name</label></div><div class="col-md-3"><input type="text"></input></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>City</label></div><div class="col-md-3"><input type="text"></input></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Age</label></div><div class="col-md-3"><input type="text"></input></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Gender</label></div><div class="col-md-3"><input type="radio" value="male">Male <input type="radio" value="female">Female</input></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Favorite Color</label></div><div class="col-md-3"><input type="text"></input></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Favorite Food</label></div><div class="col-md-3"><input type="text"></input></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Weapon Name</label></div><div class="col-md-3"><input type="text"></input></div>
          </div>
          <input type="hidden" name="creature" value="hobbit"></input>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><input type="submit"></input></div>
          </div>
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
