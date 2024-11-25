import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  ngOnInit(): void {
    this.initializeCart();
    this.loadCart();
  }

  initializeCart() {
    // Check if cart is empty in localStorage and add default items
    if (!localStorage.getItem('cart')) {
      const cartItems = [
        {
          name: 'Nike Air Max',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnzcSn5AH76LVURCmuizo68jn3aAEVsYj8_g&s',

          color: 'Red',
          price: 150,
          size: 42,
          quantity: 2,
        },
        {
          name: 'Adidas UltraBoost',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmpDuwFiFHLxbc2GUtLru_wz-hR5oyBigA&s',

          color: 'Black',
          price: 200,
          size: 44,
          quantity: 1,
        },
      ];
      // Set the default items in localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }

  loadCart() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }
}
