import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { FormField, FormSchema } from '../../shared/models/dynamic-form.model';
import { TabsService } from '../services/tabs.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [DynamicFormComponent,MatTab,MatTabGroup],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
   tabIndex = 0;

 allForms:FormSchema[] = [
    { tabName: 'Form A', 
      fields: [
      { type: 'text', label: 'Full Name', name: 'fullName', required: true },
      { type: 'email', label: 'Email', name: 'email', required: true },
      { type: 'checkbox', label: 'Subscribe', name: 'subscribe' }
    ] 
    },
    { tabName: 'Form B', fields:  [
    { type: 'text', label: 'Username', name: 'username', required: true },
    { type: 'password', label: 'Password', name: 'password', required: true },
    { type: 'checkbox', label: 'Remember Me', name: 'remember' }
  ] }
  ];

  constructor(public tabService: TabsService) {}

  onSubmit(tab: string, value: any) {
    this.tabService.setFormData(tab, value);
    this.tabService.showSnackbar(`${tab} submitted successfully`);
  }

 

}
