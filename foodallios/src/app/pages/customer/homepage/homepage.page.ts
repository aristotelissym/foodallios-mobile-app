import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Shop } from 'src/app/interfaces/shop.interface';
import { HomepageService } from './homepage.service';
import { OverlayEventDetail } from '@ionic/core';
import { TableOrder } from 'src/app/interfaces/tableOrder.interface';
import { Purchase } from 'src/app/interfaces/purchase.interface';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  name: string;
  shopList: Shop[];
  userSession = sessionStorage.getItem('username');
  $isOpen: boolean = false;
  showFiller: boolean = false;

  productCart: TableOrder[] = [];
  cartItem: TableOrder;
  cart = [];
  qrData?;
  cartSize: number = (sessionStorage.getItem('productCart')).length;

  //Temp helper to init purchase.
  init_purchase = {
    customer: sessionStorage.getItem("customerId"),
    totalPrice: 0,
    description: "Dummy Purchase from source code x2",
    isValid: false,
    createdAt: new Date
  }
  purchase: Purchase;

  //Constructor.
  constructor(
    private service: HomepageService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    (await this.service.getShopList()).subscribe(
      shopList => {
        this.shopList = shopList; console.log(shopList)
      },
      (err) => {
        throw new Error(err)
      },
      () => { }
    )

    this.service.postPurchase(this.init_purchase).subscribe(
      (purchase: any) => {
        this.purchase = { ...purchase };
        sessionStorage.setItem('purchaseId', purchase.raw[0].id);
        //console.log(sessionStorage.getItem('purchaseId'));

      },
      (err) => {
        throw Error("something went wrong " + err)
      }
    );

    this.service.getUsersCustomerUsername(sessionStorage.getItem('username')).subscribe(
      res => sessionStorage.setItem('customerId', res.id)
    );

  }

  submitOrder(sessName: string) {
    //console.log(sessionStorage.getItem('customerId'))
    //console.log(this.validatePurchaseForm)

    this.cart = JSON.parse(sessionStorage.getItem(sessName))
    //Initialize the purchase entity from which the QR will be created
    let validatePurchaseForm = {
      id: sessionStorage.getItem('purchaseId'),
      isValid: true,
      totalPrice: 0,
      createdAt: Date,
    }


    //console.log(this.cart)

    //Create Table Orders, which will be added in the purchaseId entity
    this.cart.forEach((tableOrder: TableOrder) => {
      
      validatePurchaseForm.totalPrice += tableOrder.orderPrice;
      
      this.service.postTableOrder(tableOrder).subscribe(
        () => { /*this.cartItem = cartItem;*/ },
        (err) => new Error("Something happened " + err)
      );

      this.service.updateProductQuantity({
        id: tableOrder.productId,
        quantity: tableOrder.quantity
      })
    }
    )

    //console.log(validatePurchaseForm)
    this.service.validPurchase(validatePurchaseForm).subscribe(updatedPurchaseForm => console.log(updatedPurchaseForm))
    
    this.qrData = JSON.stringify(this.service.getUsersPurchase(sessionStorage.getItem('purchaseId')));
  }

  //Get product list of Shop {{ shop.id }}
  moreBtn(shop: Shop) {
    this.route.snapshot.paramMap.get(shop.id)
  }

  //Actual Cart Function. Cart is only in Session storage.
  async getCartContent(sessionCart: string) {

    this.$isOpen = true;

    let prop = JSON.parse(sessionStorage.getItem(sessionCart));
    console.log(prop);

    await prop.forEach(product => {
      this.productCart.push(product)
    });
  }


  //Helpers for modal
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    this.$isOpen = false;
    this.productCart = [];
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
