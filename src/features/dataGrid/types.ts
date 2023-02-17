export enum book {
    author = 'book_author',
    pages = 'book_pages',
    publication_city = 'book_publication_city',
    publication_country = 'book_publication_country',
    publication_year = 'book_publication_year',
    title = 'book_title',
    id = 'id'
}

export const bookListColumns = [{ field: book.id },
{ field: book.title },
{ field: book.author },
{ field: book.publication_city },
{ field: book.publication_country },
{ field: book.publication_year },
{ field: book.pages }]