import React, { Component } from 'react'
import './Graph.css'

import {
    FlexibleXYPlot, LineSeries, VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    Crosshair,
    YAxis
} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

const data = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 2 },
    { x: 6, y: 3 },
    { x: 7, y: 7 },
    { x: 8, y: 8 },
    { x: 9, y: 9 }
];

class Graph extends Component {

    state = {
        value: false
    }

    render() {

        const { value } = this.state

        // transform data
        const data = this.props.data || []
        const transformedData = data.map(dataPoint => {
            return {
                x: new Date(dataPoint.timestamp).getTime(),
                y: dataPoint.followerCount
            }
        }).reverse()

        // get max of array
        const max = Math.max.apply(Math, transformedData.map(dataPoint => dataPoint.y))

        return (
            <div className="Graph">
                <div className="GraphContainer">
                    <FlexibleXYPlot
                        onMouseLeave={() => this.setState({ value: false })}
                        yDomain={[0, max + 10]}
                        xType="time">

                        {/* Grid */}
                        <VerticalGridLines />
                        <HorizontalGridLines />

                        {/* Axis */}
                        <XAxis />
                        <YAxis />

                        {/* Line Series */}
                        <LineSeries
                            onNearestX={(d) => this.setState({
                                value: d
                            })}
                            data={transformedData}>
                        </LineSeries>

                        {/* CrossHair */}
                        {value && <Crosshair values={[value]}>
                            <div class="CrossHair">
                                <p>{new Date(value.x).toString()}</p>
                                <p>{value.y}</p>
                            </div>
                        </Crosshair>}
                    </FlexibleXYPlot>
                </div>
            </div>

        )
    }
}

export default Graph