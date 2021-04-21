import { Component, OnInit } from '@angular/core';
import {Order} from '../../model/order';
import {OrderServiceService} from '../../service/order-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order = null;
  constructor(private orderService: OrderServiceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder(){
    let id = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(id).subscribe(
      data =>{
        this.order = data
      }
    )
  }
  allOrders() {
    this.router.navigateByUrl('/orders')
  }



}
