import './App.scss';
import Papa from 'papaparse';
import LineGraph from './components/LineGraph';
import BarGraph from './components/BarGraph';
import {useEffect, useState} from "react";
import config from './CSVFilesConfig'

function App() {
    const [data, setData] = useState([]);

    const GRAPH_TYPES = Object.freeze({
        LINE: "line",
        BAR: "bar"
    });

    function convertToLineChartData(csvData, csvKeys, colors) {
        // Group the data by the column specified in csvKeys.group
        const groupedData = csvData.reduce((acc, row) => {
            if (row[csvKeys.group]) {
                const groupValue = row[csvKeys.group];

                let xValue = row[csvKeys.x];
                // Convert xValue into 24h time string
                xValue = Number.isInteger(xValue) && xValue >= 0 && xValue < 24
                    ? `${xValue.toString().padStart(2, '0')}:00`
                    : xValue;

                const yValue = row[csvKeys.y];

                if (!acc[groupValue]) {
                    acc[groupValue] = {labels: [], data: []};
                }

                acc[groupValue].labels.push(xValue);
                acc[groupValue].data.push(yValue);
            }
            return acc;
        }, {});


        // Find the group with the longest range of x values
        let longestRangeGroup = null;
        let maxRange = 0;
        for (const [groupValue, data] of Object.entries(groupedData)) {
            if (data.labels.length > maxRange) {
                longestRangeGroup = groupValue;
                maxRange = data.labels.length;
            }
        }

        // Convert the grouped data to chart.js format
        const chartData = {
            labels: groupedData[longestRangeGroup].labels, // Use the labels from the group with the longest range
            datasets: []
        };
        Object.entries(groupedData).forEach(([groupValue, data], colorIndex) => {
            chartData.datasets.push({
                label: groupValue,
                data: data.data,
                fill: false,
                borderColor: colors[colorIndex % colors.length]
            });
        });

        return chartData;
    }


    function convertToBarChartData(csvData, csvKeys, xNames, colors, isStacked, isGrouped) {
        if (isStacked) {
            const chartData = {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#1F91FF'],
                    },
                    {
                        data: [],
                        backgroundColor: ['#1D243A'],
                    }
                ]
            };

            let dailyTotals = {};

            csvData.forEach((row) => {
                let xValue = row[csvKeys.x]; // TXN_DATE
                let yValue = parseInt(row[csvKeys.y], 10); // TOTAL
                let terminalId = row['TERMINAL_ID'];

                // Convert the date format from "mm/dd/yy" to "mm/dd"
                if (xValue) {
                    if (xValue.includes('/')) {
                        const dateParts = xValue.split('/');
                        if (dateParts.length === 3) {
                            xValue = `${dateParts[0]}/${dateParts[1]}`;
                        }
                    }
                }

                // Create an object for each day with "GCT" and "OT" as keys and their respective TOTALs as values
                if (!dailyTotals[xValue]) {
                    dailyTotals[xValue] = {'GCT': '-', 'OT': '-'};
                }

                dailyTotals[xValue][terminalId] = yValue;
            });

            // Now add the values from dailyTotals to chartData
            for (let day in dailyTotals) {
                if (day !== 'null') {
                    chartData.labels.push(day);

                    chartData.datasets[1].data.push(dailyTotals[day]['GCT']);

                    chartData.datasets[0].data.push(dailyTotals[day]['OT']);
                }
            }

            return chartData;

        } else if (isGrouped) {
            const chartData = {
                labels: xNames,
                datasets: csvKeys.y.map((key, index) => ({
                    data: [],
                    label: key,
                    backgroundColor: colors[index % colors.length]
                }))
            };

            csvData.forEach((row, index) => {
                csvKeys.y.map((key, index) => (
                    chartData.datasets[index].data.push(row[csvKeys.y[index]])
                ))
            });

            return chartData;
        } else {
            const chartData = {
                labels: xNames,
                datasets: [
                    {
                        data: [],
                        backgroundColor: [],
                        options: []
                    }
                ]
            };

            csvData.forEach((row, index) => {
                const yValue = row[csvKeys.y];

                chartData.datasets[0].data.push(yValue);
                chartData.datasets[0].backgroundColor.push(colors[index]);
            });
            return chartData;
        }
    }

    async function fetchData(path, graphType, csvKeys, xNames, colors, isStacked, isGrouped) {
        try {
            const response = await fetch(path);
            const text = await response.text();
            const result = Papa.parse(text, {header: true, dynamicTyping: true});

            if (graphType === 'line') {
                return convertToLineChartData(result.data, csvKeys, colors);
            } else if (graphType === GRAPH_TYPES.BAR) {
                return convertToBarChartData(result.data, csvKeys, xNames, colors, isStacked, isGrouped);
            }
        } catch (error) {
            console.error('Fetching data failed:', error);
        }
    }

    useEffect(() => {
        Promise.all(config.files.map(file => fetchData(file.path, file.graphType, file.csvKeys, file.xNames, file.colors, file.isStacked, file.isGrouped)))
            .then(data => setData(data));
    }, []);

    return (
        <div className="productivity">
            <div className="productivity__charts">
                {data.length > 0 && data.map((data, index) => {
                    const {legendLabels, graphType, graphName, colors, range, showYAxis, sideText, bottomText, bottomRightText, isStacked, widthClass, infoText} = config.files[index];
                    const configOptions = {
                        legendLabels, graphType, graphName, colors, range, showYAxis, sideText, bottomText, bottomRightText, isStacked, widthClass, infoText
                    }

                    if (graphType === GRAPH_TYPES.LINE) {
                        return <LineGraph key={index} data={data} graphName={graphName} configOptions={configOptions}/>;
                    } else if (graphType === GRAPH_TYPES.BAR) {
                        return <BarGraph key={index} data={data} configOptions={configOptions}/>;
                    }
                })}
            </div>
        </div>
    );
}

export default App;
