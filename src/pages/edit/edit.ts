import { Customer } from './../../models/customer.model';
import { Http, HttpModule } from '@angular/http';
import { ApiClient } from './../../providers/api-client';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
  providers: [Http, HttpModule]
})
export class EditPage {
  customer: Customer = new Customer();
  title: string = '';
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public apiClient: ApiClient, public alertCtrl: AlertController) {
    if (navParams.get('customer')) {
      this.title = "Edição";
      this.customer = navParams.get('customer') as Customer;
    } else {
      this.title = "Inclusão";
    }
  }

  save() {
    // console.log('item: ', this.customer);
    let that = this;
    this.apiClient.saveCustomer(this.customer).subscribe(
      (res) => {
        console.log('res: ', res);
        that.showAlert('Dados salvos com sucesso!');
      },
      (err) => {
        that.showErrorAlert(err);
        // console.log('err: ', err);
      }
    )
  }

  delete() {
    let that = this;
    this.apiClient.deleteCustomer(this.customer.id).subscribe(
      (res) => {
        console.log('res: ', res);
        that.showAlert('Excluído com sucesso!');
      },
      (err) => {
        that.showErrorAlert(err);
        // console.log('err: ', err);
      }
    )
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present().then(
      (res) => {
        this.viewCtrl.dismiss();
      }
    )
  }

  showErrorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Erro: ' + msg,
      buttons: ['OK']
    });
    alert.present();
  }

}