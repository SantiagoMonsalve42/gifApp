import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{
  //decorador para tener eferecnia de los elementos html del componente
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //para usar el servicio se inyecta en el constructor
  constructor(private servicio : GifsService){}

  
  buscar(): void{

    if(this.txtBuscar.nativeElement.value.trim().length ===0){
      return;
    }
    
    this.servicio.buscarGifts(this.txtBuscar.nativeElement.value);
    this.txtBuscar.nativeElement.value='';
  }

}
