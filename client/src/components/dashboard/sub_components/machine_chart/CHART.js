import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { Chart, BarSeries, ArgumentAxis , ValueAxis, Title } from '@devexpress/dx-react-chart-material-ui';
import {  Animation } from '@devexpress/dx-react-chart';
import  { empty } from '../../../../is-empty';

function to_date(data){
  let date = new Date(data);
  let new_form_d = date.getDate();
  return new_form_d;
}



const getPath = (x, width, y, y1) => `M ${x} ${y1}
   L ${width + x} ${y1}
   L ${width + x} ${y}
   L ${x + width } ${y}
   L ${x} ${y}
   Z`;

const labelStyle = { fill: '#BBDEFB' };

const BarWithLabel = ({
  x, barWidth, maxBarWidth, y, y1, color, value, style,
}) => {
  const width = maxBarWidth * barWidth;
  return (
    <React.Fragment>
      <path d={getPath(x - width / 2, width, y, y1)} fill={color} style={style} />
      <Chart.Label
        x={x}
        y={(y + y1) / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        style={labelStyle}
      >
        {value}
      </Chart.Label>
    </React.Fragment>
  );
};


export default class CHART extends Component {
  constructor(){
    super();
    this.state = {
      data: {}
    }
  }



  render() {
    const {ChartData} = this.props;
    let test = []

    if(!empty(ChartData)){
      ChartData.forEach((data)=>{
        for(let i = 0; i < data.Date.length; i++){
          let date_workingH = { Date: String(to_date(data.Date[i])), workingHours: Number(data.workingHours[i].toFixed(2)) };
          test.push(date_workingH);
        }
      })
    }
    test.sort((a, b) => {return a.Date - b.Date});


    const renderChart = () => { 
      if(!empty(ChartData)){
      return (
      <Chart data={test}>
        <ArgumentAxis/> 
        <ValueAxis /> 
        <BarSeries 
          valueField="workingHours" 
          argumentField="Date"
          barWidth={0.4}
          pointComponent={BarWithLabel}
          />
        <Animation />
        <Title text="KPI" />
      </Chart>
      )
      }else{
        return null;
      }
    }

    return (
      <div>
       <Paper>
          {renderChart()}
       </Paper> 
      </div>  
    )
  }
}

