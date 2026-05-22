import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { About } from './about/about';
import { Services } from './services/services';
import { ServiceDetail } from './service-detail/service-detail';
import { Contact } from './contact/contact';
import { GetStarted } from './get-started/get-started';

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
  { path: 'contact', component: Contact },
  { path: 'get-started', component: GetStarted },
];
