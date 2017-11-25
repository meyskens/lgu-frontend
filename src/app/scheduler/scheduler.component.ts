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
  appointments = new Array();

  constructor(private route: ActivatedRoute,
              private schedulerService: SchedulerService,
              private authenticationService: AuthenticationService) {}

  ngAfterViewInit(): void {
    this.schedulerService.getReservaties()
      .subscribe(reservaties => {
        this.reservaties = reservaties;
        for (let reservatie of this.reservaties) {
          this.scheduler.beginAppointmentsUpdate();
          this.scheduler.setAppointmentProperty(reservatie._id, 'resizable', false);
          this.scheduler.setAppointmentProperty(reservatie._id, 'draggable', false);

          if(localStorage.getItem('currentUser') != JSON.stringify(reservatie.user)) {
            this.scheduler.setAppointmentProperty(reservatie._id, 'readOnly', true);
          }

          console.log("LOCALSTORAGE USER: " + localStorage.getItem('currentUser'));
          console.log("RESERVATIE USER: " + JSON.stringify(reservatie.user));
          this.scheduler.endAppointmentsUpdate();
        }
      });

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
          let appointment = {
            id: reservatie._id,
            description: reservatie.reason,
            location: reservatie.room.name,
            subject: reservatie.user.firstName + " " + reservatie.user.lastName,
            calendar: reservatie.room.name,
            start: new Date(reservatie.from),
            end: new Date(reservatie.to)
          };
          this.scheduler.addAppointment(appointment);
        }
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
        { name: 'calendar', type: 'Room' },
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

  // called when the dialog is craeted.
  editDialogCreate = (dialog, fields, editAppointment) => {
    // hide repeat option
    fields.repeatContainer.hide();
    // hide status option
    fields.statusContainer.hide();
    // hide timeZone option
    fields.timeZoneContainer.hide();
    // hide color option
    fields.colorContainer.hide();
    fields.subjectLabel.html("User");
    fields.locationLabel.html("Room");
    fields.fromLabel.html("Start");
    fields.toLabel.html("End");
    fields.resourceLabel.html("Calendar");

  };

  /**
   * called when the dialog is closed.
   * @param {Object} dialog - jqxWindow's jQuery object.
   * @param {Object} fields - Object with all widgets inside the dialog.
   * @param {Object} the selected appointment instance or NULL when the dialog is opened from cells selection.
   */
  editDialogClose = (dialog, fields, editAppointment) => {
  };

  /**
   * called when a key is pressed while the dialog is on focus. Returning true or false as a result disables the built-in keyDown handler.
   * @param {Object} dialog - jqxWindow's jQuery object.
   * @param {Object} fields - Object with all widgets inside the dialog.
   * @param {Object} the selected appointment instance or NULL when the dialog is opened from cells selection.
   * @param {jQuery.Event Object} the keyDown event.
   */
  editDialogKeyDown = (dialog, fields, editAppointment, event) => {
  };
}
