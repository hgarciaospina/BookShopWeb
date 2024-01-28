export interface Category {
  id: number;
  name: string;
}

export interface Author {
    id: number;
    firstName: string;
    lastName:  string;
    biography: string;
}

export interface Book {
    id: number;
	title: string;
	description: string ;
	price: number;
	isbn: string;
	pages: number;
    releaseDate: Date;
	image: string;
	category: Category;
	author: Author ;
}