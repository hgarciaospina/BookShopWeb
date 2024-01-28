import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';

export const routes: Routes = [
    {
        path: "",
        component: WelcomeComponent 
    },
    {
        path: "author",
        component: AuthorComponent 
    },
    {
        path: "book",
        component: BookComponent 
    },
    {
        path: "category",
        component: CategoryComponent 
    }
];
