<template>
    <div class= "row" style = "overflow:hidden">
        <div class = "content" id = "Distribution" style=" height: 1223px; width: 35%; overflow:hidden; position: fixed ! important;"></div>
        <div class = "content" id="RankingViewSVG" style=" height: 1223px; width: 65%; overflow-x:hidden;"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import NetService from '../services/net-service';
import DataService from '../services/data-service';
import PipeService from '../services/pipe-service';

export default {
    name: 'RankingView',
    data() {
        return {
            svg0: null,
            svg: null, 
            data:null,
            authorSelected: null,
            range: null,
        };
        },
    mounted() {
        this.initialize();
        PipeService.$on(PipeService.UPDATE_RANKINGVIEW,()=>{
            this.authorSelected = DataService.authorSelected
            this.range = DataService.range
            this.data = DataService.finalRankData['data']
            this.draw(this.svg0, this.svg, this.data, this.range, this.authorSelected);
        })
            
    },
  
    methods: {
        initialize(){
            this.width = d3.select('#RankingViewSVG').node().getBoundingClientRect().width;
            this.height = d3.select('#RankingViewSVG').node().getBoundingClientRect().height + 43800;
            this.svg = d3.select('#RankingViewSVG').append('svg')
                         .attr('class', 'd3SVG')
                         .attr('width', this.width)
                         .attr('height', this.height);

            this.svg0 = d3.select('#Distribution').append('svg')
                          .attr('width', 110)
                          .attr('height', 1223)
                          .attr('transform', "translate(20, 0)")
        },
        draw(svgNode0, svgNode, data, range, authorSelected){
        
            svgNode0.selectAll('*').remove();
            svgNode.selectAll('*').remove();
            var svg = svgNode.append("g");

            var componentHeight = 1223;
            var barWidth = 90; //条形码宽度
            var rankWidth = 280;
            var rankHeight = 40;
            var finalRankData = []; //最后一个月排名数据
            var areaSelected = []; //选中的区域
            var rankDiffOld = [];
            var rankDiff = [];
            var rankDiffSum = [];
            var authorNum = data.length;
            var drawRankData = [];
            var maxScore = 0;

            var rect_Color = '#ffffff', burshbg_Color = '#9bd4e0', bg_Color = '#ffffff', stroke_Color = '#263271', selected_Color = 'black';

            draw_distribution();
            draw_rank();
            draw_text();


            function draw_distribution()
            {

                var svg0 = svgNode0.append("g");
                
                var distributionBar = svg0.append("g")
                                     .attr("class", "distributionBar")

                distributionBar.append("rect")
                               .attr("x", 10)
                               .attr("y", 0)
                               .attr("width", barWidth)
                               .attr("height", componentHeight)
                               .attr("fill", bg_Color)
                               .style("stroke", stroke_Color)
                               .attr("transform", "translate(10, 0)")

                //真实的最后一个月的排名数据
                for(var each_data in data){ 
                    // console.log(each_data)  
                    var temp = {}
                    temp['author'] = data[each_data]['author'];
                    temp['ranking'] = parseInt(data[each_data]['ranking']);
                    finalRankData.push(temp);
                }
                // console.log(finalRankData)
                
                //console.log(finalRankData)

                function sort_num(a, b){
                    return b.ranking-a.ranking;
                }
                finalRankData = finalRankData.sort(sort_num);
                // console.log(finalRankData)

                // rankDiff.push(finalRankData[1] - finalRankData[0]);

                for(var i =0; i < authorNum-1; i++)
                {
                    rankDiffOld.push(Math.abs(finalRankData[i+1]['ranking'] - finalRankData[i]['ranking']));
                }
                
                for(var i = 0; i < authorNum-1; i++){
                    rankDiff.push(rankDiffOld[i]/d3.max(rankDiffOld)*100)
                }
                // console.log(rankDiff)
                rankDiffSum.push(0);
    
                // rankDiffSum.push(rankDiff[0])

                for (var i = 1; i< authorNum; i++)
                {
                    rankDiffSum[i] = rankDiffSum[i-1] + rankDiff[i-1];
                }
                
                for(var i =0; i < authorNum; i++)
                {
                    DataService.rankDiff.push(rankDiffSum[i]);
                }

                // maxScore = Math.max.apply(Math,finalRankData.map(function(o){return o.ranking;}))
                maxScore = 0
                for(var i = 0; i < finalRankData.length; i++)
                {
                    if (finalRankData[i]['ranking'] > maxScore)
                    maxScore = finalRankData[i]['ranking']
                }
                

                var maskStart = (1.0-finalRankData[parseInt(range['startRank'])]['ranking']*1.0/maxScore) * (componentHeight + 218);
                var maskEnd = (1.0-finalRankData[parseInt(range['endRank'])]['ranking']*1.0/maxScore) * (componentHeight + 218);
                
                // draw a vertical arrow
                
                svg0.append("defs").append("marker")
                    .attr("id", "arrow")
                    .attr("viewBox", "0 0 12 12")
                    .attr("refX", 6)
                    .attr("refY", 6)
                    .attr("markerWidth", 20)
                    .attr("markerHeight", 20)
                    .attr("orient", "auto")
                    .append("svg:path")
                    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                    .style("fill", 'black')


                svg0.append("line")
                        .attr('x1',  10)
                        .attr('y1', 0)
                        .attr('x2', 10)
                        .attr('y2', 1200)
                        .style("stroke", "black")
                        .style("stroke-width", "2px")
                        .attr("marker-end", "url(#arrow)");

                var mask = svg0.append("g")
                                     .attr("class", "mask")

                mask.append("rect")
                               .attr("x", function(){
                                //    console.log("why");
                                   return 20
                               })
                               .attr("y", function(){
                                   return maskStart})
                               .attr("width", function(){
                                //    console.log(barWidth)
                                   return (barWidth)})
                               .attr("height", function(){
                                   return (maskEnd - maskStart)})
                               .attr("fill", burshbg_Color)
                               .attr("opacity", 0.3)

                mask.append("rect")
                               .attr("x", function(){
                                //    console.log("why");
                                   return 20
                               })
                               .attr("y", function(){
                                   return maskStart})
                               .attr("width", function(){
                                //    console.log(barWidth)
                                   return (barWidth)})
                               .attr("height", function(){
                                   return (maskEnd - maskStart)})
                               .attr("fill", "none")
                               .attr("stroke", "black")
                               .attr("stroke-width", "3px")
                                
                // console.log(rankDiffSum)
                 
                var drawLineData = []
                for(var i =0; i < authorNum; i++){
                    Array.prototype.indexOf = function(val) {
                                        for (var i = 0; i < this.length; i++) {
                                        if (this[i] == val) return i;}
                                            return -1;
                                        };
                    var temp = {}
                    temp['x1'] = 10
                    temp['y1'] = (1.0-finalRankData[i]['ranking']*1.0/maxScore) * (componentHeight + 200)
                    temp['x2'] = barWidth + 10
                    temp['y2'] = (1.0-finalRankData[i]['ranking']*1.0/maxScore) * (componentHeight + 200)
                    temp['rank'] = i
                    if(authorSelected.indexOf(i) != -1)
                        temp['flag'] = true;
                    else
                        temp['flag'] = false;   
                    drawLineData.push(temp)
                }

                var line = distributionBar.selectAll(".Myline")
                               .data(drawLineData)
                               .enter()
                               .append("g")
                               .attr("class", "Myline")
                               .attr("transform", "translate(" + 0 + "," + 0 + ")");

                    line.append("line")
                        .attr("x1", function(d){ return d.x1})
                        .attr("y1", function(d){ return d.y1})
                        .attr("x2", function(d){ return d.x2})
                        .attr("y2", function(d){ return d.y2})
                        .style("stroke", function(d){
                            if (d.flag == true)
                                return "red"
                            else 
                                return stroke_Color
                        })
                        .attr("opacity", "1")
                        .attr("stroke-width", "0.9px")
                        .attr("transform", "translate(10, 0)")
            }

            function draw_rank()
            {
                Array.prototype.indexOf = function(val) {
                                        for (var i = 0; i < this.length; i++) {
                                        if (this[i] == val) return i;}
                                            return -1;
                                        };

                for(var i = 0; i < authorNum-1; i++)
                {
                    var tempData = {};
                    tempData['x'] = 0;
                    // tempData['y'] = i*40 + rankDiffSum[i];
                    tempData['y'] = i*45;
                    tempData['width'] = rankWidth;
                    tempData['height'] = rankHeight;
                    tempData['author'] = finalRankData[i]['author'];
                    tempData['rank'] = i;
                    
                    if(authorSelected.indexOf(i) != -1)
                    tempData['flag'] = true;
                    else
                    tempData['flag'] = false;   
                    drawRankData.push(tempData);          
                }
                               
                var rank = svg.selectAll(".MyRank")
                                .data(drawRankData)
                                .enter()
                                .append("g")
                                .attr("class", "MyRank")
                                .attr("transform", "translate(" + 0 + "," + 0 + ")");

                rank.append("rect")
                    .attr("x", function(d, i){
                        return d.x;
                    })
                    .attr("y", function(d, i){
                        return d.y;
                    })
                    .attr("width", function(d, i){
                        return d.width;
                    })
                    .attr("height", function(d, i){
                        return d.height;
                    })
                    .attr("opacity", function(d){
                        // if (d.rank == DataService.hover)
                        // return 0.3
                        // else 
                        return 0.8
                    })
                    .attr("fill", function(d){
                        // if (d.rank == DataService.hover)
                        // return "#ff9d00"
                        // else 
                        return rect_Color
                    })
                    .attr("stroke", function(d){
                        if(d.flag == true){
                            return selected_Color;
                        }
                        else
                        return "#9bd4e0";
                    })
                    .attr("stroke-width", function(d){
                        if(d.flag == true){
                            return "3px";
                        }
                        else
                        return "none";
                    })
                    .on('click', function(d, i){
                        if(d.flag == false)
                        {
                            d.flag = true;
                            d3.select(this)
                            .attr("stroke", stroke_Color)
                            .attr("stroke-width", "3px")
                            // .attr("fill", "#ff9d00")
                            // .attr('opacity', 0.6)
                            DataService.authorSelected.push(i)
                            PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                            PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                            PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                            console.log(DataService.authorSelected)
                        }
                        else
                        {
                            d.flag = false;
                            d3.select(this)
                              .attr("fill", rect_Color)
                              .attr("opacity", 1.0)
                            Array.prototype.indexOf = function(val) {
                                        for (var i = 0; i < this.length; i++) {
                                        if (this[i] == val) return i;}
                                            return -1;
                                        };
                            Array.prototype.remove = function(val) {
                                        var index = this.indexOf(val);
                                        if (index > -1) {
                                            this.splice(index, 1);
                                            }
                                        };
                            DataService.authorSelected.remove(i);
                            console.log(DataService.authorSelected);
                            PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                            PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                            PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);

                        }
                    })
   
            }

            function draw_text()
            {
                var text = svg.append("g")
                              .attr("class", "text")
                
                for(var i =0; i < authorNum; i++){
                    text.append("text")
                        .attr("x", 100)
                        // .attr("y", 52/2 + i*40 + rankDiffSum[i])
                        .attr("y", 52/2 + i*45)
                        .attr("fill", 'black')
                        .attr("text-anchor", 'middle')
                        // .text("NO" + finalRankData[i])
                        .text("NO" + (i+1) + "    Score" + finalRankData[i]['ranking']) 
                        .attr("font-size", "24px")

                }

            }
            if(DataService.authorSelected.length == 0)
             $('#RankingViewSVG').animate({
                        scrollTop: (range['startRank']-1) * 45}, 100);
        }
    }
}
</script>
