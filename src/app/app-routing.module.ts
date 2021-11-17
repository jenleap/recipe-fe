import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    { path: '', component: RecipeListComponent },
    { path: 'login', component: LoginComponent },
    //{ path: 'create-food', component: FoodCreateComponent, canActivate: [AuthGuard] },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'create-recipe', component: RecipeCreateComponent },
    { path: 'recipe/:id', component: RecipeViewComponent },
    { path: 'edit-recipe/:id', component: RecipeCreateComponent },
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthGuard ]
})
export class AppRoutingModule { }
