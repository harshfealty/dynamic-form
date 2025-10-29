export interface FormField {
  type: 'text' | 'email' | 'password' | 'checkbox';
  label: string;
  name: string;
  required?: boolean;
  errorMessage?: string;
}

export interface FormSchema {
  tabName: string;
  fields: FormField[];
}