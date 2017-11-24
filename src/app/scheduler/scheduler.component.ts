///<reference path="../../../node_modules/@angular/router/src/config.d.ts"/>
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import {Reservatie} from "../models/reservatie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SchedulerService} from "../services/scheduler.service";

@Component({
  selector: 'app-scheduler-page',
  templateUrl: './scheduler.component.html'
})

export class SchedulerComponent implements AfterViewInit {
  @ViewChild('schedulerReference') scheduler: jqxSchedulerComponent;

  reservaties: Reservatie[] = [];

  model: any = {};
  error = '';
  title: String = '';
  isSubmitting: boolean = false;
  appointments = new Array();

  constructor(private route: ActivatedRoute,
              private schedulerService: SchedulerService) {}

  ngAfterViewInit(): void {
    this.route.url.subscribe(data => {
      // Set a title for the page
      this.title = 'Reservaties';
      this.generateAppointments();
    });
  }

  generateAppointments(): any {
    this.schedulerService.getReservaties()
      .subscribe(reservaties => {
        this.reservaties = reservaties;
        for (let reservatie of this.reservaties) {
          console.log("created appointment object");
          let appointment = {
            id: reservatie._id,
            description: "bezet",
            location: "to do",
            subject: "to do",
            calendar: "to do",
            start: new Date(reservatie.from),
            end: new Date(reservatie.to)
          };
          this.scheduler.addAppointment(appointment);
          console.log(this.scheduler.getAppointments());
        }
        console.log("Finished appointment adding");
      });
  };
  source: any =
    {
      dataType: "array",
      dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'calendar', type: 'string' },
        { name: 'start', type: 'date', format: 'dd/MM/yyyy' },
        { name: 'end', type: 'date', format: 'dd/MM/yyyy' }
      ],
      id: 'id',
      localData: this.appointments
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date();
  appointmentDataFields: any =
    {
      from: "start",
      to: "end",
      id: "id",
      description: "description",
      location: "location",
      subject: "subject",
      resourceId: "calendar"
    };
  resources: any =
    {
      colorScheme: "scheme05",
      dataField: "calendar",
      source: new jqx.dataAdapter(this.source)
    };
  view: 'timelineWeekView';
  views: any[] =
    [
      { type: 'timelineWeekView', appointmentHeight: 40, timeSlotWidth: 30, showWeekends: true, timeRuler: { scale: "quarterHour", scaleStartHour: 9, scaleEndHour: 22 } },
      { type: 'timelineDayView', appointmentHeight: 40, timeSlotWidth: 30, showWeekends: true, timeRuler: { scale: "quarterHour", scaleStartHour: 9, scaleEndHour: 22 } }
    ];
}
