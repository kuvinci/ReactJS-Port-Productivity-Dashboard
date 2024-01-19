import { CategoryScale, LinearScale, PointElement, LineElement, Chart } from 'chart.js';
import {Line} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Legend from './Legend';
import InfoIcon from "./InfoIcon";
import React from "react";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ChartDataLabels);

function LineGraph({ data, configOptions }) {

    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 6,
                backgroundColor: function(context) {
                    return context.dataset.borderColor;
                }
            }
        },
        plugins: {
            datalabels: {
                align: 'end',
                anchor: 'end',
                backgroundColor: 'transparent',
                borderRadius: 4,
                color: function(context) {
                    return context.active || isSmallScreen ? context.dataset.borderColor : 'transparent';
                },
                formatter: Math.round,
                padding: 6,
                listeners: {
                    enter: function(context) {
                        context.active = true;
                        return true;
                    },
                    leave: function(context) {
                        context.active = false;
                        return true;
                    },
                },
            }
        },
    };

    let combinedData = {...data, ...options};

    return (
        <div className={'gpa-chart--wrapper'}>
            <div className={'gpa-chart gpa-chart__line'}>
                <div className={'gpa-chart--inner'}>
                    <div className={'gpa-chart__top'}>
                        {configOptions.graphName}
                        <InfoIcon infoText={configOptions.infoText} />
                    </div>
                    <div className={'gpa-chart__content'}>
                        <div className={'gpa-chart__vertical-text'}>{configOptions.sideText}</div>
                        <div className={'gpa-chart__chart'}>
                            <div className={'gpa-chart__range'}>{configOptions.range}</div>
                            <Line data={combinedData} options={options} />
                            {configOptions.bottomText && (
                                <div className={'gpa-chart__bottom-text'}>{configOptions.bottomText}</div>
                            )}
                            {configOptions.legendLabels && (
                                <Legend legendLabels={configOptions.legendLabels} data={data} colorType='borderColor' bottomRightText={configOptions.bottomRightText} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="gpa-chart__swipe-notice">
                Please swipe right to view the complete chart*
                <img src="/assets/images/cursor.svg" alt="Swipe icon" className="gpa-chart__swipe-notice--icon" />
            </div>
        </div>
    );
}

export default LineGraph;
