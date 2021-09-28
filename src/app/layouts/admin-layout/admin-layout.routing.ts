import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
// import { NotificationsComponent } from '../../notifications/notifications.component';
import { WalletsComponent } from 'app/wallets/wallets.component';
import { WalletDetailsComponent } from 'app/wallet-details/wallet-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',         component: DashboardComponent },
    { path: 'wallets',           component: WalletsComponent },
    { path: 'wallets/:walletId', component: WalletDetailsComponent },
    // { path: 'user-profile',      component: UserProfileComponent },
    { path: 'table-list',        component: TableListComponent },
    // { path: 'notifications',     component: NotificationsComponent },
];
