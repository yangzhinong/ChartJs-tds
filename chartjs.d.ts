declare namespace ChartJs {
    interface Chart{
        new(ctx:CanvasRenderingContext2D, config:ChartConfig):Chart;
        update();
        getDatasetMeta:(index:number)=>IMeta;
        labels:string[];
        defaults: {
            global: {
                tooltips:{
                    custom:(tooltip:{
                        opacity:number,
                        yAlign:string,
                        body:{lines:string}[],
                        title:string[],
                        labelColors:string[]
                    })=>void;
                }
            }
        }
    }

    interface IMeta {
        hidden:boolean
    }

    
    interface IData {
        labels:string[]|(string|string[])[], //x轴刻度名字 [['June','2005'],'July'] 这种第1个是多行的标签
        xLabels?:string[],  // x轴,y轴刻度单独定义,实现Y轴也是文字值
        yLabels?:string[],
        datasets: {
            label?:string,  //每个序列的名字
            backgroundColor?:string[]|string,
            borderColor?:string[]|string,
            hoverBorderColor?:string[]|string,
            borderWidth?:number,
            data:(number|string)[]|{x:string,y:number|string}[],  //当数组中[NaN]即可跳过点
            pointStyle?:string|'rectRot',
            pointRadius?:number, //线图用
            borderDash?:[number,number] , //线图用
            pointBorderColor?:string, //'rgb(0,0,0)'
            pointHoverRadius?:number|number[],
            yAxisID?:string, //y-axis-1 y-axis-2
            stack?:string, //Stack 0  如果两个序列的这个值一样,就堆叠在一起
            lineTension?:number, //0为直线连接两点. 线图时
            cubicInterpolationMode?:'monotone'  //线图时
        }[]
    }

    interface ITooltipItem{
        datasetIndex:number,
        index:number
    }

    interface IAxes {
        display?:boolean;
        stacked?:boolean;
        scaleLabel?: {  //轴名
            display?:boolean;
            labelString?:string;
        };
        type?:'logarithmic'|'time'; //对数|时间
        time?:{
            format:string,
            round?:'day',
            tooltipFormat?:string
        };
        gridLines?: {
            display?:boolean,
            drawBorder?:boolean,
            drawOnChartArea?:boolean,
            drawTicks?:boolean,
            color?:string[]
        }

        ticks?:{  //轴刻度
                callback:(dataLabelvalue:string,index:number,values:string[])=>string,
                beginAtZero?:boolean;
                suggestedMin?:number, //最小间隔
                suggestedMax?:number, //最大间隔
                min?:number,   //最大值
                max?:number,    //最小值
                stepSize?:number,  ////5 forces step size to be 5 units
                major?: {
                    fontStyle:'bold'|string,
                    fontColor:string
                }
              }
    }

    interface ILegendClickThis{
        chart:Chart
    }

    interface ILegendItem{
        text:string,
        fillStyle:any, //color
        hidden:boolean,
        lineCap:string,
        lineDash:number[],
        lineWidth:number,
        pointStyle:string,
        datasetIndex:number
    }


    interface ChartConfig {
        type:'bar'|'pie'|'line',
        data?:IData,
        options?: {
            responsive:boolean,
            legend?: {
                position:'top'|'left'|'right'|'bottom',
                display:boolean,
                onClick:(e, legendItem:ILegendItem)=>void;
                labels?:{
                    boxWidth?:number,//40
                    fontSize?:number, //12
                    fontStyle?:string, //'normal
                    fontColor?:string, //'#666'
                    padding?:number, //10
                    usePointStyle?:boolean;
                    generateLabels?:()=>void; //Generates legend items for each thing in the legend.
                }
            },
            title?: {
                display:boolean,
                text?:string
            },
           
            hover?:{
                mode?:'index'|'nearest'|'point'|'dataset'|'x'|'y',
                intersect?:boolean //
            },
            scales?: {
                xAxes?:IAxes[],
                yAxes?:IAxes[]
            },
            tooltips?: {
                enabled?:boolean,
                mode?:'index'|'nearest'|'point'|'dataset'|'x'|'y',
                position?: 'nearest',
                intersect?:boolean,  //
                yPadding?:number,
                xPadding?:number,
                caretSize?:number,
                backgroundColor?:string,
                titleFontColor?:string,
                bodyFontColor?:string,
                borderColor?:string,
                borderWidth?:number,
                callbacks?:{
                    title?: (d,chart:Chart)=>string,
                    label?:(tooltipItem:ITooltipItem,data:IData)=>string,
                    footer?:(tootipItems:ITooltipItem[], data:IData)=>string
                }
            },
            legendCallback?:(chart:Chart)=>string
        }
    }
}



interface HTMLElement {
    getContext(contextId:'2d'):CanvasRenderingContext2D;
}

declare var Chart: ChartJs.Chart;
