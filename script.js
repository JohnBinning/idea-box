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
  var $title = $('#title').val();
  var $body = $('#body').val();
  createCard($title, $body);
})

//function 3 - create card
//uses 4 variables: id, title, body, quality
//uses prepend to insert text literal string into section#card-container
function createCard($title, $body){
  // var $id = Date.now();
  var $quality = 0;
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
        <h4>quality: <span class="quality">${$quality}</span></h4>
        </section>
    </div> `);
    $('#title').val('');
    $('#body').val('');
    console.log($quality)
    // storyLocally($id, $title, $body, $quality); -> to function 9
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
$('#card-container').on('click', '.upvote', function($quality){
    console.log($quality)
    if ($quality === 0){
      $quality++
      qualityTranslator($quality);
      console.log($quality)
    } else if ($quality === 1){
      $quality++
      qualityTranslator($quality);
      $('.upvote').prop('disabled', true)
    }
})


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

//** function 9 - into local storage
//uses var stringify
//stores card information through JSON.stringify()

//** function 10 - out of local storage
//uses var parse
//retrieves card information through JSON.parse()

//** function 11 - search
//uses var search
//use RegEx to find given words within cards
