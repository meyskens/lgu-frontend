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
            description: "Verjaardagsfeest.",
            location: "Bar",
            subject: "Stijn Bruers",
            room: "Bar",
            start: new Date(2017, 10, 26, 9, 0, 0),
            end: new Date(2017, 10, 26, 16, 0, 0),
            resizable: false,
            draggable: false,
            readOnly: true
        };
        let appointment2 = {
            id: "id2",
            description: "Dansles.",
            location: "Spiegelzaal",
            subject: "Stijn Bruers",
            room: "Spiegelzaal",
            start: new Date(2017, 10, 25, 9, 0, 0),
            end: new Date(2017, 10, 25, 16, 0, 0),
            resizable: false,
            draggable: false,
            readOnly: true
        };

        let appointment3 = {
            id: "id3",
            description: "Repetitie koor.",
            location: "Grote Studio",
            subject: "Stijn Bruers",
            room: "Grote Studio",
            start: new Date(2017, 10, 24, 9, 0, 0),
            end: new Date(2017, 10, 24, 16, 0, 0),
            resizable: false,
            draggable: false,
            readOnly: true
        };

        let appointment4 = {
            id: "id4",
            description: "Repetitie band.",
            location: "Kleine Studio",
            subject: "Stijn Bruers",
            room: "Kleine Studio",
            start: new Date(2017, 10, 22, 9, 0, 0),
            end: new Date(2017, 10, 23, 16, 0, 0),
            resizable: false,
            draggable: false,
            readOnly: true
        };

        appointments.push(appointment1);
        appointments.push(appointment2);
        appointments.push(appointment3);
        appointments.push(appointment4);

        this.schedulerService.getReservaties()
            .subscribe(reservaties => {
                this.reservaties = reservaties;
                for (let reservatie of reservaties) {
                    let appointment = {
                        id: reservatie._id,
                        description: reservatie.reason,
                        location: reservatie.room.location,
                        subject: reservatie.user.firstName + " " + reservatie.user.lastName,
                        room: reservatie.room.name,
                        start: new Date(reservatie.from),
                        end: new Date(reservatie.to),
                        resizable: false,
                        draggable: false,
                        readOnly: true
                    };
                    appointments.push(appointment);
                    this.scheduler.addAppointment(appointment);
                    console.log(appointment);
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
                {name: 'room', type: 'string'},
                {name: 'start', type: 'date'},
                {name: 'end', type: 'date'},
                {name: 'resizable', type: 'boolean'},
                {name: 'draggable', type: 'boolean'},
                {name: 'readOnly', type: 'boolean'}
            ],
            id: 'id',
            localData: this.generateAppointments()
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

    views: any[] =
        [
            'dayView',
            'weekView',
            'monthView'
        ];

    isLoggedIn() {
        return this.authenticationService.isLoggedIn();
    }

    isAdmin() {
        return this.authenticationService.isAdmin();
    }
}
