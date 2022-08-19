import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { getOrderItemsWithQuantity, getPaymentDue, OrderItem } from "../order.model";

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnChanges {

  // TODO-15:
  //   With the right updaters, patchers and selectors, we can do without
  //   1. the `@Input`
  //   2. the `@Output`
  //   3. now that `order$` can be sync'ed up in store, that's
  //      you `dataSource`
  //   4. * and... deal with `paymentDue` too
  @Input() order: OrderItem[] = [];
  @Output() emitPayment = new EventEmitter<number>();

  paymentDue = 0;

  dataSource: any;
  displayedColumns: string[] = ['name', 'cost', 'quantity', 'due'];

  // TODO-16:
  //   1. will no longer need any of this method's statements! delete it
  ngOnChanges() {
    this.order = getOrderItemsWithQuantity(this.order);
    this.paymentDue = getPaymentDue(this.order);
    this.dataSource = this.order;
  }

  // TODO-17:
  //   1. as agreed, no emitting or setting here, so:
  //      all this method should do is call the store's `makePayment()`
  //
  makePayment() {
    this.emitPayment.emit(this.paymentDue);
    this.paymentDue = 0;
    this.dataSource = [];
  }
}

// 15.4 in the template, Lines 28+ should become:
// <ng-container *ngIf="paymentDue$ | async as paymentDue">
//   {{ paymentDue | currency }}
// </ng-container>
