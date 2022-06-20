import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory-pie';
import { VictoryLegend } from 'victory-legend';
import { VictoryLabel } from 'victory';
import '../Styles/piestyle.css';

export default function PieChartOne(){

const [ data, setData ] = useState([]);
const [ didMount, setDidMount ] = useState(false)
const [piechartmetrics, setPieChartMetrics] = useState("here are the percentages.")
const [pieChartData, setPieChartData] = useState([
  { x: "Group A", y: 900 },
  { x: "Group B", y: 400 },
  { x: "Group C", y: 300 },
])

useEffect(() => {
    if (!didMount) {
        console.log("nowmountingthecomponent", data)
        fetch("http://localhost:3003")
        .then((response) => response.json())
        .then((json) => setData(json.results))
        setDidMount(true)
    } else {
        var percentagesToBeUpdated = {"zero": 0, "one":0, "two":0, "three":0, "four":0, "five":0, "six": 0 }
        for (var i=0; i<data.length; i++) {
          if (data[i].classification === 0) {
            percentagesToBeUpdated["zero"] += 1
          } else if (data[i].classification === 1) {
            percentagesToBeUpdated["one"] += 1
          } else if (data[i].classification === 2) {
            percentagesToBeUpdated["two"] += 1
          } else if (data[i].classification === 3) {
            percentagesToBeUpdated["three"] += 1
          } else if (data[i].classification === 4) {
            percentagesToBeUpdated["four"] += 1
          } else if (data[i].classification === 5) {
            percentagesToBeUpdated["five"] += 1
          } else if (data[i].classification === 6) {
            percentagesToBeUpdated["six"] += 1
          }
        }
        console.log("here is the updated percentages", percentagesToBeUpdated)

        var total = 0;
        total = percentagesToBeUpdated["zero"]+percentagesToBeUpdated["one"]+percentagesToBeUpdated["two"]+percentagesToBeUpdated["three"]+percentagesToBeUpdated["four"]+percentagesToBeUpdated["five"]+percentagesToBeUpdated["six"]
        var categoryZeroPercentage = (percentagesToBeUpdated["zero"] / total) * 100 
        var categoryOnePercentage = (percentagesToBeUpdated["one"] / total) * 100 
        var categoryTwoPercentage = (percentagesToBeUpdated["two"] / total) * 100
        var categoryThreePercentage = (percentagesToBeUpdated["three"] / total) * 100
        var categoryFourPercentage = (percentagesToBeUpdated["four"] / total) * 100 
        var categoryFivePercentage = (percentagesToBeUpdated["five"] / total) * 100
        var categorySixPercentage = (percentagesToBeUpdated["six"] / total) * 100

        var piechartmetricsUpdatedString = 
        `Classification 0  : ${categoryZeroPercentage.toFixed(2)}
        Classification 1   : ${categoryOnePercentage.toFixed(2)}
        Classification 2   : ${categoryTwoPercentage.toFixed(2)}
        Classification 3   : ${categoryThreePercentage.toFixed(2)}
        Classification 4   : ${categoryFourPercentage.toFixed(2)}
        Classification 5   : ${categoryFivePercentage.toFixed(2)}
        Classification 6   : ${categorySixPercentage.toFixed(2)}` 

        var realPieChartData = [
          {  y: categoryZeroPercentage  },
          {  y: categoryOnePercentage },
          {  y:  categoryTwoPercentage},
          {  y:  categoryThreePercentage},
          {  y:  categoryFourPercentage},
          {  y:  categoryFivePercentage},
          {  y:  categorySixPercentage}
        ]

        setPieChartData(realPieChartData)

        setPieChartMetrics(piechartmetricsUpdatedString)
    }  
}, [didMount, data, pieChartData])

    

    return (
      <div>
          <h2>Odds in Pie Chart</h2>  
          <svg width={700} height={360} style={{ border: "4px solid #ccc"}}>
            <VictoryLegend
                standalone={false}
                colorScale={["coral", "salmon", "gold", "lavender", "lightsteelblue", "palegreen", "plum"]}
                x={50}
                y={60}
                gutter={50}
                title="Classifications"
                centerTitle
                titleComponent={<VictoryLabel style={[{ fontSize: 17, fill:"white" }]}/>}
                style={{ border: { stroke: "white" } }}
                data={[
                  { name: "Classification 0" , symbol: { fill: "coral" } , labels: { fill: "white" }},
                  { name: "Classification 1", symbol: { fill: "salmon" } , labels: { fill: "white" } },
                  { name: "Classification 2", symbol: { fill: "lavender" } , labels: { fill: "white" }},
                  { name: "Classification 3", symbol: { fill: "lightpink" } , labels: { fill: "white",  }},
                  { name: "Classification 4", symbol: { fill: "lightsteelblue" } , labels: { fill: "white" }},
                  { name: "Classification 5", symbol: { fill: "palegreen" }, labels: { fill: "white" }  },
                  { name: "Classification 6", symbol: { fill: "plum" } , labels: { fill: "white" }},                  
                ]}  
            />    
            <VictoryPie
                standalone={false}
                width={600}
                height={400}
                padding={{
                  left: 250,
                  bottom: 50,
                  top: 20
                }}
                colorScale={["coral", "salmon", "lavender", "lightpink", "lightsteelblue", "palegreen", "plum"]}
                data={pieChartData}
                labels={() => null}
           />
          </svg>            
      </div>
    );
}

