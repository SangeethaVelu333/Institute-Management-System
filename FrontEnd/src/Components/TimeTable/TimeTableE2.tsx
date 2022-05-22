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
            EndTime: new Date(2022, 3, 12, 6, 30),
            StartTime: new Date(2022, 3, 12, 4, 0),
            Subject : "Physics",
        },
        {
            EndTime: new Date(2022, 3, 14, 6, 30),
            StartTime: new Date(2022, 3, 14, 5, 0),
            Subject : "Mathematics"
        },
        {
        EndTime: new Date(2022, 3, 16, 7, 30),
        StartTime: new Date(2022, 3, 16, 6, 0),
        Subject : "Chemistry"
        },
        {
            EndTime: new Date(2022, 3, 18 , 6, 30),
            StartTime: new Date(2022, 3, 18, 4, 0),
            Subject : "Probability and Statistics"
        },
        {
            EndTime: new Date(2022, 3, 20 , 6, 30),
            StartTime: new Date(2022, 3, 20, 5, 0),
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