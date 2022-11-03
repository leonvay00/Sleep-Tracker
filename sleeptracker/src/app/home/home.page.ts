import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	startDate = "";
	startTime = "";
	endDate = "";
	endTime = "";
	
	constructor(public sleepService:SleepService, private router:Router, public alertController:AlertController) {}

	ngOnInit() {}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	navi(des:string) {
		if (des == "sleepiness") {
			this.router.navigate(['sleepiness']);
		} else if (des == "logs") {
			this.router.navigate(['logs']);
		}

	}

	recorder() {
		if (this.startTime != '' && this.endTime != '' && this.startDate != '' && this.endDate != '') {
			var startTemp = this.startDate.replace(/[(?<=T)].*/, "") + this.startTime.replace(/.*(?=T)/, "");
			var endTemp = this.endDate.replace(/[(?<=T)].*/, "") + this.endTime.replace(/.*(?=T)/, "");
			this.sleepService.logOvernightData(new OvernightSleepData(new Date(startTemp), new Date(endTemp)));
			this.handleButtonClick(true);
		} else {
			this.handleButtonClick(false);
		}
	}

	async handleButtonClick(message:boolean) {
		if (message) {
			const alert = await this.alertController.create({
				header: 'Sleep Recorded',
				message: 'Your overnight sleep has been recorded successfully!',
				buttons: ['Dismiss']
				});
		
				await alert.present();
		} else if (!message) {
			const alert = await this.alertController.create({
				header: 'Failed To Record',
				message: 'Please make sure all time and date fields are filled.',
				buttons: ['Dismiss']
				});
		
				await alert.present();
		}
	}

}
