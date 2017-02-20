console.log("sanity check: JS connected!");

  $(document).ready(function(){

    var $mainDiv = $('.container.main-content');

    //After button is clicked, the page clears and loads a question
    var takeQuiz = $('#takeQuiz');
    takeQuiz.click(function(event){
      clearPage();
      loadQuiz();
    });

  //Function to clear the page
  function clearPage(){
    $mainDiv.empty();
  }

  var formHTML;
  var currentUserId;
  var creatureResult;
  var mainUser;

  //Appends the result and form to the page
  function loadCreaturePage(result){

    $.ajax({
      method: "GET",
      url: '/api/creatures/',
      success: captureCreature,
      error: onError
    });

    function captureCreature(creatures){
      creatures.forEach(function(creature){
        if(creature.creatureType == result){
          creatureResult = creature;
           formHTML = `
            <form>
              <div class="row">
                <div class="col-md-offset-3 col-md-3"><label>Name</label></div><div class="col-md-3"><input type="text" name="name" id="form_name" required></div>
              </div>
              <div class="row">
                <div class="col-md-offset-3 col-md-3"><label>City</label></div><div class="col-md-3"><input type="text" name="city" id="form_city" required></div>
              </div>
              <div class="row">
                <div class="col-md-offset-3 col-md-3"><label>Age</label></div><div class="col-md-3"><input type="text" name="age" id="form_age" required></div>
              </div>
              <div class="row">
                <div class="col-md-offset-3 col-md-3"><label>Gender</label></div><div class="col-md-3"><input type="radio" value="male" name="gender" id="form_male" required>Male <input type="radio" value="female" name="gender" id="form_female">Female</div>
              </div>
              <div class="row">
                <div class="col-md-offset-3 col-md-3"><label>Favorite Color</label></div><div class="col-md-3"><input type="text" name="favoriteColor" id="form_favoriteColor" required></div>
              </div>
              <div class="row">
                <div class="col-md-offset-3 col-md-3"><label>Favorite Food</label></div><div class="col-md-3"><input type="text" name="favoriteFood" id="form_favoriteFood" required></div>
              </div>
              <input type="hidden" name="creature" value="${creatureResult.creatureType}">
              <div class="row">
                <div class="col-md-offset-3 col-md-3"><input id="formSubmit" type="submit"></div>
              </div>
            </form>
            `;
          $mainDiv.append(`
            <div class="creature">
              <img src='${creatureResult.imageUrl}'>
              <h1>You are a ${creatureResult.creatureType}!</h1>
              <p>${creatureResult.description}</p>
            </div>
            <div class="userData">
              ${formHTML}
            </div>
            <div class="allUsers">
            </div>
            `);

          var $form = $('form');
          $form.on('submit', function(event){
            event.preventDefault();
            $.ajax({
              method: 'POST',
              url: '/api/users',
              data: $form.serialize(),
              success: loadMainProfile,
              error: onError
            });
          });

        }
      });
    }
  }

  function onError(xhr, ajaxOptions, thrownError){
    console.log(xhr);
    console.log(ajaxOptions);
    console.log(thrownError);
  }



  function loadMainProfile(newUser){
    mainUser = newUser;
    if (mainUser.gender == "male"){
      mainUser.pronoun = "his"
    } else {
      mainUser.pronoun = "her"
    };
    $('.userData').empty();
  	$('.userData').append(eval('`' +creatureResult.madlib + '`'));

  	loadProfiles();
  }


  //GETS ALL User profiles and renders to page
  function loadProfiles() {
    //first clear all profiles and turn of event listeners so there won't be multiple
    $(".allUsers").empty().off();

    //then get info to load all profiles fresh
	$.ajax({
      method: 'GET',
      url: '/api/users',
      success: renderMultipleUsers,
      error: onError
  	});

  	function renderMultipleUsers(users) {
  	  users.forEach(function(user) {
        renderUser(user);
      });

      //Deletes a user when delete button is clicked
      $(".allUsers").on('click', '.deleteBtn', function(event) {
        $.ajax({
          method: 'DELETE',
          url: '/api/users/' + $(this).parent().data("user-id"),
          success: deleteUserSuccess,
          error: deleteUserError
        });
      });

      //Opens modal when edit button is clicked
      $(".allUsers").on('click', '.editBtn', function(event) {
        currentUserId = $(this).parent().data('user-id');
        $('#userModal').modal();
        $('#userModal').data('user-id', currentUserId);
        $('#modal-form-content').html(formHTML);
        $('#formSubmit').remove();
        $.ajax({
          method:"GET",
          url: '/api/users/' +currentUserId,
          success: populateForm,
          error: onError
        });

        //Pre-populates the modal form with user's previous info
        function populateForm(user){
          $('#form_name').val(user.name);
          $('#form_city').val(user.city);
          $('#form_age').val(user.age);
          if (user.gender == "male"){
            $('#form_male').prop("checked", true);
          } else {
            $('#form_female').prop("checked", true);
          }
          $('#form_favoriteColor').val(user.favoriteColor);
          $('#form_favoriteFood').val(user.favoriteFood);
        }
      });

      //Updates user when save button is clicked
      $('#userModal').on('click', '#saveChangesBtn', function(event){
        event.preventDefault();
        $.ajax({
          method: "PUT",
          url: '/api/users/' + currentUserId,
          data: $('form').serialize(),
          success: updateSuccess,
          error: onError
        });
      });
    }

    function renderUser(user) {

  	  $(".allUsers").append(
  	  	`<div class="userOnPage" data-user-id="${user._id}">
  	  		<div>
  	  			<img src="#">
  	  		</div>
  	  		<p>${user.name}</p>
  	  		<p>${user.creature.creatureType}</p>
  	  		<button class="deleteBtn">delete</button>
  	  		<button class="editBtn">edit</button>
  	  	</div>`
  	  	);
    }
    function updateSuccess(updatedUser){
      $('#userModal').modal('hide');
      $(`[data-user-id=${updatedUser._id}]`).remove();
      renderUser(updatedUser);
      loadMainProfile(updatedUser);
    }
  }




//Removes its profile from the page
function deleteUserSuccess(json) {
  var user = json;
  var userId = user._id;

  $("[data-user-id=" + userId + "]").remove();
}

function deleteUserError() {
  console.log("user deleting error!");
}


  //Appends the question and answer choices to the page
  function loadQuiz(){
    var i =0;
    var questions=[
      {
        q: "Which creature are you?",
        A: "Hooman",
        B: "Hobbit",
        C: "Elf",
        D: "Dwarf",
        E: "Wizard",
        F: "Ent"
    },
    {
      q: "No seriously which creature are you?",
      A: "real Hooman",
      B: "real Hobbit",
      C: "real Elf",
      D: "real Dwarf",
      E: "real Wizard",
      F: "real Ent"
    },
    {
      q: "But really which creature are you?",
      A: "definitely Hooman",
      B: "definitely Hobbit",
      C: "definitely Elf",
      D: "definitely Dwarf",
      E: "definitely Wizard",
      F: "definitely Ent"
    }];

    function loadQuestion(){
      //ask question
      $mainDiv.html(`

      <h1>${questions[i].q}</h1>
      <div class="row">
        <div class="option col-md-6" data-creature-type="Human">${questions[i].A}</div>
        <div class="option col-md-6" data-creature-type="Hobbit">${questions[i].B}</div>
        <div class="option col-md-6" data-creature-type="Elf">${questions[i].C}</div>
        <div class="option col-md-6" data-creature-type="Dwarf">${questions[i].D}</div>
        <div class="option col-md-6" data-creature-type="Wizard">${questions[i].E}</div>
        <div class="option col-md-6" data-creature-type="Ent">${questions[i].F}</div>
      </div>

    `);
    }

    loadQuestion();

    //listen for choice
    $mainDiv.on('click', '.option', function(){
      //update scores
      //load next question
      if(questions[i+1]){
        i++;
        loadQuestion();
      }
      //or decide creatureType and load creature page
      else{
        clearPage();
        var creatureType = $(this).data('creature-type');
        loadCreaturePage(creatureType);
      }
    });
  }

});
