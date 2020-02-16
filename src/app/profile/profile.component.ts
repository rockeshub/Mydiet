import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  days = Days;
  dietForPeriod: number;
  hoveredDate: NgbDate;
  periods: Period[] = [];

  fromDate: NgbDate;
  toDate: NgbDate;
  dietEnum: Diet;

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  record(dietForPeriod) {
    this.periods.push({from : this.fromDate, to: this.toDate, diet: dietForPeriod} );
    this.fromDate = null;
    this.toDate =  null;
  }

}

interface Days {
  day: string;
  Diet: Diet;
}

enum Diet {
  Veg = 0,
  NonVeg = 1,
  Vegan = 2,
}

interface Period {
  from: NgbDate;
  to: NgbDate;
  diet: Diet;
}


const Days: Days[] = [
  {
    day: 'Monday',
    Diet: Diet.Veg
  },
  {
    day: 'Tuesday',
    Diet: Diet.Veg
  },
  {
    day: 'Wednesday',
    Diet: Diet.Veg
  },
  {
    day: 'Thursday',
    Diet: Diet.Veg
  },
  {
    day: 'Friday',
    Diet: Diet.Veg
  },
  {
    day: 'Saturday',
    Diet: Diet.Veg
  },
  {
    day: 'Sunday',
    Diet: Diet.Veg
  },
];
