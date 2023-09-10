
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters div',
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
      const ratingBgc = thisBook.determineRatingBgc(thisBook.data.rating);
      thisBook.data.ratingBgc = ratingBgc;
      const ratingWidth = thisBook.data.rating * 10;
      console.log('thisBook.rating', thisBook.data.rating);
      console.log('ratingWidth', parseInt(ratingWidth));
      //console.log('ratingWidth', ratingWidth);
      thisBook.data.ratingWidth = ratingWidth;
      console.log(thisBook.data);
      const generatedHtml = templates.book(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHtml);
      const bookContainer = document.querySelector(select.containerOf.books);
      bookContainer.appendChild(thisBook.element); 
      console.log(thisBook.element); 
    }

    getElements() {
      const thisBook = this;
      thisBook.cover = thisBook.element.querySelector('.book__image');
    }

    initActions() {
      const thisBook = this; 
      thisBook.cover.addEventListener('dblclick', function (event) {
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

    determineRatingBgc(data) {
      const thisBook = this;
      if(data < 6) {
        return 'linear-gradient(to bottom, #fefcea 0, #f1da36 100%);';
      } else if (data > 6 && data <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
      } else if (data > 8 && data <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (data > 9) {
        return 'linear-radient(to bottom, #ff0084 0%, #ff0084 100%);';
      }
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

    filterBooks: function (array) {
      const thisApp = this; 
      thisApp.shouldBeHidden = false; 
      thisApp.data.books.map((book) => {
        console.log('book', book);
        array.map((filter) => {
          console.log('filter', filter);
          if(!book.details[filter]) {
            thisApp.shouldBeHidden = false;
            return;
          } else if(book.details[filter]) {
            thisApp.shouldBeHidden = true;
          }
        });
        if(thisApp.shouldBeHidden) {
          document.querySelector(`.book__image[data-id="${book.id}"]`).classList.add('hidden');
        } else {
          document.querySelector(`.book__image[data-id="${book.id}"]`).classList.remove('hidden');
        }
      });
    },

    initBooks: function () {
      const thisApp = this;
      const books = [];
      thisApp.favoriteBooks = [];
      const filtersArray = [];
      const booksParent = document.querySelector('.books-list');

      thisApp.filters = document.querySelector(select.containerOf.filters);
      console.log(thisApp.filters);

      thisApp.filters.addEventListener('click', function (e) {
        if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.name === 'filter') {
          if(e.target.checked) {
            filtersArray.push(e.target.value);
            thisApp.filterBooks(filtersArray);
          } else if (!e.target.checked) {
            const posTarget = filtersArray.indexOf(e.target.value);
            filtersArray.splice(posTarget, 1);
            thisApp.filterBooks(filtersArray);
          }
        }
      });

      booksParent.addEventListener('updated', function (e) {
        e.preventDefault(); 
        const addActive = e.target.querySelector('.book__image');
        const attr = addActive.getAttribute('data-id');
        if(!thisApp.favoriteBooks.includes(attr)) {
          thisApp.favoriteBooks.push(attr);
          addActive.classList.add('favorite');
        } else if (thisApp.favoriteBooks.includes(attr)) {
          addActive.classList.remove('favorite');
          const attrPos = thisApp.favoriteBooks.indexOf(attr); // sprawdzamy na jakiej pozycji jest attr w tablicy favoriteBooks
          //console.log('attrPos', attrPos);
          thisApp.favoriteBooks.splice(attrPos, 1); // usuwamy element z pozycji na której stał // splice usuwa index na której stoi element, nie można szukać po elemencie a po indexie! 
          console.log(thisApp.favoriteBooks);
        }
      });

      for (let bookData of thisApp.data.books) {
        books.push(new Book(bookData));
        console.log('ruszyła');
      }
    },

    init: function () {
      const thisApp = this;
      thisApp.initData();
      thisApp.initBooks();
      //thisApp.filterBooks();

    }
  };

  app.init();
}


