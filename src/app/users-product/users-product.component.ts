import { Component } from '@angular/core';

@Component({
  selector: 'app-users-product',
  templateUrl: './users-product.component.html',
  styleUrls: ['./users-product.component.scss'],
})
export class UsersProductComponent {
  userProducts: any[] = [];

  ngOnInit(): void {
    this.initializeUserProducts();
    this.loadUserProducts();
  }

  initializeUserProducts() {
    // Check if user products is empty in localStorage and add default items
    if (!localStorage.getItem('userProducts')) {
      const userProducts = [
        {
          name: 'Samsung Galaxy S23',
          img: 'data:image/jpeg;base64,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2lXgLuKN+9+VY/MzjY2NblXHIyWLux5ntM4eG9trXXktYx1LHrO1TSEUAQFNQQaASdRCjSbQERz5SOy3on1MDdmCyrlZRoarWpmrdt13H+X2JHvwmMis5FFlIusqNiFRZWQGQkcxr1mMP1acSsZtqPag0exRuhtOunSBOtaJa1o4Fh82h018mF1v5AikHj3f9JWrc5xO6CuMOWvA2fpL+mg0gZAA5CIiAiIgIiICIiAm9abx48pqo1MmUiBn1a1sSksA7AlV7gSOuq2vIsb1S9L8QjcSreD28Ta2uu3c9RA24wZSehE5+1NoMpONiHW0j5nH4P1gabZ2scc/ZsQhsk826V+fecrB2eSxstJZzxJJ1JlrEwQh3n4sTqSZ0krC8hAjqqCDSTgTIEzATMxMwA014ymwKNunmOsuTV0DrpyI5GBUexakayxgqrxJMoV+rtS0M6lMRTwU838nx4l63AFzq1zFwvJektJWqLoo0EBWgRAANAJIJjSZgIiICIiAiIgIiIGQdDJAZFECPKvc/uqOZ4M3aV6MVaxylvSNIGFXQTOkzEDEzEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//2Q==',
          model: 'S23 Ultra',
          description: 'Latest Samsung flagship phone.',
          color: 'Black',
          price: 1200,
          stock: 10,
        },
        {
          name: 'Apple MacBook Pro',
          img: 'data:image/jpeg;base64,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',
          model: 'MacBook Pro 2023',
          description: 'Powerful laptop for professionals.',
          color: 'Silver',
          price: 2500,
          stock: 5,
        },
      ];
      // Set the default items in localStorage
      localStorage.setItem('userProducts', JSON.stringify(userProducts));
    }
  }

  loadUserProducts() {
    const userProductsData = localStorage.getItem('userProducts');
    if (userProductsData) {
      this.userProducts = JSON.parse(userProductsData); // Load user products from localStorage
    }
  }
}
