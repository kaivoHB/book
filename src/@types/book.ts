export type IBook = {
    id: string,
    title: string,
    author: string,
    description: string,
    image_url: string,
    price: {
        currency: string,
        value: number,
        displayValue: string
    }
};

export type IBookState = {
    isLoading: boolean;
    error: Error | string | null;
    books: IBook[];
    book: IBook | null;
};