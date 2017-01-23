import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages: string[];
  model = new Employee(null, "Smith", true, "w2", "default");
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster) {
    this.formPoster.getLanguages()
      .subscribe(
      data => this.languages = data.languages,
      err => console.log('get error' + err));
  }

  submitForm(form: NgForm) {
    // validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError)
      return;
    this.formPoster.postEmployeeForm(this.model)
      .subscribe(
      data => console.log("success: ", data), // read new id of the recently created object if necessary
      err => console.log("error: ", err)
      );
  }

  firstNameToUpperCase(value: string) {
    if (value.length > 0) {
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.firstName = value;
    }
  }

  validatePrimaryLanguage(value: any) {
    this.hasPrimaryLanguageError = (value === 'default');
  }
}
