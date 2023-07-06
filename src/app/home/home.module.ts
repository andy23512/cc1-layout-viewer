import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';
import { LayoutViewerComponent } from './components/layout-viewer/layout-viewer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SwitchComponent } from './components/switch/switch.component';
import { HomeComponent } from './home.component';
import { CamelToKebabPipe } from './pipes/camel-to-kebab.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutViewerComponent,
    LayoutComponent,
    SwitchComponent,
    CamelToKebabPipe,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
