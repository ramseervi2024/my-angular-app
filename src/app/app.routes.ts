import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { About } from './about/about';
import { Services } from './services/services';
import { ServiceDetail } from './service-detail/service-detail';
import { Contact } from './contact/contact';
import { GetStarted } from './get-started/get-started';
import { Todos } from './todos/todos';
import { TodoDetail } from './todo-detail/todo-detail';
import { CreatePost } from './create-post/create-post';

export const routes: Routes = [
  { path: '', component: MainContent },
  { path: 'about', component: About },
  { 
    path: 'services', 
    children: [
      { path: '', component: Services },
      { path: ':id', component: ServiceDetail }
    ]
  },
  { 
    path: 'todos', 
    children: [
      { path: '', component: Todos },
      { path: 'create', component: CreatePost },
      { path: ':id', component: TodoDetail }
    ]
  },
  { path: 'contact', component: Contact },
  { path: 'get-started', component: GetStarted },
];
