import { Component, EventEmitter, inject, Output } from '@angular/core';
import { OrderService } from '../order.service';
import { Pedido } from '../pedido';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent {
  private pedidoService = inject(OrderService)

  pedidosForCook: Pedido[] = []; //Pedidos Ingresados
  pedidoInCook: Pedido | null = null; //Pedido cocinando(null al iniciar)

  loadPedidos(){
    this.pedidosForCook = this.pedidoService.getIngresados();
  }

  loadOnCook(){
    this.pedidoInCook = this.pedidoService.getPedidoInCook();
  }

  toCook(pedido: Pedido){
    this.pedidoService.setInCook(pedido)
    this.loadPedidos()
    this.loadOnCook()
  }


  @Output() onSaveToDelivery = new EventEmitter();
  toDelivery(pedido : Pedido | null){
    //Valido que no sea null para agregarlo
    if(pedido !==null){
      this.pedidoService.setToDelivery(pedido)
      this.loadOnCook()
      this.onSaveToDelivery.emit()
    }
  }

}
