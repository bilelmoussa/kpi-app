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
    const { ChartData } = this.props;
    let test = []

    if(!empty(ChartData)){
      ChartData.forEach((d)=>{
        for(let i = 0; i < d.Date.length; i++){
          let date_workingH = { Date: String(to_date(d.Date[i])), workingHours: Number(d.workingHours[i].toFixed(2)) };
          test.push(date_workingH);
        }
      })
    }
    test.sort((a, b) => {return a.Date - b.Date});

    const renderChart = () => { 
      if(!empty(ChartData)){
      return (
             <Chart id={'chart'} dataSource={test} theme={"generic.dark"}  >
              <Title text="Machine Working Hours" />
              <CommonSeriesSettings
                argumentField={'state'}
                type={'bar'}
                barPadding={0.5}
                hoverMode={"none"}
              >
              <Label visible={true} backgroundColor={"rgb(29, 178, 245, 0)"}   font={{ Size: "16px", weight: "600"}}>
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
                <Title text={'Working Hours'}  font={{size: 20}}/>
              </ValueAxis>
              <ArgumentAxis position={'bottom'} >
                <Title text={'Days'}  font={{size: 20}}  />
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

