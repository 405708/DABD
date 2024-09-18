import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Pedido } from '../pedido';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-delivery-point',
  standalone: true,
  imports: [],
  templateUrl: './delivery-point.component.html',
  styleUrl: './delivery-point.component.css'
})
export class DeliveryPointComponent {
  private orderService = inject(OrderService)
  pedidosForDeliver: Pedido[]= [];

  @Output() onDeliver = new EventEmitter();


  loadToDelivery(){
    this.pedidosForDeliver = this.orderService.getDelivery();
  }

  delivered(pedido : Pedido){
    this.orderService.pedidoDelivered(pedido);
    this.loadToDelivery();
    this.onDeliver.emit(); //Emito evento para que el padre escuche y actualice
  }
}
