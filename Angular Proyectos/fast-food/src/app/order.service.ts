import { Injectable } from '@angular/core';
import { Pedido } from './pedido';
import { immediateProvider } from 'rxjs/internal/scheduler/immediateProvider';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private pedidosIngresados: Pedido[] = [];
  private pedidoInCook: Pedido | null = null;
  private pedidosToDelivery : Pedido[] = [];

  //Añado nuevo pedido
  add(pedido : Pedido){
    this.pedidosIngresados.push(pedido)
  }

  //Traigo los pedidos ingresados
  getIngresados(): Pedido[] {
    return[
      ...this.pedidosIngresados
    ]
  }

  //Paso de ingresado a la seccion de cocina
  setInCook(pedido: Pedido){
    //Lo saco de espera
    this.pedidosIngresados = this.pedidosIngresados.filter(item=> item.number !== pedido.number)
    //Lo pongo como pedido a cocinar
    this.pedidoInCook = pedido
    console.log(this.pedidosIngresados)
  }

  //Traigo el pedido para cocinar
  getPedidoInCook(): Pedido | null{
    return this.pedidoInCook;
  }

  //Paso el pedido a zona de entrega
  setToDelivery(pedido : Pedido){
    //Saco el pedido de la cocina
    this.pedidoInCook = null
    this.pedidosToDelivery.push(pedido)
  }

  //Traigo todos los pedidos para entregar
  getDelivery(): Pedido[]{
    return[
      ...this.pedidosToDelivery
    ]
  }

  //Saco el pedido entregado
  pedidoDelivered(pedido:Pedido){
    this.pedidosToDelivery = this.pedidosToDelivery.filter(item=> item.number !== pedido.number)
    this.pedidosIngresados = this.pedidosIngresados.filter(item=> item.number !== pedido.number)
  }

}
