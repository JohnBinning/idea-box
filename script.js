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

//function 2 - enabling enter button when text appears in title and body inputs
//uses inputs from title and body

//function 3 - create card
//uses 4 variables: id, title, body, quality
//uses prepend to insert text literal string into section#card-container

//function 4 - delete button
//uses .parent().remove() to delete given card

//function 5 - upvote button
//uses var quality
//uses if statement to count up from 0, to 1, to 2. only moves in increments of 1
//button is disabled if var quality === 2

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
