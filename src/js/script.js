/*eslint-disable*/
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksImages: {
      images: '.books-list .book__image',
    }
  };
  const classNames = {
    books: {
      favoriteBook: 'favorite',
      filters: '.filters',
    }
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };
  function render() {
    const thisBook = this;
    //pętla po każdym elemencie z dataSource.books
    for (let book of dataSource.books) {
      const generatedHTML = templates.bookTemplate(book);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const booksListContainer = document.querySelector(select.containerOf.booksList);
      booksListContainer.appendChild(thisBook.element);
    }
  }
  render();

  let favoriteBooks = [];
  let filters = [];
  const filtr = document.querySelector('.filters');
  
  function initActions() {
    const booksImage = document.querySelectorAll(select.booksImages.images);
    for (let image of booksImage) {
      const idBook = image.getAttribute('data-id');
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const image = event.target.offsetParent;
        const bookList = favoriteBooks.includes(idBook);
        if (!bookList) {
          image.classList.add('favorite');
          favoriteBooks.push(idBook);
        }
        else{
          // usunięcie z klikniętego elementu klasy favorite
          image.classList.remove(classNames.books.favoriteBook);
          // przefiltrowanie tablicy i dodanie nowej bez tego elementu
          favoriteBooks = favoriteBooks.filter(id => id !== idBook);
        }
      });
    }
    filtr.addEventListener('click', function (event) {
      event.preventDefault();
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
        if (event.target.checked) {
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value));
        }
      }
    });
  }
  filterBooks();

  
  function filterBooks() {
    for (book of dataSource.books) {
      let shouldBeHidden = false;
      for (filter of filters) {
           if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
        }
      }
      if (shouldBeHidden) {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.add('hidden');
        } else {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.remove('hidden');
        }
    }
  }
  initActions();
  
  function determineRatingBgc(rating){
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }
}