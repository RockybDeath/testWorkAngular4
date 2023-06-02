import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAreaComponent } from './components/authentication/login-area/login-area.component';
import { WorkplaceAreaComponent } from './components/workplace-area/workplace-area.component';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HomeAreaComponent } from './components/home-area/home-area.component';
import { DestroyService } from './services/destroy.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorkplaceTableComponent } from './components/workplace-area/workplace-table/workplace-table.component';
import { StorageService } from './services/storage.service';
import { CampaignStorageService } from './services/campaign-storage.service';
import { ApplicationStorageService } from './services/application-storage.service';
import { OrderStorageService } from './services/order-storage.service';
import { WorkplaceOptionsComponent } from './components/workplace-area/workplace-options/workplace-options.component';
import { MatTableModule } from '@angular/material/table';
import { WorkplaceActionDialogComponent } from './components/workplace-area/workplace-action-dialog/workplace-action-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { WorkplaceOfferCreationComponent } from './components/workplace-area/workplace-offer-creation/workplace-offer-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAreaComponent,
    WorkplaceAreaComponent,
    HomeAreaComponent,
    ToolbarComponent,
    WorkplaceTableComponent,
    WorkplaceOptionsComponent,
    WorkplaceActionDialogComponent,
    WorkplaceOfferCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    UserService,
    DestroyService,
    StorageService,
    CampaignStorageService,
    ApplicationStorageService,
    OrderStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
