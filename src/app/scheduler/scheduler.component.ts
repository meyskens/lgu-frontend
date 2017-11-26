import {Component, ViewChild, AfterViewInit} from '@angular/core';

import {jqxSchedulerComponent} from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import {ActivatedRoute} from "@angular/router";
import {SchedulerService} from "../services/scheduler.service";
import {AuthenticationService} from "../services/authentication.service";
import {Reservatie} from "../models/reservatie";

@Component({
    selector: 'app-scheduler-page',
    templateUrl: './scheduler.component.html'
})

export class SchedulerComponent implements AfterViewInit {
    @ViewChild('schedulerReference') scheduler: jqxSchedulerComponent;

    reservaties: Reservatie[] = [];

    constructor(private route: ActivatedRoute,
                private schedulerService: SchedulerService,
                private authenticationService: AuthenticationService) {
    }

    ngAfterViewInit(): void {
        this.scheduler.ensureAppointmentVisible('id1');
    }

    generateAppointments(): any {
        let appointments = [];

        let appointment1 = {
            id: "id1",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Bla bla ",
            calendar: "Room 4",
            start: new Date(2017, 10, 26, 9, 0, 0),
            end: new Date(2017, 10, 26, 16, 0, 0)
        };
        let appointment2 = {
            id: "id2",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Bla bla ",
            calendar: "Room 2",
            start: new Date(2017, 10, 25, 9, 0, 0),
            end: new Date(2017, 10, 25, 16, 0, 0)
        };

        let appointment3 = {
            id: "id3",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Bla bla ",
            calendar: "Room 3",
            start: new Date(2017, 10, 24, 9, 0, 0),
            end: new Date(2017, 10, 24, 16, 0, 0)
        };

        let appointment4 = {
            id: "id4",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Bla bla ",
            calendar: "BEMT Japan",
            start: new Date(2017, 10, 22, 9, 0, 0),
            end: new Date(2017, 10, 23, 16, 0, 0)
        };

        appointments.push(appointment1);
        appointments.push(appointment3);
        appointments.push(appointment4);
        // console.log(appointment1);
        appointments.push(appointment2);
        // console.log(appointment2);

        this.schedulerService.getReservaties()
            .subscribe(reservaties => {
                this.reservaties = reservaties;
                for (let reservatie of reservaties) {
                    let appointment = {
                        id: reservatie._id,
                        description: reservatie.reason,
                        location: reservatie.room.location,
                        subject: reservatie.reason,
                        calendar: reservatie.room.name,
                        room: reservatie.room.name,
                        start: new Date(reservatie.from),
                        end: new Date(reservatie.to),
                        // resizable: false,
                        // draggable: false,
                        // readOnly: true
                    };
                    appointments.push(appointment);
                    this.scheduler.addAppointment(appointment);
                    // console.log(appointment);
                }
            });


        // console.log(appointments);
        return appointments;
    };

    source: any =
        {
            dataType: "array",
            dataFields: [
                {name: 'id', type: 'string'},
                {name: 'description', type: 'string'},
                {name: 'location', type: 'string'},
                {name: 'subject', type: 'string'},
                {name: 'calendar', type: 'string'},
                {name: 'start', type: 'date'},
                {name: 'end', type: 'date'}
            ],
            id: 'id',
            localData: this.generateAppointments()
        };

    dataAdapter: any = new jqx.dataAdapter(this.source);
    date: any = new jqx.date(2017, 11, 26);

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

    views: any[] =
        [
            'dayView',
            'weekView',
            'monthView'
        ];

    isLoggedIn() {
        return this.authenticationService.isLoggedIn();
    }
}