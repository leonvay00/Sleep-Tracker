import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SleepService } from '../../services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { OvernightSleepData } from '../../data/overnight-sleep-data';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  overnightData: OvernightSleepData[];
  sleepinessData: StanfordSleepinessData[];
  storageItems: []
  showOvernightData: boolean;
  showSleepinessData: boolean;

  constructor(private router:Router, public sleepService:SleepService) { }

  ngOnInit() {
    // this.overnightData = this.sleepService.getAllOvernightDataStorage();
    this.overnightData = SleepService.AllOvernightData;
    this.sleepinessData = SleepService.AllSleepinessData;
    this.showOvernightData = true;
    this.showSleepinessData = false;
  }

  segmentChanged(ev: any) {
    if (ev.detail.value == "sleepData") {
      this.showOvernightData = true;
      this.showSleepinessData = false;
    } else if (ev.detail.value = "sleepinessData") {
      this.showOvernightData = false;
      this.showSleepinessData = true;
    }
  }

  navi(des:string) {
		if (des == "home") {
			this.router.navigate(['home']);
		} else if (des == "sleepiness") {
			this.router.navigate(['sleepiness']);
		}

	}

}
