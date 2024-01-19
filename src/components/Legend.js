function Legend({legendLabels, data, colorType, bottomRightText}) {
    return (
        <div className="gpa-chart__legend">
            <div className="gpa-chart__legend--wrapper">
                {data.datasets.map((dataset, index) => (
                    <div key={index} className="gpa-chart__legend__item">
                    <span className="gpa-chart__legend__color"
                          style={{backgroundColor: dataset[colorType]}}></span>
                        <span className="gpa-chart__legend__label">{legendLabels[index]}</span>
                    </div>
                ))}
            </div>
            {bottomRightText && (
                <div className={'gpa-chart__bottom-text--right'}>{bottomRightText}</div>
            )}
        </div>
    );
}

export default Legend;