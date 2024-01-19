const GRAPH_TYPES = Object.freeze({
    LINE: "line",
    BAR: "bar"
});

const config = {
    files: [
        {
            path: '/assets/thm_berth_productivity.csv',
            graphType: GRAPH_TYPES.BAR,
            csvKeys: {
                x: 'VESSEL_CLASS',
                y: 'PICKS_PER_BERTH_HOUR',
            },
            showYAxis: false,
            xNames: ['Class 1', 'Class 2', 'OT'],
            colors: ['#1F91FF', '#1D243A', '#00BFB2'],
            widthClass: 'gpa-chart--half',
            graphName: 'berth productivity',
            range: '1 Week',
            sideText: 'PICKS PER BERTH HOUR',
            bottomText: 'VESSEL CLASS',
            infoText: "Measure of how many containers are loaded/discharged from a ship - time between arrival/departure divided by moves <br> <b>OT</b> - Ocean Terminal <br> <b>Class 2</b> - larger vessel size than Class 1 (internal GPA classification)",
        },
        {
            path: '/assets/thm_gate_turn_time_avg.csv',
            graphType: GRAPH_TYPES.BAR,
            isGrouped: true,
            csvKeys: {
                x: 'TERMINAL',
                y: ['SM_TURNTIME', 'MM_TURNTIME'],
                group: 'TERMINAL'
            },
            showYAxis: false,
            xNames: ['GCT', 'OT'],
            colors: ['#04B2D9 ', '#1D243A'],
            legendLabels: ['ST', 'DT'],
            widthClass: 'gpa-chart--half',
            graphName: 'GATE TURN TIME AVG',
            range: '2 Weeks',
            sideText: 'TURNTIME',
            bottomRightText: 'TERMINAL',
            infoText: "Measure of how many containers are loaded/discharged from a ship - time between arrival/departure divided by moves <br> <b>OT</b> - Ocean Terminal <br> <b>Class 2</b> - larger vessel size than Class 1 (internal GPA classification)",
        },
        {
            path: '/assets/thm_gate_tnx_avg_per_hour.csv',
            graphType: GRAPH_TYPES.LINE,
            additionalInfo: 'Some additional info for file2',
            csvKeys: {
                x: 'HOURS',
                y: 'AVG_TXN',
                group: 'TERMINAL_ID'
            },
            colors: ['#1D243A', '#1F91FF'],
            legendLabels: ['GCT', 'OT'],
            graphName: 'gate transaction avg/hour',
            range: '2 Weeks',
            sideText: 'Avg transaction',
            bottomRightText: 'TIME',
            infoText: "Measure of how many containers are loaded/discharged from a ship - time between arrival/departure divided by moves <br> <b>OT</b> - Ocean Terminal <br> <b>Class 2</b> - larger vessel size than Class 1 (internal GPA classification)",
        },
        {
            path: '/assets/thm_gate_tnx_per_day.csv',
            graphType: GRAPH_TYPES.BAR,
            isStacked: true,
            csvKeys: {
                x: 'TXN_DATE',
                y: 'TOTAL',
                group: 'TERMINAL_ID'
            },
            colors: ['#1F91FF', '#1D243A'],
            legendLabels: ['OT', 'GCT'],
            graphName: 'Gate transaction/DAY',
            range: '2 Weeks',
            sideText: 'Transaction',
            bottomRightText: 'Day of the week',
            infoText: "Measure of how many containers are loaded/discharged from a ship - time between arrival/departure divided by moves <br> <b>OT</b> - Ocean Terminal <br> <b>Class 2</b> - larger vessel size than Class 1 (internal GPA classification)",
        },
        {
            path: '/assets/thm_inventory.csv',
            graphType: GRAPH_TYPES.BAR,
            isGrouped: true,
            csvKeys: {
                x: 'TERMINAL_ID',
                y: ['IMPORT', 'EXPORT', 'EMPTY'],
                group: 'TERMINAL_ID'
            },
            xNames: ['ARP', 'GCT', 'OT'],
            colors: ['#1D243A', '#04B2D9', '#A0D1FF'],
            legendLabels: ['Import', 'Export', 'Empty'],
            graphName: 'Inventory',
            range: 'Current day',
            sideText: 'Total numbers',
            bottomRightText: 'TERMINAL',
            infoText: "Measure of how many containers are loaded/discharged from a ship - time between arrival/departure divided by moves <br> <b>OT</b> - Ocean Terminal <br> <b>Class 2</b> - larger vessel size than Class 1 (internal GPA classification)",
        },
        {
            path: '/assets/thm_rail_import_terminal.csv',
            graphType: GRAPH_TYPES.BAR,
            csvKeys: {
                x: 'TERMINAL_ID',
                y: 'nbr_containers'
            },
            showYAxis: false,
            xNames: ['GCT', 'OT'],
            colors: ['#00BFB2', '#1F91FF'],
            widthClass: 'gpa-chart--half',
            graphName: 'Rail import terminal',
            range: 'Current day',
            sideText: 'Total Containers',
            bottomText: 'Terminal ID',
            infoText: "Measure of how many containers are loaded/discharged from a ship - time between arrival/departure divided by moves <br> <b>OT</b> - Ocean Terminal <br> <b>Class 2</b> - larger vessel size than Class 1 (internal GPA classification)",
        },
        {
            path: '/assets/thm_rail_import_dwell.csv',
            graphType: GRAPH_TYPES.BAR,
            csvKeys: {
                x: 'TERMINAL_ID',
                y: 'AVG_DWELL_TIME_LAST_14_DAYS'
            },
            showYAxis: false,
            xNames: ['GCT'],
            colors: ['#04B2D9'],
            widthClass: 'gpa-chart--half',
            graphName: 'Rail import dwell',
            range: '2 Weeks',
            sideText: 'Time',
            bottomText: 'Terminal ID',
            infoText: "Measure of how many containers are loaded/discharged from a ship - time between arrival/departure divided by moves <br> <b>OT</b> - Ocean Terminal <br> <b>Class 2</b> - larger vessel size than Class 1 (internal GPA classification)",
        }
    ],
};

export default config;