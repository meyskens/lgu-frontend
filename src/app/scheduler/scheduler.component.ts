///<reference path="../../../node_modules/@angular/router/src/config.d.ts"/>
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import {Reservatie} from "../models/reservatie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SchedulerService} from "../services/scheduler.service";
import {AuthenticationService} from "../services/authentication.service";

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

  constructor(private route: ActivatedRoute,
              private schedulerService: SchedulerService,
              private authenticationService: AuthenticationService) {}

  ngAfterViewInit(): void {
    this.route.url.subscribe(data => {
      // Set a title for the page
      this.title = 'Reservaties';

      this.generateAppointments();
    });
  }

  generateAppointments() {
    this.schedulerService.getReservaties()
      .subscribe(reservaties => {
        this.reservaties = reservaties;
        for (let reservatie of reservaties) {
          let appointment = {
            id: reservatie._id,
            description: reservatie.reason,
            location: reservatie.room.name,
            subject: reservatie.user.firstName + " " + reservatie.user.lastName,
            start: new Date(reservatie.from),
            end: new Date(reservatie.to),
            room: reservatie.room.name,
            resizable: false,
            draggable: false,
            readOnly: true
          };
          this.scheduler.addAppointment(appointment);
          console.log(appointment);
        }
      });
  };

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  source: any =
    {
      dataType: "array",
      dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'room', type: 'string' },
        { name: 'start', type: 'date', format: 'dd/MM/yyyy' },
        { name: 'end', type: 'date', format: 'dd/MM/yyyy' },
        { name: 'resizable', type: 'boolean' },
        { name: 'draggable', type: 'boolean' },
        { name: 'readOnly', type: 'boolean' }
      ],
      id: 'id'
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
      resourceId: "room",
      resizable: "resizable",
      draggable: "draggable",
      readOnly: "readOnly"
    };
  resources: any =
    {
      colorScheme: "scheme05",
      dataField: "room",
      source: new jqx.dataAdapter(this.source)
    };
  view: 'timelineWeekView';
  views: any[] =
    [
      { type: 'timelineWeekView', appointmentHeight: 40, timeSlotWidth: 30, showWeekends: true, timeRuler: { scale: "quarterHour", scaleStartHour: 9, scaleEndHour: 22 } },
      { type: 'timelineDayView', appointmentHeight: 40, timeSlotWidth: 30, showWeekends: true, timeRuler: { scale: "quarterHour", scaleStartHour: 9, scaleEndHour: 22 } }
    ];
}
