//stage 1: carry over any similar functions from Linked List
//stage 2: workable without localStorage
//stage 3: workable with localStorage
//stage 4: search function
//stage 5: extension: sorting
//stage 6: extension: tags

// 4 variable for card
// •id - timestamp - need source for timestamp
// •title
// •body
// •quality (0-swill, 1-plausible, 2-genius): initially at 0
//
// 1 variable for search
//
// 2 variables for local storage
// •var stringify for JSON.stringify()
// •var parse for JSON.parse()
// --- 7 total

//** function 1 - retrieve stored cards from local storage
//forwards information to function 9
window.onload = retrieveCards();

//function 1.9999 - disable enter button on startup
$('#save').prop('disabled', true);

//function 2 - enabling enter button when text appears in title and body inputs
//uses inputs from title and body
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
    console.log('temp');
    createCard(tempObject);
  }
}

//function 3 - create card
//uses 4 variables: id, title, body, quality
//uses prepend to insert text literal string into section#card-container
function createCard(tempObject){
  // var $id = Date.now();
  console.log('create card');
  $('#card-container').prepend(`
    <div id="${tempObject.id}" class="card">
      <section class="card-head">
        <h2>${tempObject.title}</h2>
        <div class="delete"></div>
      </section>
        <h3>${tempObject.body}</h3>
      <section class="quality-container">
        <div class="upvote"></div>
        <div class="downvote"></div>
        <h4>quality: </h4>
        <span class="quality">${tempObject.quality}</span>
        </section>

    </div> `);
    clearInput();
    // storyLocally($id, $title, $body, $quality); -> to function 9
}

//clears title and body
function clearInput (){
  $('#title').val('');
  $('#body').val('');
};

//function 4 - delete button
//uses .parent().remove() to delete given card
$('#card-container').on('click', '.delete', function() {
  $(this).parent().parent().remove();
  var parentCardId = $(this).parent().parent().attr('id');
  localStorage.removeItem(parentCardId);
});

//function 5 - upvote button
//uses var quality
//uses if statement to count up from 0, to 1, to 2. only moves in increments of 1
//button is disabled if var quality === 2
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

function updateQuality(voteInput, currentQuality){
  var parentCardId = $(voteInput).parent().parent().attr('id');
  var accessCard = JSON.parse(localStorage.getItem(parentCardId));
  accessCard.quality = currentQuality;
  localStorage.setItem(parentCardId, JSON.stringify(accessCard));
}

//function 6 - downvote button
//uses var quality
//uses if statement to count down from 2, to 1, to 0. only moves in increments of 1
//button is disabled if var quality === 0



//----potential function for sorting cards through quality (swill - plausible - genius)

//----potential function for tagging
//    needs another input for tags
//    needs array, need to iterate through forEach() using RegEx to find keywords

//function 7 - addEventListener to allow click and enable 'editable' for title
//uses var title
//calls function 9 for storage when clicked off or 'enter' is pressed

//function 8 - addEventListener to allow click and enable 'editable' for body
//uses var body
//calls function 9 for storage when clicked off or 'enter' is pressed


//** function 11 - search
//uses var search
//use RegEx to find given words within cards
