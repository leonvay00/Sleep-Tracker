import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SleepService } from '../../services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {

	time = "";
	sleepiness = "";


	constructor(private router:Router, public sleepService:SleepService, public alertController:AlertController) { }

	ngOnInit() {
	}

		navi(des:string) {
			if (des == "home") {
				this.router.navigate(['home']);
			} else if (des == "logs") {
				this.router.navigate(['logs']);
			}

		}
		
		recorder() {
			if (this.time != "" && this.sleepiness != "") {
				this.sleepService.logSleepinessData(new StanfordSleepinessData(parseInt(this.sleepiness), new Date(this.time)));
				this.handleButtonClick(true);
			} else {
				this.handleButtonClick(false);
			}
		}

		async handleButtonClick(message:boolean) {
			if (message) {
				const alert = await this.alertController.create({
					header: 'Sleepiness Recorded',
					message: 'Your sleepiness has been recorded successfully!',
					buttons: ['Dismiss']
					});
			
					await alert.present();
			} else if (!message) {
				const alert = await this.alertController.create({
					header: 'Failed To Record',
					message: 'Please selected a sleepiness level and time',
					buttons: ['Dismiss']
					});
			
					await alert.present();
			}
		}
}
