import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import axios, { AxiosInstance } from 'axios';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data = {
    name: '',
    ICNumber: '',
    salutation: '',
    gender: '',
    race: '',
  };

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ICNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(12),
    ]),
    salutation: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    nationality: new FormControl('', []),
  });
  constructor() {
    this.form.controls.nationality.valueChanges.subscribe((value) => {
      if (value == 'Malaysia') this.form.controls.race.enable();
      else this.form.controls.race.disable();
    });
  }

  async submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.controls.race.enable();
      var result = await axios.post(
        'http://ignite.codespark.com.my/api/Digi/CustomerDetailEndpoint',
        this.form.value
      );
      console.log(result);
    } else {
      console.log('Form is incomplete');
    }
  }
}
