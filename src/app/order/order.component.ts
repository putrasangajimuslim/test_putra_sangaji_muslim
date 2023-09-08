import { Component } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  myForm: FormGroup;
  isFormValid: boolean = false;

  // no_pesanan: string = '';
  // tanggal: string = '';
  // nama_supplier: string = '';
  // nama_product: string = '';
  // total: string = '';

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      no_pesanan: ['', [Validators.required]],
      tanggal: ['', [Validators.required]],
      nama_supplier: ['', [Validators.required]],
      nama_product: ['', [Validators.required]],
      total: ['', [Validators.required]],
      
    });

    this.myForm.valueChanges.subscribe(() => {
      this.isFormValid = this.myForm.valid;
    });
  }

  ngOnInit() { 
  }

  async postData() {

    const fd = new FormData();

    if (this.myForm.valid) {
      fd.append('no_pesanan', this.myForm.get('no_pesanan')?.value ?? '');
      fd.append('tanggal', this.myForm.get('tanggal')?.value ?? '');
      fd.append('nama_supplier', this.myForm.get('nama_supplier')?.value ?? '');
      fd.append('nama_product', this.myForm.get('nama_product')?.value ?? '');
      fd.append('total', this.myForm.get('total')?.value ?? '');

      try {
        const response = await axios.post('http://localhost:8000/api/order', fd);
    
        // Tangani respons setelah permintaan POST berhasil
        console.log(response.data);
      } catch (error) {
        // Tangani kesalahan di sini jika ada
        console.error(error);
      }
    } else {
      // Tangani ketika formulir tidak valid
    }
    // fd.append('tanggal', this.tanggal);
    // fd.append('nama_supplier', this.nama_supplier);
    // fd.append('nama_product', this.nama_product);
    // fd.append('total', this.total);
  }
}
