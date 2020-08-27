const express = require('express')
const bookStore = require('./../model/Datastore')

const router = express.Router()

router.get('/', (req, res)=>{
	res.render('book')
})

router.get('/books', (req, res)=>{
	res.send(bookStore)
})


router.get('/newbook', (req, res)=>{
	
	
	res.render('newbooks')
	
})
router.post('/addbook', (req, res)=>{
	var data = {
		id: req.body.id,
		title: req.body.title,
		code: req.body.code,
		author:req.body.author,
		year: req.body.year,
		publisher :req.body.publisher
	}
		
		
		bookStore.push(data)
		console.log(bookStore)
	
	res.render('newbooks')
	
})



router.get('/books/:id', (req, res)=>{

//get a book by its id
const book = bookStore.find(function(item){return item.id === parseInt(req.params.id)})

//check if book does not exist
if(!book){
	res.status(404).send('The book with the id does not exist')
}
//if the book is found, send it to client
res.send(book)
})


//Update a book with a specified  id
router.put('/books/:id', (req, res)=>{

//get a book by its id
const book = bookStore.find(function(item){

	return item.id === parseInt(req.params.id)
})
//check if book does not exist
if(!book){
	res.status(404).send('The book with the id does not exist')
}
//update  a section or sections of the book
book.id = req.body.id
book.title = req.body.title 
book.code = req.body.code
book.author = req.body.author
book.year = req.body.year
book.publisher = req.body.publisher
	
	//send the updated book to client
res.send(book)
})


//Delete a book with a specified id
router.delete('/books/:id', (req, res)=>{

const book = bookStore.find(function(item){

	return item.id === parseInt(req.params.id)
})
if(!book){
	res.status(404).send('The book with the id does not exist')
}

//delete the  book
const index = bookStore.indexOf(book)
bookStore.splice(index, 1)
res.send(bookStore)
})


	
module.exports = router;