import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NearbyComponent } from './nearby/nearby.component';
import { RegisterComponent } from './register/register.component';
import { ReviewCompleteComponent } from './review-complete/review-complete.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'reviewcomplete', component: ReviewCompleteComponent },
  { path: 'nearby', component: NearbyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
