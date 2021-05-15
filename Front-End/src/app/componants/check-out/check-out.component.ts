import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartServiceService} from '../../service/cart-service.service';
import {StateCountryServiceService} from '../../service/state-country-service.service';
import {Country} from '../../model/country';
import {State} from '../../model/state';
import {SpaceValidator} from '../../model/space-validator';
import {RequestOrder} from '../../model/request-order';
import {Item} from '../../model/item';
import {CartOrder} from '../../model/cart-order';
import {PurchaseRequest} from '../../model/purchase-request';
import {PurchaseServiceService} from '../../service/purchase-service.service';
import {Client} from '../../model/client';
import {Address} from '../../model/address';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  checkoutParentGroup: FormGroup;
  countries: Country[] = [];
  statesFromPerson: State[] = [];
  statesToPerson: State[] = [];
  totalSize: number = 0;
  totalPrice: number= 0;

  constructor(private card: CartServiceService, private formChildGroup: FormBuilder
    , private stateContry: StateCountryServiceService ,private ps: PurchaseServiceService

  ) {
  }

  ngOnInit(): void {
    this.myForm();
    this.getTotals();
    this.card.calculateTotals();
    this.getAllCountries();


  }

  getTotals() {
    this.card.totalOrders.subscribe(
      data => {
        this.totalSize = data;
      }
    );
    this.card.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );
  }


  private myForm() {
    this.checkoutParentGroup = this.formChildGroup.group({
        data: this.formChildGroup.group({
          fullName: new FormControl('', [
            Validators.required,
            SpaceValidator.onlyContainSpace,
            Validators.minLength(6)]),
          gmail: new FormControl('', [
            Validators.required,
            Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
          ]),
          phone: new FormControl('', [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern('^[0-9]*$')
          ])
        }),

        fromPerson: this.formChildGroup.group({
          country: [''],
          state: [''],
          zipCode: ['']
        }),
        toPerson: this.formChildGroup.group({
          country: [''],
          state: [''],
          zipCode: ['']
        }),
        creditCard: this.formChildGroup.group({
          cardType: ['Visa'],
          cardNumber: [''],
          code: ['']
        })

      }
    );

  }

  get fullName() { // get -> element from html
    return this.checkoutParentGroup.get('data.fullName');
  }

  get email() {
    return this.checkoutParentGroup.get('data.gmail');
  }

  get phone() {
    return this.checkoutParentGroup.get('data.phone');
  }

  done() {
    if (this.checkoutParentGroup.invalid) {
      this.checkoutParentGroup.markAllAsTouched();
    } else {
      let client: Client = new Client();
      client.name = this.checkoutParentGroup.controls['data'].value.fullName;
      client.email = this.checkoutParentGroup.controls['data'].value.gmail;
      client.phoneNumber = this.checkoutParentGroup.controls['data'].value.phone;

      /* #2 */
      let fromAddress: Address =  this.checkoutParentGroup.controls['fromPerson'].value
      fromAddress.state = fromAddress.state['name']
      /* #3 */
      let toAddress: Address =  this.checkoutParentGroup.controls['toPerson'].value;
      toAddress.state = toAddress.state['name']

      /* #4 */
      let requestOrder = new RequestOrder();
      requestOrder.totalPrice = this.totalPrice;
      requestOrder.totalQuantity = this.totalSize;
      /* #5 */
      let items: Item[] = [];
      let orders: CartOrder[] = this.card.orders;
      for (let i=0;i<orders.length;i++){
        items[i] = new Item(orders[i]);
      }
      let purchaseRequest = new PurchaseRequest();
      purchaseRequest.client = client;
      purchaseRequest.fromAddress = fromAddress;
      purchaseRequest.toAddress = toAddress;
      purchaseRequest.requestOrder = requestOrder;
      purchaseRequest.items = items;
      console.log("--------------------------")
      console.log(purchaseRequest.client)
      console.log(purchaseRequest.fromAddress)
      console.log(purchaseRequest.toAddress)
      console.log(purchaseRequest.requestOrder)
      console.log(purchaseRequest.items)
      this.ps.getOrder(purchaseRequest).subscribe({
        next: response=> {
          alert("OK")
        },
        error: error =>{
          console.log("Error is : " + error.message)
        }
      })
    }
  }

  similarGroup(event: Event) {
    if ((<HTMLInputElement> event.target).checked) {
      this.checkoutParentGroup.controls.toPerson
        .setValue(this.checkoutParentGroup.controls.fromPerson.value);
      this.statesToPerson = this.statesFromPerson;
    } else {
      this.checkoutParentGroup.controls.toPerson.reset();
    }
  }

  getAllCountries() {
    this.stateContry.getAllCountry().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  // getAllStates() {
  //    this.stateContry.getAllStates().subscribe(
  //      data => {
  //        this.states = data
  //      }
  //    )
  //  }
  getStatesByCode(typeform: string) {
    const code = this.checkoutParentGroup.get(`${typeform}.country`).value;

    this.stateContry.getStatesByCode(code).subscribe(
      data => {
        if (typeform === 'fromPerson') {
          this.statesFromPerson = data;
        } else {
          this.statesToPerson = data;
        }
        this.checkoutParentGroup.get(`${typeform}.state`).setValue(data[0]);
      }
    );
  }
}
