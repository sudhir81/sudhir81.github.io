import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { LeadershipComponent } from './pages/leadership/leadership.component';
import { FounderComponent } from './pages/founder/founder.component';
import { CasesComponent } from './pages/cases/cases.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '',           component: HomeComponent,       title: 'TerraForge Cloud' },
  { path: 'services',   component: ServicesComponent,   title: 'Services — TerraForge Cloud' },
  { path: 'leadership', component: LeadershipComponent, title: 'Leadership — TerraForge Cloud' },
  { path: 'founder',    component: FounderComponent,    title: 'Sudhir Dalvi — TerraForge Cloud' },
  { path: 'cases',      component: CasesComponent,      title: 'Case Studies — TerraForge Cloud' },
  { path: 'projects',   component: ProjectsComponent,   title: 'Projects — TerraForge Cloud' },
  { path: 'partners',   component: PartnersComponent,   title: 'Partners — TerraForge Cloud' },
  { path: 'faq',        component: FaqComponent,        title: 'FAQ — TerraForge 