const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const {Sequelize}= require('../database/models');
const Op = Sequelize.op


const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    // Implement look for details in the database OK
    db.Book.findByPk(req.params.id, {include : [{association: 'authors'}]})
     .then((book)=>{
      res.render('bookDetail', { book})
     })
     .catch((e)=> console.log(e))
  },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title OK
    db.Book.findAll({ include: [{ association: "authors" }],
    where: {
      title: {
         [Sequelize.Op.like]: '%'+ req.body.title +'%'}}})
    
      .then((books) => {
      res.render("search", { books});
    }).catch((e) => console.log(e));
  },
  deleteBook: (req, res) => {
    // Implement delete book OK
    db.Book.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((e) => console.log(e))
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author  OK
    db.Author.findByPk(req.params.id, {include : [{association: 'books'}]})
    .then((author) => {
      res.render('authorBooks', {author});
     }).catch((e)=> console.log(e))
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    
    res.render('login');
  },

  logout: (req, res )=>{

  },
  processLogin: (req, res) => {
    // Implement login process








    res.render('home');
  },




  edit: (req, res) => {
    // Implement edit book   OK
    db.Book.findByPk(req.params.id)
    .then((bookToUpdate)=>{
      res.render('editBook',{bookToUpdate, id: req.params.id})
    })
    .catch((e)=> console.log(e))
  },
  processEdit: (req, res) => {
    // Implement edit book  OK
    db.Book.update(
      {  
        title: req.body.title,
        cover:  req.body.cover,
        description: req.body.description,
   
      }, 
      {
          where : {id:req.params.id}
      })
        .then(()=> { res.redirect('/')})
       .catch((e)=> console.log(e))
  },
};

module.exports = mainController;
