import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  config = new MatSnackBarConfig();
  private formStore = new BehaviorSubject<{ [key: string]: any }>({});

  constructor(private snackBar: MatSnackBar) {
    const saved = localStorage.getItem('formStore');
    this.config.verticalPosition = 'top';
      
    this.config.panelClass = ['top-right-snackbar']; // Apply a custom CSS class
    this.config.duration = 3000; // Duration in milliseconds
    if (saved) this.formStore.next(JSON.parse(saved));
      
  }

  setFormData(tab: string, data: any) {
    const current = this.formStore.value;
    const updated = { ...current, [tab]: data };
    console.log('Updated Form Store:', updated);
    this.formStore.next(updated);
    localStorage.setItem('formStore', JSON.stringify(updated));
  }

  getFormData(tab: string): any {
    return this.formStore.value[tab] || {};
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close',this.config);
  }
}
