import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, FlexLayoutModule, RouterModule],
  exports: [HeaderComponent, MatButtonModule, MatIconModule, FlexLayoutModule]
})
export class LayoutModule {}
