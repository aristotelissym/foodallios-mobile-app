import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonMenu, IonModal } from '@ionic/angular';
import { Shop } from 'src/app/interfaces/shop.interface';
import { HomepageService } from './homepage.service';
import { OverlayEventDetail } from '@ionic/core';
import { TableOrder } from 'src/app/interfaces/tableOrder.interface';
import { Purchase } from 'src/app/interfaces/purchase.interface';
import { SharedFuns } from 'src/app/shared/shared';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonMenu) sidemenu: IonMenu;

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
  cartSize: number = (JSON.stringify(sessionStorage.getItem('productCart'))).length;
  totalPriceShow?;
  

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
    private sharedFuns: SharedFuns
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

    this.showDetails();
  }

  //Get product list of Shop {{ shop.id }}
  moreBtn(shop: Shop) {
    this.route.snapshot.paramMap.get(shop.id)
  }

  //Actual Cart Function. Cart is only in Session storage.
  async getCartContent(sessionCart: string) {

    this.$isOpen = true;
    let totalPriceShow;

    let prop = JSON.parse(sessionStorage.getItem(sessionCart));
    console.log(prop);

    await prop.forEach(product => {
      this.productCart.push(product)
      console.log(product)

      this.totalPriceShow = product.orderPrice;
    });

    totalPriceShow = this.totalPriceShow;
  }

  //open side menu
  openSideNav() {
    this.sidemenu.open(true);
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

  showDetails() {
    this.sharedFuns.presentToast("top", "Your order is Ready! &#128523 Keep this QR image and to get your order! &#128692", "primary")
  }
}
