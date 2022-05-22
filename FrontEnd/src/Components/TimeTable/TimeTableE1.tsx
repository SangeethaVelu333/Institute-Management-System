import React from 'react';
import Dashboard from "../Dashboard/SideMenu";
import '../../Styles/timetable.css';

import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkFjX35dc3ZQQ2VeU0w=');

class TimeTable extends React.Component {
    private localData: EventSettingsModel = {
        dataSource: [{
            EndTime: new Date(2022, 3, 4, 6, 30),
            StartTime: new Date(2022, 3, 4, 4, 0),
            Subject : "Physics",
        },
        {
            EndTime: new Date(2022, 3, 11, 6, 30),
            StartTime: new Date(2022, 3, 11, 5, 0),
            Subject : "Mathematics"
        },
        {
        EndTime: new Date(2022, 3, 13, 7, 30),
        StartTime: new Date(2022, 3, 13, 6, 0),
        Subject : "Chemistry"
        },
        {
            EndTime: new Date(2022, 3, 15 , 6, 30),
            StartTime: new Date(2022, 3, 15, 4, 0),
            Subject : "Probability and Statistics"
        },
        {
            EndTime: new Date(2022, 3, 17 , 6, 30),
            StartTime: new Date(2022, 3, 17, 5, 0),
            Subject : "Botany"
        },
    ]
    };
    render() {
        return (
            <div className="align">
                {/* <Dashboard />
                <div className="align-right">
                    <div className="tophead">
                        <h2>TimeTable</h2>
                    </div> */}
                    <ScheduleComponent currentView='Month' selectedDate={new Date(2022, 3, 1)} eventSettings={this.localData}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>
                </div>
            // </div>
        );
    }
}

export default TimeTable;