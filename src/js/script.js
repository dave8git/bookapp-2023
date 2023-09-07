
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    class: {
      favorite: '',
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
      thisBook.getElements();
      thisBook.initActions();
    }
    render() {
      const thisBook = this;
      const generatedHtml = templates.book(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHtml);
      const bookContainer = document.querySelector(select.containerOf.books);
      bookContainer.appendChild(thisBook.element);
    }

    getElements() {
      const thisBook = this;
      thisBook.cover = thisBook.element.querySelector('.book__image');
    }

    initActions() {
      const thisBook = this; 
      thisBook.cover.addEventListener('click', function (event) {
        event.preventDefault();
        thisBook.announce();
      });
    }

    announce() {
      const thisBook = this;
      const event = new CustomEvent('updated', {
        bubbles: true,
        detail: {
          book: thisBook,
        }
      });
      thisBook.element.dispatchEvent(event);
      //console.log(event);
    }

  }
  const app = {

    initData: function () {
      const thisApp = this;

      thisApp.data = dataSource;
    },

    addToFavorites: function(e, book) {
      console.log(book);
    },

    initBooks: function () {
      const thisApp = this;
      const books = [];
      const favoriteBooks = [];
      
      for (let bookData of thisApp.data.books) {
        books.push(new Book(bookData));
        //console.log(new Book(bookData));
      }

      books.map((book) => {
        console.log(book);
        book.addEventListener('updated', function () {
          thisApp.addToFavorites(book);
        });
      });
    },

    init: function () {
      const thisApp = this;
      thisApp.initData();
      thisApp.initBooks();

    }
  };

  app.init();
}


