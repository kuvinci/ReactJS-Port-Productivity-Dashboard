import {BarElement, Chart} from "chart.js";
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Legend from './Legend';
import InfoIcon from './InfoIcon';
import React from "react";

Chart.register(BarElement, ChartDataLabels);

function BarGraph({data, configOptions}) {

    const options = {
        scales: {
            y: {
                stacked: configOptions.isStacked,
                ticks: {
                    display: configOptions.showYAxis
                }
            },
            x: {
                stacked: configOptions.isStacked,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                align: 'end',
                anchor: 'end',
                backgroundColor: 'transparent',
                padding: 0,
                font: {
                    family: 'Arial',
                    size: 14,
                    weight: '600'
                },
                color: function(context) {
                    return context.dataset.backgroundColor;
                },
            }
        },
    };

    return (
        <div className={`gpa-chart--wrapper ${configOptions.widthClass}`}>
            <div className={'gpa-chart'}>
                <div className={'gpa-chart--inner'}>
                    <div className={'gpa-chart__top'}>
                        {configOptions.graphName}
                        <InfoIcon infoText={configOptions.infoText} />
                    </div>
                    <div className={'gpa-chart__content'}>
                        <div className={'gpa-chart__vertical-text'}>{configOptions.sideText}</div>
                        <div className={'gpa-chart__chart'}>
                            <div className={'gpa-chart__range'}>{configOptions.range}</div>
                            <Bar data={data} options={options}/>
                            {configOptions.bottomText && (
                                <div className={'gpa-chart__bottom-text'}>{configOptions.bottomText}</div>
                            )}
                            {configOptions.legendLabels && (
                                <Legend legendLabels={configOptions.legendLabels} data={data} colorType='backgroundColor' bottomRightText={configOptions.bottomRightText} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {!configOptions.widthClass && (
                <div className="gpa-chart__swipe-notice">
                    Please swipe right to view the complete chart*
                    <img src="/assets/images/cursor.svg" alt="Swipe icon" className="gpa-chart__swipe-notice--icon" />
                </div>
            )}
        </div>
    );
}

export default BarGraph;
