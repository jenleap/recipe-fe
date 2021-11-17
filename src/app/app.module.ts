import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { ServingsConfirmComponent } from './components/servings-confirm/servings-confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchFoodsComponent } from './components/search-foods/search-foods.component';
import { SimpleTextEditComponent } from './components/common/simple-text-edit/simple-text-edit.component';
import { InputToggleComponent } from './components/common/input-toggle/input-toggle.component';
import { FoodEditComponent } from './components/common/food-edit/food-edit.component';
import { FoodsListComponent } from './components/common/foods-list/foods-list.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DecimalToFractionComponent } from './components/common/decimal-to-fraction/decimal-to-fraction.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { FoodService } from './services/food.service';
import { LogService } from './services/log.service';
import { RecipeService } from './services/recipe.service';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeViewComponent,
    RecipeItemComponent,
    RecipeCreateComponent,
    ServingsConfirmComponent,
    SearchFoodsComponent,
    SimpleTextEditComponent,
    InputToggleComponent,
    FoodEditComponent,
    FoodsListComponent,
    DecimalToFractionComponent,
    LoginComponent
  ],
  entryComponents: [
    SearchFoodsComponent,
    ServingsConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    FoodService,
    LogService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
