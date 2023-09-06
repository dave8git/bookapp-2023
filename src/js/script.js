
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    }
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class Book {
    constructor(data) {
      const thisBook = this;
      thisBook.data = data;
      thisBook.render();
    }
    render() {
      const thisBook = this;
      const generatedHtml = templates.book(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHtml);
      const bookContainer = document.querySelector(select.containerOf.books);
      bookContainer.appendChild(thisBook.element);
    }


  }
  const app = {

    initData: function() {
      const thisApp = this; 

      thisApp.data = dataSource;
    },

    initBooks: function() {
      const thisApp = this;

      for(let bookData of thisApp.data.books) {
        new Book(bookData) ;
      }
    },

    init: function () {
      const thisApp = this;
      thisApp.initData();
      thisApp.initBooks();
    
    }
  };
    
  app.init();
}


