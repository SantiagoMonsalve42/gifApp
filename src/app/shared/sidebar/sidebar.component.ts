import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

  constructor(private servicio: GifsService) { }

  // get para usar las variables del servicio
  
  get listaHistorial(){
    return this.servicio.listaHistorial;
  }

  buscar(busqueda: string){
    this.servicio.buscarGifts(busqueda);
  }
}
