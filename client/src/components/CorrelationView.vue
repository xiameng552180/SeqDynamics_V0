<template>
    <div class="content" id="CorrelationViewSVG" style="height: 395px; overflow: hidden">

    </div>
</template>
<script>
 import NetService from '../services/net-service';
 import DataService from '../services/data-service';
 import PipeService from '../services/pipe-service';

import * as d3 from 'd3';

export default {
    name: 'CorrelationView',
    data() {
        return {
            width: null,
            height: null,
            svg: null,
            data: null, 
            rankData: null,
            ratio: null,
            barPosition: null,
        };
    },
    mounted() {
        this.initialize();

         PipeService.$on(PipeService.UPDATE_CORRELATIONVIEW,()=>{
            this.data = DataService.data;
            this.rankData = DataService.rankData;
            this.ratio = DataService.ratio
            this.barPosition = DataService.barPosition
            this.drawActivityChange(this.svg, this.data, this.rankData, this.ratio, this.barPosition);
        })
             
    },
    methods: { 
        initialize(){
        this.width = d3.select('#CorrelationViewSVG').node().getBoundingClientRect().width;
        this.height = d3.select('#CorrelationViewSVG').node().getBoundingClientRect().height;
        this.svg = d3.select('#CorrelationViewSVG').append('svg')
                    .attr('class', 'd3SVG')
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .attr("transform", "translate(0, 0)");
        },

        drawActivityChange(svgNode, data, rankData, ratio, barPosition){
            
            //处理数据
            //最后一个月排名和名字
            var finalRankDataWithName = [];
            var count = 1;
            for(var each_author in rankData)
            {
                var temp = {};
                    temp['name'] = each_author;
                    temp['score'] = parseInt(rankData[each_author]["2018-8"]);
                    finalRankDataWithName.push(temp); 
            }
            console.log(finalRankDataWithName)

            function compare1( a, b){
                return a.score - b.score;
            }

            function compare2(a, b){
                return b.score - a.score;
            }
            finalRankDataWithName.sort(compare1);

            // console.log(finalRankDataWithName);

            //skill 数组         
            var skill = []
            for(var i = 0; i < 6; i++)
            {
                var temp_skill = []
                for(var each_author in data){
                var temp = {}
                temp['name'] = each_author
                temp['score'] = data[each_author]["skill_point"][i]
                temp_skill.push(temp)              
                }
                skill.push(temp_skill)
            }

            //skill排序
            for(var i = 0; i < 6; i++)
            {
              if(i == 4)
              skill[i].sort(compare1)
              else
              skill[i].sort(compare2);
            }
            // console.log(skill)
            
            //要画的数据
            var drawSkill = [];

            for(var j = 0; j < 6; j++){
            var temp_drawSkill = [];
                for(var i = 0; i < finalRankDataWithName.length; i++){
                    for(var k = 0; k < skill[j].length; k++){
                    if(skill[j][k]['name'] == finalRankDataWithName[i]['name']){
                        temp_drawSkill.push(k)
                        break;
                    }
                    }
                    if(k == skill[j].length)
                    temp_drawSkill.push(-1);
                }
                drawSkill.push(temp_drawSkill);
            } 
            // console.log(drawSkill)

            var ELO_rank = []

            for(var i = 0; i < finalRankDataWithName.length; i++)
            {
                ELO_rank.push(finalRankDataWithName[i]['score'])
            }
            // console.log(ELO_rank)

            //skill_0: number of problems solved
            //skill_1: difficulty ratio
            //skill_2: problem variety
            //skill_3: number of submissions
            //skill_4: challenge, time to start hard problems
            //skill_5: perseverance, active days ratio

            // 0: 0.5580087367010652
            // 1: 0.17601002061397752
            // 2: 0.4034562453571239
            // 3: 0.3660793289130034
            // 4: 0.2758604302054494
            // 5: -0.015334183759091466
            var corr = []
            for(var i = 0; i < drawSkill.length; i++)
            {
                var temp_corr = spearson.correlation.spearman(ELO_rank, drawSkill[i])
                corr.push(temp_corr)
            }
            
            console.log(corr)

            drawSkill.push([0,999])
            var margin = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            };
            var width = svgNode.node().getBoundingClientRect().width, 
                height = svgNode.node().getBoundingClientRect().height;
            var colors = ['#52c4a8','#f7c65f','#44559b','#9cd8d6','#fb5050','#fb7595','black']
            var legendlabel = [
                    'accept',
                    'difficulty',
                    'variety',
                    'submission',
                    'challenge',
                    'perseverance'
                ]
            var transformLeft = 5
            var transformDown = 20
            var unit = 90
            var transformTop = 180
            var min = 20
            svgNode.selectAll('*').remove();
            var svg = svgNode.append("g")
            //draw six rectangles
            var rect_data = []
            var text_location = []
            for(var i = 0; i < 3; i++){
                var temp_data = {}
                temp_data['x'] = transformLeft + i * (unit+32)
                temp_data['y_text'] = unit +20
                temp_data['y'] = unit + 20
                temp_data['width'] = min + unit * corr[i]
                temp_data['height'] = min + unit * corr[i]
                temp_data['color'] = corr[i]
                temp_data['stroke_color'] = colors[i]
                temp_data['content'] = legendlabel[i]
                rect_data.push(temp_data)
                text_location.push(temp_data)
            }
            for(var i = 0; i < 3; i++)
            {
                var temp_data = {}
                temp_data['x'] = transformLeft + i * (unit+32)
                temp_data['y_text'] = transformTop + unit
                temp_data['y'] = transformTop + unit
                temp_data['width'] = min + unit * corr[i + 3]
                temp_data['height'] = min + unit * corr[i + 3]
                temp_data['color'] = corr[i+3]
                temp_data['stroke_color'] = colors[i + 3]
                 temp_data['content'] = legendlabel[i + 3]
                rect_data.push(temp_data)
                text_location.push(temp_data)
            }
            var colorScale1 = d3.scaleLinear()
                               .range(["white", "black"])
                               .domain([0, 1])
            var colorScale2 = d3.scaleLinear()
                                .range(["black", "white"])
                                .domain([-1, 0])
            
            // console.log(colorScale(0))
            // console.log(rect_data)
            var rect_correlation = svg.selectAll(".Myrect_correlation")
                               .data(rect_data)
                               .enter()
                               .append("g")
                               .attr("class", "Myrect_correlation");

                rect_correlation.append("rect")
                        .attr("x", function(d){ return d.x})
                        .attr("y", function(d){ return d.y})
                        .attr("width", function(d){ return d.width})
                        .attr("height", function(d){ return d.height})
                        .attr("fill", function(d){ return d.stroke_color})
                        .attr("opacity", 0.7)
                        // .attr("stroke", function(d){return d.stroke_color})
                        // .attr("stroke-width", "8px")

            var rect_correlation1 = svg.selectAll(".Myrect_correlation1")
                               .data(rect_data)
                               .enter()
                               .append("g")
                               .attr("class", "Myrect_correlation1");

                rect_correlation1.append("rect")
                        .attr("x", function(d){ return d.x})
                        .attr("y", function(d){ return d.y})
                        .attr("width", function(d){ return unit})
                        .attr("height", function(d){ return unit})
                        .attr("fill", "none")
                        // .attr("opacity", 0.5)
                        .attr("stroke", function(d){return "black"})
                        .attr("stroke-width", "2px")
            
            var new_text = svg.selectAll(".Mynew_text")
                        .data(text_location)
                        .enter()
                        .append("g")
                        .attr("class", "Mynew_text")

                new_text.append("text")
                        .text(function(d){return d.content})
                        .attr("x", function(d){return d.x})
                        .attr("y", function(d){return d.y_text-10})

            
            function transformFunction(x, localtype){
                var r = 75;
                var s3 = Math.sqrt(3)
                switch(localtype){
                    case 1: return [x/2, -x/2*s3];
                    case 2: return [x + r/2, -r/2*s3];
                    case 3: return [(r-x)/2 + x + r, -(r-x)/2*s3];
                    case 4: return [x/2, x/2*s3];
                    case 5: return [x + r/2, r/2*s3];
                    case 6: return [(r-x)/2 + x + r, (r-x)/2*s3];
                    break;
                }

            }            
            var radiuslength = 150, ox = width/2-radiuslength/2, oy = height/6, transformgap = 10;
            var x = d3.scaleLinear().range([0, radiuslength]);
            var axis_arr = [
                [ox - (radiuslength + transformgap)/2, (radiuslength - transformgap)*Math.sin(1/3 * Math.PI) + oy, -60, function(r){return [ox - (radiuslength+transformgap)/2 + r/2, (radiuslength-r-transformgap)*Math.sin(1/3 * Math.PI) + oy]}, d3.axisTop],
                [ox , oy - transformgap, 0, function(r){return [ox + r, oy - transformgap]}, d3.axisTop],
                [ox + radiuslength + transformgap/2, oy - transformgap*Math.sin(1/3 * Math.PI), 60, function(r){return [radiuslength+r*0.5 + ox + transformgap/2, (r - transformgap)*Math.sin(1/3 * Math.PI)+oy]}, d3.axisTop],
                [ox - (radiuslength + transformgap)/2, (radiuslength)*Math.sin(1/3 * Math.PI) + oy, 60, function(r){return [ox - (radiuslength + transformgap - r)/2, (r+radiuslength) * Math.sin(1/3 * Math.PI) + oy]}, d3.axisBottom],
                [ox , 2*radiuslength*Math.sin(1/3 * Math.PI) + oy, 0, function(r){return [r+ox, 2*radiuslength*Math.sin(1/3 * Math.PI) + oy]}, d3.axisBottom],
                [ox + radiuslength + transformgap/2, (2*radiuslength)*Math.sin(1/3 * Math.PI) + oy, -60, function(r){return [ox + radiuslength + transformgap/2 + r/2, (2 * radiuslength - r)*Math.sin(1/3 * Math.PI) + oy]}, d3.axisBottom],
                [ox , radiuslength*Math.sin(1/3 * Math.PI) + oy - transformgap/4, 0, function(r, localtype){
                    var scaleX = (r*1000/150-DataService.range['startRank'])*150/(DataService.range['endRank']-DataService.range['startRank'])*0.5;
                    var xy = transformFunction(scaleX,localtype);
                    return [ox + xy[0], radiuslength * Math.sin(1/3 * Math.PI) + oy - transformgap/4 + xy[1]]
                    }, d3.axisBottom],
            ];
            // r * 1000/(DataService.range['endRank']-DataService.range['startRank'])
            var t = x.domain([DataService.range['startRank'], DataService.range['endRank']])
            for(var i=0;i<drawSkill.length;i++){
                // if(i==drawSkill.length-1){
                //     axis_arr[i].push(x.domain([DataService.range['startRank'],DataService.range['endRank']]))                    
                // }else{
                    var localmax = Math.max(...drawSkill[i])
                    var localmin = Math.min(...drawSkill[i])
                    axis_arr[i].push(x.domain([localmin,localmax]))
                // }
            }

            var locallines = [];
            for(var i=0;i<axis_arr.length-1;i++){
                var tmp = [];
                for(var t=DataService.range['startRank'];t<DataService.range['endRank'];t++){
                    tmp.push([axis_arr[i][3](axis_arr[i][5](drawSkill[i][t])), axis_arr[axis_arr.length-1][3](axis_arr[axis_arr.length-1][5](t), i+1)]);
                }
                locallines.push(tmp)
                // svg.append('g')
                //     .attr("transform", 'translate('+axis_arr[i][0]+","+axis_arr[i][1]+')'+' rotate('+axis_arr[i][2]+')')
                //     .attr('class', 'xAxis')
                //     .call(axis_arr[i][4](axis_arr[i][5]).ticks(1))
            }
//comment1
            //    var transformLeft = 0
            //    var transformDown = 30
            //     // var colors = ['#2a9c9d','#ff9d00','#772a83','#bccece','#f15e77','#6471bc','black']
            //     var colors = ['#52c4a8','#f7c65f','#44559b','#9cd8d6','#fb5050','#fb7595','black']
            //     for(var i=0;i < locallines.length;i++){
            //         var localg = svg.append("g");
            //         localg.selectAll('.line-group')
            //             .data(locallines[i])
            //             .enter()
            //             .append("path")
            //             .attr("d",function(d){
            //                     return "M"+d[0][0]+","+d[0][1]+"L"+d[1][0]+","+d[1][1]+"Z";
            //             })
            //             .attr("stroke",function(d){
            //                 return colors[i]
            //             })
            //             .attr("opacity", "0.4")
            //             .attr("stroke-width","0.5px")
            //             .attr("transform", "translate(" + transformLeft + ',' + transformDown + ")")
            //     };
                // svg.append('g')
                //     .attr("transform", 'translate('+(transformLeft + axis_arr[6][0])+","+ (axis_arr[6][1] + transformDown)+')'+' rotate('+axis_arr[6][2]+')')
                //     .attr('class', 'xAxis')
                //     .style('font-family', 'Arial')
                //     .style('opacity', 0.8)
                //     .style('color', '#392f41')
                //     .call(d3.axisBottom(x.domain([DataService.range['startRank'], DataService.range['endRank']])).ticks(3));

                var legendheight = 25;
                var legendlabel = [
                    'accept:more->less',
                    'difficulty:hard->easy',
                    'variety:more->less',
                    'submission:more->less',
                    'challenge:early->late',
                    'perseverance:high->low'
                ]
//comment2
                // for(var i = 0; i < 3; i++) {
                //     svg.append('rect')
                //         .style('fill', colors[i])
                //         .style('opacity', 0.3)
                //         .style('rx', 3)
                //         .style('ry', 3)
                //         .attr('width', radiuslength)
                //         .attr('height', legendheight)
                //         .attr('transform', 'translate('+(transformLeft + (axis_arr[i][0]+legendheight*Math.sin(axis_arr[i][2] * Math.PI / 180)))+','+((axis_arr[i][1]-legendheight*Math.cos(axis_arr[i][2] * Math.PI / 180)) + transformDown)+')'+' rotate('+axis_arr[i][2]+')');
                //     // svg.append('text')
                //     //     .style("font-size", 13)
                //     //     .style('font-family','Arial')
                //     //     .style('fill', 'black')
                //     //     .text(legendlabel[i])
                //     //     .attr('transform', 'translate('+(transformLeft + (axis_arr[i][0]+legendheight*Math.sin(axis_arr[i][2] * Math.PI / 180)/4))+','+((axis_arr[i][1]-legendheight*Math.cos(axis_arr[i][2] * Math.PI / 180)/4) + transformDown)+')'+' rotate('+axis_arr[i][2]+')');
                // };
                // for(var i = 3; i < 6; i++) {
                //     svg.append('rect')
                //         .style('fill', colors[i])
                //         .style('opacity', 0.3)
                //         .style('rx', 3)
                //         .style('ry', 3)
                //         .attr('width', radiuslength)
                //         .attr('height', legendheight)
                //         .attr('transform', 'translate('+(transformLeft + (axis_arr[i][0]))+','+((axis_arr[i][1]) + + transformDown)+')'+' rotate('+axis_arr[i][2] +')');
                //     // svg.append('text')
                //     //     .style("font-size", 13)
                //     //     .style('fill', 'black')
                //     //     .style('font-family','Arial')
                //     //     .text(legendlabel[i])
                //     //     .attr('transform', 'translate('+(transformLeft + (axis_arr[i][0]-legendheight*Math.sin(axis_arr[i][2] * Math.PI / 180)*3/4))+','+((axis_arr[i][1]+legendheight*Math.cos(axis_arr[i][2] * Math.PI / 180)*3/4) + transformDown)+')'+' rotate('+axis_arr[i][2]+')');
                // };

        //画控制条
        //画feature比例分配的bar
        var control_colors = ['black','#52c4a8','#f7c65f','#44559b','#9cd8d6','#fb5050','#fb7595']
        var barWidth = 8
        var barHeight = 30

        var drag = d3.drag()
                    .on('start', null)
                    .on('drag', function(d, i){
                        var drag_dx = d3.event.dx;
                        if(i != 0 && i != 6){
                            drawBar[i]['x'] = parseFloat(d3.select(this).attr("x")) + 1*drag_dx
                            //边缘碰撞检测
                            if(drawBar[i]['x'] < drawBar[0]['x'] + 1.2*barWidth)
                                drawBar[i]['x'] = drawBar[0]['x'] + 1.2*barWidth
                            else if(drawBar[i]['x'] > drawBar[6]['x'] - barWidth)
                                drawBar[i]['x'] = drawBar[6]['x'] - barWidth
                    
                            //旁边一起移动
                            for(var i =1; i < 6; i++)
                            {
                                // console.log("current = "　+ drawBar[2]['x'] + " left = " + (drawBar[1]['x']+barWidth))
                                if(drawBar[i]['x'] < drawBar[i-1]['x'] + barWidth+1){
                                    // console.log("okokokokok")
                                    drawBar[i-1]['x'] = drawBar[i]['x'] - 1.15*barWidth
                                    
                                    if(drawBar[i-1]['x'] < drawBar[0]['x'] + 1.15*barWidth*(i-1))
                                    {
                                        drawBar[i-1]['x'] = drawBar[0]['x'] + 1.15*barWidth*(i-1)
                                        drawBar[i]['x'] = drawBar[i-1]['x'] + 1.15*barWidth
                                    }
                                }

                                if(drawBar[i]['x'] > drawBar[i + 1]['x'] - barWidth){
                                    // console.log("okokokok")
                                    drawBar[i +1]['x'] = drawBar[i]['x'] + barWidth
                                    if(drawBar[i+1]['x'] > drawBar[6]['x'] - barWidth*(5-i))
                                    {
                                    drawBar[i+1]['x'] = drawBar[6]['x'] - barWidth*(5-i)
                                    drawBar[i]['x'] = drawBar[i+1]['x'] - barWidth
                                    }
                                }
                            }
                        
                        }
                        for(var i = 1; i < 7; i++){
                            drawRatio[i-1]['value'] = Math.abs((drawBar[i]['x'] - drawBar[i-1]['x']-barWidth-1)/(drawBar[6]['x'] - drawBar[0]['x']- 6*barWidth))
                            drawRatio[i-1]['value'] = drawRatio[i-1]['value'].toFixed(2)
                            drawinnerRatio[i-1]['value'] = Math.abs((drawBar[i]['x'] - drawBar[i-1]['x']-barWidth-1)/(drawBar[6]['x'] - drawBar[0]['x']- 6*barWidth))
                            drawinnerRatio[i-1]['value'] = drawinnerRatio[i-1]['value'].toFixed(2)
                            // drawRatio[i-1]['value'] = legendlabel[i-1] + " " + drawRatio[i-1]['value']
                        }

                        // text.attr("x", function(d, i){
                        //             return d.x
                        //         })
                        //         .attr("y", function(d, i){
                        //             return d.y
                        //         })
                        //         .text(function(d, i){
                        //             return word[i] + d.value
                        //         })
                        //         .attr("fill", "black")
//comment4
                        // text.attr("x", function(d, i){
                        //         return 0
                        //     })
                        //     .attr("y", function(d, i){
                        //         return 0
                        //     })
                        //     .attr("transform", function(d, i){
                        //         return "translate(" + d.x+"," + d.y +")" + "rotate(" + d.rotate + ")" 
                        //     })
                        //     .text(function(d, i){
                        //         return legendlabel[i]
                        //     })
                        //     .attr("font-size", 15)
                        //     .attr("fill", "black")

                        // attrtext.attr("x", function(d, i){
                        //         return 0
                        //     })
                        //     .attr("y", function(d, i){
                        //         return 0
                        //     })
                        //     .attr("transform", function(d, i){
                        //         return "translate(" + d.x+"," + d.y +")" + "rotate(" + d.rotate + ")" 
                        //     })
                        //     .text(function(d, i){
                        //         return d.value
                        //     })
                        //     .attr("font-size", 18)
                        //     .attr("fill", "black")

                    attrtext.attr("x", function(d, i){
                                return d.x
                            })
                            .attr("y", function(d, i){
                                return d.y
                            })
                            .text(function(d, i){
                                return d.value
                            })
                            .attr("font-size", 15)
                            .attr("fill", "black")

                        bar.attr("x", function(d){
                                return d.x
                            })
                            .attr("y", function(d){
                                return d.y
                            })
                            .attr("width", function(d){
                                return d.width
                            })
                            .attr("height", function(d){
                                return d.height
                            })
                            .attr("fill", function(d){
                                return d.color
                            })                         
                        // console.log(drawRatio)
                        for(var i =0; i < drawRatio.length; i++){
                            DataService.ratio[i] = drawinnerRatio[i]['value']
                        }

                        for(var i =0; i < 7; i++){
                            DataService.barPosition[i] = drawBar[i]['x']
                        }
                            
                        // drawGlyph(svgNode, data, range, authorSelected, ratio)
                        // console.log(DataService.ratio)
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW)
                        // PipeService.$emit(PipeService.UPDATE_CORRELATIONVIEW)
                })


            var drawBar = []
                    // var ratio = [0.17, 0.17, 0.17, 0.17, 0.17, 0.17]
                    for(var i = 0; i < 7; i++){
                        var temp = {}
                        temp['x'] = barPosition[i]
                        temp['y'] = 0
                        temp['width'] = barWidth
                        temp['height'] = barHeight
                        temp['color'] = control_colors[i]
                        drawBar.push(temp)
                        }
            //draw tootip
            var tooltip = svg.append("text")
                            .style("z-index", 20)
                            .style("visibility", "hidden")

            var bar = svg.selectAll(".MyBar")
                        .data(drawBar)
                        .enter()
                        .append("g")
                        .attr("class", "MyBar")
                        .append("rect")
                        .attr("x", function(d){
                            return d.x
                        })
                        .attr("y", function(d){
                            return d.y
                        })
                        .attr("width", function(d){
                            return d.width
                        })
                        .attr("height", function(d){
                            return d.height
                        })
                        .attr("fill", function(d){
                            return d.color
                        })
                        .on("mouseover", function(d, i){
                            // console.log("ok")
                            // tooltip.transition()
                            //        .duration(20)
                            //        .style("opacity", 0.9);
                            // console.log(d. x)
                            if(i != 0)
                            {
                                tooltip.attr("transform", "translate(" + d.x + "," + (d.y + 50) +")")
                                    .text(ratio[i-1])
                                    .style("visibility", "visible")
                            }
            
                        })
                        .call(drag)
        
      
            // var bgWidth = 180
            // var bgHeight = 25
            
            // var drawTextBg = []
            //             for(var i = 0; i < 6; i++){
            //                 var temp = {}
            //                 temp['x'] = 550
            //                 temp['y'] = 65 + 55*i
            //                 temp['width'] = bgWidth
            //                 temp['height'] = bgHeight
            //                 temp['color'] = colors[i+1]
            //                 drawTextBg.push(temp)
            //                 }

            // console.log(drawTextBg)
            // var textBg = svg.selectAll(".MyTextBg")
            //             .data(drawTextBg)
            //             .enter()
            //             .append("g")
            //             .attr("class", "MyTextBg")
            //             .append("rect")
            //             .attr("x", function(d){
            //                 return d.x
            //             })
            //             .attr("y", function(d){
            //                 return d.y
            //             })
            //             .attr("width", function(d){
            //                 return d.width
            //             })
            //             .attr("height", function(d){
            //                 return d.height
            //             })
            //             .attr("fill", function(d){
            //                 return d.color
            //             })
            // var word = ["accept num: ", "difficulty ratio: ", "problem diversity: ", "submission num: ","learning curve: ", "inquiring spirit: " ]
            var drawRatio = []
            for(var i =0; i<3;i++){
                var temp = {}
                temp['x'] = (transformLeft + (axis_arr[i][0]+legendheight*Math.sin(axis_arr[i][2] * Math.PI / 180)/4))
                temp['y'] = ((axis_arr[i][1]-legendheight*Math.cos(axis_arr[i][2] * Math.PI / 180)/4) + transformDown)
                temp['value'] = ratio[i]
                temp['rotate'] = axis_arr[i][2]
                drawRatio.push(temp)
            }

            for(var i =3; i<6;i++){
                var temp = {}
                temp['x'] = (transformLeft + (axis_arr[i][0]-legendheight*Math.sin(axis_arr[i][2] * Math.PI / 180)*3/4))
                temp['y'] = ((axis_arr[i][1]+legendheight*Math.cos(axis_arr[i][2] * Math.PI / 180)*3/4) + transformDown)
                temp['value'] = ratio[i]
                temp['rotate'] = axis_arr[i][2]
                drawRatio.push(temp)
            }
    //comment5
            // var text = svg.selectAll(".MyText")
            //             .data(drawRatio)
            //             .enter()
            //             .append("g")
            //             .attr("class", "MyText")
            //             .append("text")
            //             .attr("x", function(d, i){
            //                 return 0
            //             })
            //             .attr("y", function(d, i){
            //                 return 0
            //             })
            //             .attr("transform", function(d, i){
            //                 return "translate(" + d.x+"," + d.y +")" + "rotate(" + d.rotate + ")" 
            //             })
            //             .text(function(d, i){
            //                 return legendlabel[i]
            //             })
            //             .attr("font-size", 15)
            //             .attr("fill", "black")
            // var drawinnerRatio = []
            // var miniradius = 45, adjust_value = 20;
            // for(var i =0; i<3;i++){
            //     var temp = {}
            //     temp['x'] = (ox + radiuslength/2 + miniradius  * Math.sin(axis_arr[i][2] * Math.PI / 180)) - adjust_value * Math.cos(Math.PI/3)
            //     temp['y'] = (oy + radiuslength   - miniradius * Math.cos(axis_arr[i][2] * Math.PI / 180)) - adjust_value * Math.sin(axis_arr[i][2] * Math.PI / 180)
            //     temp['value'] = ratio[i]
            //     temp['rotate'] = axis_arr[i][2]
            //     drawinnerRatio.push(temp)
            // }

            // for(var i =3; i<6;i++){
            //     var temp = {}
            //     temp['x'] = (ox - 10 + radiuslength/2 - miniradius * Math.sin(axis_arr[i][2] * Math.PI / 180)) - adjust_value * Math.sin(axis_arr[i][2] * Math.PI / 180)
            //     temp['y'] = (oy + radiuslength + transformDown*3.4/5 + miniradius * Math.cos(axis_arr[i][2] * Math.PI / 180))- adjust_value * Math.sin(axis_arr[i][2] * Math.PI / 180)
            //     temp['value'] = ratio[i]
            //     temp['rotate'] = axis_arr[i][2]
            //     drawinnerRatio.push(temp)
            // }

var test = [60, 70, 60, 89, 80, 104]
            var drawinnerRatio = []
            for(var i =0; i<3;i++){
                var temp = {}
                temp['x'] = text_location[i].x + test[i]
                temp['y'] = text_location[i].y_text-8
                temp['value'] = ratio[i]
                drawinnerRatio.push(temp)
            }

            for(var i =3; i<6;i++){
                var temp = {}
                temp['x'] = text_location[i].x + test[i]
                temp['y'] = text_location[i].y_text-8
                temp['value'] = ratio[i]
                drawinnerRatio.push(temp)
            }
//comment6
             var attrtext = svg.selectAll(".innerText")
                        .data(drawinnerRatio)
                        .enter()
                        .append("g")
                        .attr("class", "innerText")
                        .append("text")
                        .attr("x", function(d, i){
                            return d.x
                        })
                        .attr("y", function(d, i){
                            return d.y
                        })
                        .text(function(d, i){
                            return d.value
                        })
                        .attr("font-size", 15)
                        .attr("fill", "black")

        },
    
    }
}
</script>

<style scoped>

 div.tooltip {	
    position: absolute;			
    text-align: center;			
    width: 80px;					
    height: 28px;					
    padding: 2px;				
    font: 12px sans-serif;		
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
}

   svg {
    font-family: Sans-Serif, Arial;
}
.line {
  stroke-width: 2;
  fill: none;
}

.axis path {
  stroke: black;
}

.text {
  font-size: 12px;
}

.title-text {
  font-size: 12px;
}

</style>