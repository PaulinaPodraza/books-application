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
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };
  function render() {
      const thisBook = this;
    //pętla po każdym elemencie z dataSource.books
    for (let book of dataSource.books) {
      console.log(book);
      const generatedHTML = templates.bookTemplate();
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const booksListContainer = document.querySelector(select.containerOf.booksList);
      booksListContainer.appendChild(thisBook.element);
    }
  }
    render();

    let favoriteBooks = [];
    initActions(){
        const booksImage = document.querySelectorAll(select.booksImages.images);
        for (let image of booksImage) {
            image.addEventListener('dblclick', function (event) {
                event.preventDefault();
            });
            image.classList.add('favorite');
            const idBook = image.getAttribute('data-id');
           favoriteBooks.push(idBook);
        }
    }
    initActions();

}