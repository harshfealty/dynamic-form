import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormField } from '../models/dynamic-form.model';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [MatCheckbox,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {

  @Input() schema: FormField[] = [];
  @Input() initialData: any = {};
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.schema.forEach(field => {
      const validators = [];
      let isValidatorSet = false;
      if (field.required) {validators.push(Validators.required); isValidatorSet = true; validators.push(this.trimValue);};
      if (field.type === 'email') {validators.push(Validators.email);isValidatorSet = true};
      if (field.type === 'password') {validators.push(Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)); Validators.minLength(8);  isValidatorSet = true; field.errorMessage = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'};
      group[field.name] = [this.initialData[field.name] || '',isValidatorSet? [validators].flat().filter(v => v): []];
    });
    this.form = this.fb.group(group);
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }



  trimValue(input: AbstractControl): { [key: string]: any } | null {
    const value = input.value;
   if(value?.trim()){
      return null;
   }
    return { invalidTrim: true};
  }

}
