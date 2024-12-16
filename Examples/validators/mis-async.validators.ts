import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { StorageService } from "../services/local-storage.service";
import { ApiService } from "../services/api.service";

export class MiscAsyncValidator{

    private readonly apiService = inject(ApiService);
    private readonly storageService = inject(StorageService);

    //valida (con la API) q el valor de cierto atributo es UNICO
    uniqueZoneNameValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) { return of(null); }
    
        return of(control.value).pipe(
          tap((dato: any) => { console.log('dato (nombre zona) a validar:', dato); }),

          switchMap(() => this.apiService.getModeByNameAndUserId(this.storageService.getUserId(), control.value)),
          tap((response) => { console.log('response:', response); }),
    
          map(response => {          
            if (response) {
              for(let a of response){
                if(a.name == control.value){
                  console.log('ya existe un Modo con este nombre: ', control.value);
                return { modeNameNotUnique: true };
                }
              }
            }
            return null;
          }),
          catchError((error) => {
            console.error('Error en la validación:', error);
            return of(null);
          })
        );
      };
    }














  //validacion asincrona, donde se verifica q un email tiene menos de 3 Orders en las ultimas 24hrs
  emailOrderLimitValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return of(control.value).pipe(
        tap((email) => {
          console.log('Email a validar:', email);
        }),
        switchMap(() => this.apiService.getOrdersByEmail(control.value)),
        tap((orders) => {
          console.log('Órdenes obtenidas:', orders);
        }),
        map(orders => {
          // Obtenemos la fecha actual
          const now = new Date();
          
          // Filtramos los pedidos de las últimas 24 horas
          const recentOrders = orders.filter(order => {
            const orderDate = order.lastUpdateDate ? new Date(order.lastUpdateDate) : new Date();
            const differenceInMilliseconds = now.getTime() - orderDate.getTime();
            console.log('Diferencia en milisegundos:', differenceInMilliseconds);
            
            // Convertimos la diferencia a horas dividiendo por 1000 milisegundos,
            //60 segundos y 60 minutos
            const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
            console.log('Diferencia en horas:', differenceInHours);
            
            return differenceInHours <= 24;
          });

          // Si hay más de 3 pedidos en las últimas 24 horas, retornamos el error
          if (recentOrders.length >= 3) {
            console.log('Error al validar el límite de pedidos:', recentOrders);
            return { errorPedidos24hrs: true };
          }

          return null;
        }),
        catchError((error) => {
          console.error('Error en la validación:', error);
          return of(null);
        })
      );
    };
  }

}