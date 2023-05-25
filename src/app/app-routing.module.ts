import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { VerifyEmailComponent } from './account/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SignGuard } from './shared/guard/sign.guard';
import { AboutUsComponent } from './student/about-us/about-us.component';
import { TeacherGuard } from './shared/guard/teacher.guard';
import { StudentGuard } from './shared/guard/student.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoRoleComponent } from './no-role/no-role.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'about', pathMatch: 'full', component: AboutUsComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [SignGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignGuard] },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
    canActivate: [StudentGuard],
  }, //, canActivate: [AuthGuard]
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [TeacherGuard],
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [TeacherGuard],
  },
  {
    path: 'no-role',
    component: NoRoleComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
