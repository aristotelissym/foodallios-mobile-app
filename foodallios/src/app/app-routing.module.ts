import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/welcome-page/welcome-page.module').then( m => m.WelcomePagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/customer/homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'shop-product-list',
    loadChildren: () => import('./pages/customer/shop-product-list/shop-product-list.module').then( m => m.ShopProductListPageModule)
  },
  {
    path: 'shop-product-list-details',
    loadChildren: () => import('./pages/customer/shop-product-list-details/shop-product-list-details.module').then( m => m.ShopProductListDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
