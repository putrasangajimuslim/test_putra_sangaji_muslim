import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: any[] = [];
  isModalOpen: boolean = false;
  selectedProduct: any = {};
  constructor() {

  }

  ngOnInit() { 
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch('https://dummyjson.com/products/search?q=phone');
      if (!response.ok) {
        throw new Error('HTTP Error ' + response.status);
      }
      const data = await response.json();

      this.products = data.products;
      console.log(data);
      
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async viewProduct(id: number) {
    console.log(id);
    const product = this.products.find(p => p.id === id);
    
    if (product) {
      this.selectedProduct = product;
      this.isModalOpen = true; // Buka modal
    }
  }

  closeModal() {
    this.isModalOpen = false; // Tutup modal
  }
}
