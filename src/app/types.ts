export interface IBook {
    book_author: string[],
    book_pages: number,
    book_publication_city: string,
    book_publication_country: string,
    book_publication_year: number,
    book_title: string,
    id: number
}

export enum loadingStatus {
    loading = 'loading',
    success = 'success',
    failed = 'failed'
}