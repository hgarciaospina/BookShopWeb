/* Corresponds to the CategoryResponse of the backend. */
export interface Category {
  id: number;
  name: string;
}

/* Corresponds to the CategoryRequest of the backend. */
export interface CategoryRequest {
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