import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchGifsResponse,Gif } from '../interfaces/gifs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
    private url: string = "https://api.giphy.com/v1/gifs";
    private _listaHistorial: string[]=[];
    private apiKey: string ="zmQNX4vs8H1bFbBbMLUU447NETFRlPML";
    public resultados: Gif[]=[];

    get listaHistorial(){
      return [...this._listaHistorial];
    }

    //inyeccion de dependencia HTTP
    constructor(private http: HttpClient){
      //FORMA DE CARGAR DATOS DEL LOCALSTORAGE SIMPLIFICADA
      this._listaHistorial=JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados=JSON.parse(localStorage.getItem('lastResult')!) || [];
     
      /*FORMA DE CARGAR DATOS DEL LOCALSTORAGE EXTENSA
      //PRECISENCIA DE DATOS DEL LOCAL STORAGE
      if(localStorage.getItem('historial')) {
        // ! PARA OBLIGAR A TS A QUE LA LISTA NO ES NULA GRACIAS AL IF
        this._listaHistorial=JSON.parse(localStorage.getItem('historial')!);

      }
      */
    }

    buscarGifts( query : string= ''): void{
        query=query.trim().toLowerCase();
      if(!this._listaHistorial.includes(query)){
        this._listaHistorial.unshift(query);
        this._listaHistorial=this._listaHistorial.splice(0,10);
        //agregar la lista de historial al localStorage
        localStorage.setItem('historial',JSON.stringify( this._listaHistorial));
      }
      //<> interfaz de resultado

        const params = new HttpParams()
        .set('api_key',this.apiKey)
        .set('q',query)
        .set('limit','12');

        //url del servicio centralizado
        this.http.get<SearchGifsResponse>(`${this.url}/search`,{params})
              .subscribe( (response) => {
                  console.log( response.data );
                  this.resultados=response.data;
                  localStorage.setItem('lastResult',JSON.stringify( this.resultados)); 
              });
        


      /*consume a API in a bad way
      fetch('https://api.giphy.com/v1/gifs/search?api_key=zmQNX4vs8H1bFbBbMLUU447NETFRlPML&q=papas&limit=10')
      .then( resp => {
          resp.json().then(data =>{
            console.log(data);
          } )
       })
       */
}
}
