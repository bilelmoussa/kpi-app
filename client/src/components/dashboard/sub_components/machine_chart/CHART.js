import React, { Component } from 'react';
import  { empty } from '../../../../is-empty';
import { Chart, Series, CommonSeriesSettings, ValueAxis, Title, Export, ArgumentAxis, Legend, Label, Format } from 'devextreme-react/chart';

 
function to_date(data){
  let date = new Date(data);
  let new_form_d = date.getDate();
  return new_form_d;
}


export default class CHART extends Component {
  constructor(){
    super();
    this.state = {
      data: {}
    }
  }

 
  render() {
    const { ChartData, machine, Target } = this.props;
    let month;
    let year;

    if(!empty(ChartData)){
      month = ChartData[0]._id.month
      year = ChartData[0]._id.year
    }

    let TitleChartYAxis = () =>{
      if(Target === "week"){
        return <Title text={'Working Hours'}  font={{size: 20}}/>;
      }else if (Target === "Month"){
        return <Title text={'Working Hours (%)'}  font={{size: 20}}/>;
      }else if (Target === "Year"){
        return <Title text={'Working Hours (%)'}  font={{size: 20}}/>;
      }
    }

    let TitleChartXAxis = () =>{
      if(Target === "week"){
        return <Title text={'Days'}  font={{size: 20}}  />;
      }else if (Target === "Month"){
        return <Title text={'Weeks'}  font={{size: 20}}  />;
      }else if (Target === "Year"){
        return <Title text={'Months'}  font={{size: 20}}  />;
      }
    }

    let ChartTitle = () =>{
      if(Target === "week"){
        return  <Title text={`${machine_name} Working Hours`} subtitle={`Year: ${year},  Month:  ${month}`} font={{color: '#767676', weight: "bold"}}/>;
      }else if (Target === "Month"){
        return  <Title text={`${machine_name} Working Hours`} subtitle={`Year: ${year},  Month:  ${month}`} font={{color: '#767676', weight: "bold"}}/>;
      }else if (Target === "Year"){
        return  <Title text={`${machine_name} Working Hours`} subtitle={`Year: ${year}`} font={{color: '#767676', weight: "bold"}}/>;
      }
    }


    
    let test = [];
    let machine_name;
    let machineName =  (machine) =>{
      if(machine === 'N2'){
        machine_name = 'N2';
      }
      else if(machine ==='N2Plus150'){ 
        machine_name =  'N2 Plus 150';
      }
      else if(machine === 'N2Plus50'){
        machine_name = 'N2 Plus 50';
      }
    }

    machineName(machine);

    if(Target === "week"){
      if(!empty(ChartData)){
        ChartData.forEach((d)=>{
          for(let i = 0; i < d.Date.length; i++){
            let date_workingH = { Date: String(to_date(d.Date[i])), workingHours: Number(d.workingHours[i].toFixed(2)) };
            test.push(date_workingH);
          }
        })
        test.sort((a, b) => {return a.Date - b.Date});
      }
    }else if(Target === "Month"){
      if(!empty(ChartData)){
        ChartData.forEach((d)=>{
          for(let i = 0; i < d.Date.length; i++){
            let date_workingH = { Date: String(d.Date[i]), workingHours: Number(d.workingHourWeekly[i]) };
            test.push(date_workingH);
          }
        })
        test.sort((a, b) => {return a.Date - b.Date});
      }
    }else if(Target === "Year"){
      if(!empty(ChartData)){
        ChartData.forEach((d)=>{
            let date_workingH = { Date: String(d._id.month), workingHours: Number(d.workingHoursMonthly) };
            test.push(date_workingH);
        })
      }
    }

    const renderChart = () => { 
      if(!empty(ChartData)){
      return (
             <Chart id={'chart'} dataSource={test} >
              {ChartTitle()}
              >
              <CommonSeriesSettings
                argumentField={'state'}
                type={'bar'}
                barPadding={0.5}
                hoverMode={"none"}
              >
              <Label visible={true} backgroundColor={"rgb(29, 178, 245, 0)"}   font={{ color: '#f00', Size: "16px", weight: "600"}}>
                <Format type={'fixedPoint'} precision={0} />
              </Label>
              </CommonSeriesSettings>
              <Series
                argumentField={'Date'}
                valueField={'workingHours'}
                name={'KPI'}
                type={'bar'}
                />
              <ValueAxis position={'left'} >
                {TitleChartYAxis()}
              </ValueAxis>
              <ArgumentAxis position={'bottom'} >
                {TitleChartXAxis()}
              </ArgumentAxis>
              <Legend verticalAlignment={'bottom'} horizontalAlignment={'center'} visible={false}></Legend>
              <Export enabled={true} />
            </Chart>
      )
      }else{
        return null;
      }
    }

    return (
      <div>
          {renderChart()}
      </div>  
    )
  }
}

