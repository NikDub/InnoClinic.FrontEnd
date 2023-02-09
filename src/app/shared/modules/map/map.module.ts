import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';

@NgModule({
  imports: [
    CommonModule,
    AngularYandexMapsModule,
  ],
  exports:[MapComponent],
  declarations: [MapComponent]
})
export class MapModule { }
