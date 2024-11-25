import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  wishlistItems: any[] = [];

  ngOnInit(): void {
    this.initializeWishlist();
    this.loadWishlist();
  }

  initializeWishlist() {
    if (!localStorage.getItem('wishlist')) {
      const wishlistItems = [
        {
          name: 'Puma Running Shoes',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNPIy_xFEvR98cr64YkEmuP_ZaXxWSdvyRDg&s',
          price: 899,
        },
        {
          name: 'Reebok Classic',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNtndKxR70FNWTvW0p6yKoRdUqELnQwTJznQ&s',
          price: 399,
        },
      ];

      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }

  loadWishlist() {
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      this.wishlistItems = JSON.parse(wishlistData);
    }
  }
}
