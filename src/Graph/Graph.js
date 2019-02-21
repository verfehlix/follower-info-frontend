import React, { Component } from 'react'
import './Graph.css'

import {
    FlexibleXYPlot,
    LineSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    Crosshair,
    Highlight,
    YAxis
} from 'react-vis';

import '../../node_modules/react-vis/dist/style.css';

import moment from 'moment'

class Graph extends Component {

    state = {
        lastDrawLocation: null,
        value: false
    }

    render() {

        const { value, lastDrawLocation } = this.state

        // transform data
        // TODO: move this out of the render function... 
        const data = this.props.data || []
        const transformedData = data.map(dataPoint => {
            return {
                x: new Date(dataPoint.timestamp).getTime(),
                y: dataPoint.followerCount
            }
        }).reverse()

        // get max of array
        // TODO: re-enable this custom yDomain as "default" after zoom-reset
        // const max = Math.max.apply(Math, transformedData.map(dataPoint => dataPoint.y))

        return (
            <div className="Graph">
                <div className="GraphContainer">
                    <FlexibleXYPlot
                        onMouseLeave={() => this.setState({ value: false })}
                        animation
                        xDomain={
                            lastDrawLocation && [
                                lastDrawLocation.left,
                                lastDrawLocation.right
                            ]
                        }
                        yDomain={
                            lastDrawLocation && [
                                lastDrawLocation.bottom,
                                lastDrawLocation.top
                            ]
                        }
                        // TODO: re-enable this custom yDomain as "default" after zoom-reset
                        // yDomain={[0, max + 10]}
                        xType="time">

                        {/* Grid */}
                        <VerticalGridLines />
                        <HorizontalGridLines />

                        {/* Axis */}
                        <XAxis />
                        <YAxis />

                        {/* Line Series */}
                        <LineSeries
                            curve="curveStepBefore"
                            strokeWidth="5px"
                            onNearestX={(d) => this.setState({
                                value: d
                            })}
                            data={transformedData}>
                        </LineSeries>

                        {/* CrossHair */}
                        {value && <Crosshair values={[value]}>
                            <div className="CrossHair">
                                <h4>{moment(new Date(value.x)).format('DD.MM.YYYY')}</h4>
                                <h3>{moment(new Date(value.x)).format('HH:mm')}</h3>
                                <h1>{value.y}</h1>
                            </div>
                        </Crosshair>}

                        {/* Highlight To Zoom */}
                        <Highlight
                            onBrushEnd={area => this.setState({ lastDrawLocation: area })}
                            onDrag={area => {
                                this.setState({
                                    lastDrawLocation: {
                                        bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                                        left: lastDrawLocation.left - (area.right - area.left),
                                        right: lastDrawLocation.right - (area.right - area.left),
                                        top: lastDrawLocation.top + (area.top - area.bottom)
                                    }
                                });
                            }}
                        />
                    </FlexibleXYPlot>
                </div>
            </div>
        )
    }
}

export default Graph