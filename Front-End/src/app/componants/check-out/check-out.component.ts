import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartServiceService} from '../../service/cart-service.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  checkoutParentGroup : FormGroup;
  totalOrder: number = 0;
  totalPrice: number = 0;
  constructor(private cart: CartServiceService,private  formChildGroup : FormBuilder) { }

  ngOnInit(): void {
    this.myForm()
    this.getTotals()
    this.cart.calculateTotals()
  }

  getTotals(){
    this.cart.totalOrders.subscribe(
      data => {
        this.totalOrder = data
      }
    )
    this.cart.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    )
  }


  private myForm() {
    this.checkoutParentGroup = this.formChildGroup.group({
        data : this.formChildGroup.group({
          fullName: [''],
          gmail: [''],
          phone: ['']
        }),

        fromPerson: this.formChildGroup.group({
          country: ['1'],
          state: ['1'],
          zipCode: ['1']
        }),
        toPerson: this.formChildGroup.group({
          country: [''],
          state: [''],
          zipCode: ['3']
        }),
        creditCard: this.formChildGroup.group({
          cardType: ['Visa'],
          cardNumber: [''],
          code: ['']
        })

      }
    )

  }

  done() {
    console.log(this.checkoutParentGroup.get('data.fullName').value)
    console.log(this.checkoutParentGroup.get('fromPerson').value)
    console.log(this.checkoutParentGroup.get('toPerson').value)
    console.log(this.checkoutParentGroup.get('creditCard').value)
  }

  similarGroup(event: Event) {
    if((<HTMLInputElement>event.target).checked){
      this.checkoutParentGroup.controls.toPerson
        .setValue(this.checkoutParentGroup.controls.fromPerson.value)
    } else {
      this.checkoutParentGroup.controls.toPerson.reset()
    }
  }
}
