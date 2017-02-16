//retrieve stored cards from local storage
window.onload = retrieveCards();

//disable enter button on startup
$('#save').prop('disabled', true);

//enabling enter button when text appears in title and body inputs
$('input[type=text]').on('keyup', function(){
  var $title = $('#title').val();
  var $body = $('#body').val();
  if ($title !== "" && $body !== ""){
    $('#save').prop('disabled', false);
  } else {
    $('#save').prop('disabled', true);
  }
})

//function 2.5 - save button activation
$('#save').on('click', function(){
  var $id = Date.now();
  var $title = $('#title').val();
  var $body = $('#body').val();
  var $quality = 'swill';
  getValues($id, $title, $body, $quality);
  $('#save').prop('disabled', true);
})

//constructor
function createObject($id, $title, $body, $quality){
  this.id = $id;
  this.title = $title;
  this.body = $body;
  this.quality = $quality;
}

//conglomerates values
function getValues($id, $title, $body, $quality){
  var newObject = new createObject($id, $title, $body, $quality);
  storeObject($id, newObject);
  createCard(newObject);
}

//storing objects
function storeObject($id, newObject){
  var store = JSON.stringify(newObject);
  localStorage.setItem($id, store);
}

//retreive objects
function retrieveCards(){
  for (var key in localStorage){
    var tempObject = JSON.parse(localStorage[key])
    createCard(tempObject);
  }
}

//function 3 - create card
function createCard(tempObject){
  $('#card-container').prepend(`
    <div id="${tempObject.id}" class="card">
      <div class="delete"></div>
      <section class="searchable">
        <h2 class="title-text" contenteditable>${tempObject.title}</h2>
        <h3 class="body-text" contenteditable>${tempObject.body}</h3>
      </section>
      <section class="quality-container">
        <div class="upvote buttons"></div>
        <div class="downvote buttons"></div>
        <h4 class="buttons">quality: </h4>
        <span class="quality">${tempObject.quality}</span>
        </section>
    </div> `);
    clearInput();
}

//clears title and body
function clearInput (){
  $('#title').val('');
  $('#body').val('');
};

//delete button
$('#card-container').on('click', '.delete', function() {
  $(this).parent().remove();
  var parentCardId = $(this).parent().attr('id');
  localStorage.removeItem(parentCardId);
});

//upvote button
$('#card-container').on('click', '.upvote', function(){
  var currentQuality = $(this).siblings('span').text();
  if (currentQuality === 'swill'){
    currentQuality = 'plausible';
    $(this).siblings('span').text('plausible');
    updateQuality(this, currentQuality);
  } else if (currentQuality === 'plausible'){
    currentQuality = 'genius';
    $(this).siblings('span').text('genius');
    updateQuality(this, currentQuality);
  }
})

//downvote button
$('#card-container').on('click', '.downvote', function(){
  var currentQuality = $(this).siblings('span').text();
  if (currentQuality === 'genius'){
    currentQuality = 'plausible';
    $(this).siblings('span').text('plausible');
    updateQuality(this, currentQuality);
  } else if (currentQuality === 'plausible'){
    currentQuality = 'swill';
    $(this).siblings('span').text('swill');
    updateQuality(this, currentQuality);
  }
})

//stores upvotes and downvotes in local storage
function updateQuality(voteInput, currentQuality){
  var parentCardId = $(voteInput).parent().parent().attr('id');
  var accessCard = JSON.parse(localStorage.getItem(parentCardId));
  accessCard.quality = currentQuality;
  localStorage.setItem(parentCardId, JSON.stringify(accessCard));
}

//pulls edited text out of title
$('#card-container').on('focusout', '.title-text', function(){
  var newTitle = $(this).text();
  updateTitle(this, newTitle);
});

//saves new title in local storage
function updateTitle(location, newTitle){
  var parentCardId = $(location).parent().parent().attr('id');
  var accessCard = JSON.parse(localStorage.getItem(parentCardId));
  accessCard.title = newTitle;
  localStorage.setItem(parentCardId, JSON.stringify(accessCard));
}

//pulls editable text out of body
$('#card-container').on('focusout', '.body-text', function(){
  var newBody = $(this).text();
  updateBody(this, newBody);
});

//saves new body in local storage
function updateBody(location, newBody){
  var parentCardId = $(location).parent().parent().attr('id');
  var accessCard = JSON.parse(localStorage.getItem(parentCardId));
  accessCard.body = newBody;
  localStorage.setItem(parentCardId, JSON.stringify(accessCard));
}

//search
$('#search-input').on('keyup', function(){
  var searchText = $(this).val().toLowerCase();
  $('.searchable').each(function(){
    var compareText = $(this).text().toLowerCase();
    $(this).closest('.card')[compareText.indexOf(searchText) !== -1 ? 'show' : 'hide']();
  });
});

//----potential function for sorting cards through quality (swill - plausible - genius)

//----potential function for tagging
//    needs another input for tags
//    needs array, need to iterate through forEach() using RegEx to find keywords
