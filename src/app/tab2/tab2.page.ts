import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  datas = [];
  search = {
    name: '',
    gender: '',
  };

  constructor(private navCtrl: NavController) {}

  async ionViewWillEnter() {
    await this.fetch();
  }

  async doRefresh(event) {
    await this.fetch();
    setTimeout(() => {
      event.detail.complete();
    }, 1500);
  }

  async fetch() {
    var result = await axios.get(
      'http://ignite.codespark.com.my/api/Digi/CustomerDetailEndpoint'
    );
    this.datas = result.data;
  }

  async searchFn() {
    var result = await axios.post(
      'http://ignite.codespark.com.my/api/Digi/CustomerDetailEndpoint/query',
      {
        expression: {
          compound: {
            or: {
              columns: [
                {
                  field: 'name',
                  operator: '=',
                  value: this.search.name,
                },
                {
                  field: 'gender',
                  operator: '=',
                  value: this.search.gender,
                },
              ],
            },
          },
        },
        limit: 5,
        sort: [
          {
            columnName: 'name',
            order: 'desc',
          },
        ],
      }
    );
    this.datas = result.data;
  }

  async delete(index) {
    console.log('deleting : ' + index);
    var result = await axios.delete(
      'http://ignite.codespark.com.my/api/Digi/CustomerDetailEndpoint/' +
        this.datas[index].id
    );
    this.datas.splice(index, 1);
  }

  editData(index) {
    this.navCtrl.navigateForward(['edit-data', this.datas[index].id]);
  }
}
