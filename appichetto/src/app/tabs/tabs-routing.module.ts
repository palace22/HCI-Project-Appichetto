import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { FriendsListComponent } from './profile/friends-list/friends-list.component';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../login/login.module').then(m => m.LoginPageModule)
      },
    ],
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ticket',
        children: [
          {
            path: '',
            redirectTo: '/tabs/ticket/import',
            pathMatch: 'full'
          },
          {
            path: 'import',
            loadChildren: () =>
              import('../tabs/import-ticket/import-ticket.module').then(m => m.ImportTicketPageModule)
          },
          {
            path: 'split',
            loadChildren: () =>
              import('../tabs/split-ticket/split-ticket.module').then(m => m.SplitTicketPageModule)
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/profile/profile.module').then(m => m.ProfilePageModule),
          },
          {
            path: 'friends-list',
            component: FriendsListComponent,
          },
        ],
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
