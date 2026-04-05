import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInitiateComponent } from './customer-main/initiate/customer-initiate.component';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomerViewComponent } from './customer-main/view/customer-view.component';
import { CustomerRoleComponent } from './customer-role/customer-role.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { CsFormComponent } from './customer-service/pages/cs-form/cs-form.component';
import { CsListComponent } from './customer-service/pages/cs-list/cs-list.component';
import { CompletionComponent } from './pages/completion/completion.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { SetupHomeComponent } from './pages/setup-home/setup-home.component';
import { RoleComponent } from './role/role.component';
import { RoleFormComponent } from './role/pages/role-form/role-form.component';
import { RoleListComponent } from './role/pages/role-list/role-list.component';
import { ServiceCategoryComponent } from './service-category/service-category.component';
import { CategoryFormComponent } from './service-category/pages/category-form/category-form.component';
import { CategoryListComponent } from './service-category/pages/category-list/category-list.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/pages/user-form/user-form.component';
import { UserListComponent } from './user/pages/user-list/user-list.component';
import { UserRoleComponent } from './user-role/user-role.component';

const routes: Routes = [
  { path: '', component: SetupHomeComponent, data: { animation: 'setupHome' } },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'completion', component: CompletionComponent },
  { path: 'customer-main', component: CustomerMainComponent },
  { path: 'customer-main/initiate', component: CustomerInitiateComponent },
  { path: 'customer-main/view', component: CustomerViewComponent },
  { path: 'role', component: RoleComponent },
  { path: 'role/form', component: RoleFormComponent },
  { path: 'role/list', component: RoleListComponent },
  { path: 'service-category', component: ServiceCategoryComponent },
  { path: 'service-category/form', component: CategoryFormComponent },
  { path: 'service-category/list', component: CategoryListComponent },
  { path: 'customer-service', component: CustomerServiceComponent },
  { path: 'customer-service/form', component: CsFormComponent },
  { path: 'customer-service/list', component: CsListComponent },
  { path: 'customer-role', component: CustomerRoleComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/form', component: UserFormComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'user-role', component: UserRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
