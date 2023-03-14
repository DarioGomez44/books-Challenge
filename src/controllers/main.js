const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const {Sequelize}= require('../database/models');
const Op = Sequelize.Op


const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home',  { books, message: req.session.message });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    // Implement look for details in the database OK
    db.Book.findByPk(req.params.id, {include : [{association: 'authors'}]})
     .then((book)=>{
      res.render('bookDetail', { book , message: req.session.message})
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
         [Sequelize.Op.like]: '%'+ req.body.title +'%'}}}
         )
    .then((books) => {
      res.render("search", { books});
    }).catch((e) => console.log(e));
  },
  deleteBook: (req, res) => {
    // Implement delete book OK
    //tube que hacer un ALTER TABLE `booksauthors` DROP CONSTRAINT `booksauthors_ibfk_2`;

    db.Book.destroy({ 
     
      where: { 
        id:  req.params.id 
      }
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((e) => console.log(e))
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', {authors, message: req.session.message  });
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
    
      res.render("login", { email:""} );

  },


 processLogin: (req, res) => {
 // Implement login process
  const emailOk = req.body.email
   const passwordOk = req.body.password
  
    
    const userFound = db.User.findOne({
      where: {
        email: emailOk,
      }
    });

    userFound.then( user => {
      if(user){

        let comparePassword = bcryptjs.compareSync( passwordOk, user.Pass);

        if (comparePassword) {
          req.session.message = {
             success: `HI ${user.Name} `,
             rol: `${user.CategoryId }`, 
          }    

        res.redirect('/')
        } else {
          req.session.message = {
            error: `Email o password incorrecto`
          }  
          res.render("login", { email: req.cookies.usuario, message:req.session.message });
        }
      }else{
        req.session.message = {
          error: `Email o password incorrecto`
        }  
        res.render("login", { email: req.cookies.usuario, message:req.session.message });
      }
    })
  },

  logout:(req , res) =>{
    req.session.destroy();
    res.redirect('/')
 },
  

  edit: (req, res) => {
    // Implement edit book   OK
    let id = req.params.id
    db.Book.findByPk(id)
    .then((book)=>{
      res.render('editBook', { book, message: req.session.message})
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
