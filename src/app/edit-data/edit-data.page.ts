import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.page.html',
  styleUrls: ['./edit-data.page.scss'],
})
export class EditDataPage implements OnInit {
  id = '';

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

  currentData = null;
  constructor(private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls.nationality.valueChanges.subscribe((value) => {
      if (value == 'Malaysia') this.form.controls.race.enable();
      else this.form.controls.race.disable();
    });
  }

  async ngOnInit() {
    var result = await axios.get(
      'http://ignite.codespark.com.my/api/Digi/CustomerDetailEndpoint/' +
        this.id
    );

    this.currentData = result.data;

    this.form.patchValue({
      name: result.data.name,
      ICNumber: result.data.icNumber,
      salutation: result.data.salutation,
      gender: result.data.gender,
      race: result.data.race,
    });
  }

  async submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.controls.race.enable();

      this.currentData.name = this.form.value.name;
      this.currentData.icNumber = this.form.value.ICNumber;
      this.currentData.salutation = this.form.value.salutation;
      this.currentData.gender = this.form.value.gender;
      this.currentData.race = this.form.value.race;

      var result = await axios.put(
        'http://ignite.codespark.com.my/api/Digi/CustomerDetailEndpoint/' +
          this.id,
        this.currentData
      );
      console.log(result);
    } else {
      console.log('Form is incomplete');
    }
  }
}
