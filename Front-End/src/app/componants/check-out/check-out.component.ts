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

  constructor(private cart: CartServiceService, private formChildGroup: FormBuilder
    , private stateContry: StateCountryServiceService,  private card: CartServiceService
  ) {
  }

  ngOnInit(): void {
    this.myForm();
    this.getTotals();
    this.cart.calculateTotals();
    this.getAllCountries();


  }

  getTotals() {
    this.cart.totalOrders.subscribe(
      data => {
        this.totalSize = data;
      }
    );
    this.cart.totalPrice.subscribe(
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
      let client = this.checkoutParentGroup.controls['data'].value;
      /* #2 */
      let fromAddress =  this.checkoutParentGroup.controls['fromPerson'].value;
      /* #3 */
      let toAddress =  this.checkoutParentGroup.controls['toPerson'].value;
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
