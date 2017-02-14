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
  createCard($id, $title, $body, $quality);
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
function getValues($id, $title, $body){
  var newObject = new createObject($id, $title, $body);
  storeObject($id, newObject);
}

//storing objects
function storeObject($id, newObject){
  var store = JSON.stringify(newObject);
  localStorage.setItem($id, store);
}

//function 3 - create card
//uses 4 variables: id, title, body, quality
//uses prepend to insert text literal string into section#card-container
function createCard($id, $title, $body, $quality){
  // var $id = Date.now();
  $('#card-container').prepend(`
    <div class="card">
      <section class="card-head">
        <h2>${$title}</h2>
        <div class="delete"></div>
      </section>
        <h3>${$body}</h3>
      <section class="quality-container">
        <div class="upvote"></div>
        <div class="downvote"></div>
        </section>
        <h4>quality: </h4>
        <span class="quality">${$quality}</span>

    </div> `);
    clearInput();
    // storyLocally($id, $title, $body, $quality); -> to function 9
}

function clearInput (){
  $('#title').val('');
  $('#body').val('');
}

//function 4 - delete button
//uses .parent().remove() to delete given card
$('#card-container').on('click', '.delete', function() {
  $(this).parent().parent().remove();
})

//function 5 - upvote button
//uses var quality
//uses if statement to count up from 0, to 1, to 2. only moves in increments of 1
//button is disabled if var quality === 2
$('#card-container').on('click', '.upvote', function(){
  var currentQuality = $('.quality');
  console.log(currentQuality.text());
  if (currentQuality.text() === 'swill'){
    currentQuality.text('plausible');
    console.log(currentQuality.text());
  } else if (currentQuality.text() === 'plausible'){
    currentQuality.text('genius');
    console.log(currentQuality.text());
  }
})


//function 6 - downvote button
//uses var quality
//uses if statement to count down from 2, to 1, to 0. only moves in increments of 1
//button is disabled if var quality === 0
$('#card-container').on('click', '.downvote', function(){
  var currentQuality = $('.quality');
  console.log(currentQuality.text());
  if (currentQuality.text() === 'genius'){
    currentQuality.text('plausible');
    console.log(currentQuality.text());
  } else if (currentQuality.text() === 'plausible'){
    currentQuality.text('swill');
    console.log(currentQuality.text());
  }
})


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

//** function 10 - out of local storage
//uses var parse
//retrieves card information through JSON.parse()

//** function 11 - search
//uses var search
//use RegEx to find given words within cards
