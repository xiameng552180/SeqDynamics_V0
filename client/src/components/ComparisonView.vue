<template>
    <div class="content" id="ComparisonViewSVG" style="height: 395px; overflow:hidden">
    </div>
</template>
<script>
import NetService from '../services/net-service';
import DataService from '../services/data-service';
import PipeService from '../services/pipe-service';
import * as d3 from 'd3';

export default {
    name: 'ComparisonView',
    data() {
        return {
            width: null,
            height: null,
            svg: null,
            compareSelected: null,
            actionflag: null,
        };
    },
    mounted() {
        this.initialize();
        PipeService.$on(PipeService.UPDATE_COMPARISIONVIEW,()=>{
            this.data = DataService.data;
            this.actionflag = DataService.actionflag;
            this.rankData = DataService.rankData;
            this.compareSelected = DataService.compareSelected;
            this.authorSelected = DataService.authorSelected
            // clean the svg
            this.svg.selectAll('*').remove();
            if(DataService.actionflag != 0) {
                this.drawActivityChange(this.svg, this.data, this.rankData, this.compareSelected, this.authorSelected);
            }          
        })
    },
    methods: { 
        initialize(){
            this.width = d3.select('#ComparisonViewSVG').node().getBoundingClientRect().width;
            this.height = d3.select('#ComparisonViewSVG').node().getBoundingClientRect().height;
            this.svg = d3.select('#ComparisonViewSVG').append('svg')
                        .attr('class', 'd3SVG')
                        .attr('width', this.width)
                        .attr('height', this.height);
        },

        drawActivityChange(svgNode, data, rankData, compareSelected, authorSelected) {

            // set myfocus's margin
            var margin = {
                top: 15,
                right: 15,
                bottom: 10,
                left: 20,
            };
            // set context's margin
            var margin2 = {
                top: 20,
                right: 50,
                bottom: 10,
                left: 20
            };

            var width = svgNode.node().getBoundingClientRect().width - margin.left - margin.right - 440;
            var height = svgNode.node().getBoundingClientRect().height- margin2.top - margin.bottom;
            var colors = ['#52c4a8','#f7c65f','#44559b','#9cd8d6','#fb5050','#fb7595','black']
            // var colors = ['#64bc7d','#ff9d00','#772a83','#bccece','#CD5C5C','#6471bc','black']
            var titlerect_y = -28, titlerect_x = 350, titlerect_length = 25,titletext_y = titlerect_y+titlerect_length, titletext_size = 25, text_Length = 250;
            var datearray = [];// time axis (x-axis) mark to find mouse's index on time axis
            var typeDict = {
                        "Introduction": "Intr", 
                        "Unlabeled": "UnL",
                        "Big Number": "BNum", 
                        "Others": "Oth", 
                        "Math": "Math", 
                        "Search and Sort": "SSor", 
                        "Simulation": "Sim", 
                        "DP": "DP"
                    };
            var typebar_height = 18, bar_opacity = 0.7;
            var type_margintop = -40, typebar_gap = 25, type_textgap = 30, mouseup_gap = 60, mouseleft_gap = 40, typebar_Color = "#3d3b4f", typebar_fontsize = 20;
            var xaxis_fontsize = 20, yaxis_fontsize = 16;
            var height_context = 55;// set context's height
            var elheight = 200; // element's height
            var xloc_context = 55;
            var xloc_focus = 260;
            var xloc_focus1 = -10;
            var yloc_up = -10;
            var yloc_down = 125;
            var diffaxis_gap = 40, difftick_num = 2, diffx_Color = colors[4];
            var barwidth = 15;
            var rankmax = Object.keys(data).length;
            var brushheight = 20;
            var ticknum = 3;
            var tipmargin_top = 15;
            var tipmargin_right = width - 200;
            var seqblockwidth = 20, seqblockheight = 30, stackseqgap = 20;
            var buttonwidth = 20;
            var invalid_ButtonColor = "white", valid_ButtonColor = "#808080", stroke_ButtonColor = "#c2ccd0";
            var lineone_Color = '#caabd8', linetwo_Color = '#ffae59'
            var divgap = height/3 - elheight - seqblockheight ;
            var yTransform = 20
            var transformRight = 0;
            var transformDown = 10;
            var svg = svgNode.append("g").attr("transform", "translate(" + (410 + margin2.left) + "," + (margin2.top + yTransform)+ ")")
            var svg0 = svgNode.append("g").attr("transform", "translate(" +  transformRight+ "," + transformDown + ")")
            
            
            var hexagon = 400;

            //画六边形
            var center_point = [hexagon/2, hexagon/2]
            var radiuslength = 150
            var angle = [-60, 0, 60, -120, 180, 120]
            var compareSkillOne = []
            var compareSkillTwo = []
            var simuCompareSelected = [1, 2]
                
            //把skill根据最后一个月的rank进行排序
            var skill = []
            for(var each_author in data){
                var temp = {}
                temp['rank'] = data[each_author]['ranking']['2018-8']
                temp['skill'] = data[each_author]['skill_point']
                skill.push(temp)
            }
            function smallToBig(a, b){
                return a.rank - b.rank
            }
            skill.sort(smallToBig);

            //计算在每一个skill上的排名
            //0
            var newRank = []
            var skill0Rank = []
            for(var i = 0; i < skill.length; i++)
            {
                var temp = {}
                temp['rank'] = skill[i]['rank']
                temp['score'] = skill[i]['skill']['0']
                skill0Rank.push(temp)
            }
            function bigToSmall(a, b)
            {
                return b.score - a.score
            }
            skill0Rank.sort(bigToSmall)
            for(var i = 0; i < skill0Rank.length; i++)
            {
                skill0Rank[i]['newRank'] = i + 1;
            }
            skill0Rank.sort(smallToBig)
            newRank.push(skill0Rank)

            //1
            var skill1Rank = []
            for(var i = 0; i < skill.length; i++)
            {
                var temp = {}
                temp['rank'] = skill[i]['rank']
                temp['score'] = skill[i]['skill']['1']
                skill1Rank.push(temp)
            }
            function bigToSmall(a, b)
            {
                return b.score - a.score
            }
            skill1Rank.sort(bigToSmall)
            for(var i = 0; i < skill1Rank.length; i++)
            {
                skill1Rank[i]['newRank'] = i + 1;
            }
            skill1Rank.sort(smallToBig)
            newRank.push(skill1Rank)

            var skill2Rank = []
            for(var i = 0; i < skill.length; i++)
            {
                var temp = {}
                temp['rank'] = skill[i]['rank']
                temp['score'] = skill[i]['skill']['2']
                skill2Rank.push(temp)
            }
            function bigToSmall(a, b)
            {
                return b.score - a.score
            }
            skill2Rank.sort(bigToSmall)
            for(var i = 0; i < skill2Rank.length; i++)
            {
                skill2Rank[i]['newRank'] = i + 1;
            }
            skill2Rank.sort(smallToBig)
            newRank.push(skill2Rank)

            //3
            var skill3Rank = []
            for(var i = 0; i < skill.length; i++)
            {
                var temp = {}
                temp['rank'] = skill[i]['rank']
                temp['score'] = skill[i]['skill']['3']
                skill3Rank.push(temp)
            }
            function bigToSmall(a, b)
            {
                return b.score - a.score
            }
            skill3Rank.sort(bigToSmall)
            for(var i = 0; i < skill3Rank.length; i++)
            {
                skill3Rank[i]['newRank'] = i + 1;
            }
            skill3Rank.sort(smallToBig)
            newRank.push(skill3Rank)
    
            //4
            var skill4Rank = []
            for(var i = 0; i < skill.length; i++)
            {
                var temp = {}
                temp['rank'] = skill[i]['rank']
                temp['score'] = skill[i]['skill']['4']
                skill4Rank.push(temp)
            }
            function smallToBig2(a, b)
            {
                return a.score - b.score
            }
            skill4Rank.sort(smallToBig2)
            for(var i = 0; i < skill4Rank.length; i++)
            {   
                // if(skill4Rank[i]['score'] < 100)
                skill4Rank[i]['newRank'] = skill4Rank[i]['score'];
                // else
                // skill4Rank[i]['newRank'] = 1000
            }
            skill4Rank.sort(smallToBig)
            newRank.push(skill4Rank) 

            //5
            var skill5Rank = []
            for(var i = 0; i < skill.length; i++)
            {
                var temp = {}
                temp['rank'] = skill[i]['rank']
                temp['score'] = skill[i]['skill']['5']
                skill5Rank.push(temp)
            }
            function smallToBig2(a, b)
            {
                return a.score - b.score
            }
            skill5Rank.sort(bigToSmall)
            for(var i = 0; i < skill5Rank.length; i++)
            {
                skill5Rank[i]['newRank'] = i + 1;
            }
            skill5Rank.sort(smallToBig)
            newRank.push(skill5Rank) 

            if(DataService.actionflag == 1){
                 svg0.selectAll('*').remove();
                 for(var i = 0; i < 6; i++)
                {
                    if(i == 4)
                    {
                        compareSkillOne.push(parseInt(newRank[i][compareSelected[0] - 1]['newRank']/30 * rankmax))
                        compareSkillTwo.push(parseInt(newRank[i][compareSelected[1] - 1]['newRank']/30 * rankmax))
                    }
                    else{
                        compareSkillOne.push(newRank[i][compareSelected[0] - 1]['newRank'])
                        compareSkillTwo.push(newRank[i][compareSelected[1] - 1]['newRank'])
                    }
                }
                
                var compareComb = [compareSkillOne, compareSkillTwo]
                var compareComb = [compareSkillOne, compareSkillTwo]
                console.log(compareComb)
                var compareLength = [];
                for(var i = 0; i < compareComb[0].length; i++) {
                    var skillLength = [];
                    for(var j = 0; j < compareComb.length; j++) {
                        skillLength[j] = (rankmax - compareComb[j][i]) * (radiuslength / 2)/(rankmax - 1)
                    };
                    compareLength.push(skillLength);
                }
               
                var sumLength = [];
                for(var i = 0; i < compareLength.length; i++) {
                    var sumLen = 0;
                    var temp = [];
                    for(var j = 0; j < compareLength[i].length; j++) {
                        sumLen = compareLength[i][j];
                        temp.push(sumLen);
                    }
                    sumLength.push(temp);
                };
                var startpoint = center_point;
                var localg = svg0.append('g');
                localg.selectAll('.line_length')
                    .data(sumLength)
                    .enter()
                    .append('path')
                    .attr("d",function(d,i){
                        return "M"+center_point[0]+","+center_point[1]+"L"+(center_point[0] + radiuslength * Math.sin(angle[i]* Math.PI / 180))+","+(center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180))+"Z";
                    })
                    .attr("stroke",function(d, i){
                        return colors[i];
                    })
                    .attr('opacity', 0.3)
                    .attr("stroke-width","3px")
                    .attr("transform", "translate(" + transformRight + ',' +  transformDown + ")")

                    for(var i = 0; i < 6; i++) {
                        svg0.append('rect')
                            .style('fill', colors[i])
                            .style('opacity', 0.8)
                            .style('rx', 3)
                            .style('ry', 3)
                            .attr('width', radiuslength * Math.tan(Math.PI/6) * 2)
                            .attr('height', 10)
                            .attr('transform', 'translate('+(transformRight + (center_point[0] + radiuslength * Math.sin(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.cos(angle[i]* Math.PI / 180)))+','+((center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.sin(angle[i]*Math.PI/180))+ transformDown) +')'+' rotate('+angle[i]+')');
                    };
                    var player1Point = []
                    var player2Point = []
                    for(var i = 0; i < 6; i++) {
                        svg0.append('circle')
                            .style('fill', lineone_Color)
                            .style('opacity', 1)
                            .style('r', 2)
                            .attr('transform', 'translate('+(transformRight +(center_point[0] + sumLength[i][0] * Math.sin(angle[i]* Math.PI / 180))+','+(transformDown + (center_point[1] - sumLength[i][0] * Math.cos(angle[i]* Math.PI / 180))))+')'+' rotate('+angle[i]+')');
                        if(i < 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[i][0] * Math.sin(angle[i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[i][0] * Math.cos(angle[i]* Math.PI / 180))
                            player1Point.push(temp)
                        }
                        if(i >= 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[8-i][0] * Math.sin(angle[8-i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[8-i][0] * Math.cos(angle[8-i]* Math.PI / 180))
                            player1Point.push(temp)
                        }
                        
                    };

                    for(var i = 0; i < 6; i++) {
                        svg0.append('circle')
                            .style('fill', linetwo_Color)
                            .style('opacity', 1)
                            .style('r', 2)
                            .attr('transform', 'translate('+(transformRight +(center_point[0] + sumLength[i][1] * Math.sin(angle[i]* Math.PI / 180))+','+(transformDown + (center_point[1] - sumLength[i][1] * Math.cos(angle[i]* Math.PI / 180))))+')'+' rotate('+angle[i]+')');

                        if(i < 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[i][1] * Math.sin(angle[i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[i][1] * Math.cos(angle[i]* Math.PI / 180))
                            player2Point.push(temp)
                        }
                        if(i >= 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[8-i][1] * Math.sin(angle[8-i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[8-i][1] * Math.cos(angle[8-i]* Math.PI / 180))
                            player2Point.push(temp)
                        }
                    };
                            
                    var lineFunction = d3.line()
                                        .x(function(d){return d.x})
                                        .y(function(d){return d.y})
        
                    //把点连成区域
                    var area1 = svg0.append("path")
                                .attr("d", lineFunction(player1Point))
                                .attr("stroke", lineone_Color)
                                .attr("fill", lineone_Color)
                                .attr("opacity", 0.3)
                                .on("mouseover", function(){
                                d3.select(this).attr("opacity", 0.5)})
                                .on("mouseout", function(){
                                    d3.select(this).attr("opacity", 0.3)})
                                 

                    var area2 = svg0.append("path")
                                .attr("d", lineFunction(player2Point))
                                .attr("stroke", linetwo_Color)
                                .attr("fill", linetwo_Color)
                                .attr("opacity", 0.3)
                                .on("mouseover", function(){
                                d3.select(this).attr("opacity", 0.5)})
                                .on("mouseout", function(){
                                    d3.select(this).attr("opacity", 0.3)
                                })
                for(var i = 0; i < 6; i++) {
                    svg0.append('rect')
                        .style('fill', colors[i])
                        .style('opacity', 0.8)
                        .style('rx', 3)
                        .style('ry', 3)
                        .attr('width', radiuslength * Math.tan(Math.PI/6) * 2)
                        .attr('height', 10)
                        .attr('transform', 'translate('+(transformRight + (center_point[0] + radiuslength * Math.sin(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.cos(angle[i]* Math.PI / 180)))+','+((center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.sin(angle[i]*Math.PI/180))+ transformDown) +')'+' rotate('+angle[i]+')');
                };

                for(var i = 0; i < 6; i++)
                {
                    if(i == 4)
                    {
                        compareSkillOne.push(newRank[i][compareSelected[0] - 1]['newRank']/30 * rankmax)
                        compareSkillTwo.push(newRank[i][compareSelected[1] - 1]['newRank']/30 * rankmax)
                    }
                    else{
                        compareSkillOne.push(newRank[i][compareSelected[0] - 1]['newRank'])
                        compareSkillTwo.push(newRank[i][compareSelected[1] - 1]['newRank'])
                    }
                    
                }

                var compareComb = [compareSkillOne, compareSkillTwo]

            
                var compareLength = [];
                for(var i = 0; i < compareComb[0].length; i++) {
                    var skillLength = [];
                    for(var j = 0; j < compareComb.length; j++) {
                            skillLength[j] = (rankmax - compareComb[j][i]) * (radiuslength / 2)/(rankmax - 1)
                      
                    };
                    compareLength.push(skillLength);
                }

                var sumLength = [];
                for(var i = 0; i < compareLength.length; i++) {
                    var sumLen = 0;
                    var temp = [];
                    for(var j = 0; j < compareLength[i].length; j++) {
                        sumLen = sumLen + compareLength[i][j];
                        temp.push(sumLen);
                    }
                    sumLength.push(temp);
                };

                var startpoint = center_point;
                var localg = svg0.append('g');

                localg.selectAll('.line_length')
                    .data(sumLength)
                    .enter()
                    .append('path')
                    .attr("d",function(d,i){
                        return "M"+center_point[0]+","+center_point[1]+"L"+(center_point[0] + radiuslength* Math.sin(angle[i]* Math.PI / 180))+","+(center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180))+"Z";
                    })
                    .attr("stroke",function(d, i){
                        return colors[i];
                    })
                    .attr('opacity', 0.3)
                    .attr("stroke-width","3px")
                    .attr("transform", "translate(" + transformRight + ',' +  transformDown + ")")

        
                var player3Point = []

                for(var i = 0; i < 6; i++) {
                    svg0.append('circle')
                        .style('fill', linetwo_Color)
                        .style('opacity', 1)
                        .style('r', 2)
                        .attr('transform', 'translate('+(transformRight +(center_point[0] + sumLength[i][1] * Math.sin(angle[i]* Math.PI / 180))+','+(transformDown + (center_point[1] - sumLength[i][1] * Math.cos(angle[i]* Math.PI / 180))))+')'+' rotate('+angle[i]+')');

                    if(i < 3)
                    {
                        var temp = {}
                        temp['x'] = transformRight +(center_point[0] + sumLength[i][1] * Math.sin(angle[i]* Math.PI / 180))
                        temp['y'] = transformDown + (center_point[1] - sumLength[i][1] * Math.cos(angle[i]* Math.PI / 180))
                        player3Point.push(temp)
                    }
                    if(i >= 3)
                    {
                        var temp = {}
                        temp['x'] = transformRight +(center_point[0] + sumLength[8-i][1] * Math.sin(angle[8-i]* Math.PI / 180))
                        temp['y'] = transformDown + (center_point[1] - sumLength[8-i][1] * Math.cos(angle[8-i]* Math.PI / 180))
                        player3Point.push(temp)
                    }
                };
            
                var lineFunction = d3.line()
                                    .x(function(d){return d.x})
                                    .y(function(d){return d.y})

                //把点连成区域
                var area3 = svg0.append("path")
                            .attr("d", lineFunction(player3Point))
                            .attr("stroke", "grey")
                            .attr("fill", "grey")
                            .attr("opacity", 0.3)
                            .on("mouseover", function(){
                                d3.select(this).attr("opacity", 0.5)})
                            .on("mouseout", function(){
                                d3.select(this).attr("opacity", 0.3)})

                radartext();

            }
               
            if(DataService.actionflag == 2){
                svg0.selectAll('*').remove();
                for(var i = 0; i < 6; i++)
                {
                    if(i == 4)
                    {
                        compareSkillOne.push(parseInt(newRank[i][compareSelected[0] - 1]['newRank']/30 * rankmax))
                        compareSkillTwo.push(parseInt(newRank[i][compareSelected[1] - 1]['newRank']/30 * rankmax))
                    }
                    else{
                        compareSkillOne.push(newRank[i][compareSelected[0] - 1]['newRank'])
                        compareSkillTwo.push(newRank[i][compareSelected[1] - 1]['newRank'])
                    }
                }
                
                var compareComb = [compareSkillOne, compareSkillTwo]
                var compareComb = [compareSkillOne, compareSkillTwo]

                var compareLength = [];
                for(var i = 0; i < compareComb[0].length; i++) {
                    var skillLength = [];
                    for(var j = 0; j < compareComb.length; j++) {
                        skillLength[j] = (rankmax - compareComb[j][i]) * (radiuslength / 2)/(rankmax - 1)
                    };
                    compareLength.push(skillLength);
                }
               
                var sumLength = [];
                for(var i = 0; i < compareLength.length; i++) {
                    var sumLen = 0;
                    var temp = [];
                    for(var j = 0; j < compareLength[i].length; j++) {
                        sumLen = compareLength[i][j];
                        temp.push(sumLen);
                    }
                    sumLength.push(temp);
                };
                var startpoint = center_point;
                var localg = svg0.append('g');
                localg.selectAll('.line_length')
                    .data(sumLength)
                    .enter()
                    .append('path')
                    .attr("d",function(d,i){
                        return "M"+center_point[0]+","+center_point[1]+"L"+(center_point[0] + radiuslength * Math.sin(angle[i]* Math.PI / 180))+","+(center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180))+"Z";
                    })
                    .attr("stroke",function(d, i){
                        return colors[i];
                    })
                    .attr('opacity', 0.3)
                    .attr("stroke-width","3px")
                    .attr("transform", "translate(" + transformRight + ',' +  transformDown + ")")

                    for(var i = 0; i < 6; i++) {
                        svg0.append('rect')
                            .style('fill', colors[i])
                            .style('opacity', 0.8)
                            .style('rx', 3)
                            .style('ry', 3)
                            .attr('width', radiuslength * Math.tan(Math.PI/6) * 2)
                            .attr('height', 10)
                            .attr('transform', 'translate('+(transformRight + (center_point[0] + radiuslength * Math.sin(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.cos(angle[i]* Math.PI / 180)))+','+((center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.sin(angle[i]*Math.PI/180))+ transformDown) +')'+' rotate('+angle[i]+')');
                    };
                    var player1Point = []
                    var player2Point = []
                    for(var i = 0; i < 6; i++) {
                        svg0.append('circle')
                            .style('fill', lineone_Color)
                            .style('opacity', 1)
                            .style('r', 2)
                            .attr('transform', 'translate('+(transformRight +(center_point[0] + sumLength[i][0] * Math.sin(angle[i]* Math.PI / 180))+','+(transformDown + (center_point[1] - sumLength[i][0] * Math.cos(angle[i]* Math.PI / 180))))+')'+' rotate('+angle[i]+')');
                        if(i < 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[i][0] * Math.sin(angle[i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[i][0] * Math.cos(angle[i]* Math.PI / 180))
                            player1Point.push(temp)
                        }
                        if(i >= 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[8-i][0] * Math.sin(angle[8-i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[8-i][0] * Math.cos(angle[8-i]* Math.PI / 180))
                            player1Point.push(temp)
                        }
                        
                    };

                    for(var i = 0; i < 6; i++) {
                        svg0.append('circle')
                            .style('fill', linetwo_Color)
                            .style('opacity', 1)
                            .style('r', 2)
                            .attr('transform', 'translate('+(transformRight +(center_point[0] + sumLength[i][1] * Math.sin(angle[i]* Math.PI / 180))+','+(transformDown + (center_point[1] - sumLength[i][1] * Math.cos(angle[i]* Math.PI / 180))))+')'+' rotate('+angle[i]+')');

                        if(i < 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[i][1] * Math.sin(angle[i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[i][1] * Math.cos(angle[i]* Math.PI / 180))
                            player2Point.push(temp)
                        }
                        if(i >= 3)
                        {
                            var temp = {}
                            temp['x'] = transformRight +(center_point[0] + sumLength[8-i][1] * Math.sin(angle[8-i]* Math.PI / 180))
                            temp['y'] = transformDown + (center_point[1] - sumLength[8-i][1] * Math.cos(angle[8-i]* Math.PI / 180))
                            player2Point.push(temp)
                        }
                    };
                            
                    var lineFunction = d3.line()
                                        .x(function(d){return d.x})
                                        .y(function(d){return d.y})
        
                    //把点连成区域
                    var area1 = svg0.append("path")
                                .attr("d", lineFunction(player1Point))
                                .attr("stroke", lineone_Color)
                                .attr("fill", lineone_Color)
                                .attr("opacity", 0.3)
                                .on("mouseover", function(){
                                d3.select(this).attr("opacity", 0.5)})
                                .on("mouseout", function(){
                                    d3.select(this).attr("opacity", 0.3)})
                                 

                    var area2 = svg0.append("path")
                                .attr("d", lineFunction(player2Point))
                                .attr("stroke", linetwo_Color)
                                .attr("fill", linetwo_Color)
                                .attr("opacity", 0.3)
                                .on("mouseover", function(){
                                d3.select(this).attr("opacity", 0.5)})
                                .on("mouseout", function(){
                                    d3.select(this).attr("opacity", 0.3)
                                })

                    radartext();
            }

            //画sequence的图


            var myfocus_upcolor = ["#fbc052","#f9e37d", "#f7f796"]
            var myfocus_downcolor = ["#ff7575", "#52c4a8"]// success - unsuccess
            
            var compare = [];
            for(var i in data){   
                if(data[i]['ranking']['2018-8'] == compareSelected[0]) {
                    compare.push(i);             
                };                         
            };
            for(var j in data){   
                if(data[j]['ranking']['2018-8'] == compareSelected[1]) {
                    compare.push(j);             
                };                         
            };

            if(DataService.actionflag == 1) {
                charttwo(data[compare[0]], data[compare[1]]);
            };

            if(DataService.actionflag == 2) {
                chart(data[compare[0]], data[compare[1]]);
            };

            // chart(data['caohongyi'],data['ksws0305545']);

            function chart(one, two) {

                svg.append("rect")
                    .attr("width", titlerect_length)
                    .attr("height", titlerect_length)
                    .style("fill", lineone_Color)
                    .attr("transform", "translate(" + (-titlerect_length-5 - titlerect_x) +"," + titlerect_y + ")")
                    // .attr('opacity', bar_opacity);

                svg.append("rect")
                    .attr("width", titlerect_length)
                    .attr("height", titlerect_length)
                    .style("fill", linetwo_Color)
                    .attr("transform", "translate(" + (-1 + text_Length - titlerect_x) +"," + titlerect_y + ")")
                    // .attr('opacity', bar_opacity);
                
                svg.append("text")
                    .text("Rank " + compareSelected[0] + " VS Rank " + compareSelected[1])
                    .style("font-size", titletext_size)
                    .style("fill", valid_ButtonColor)
                    .attr("textLength", text_Length)
                    .attr("transform", "translate(" + ( -3 - titlerect_x) +"," + titletext_y + ")");

                var formatmonth = d3.timeParse("%Y-%m");
                // var formatmonth = d3.timeParse("%Y-%m-%d");
                var formatdate = d3.timeParse("%Y-%m-%d");
                var formatrankmonth = d3.timeParse("%Y-%m");
                var x = d3.scaleTime().range([0, width]);
                var y_up = d3.scaleLinear();
                var y_down = d3.scaleLinear(); 
                var z_up = d3.scaleOrdinal().range(myfocus_upcolor);
                var z_down = d3.scaleOrdinal().range(myfocus_downcolor);
                var x_context = d3.scaleTime().range([0, width]);
                var y_context = d3.scaleLinear();
                var x_diffday = d3.scaleLinear();
                var colorScale = d3.scaleLinear().domain([0,1]).range(['white', '#2f7ce0']);


                var nest = d3.nest()
                    .key(function(d) {
                        return d.time;
                    });
                var areatop = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        if(isNaN(d[1])) {
                            return y_up(d[0]);
                        }
                        else {
                            return y_up(d[1]);
                        }
                    });
                var areadown = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        return y_up(d[0]);                       
                    });               
                var areatop_verse = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        if(isNaN(d[1])) {
                            return y_down(d[0]);
                        }
                        else {
                            return y_down(d[1]);
                        }
                    });
                var areadown_verse = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        return y_down(d[0]);                       
                    });
                var rankline = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(d[0]);
                    })
                    .y(function(d) {
                        if(d[1]>rankmax) {
                            return y_context(rankmax);
                        } else {
                            return y_context(d[1]);
                        }
                    })

                var localg = svg.append("g").attr("transform", "translate(0,60)")
                    .attr("width", width)
                    .attr("height", elheight)
                var typebar = svg.append("g").attr("class", "typebar").attr("transform", "translate(0,30)")
                    .attr("width", width)
                    .attr("height", 30);           
                var myfocus = localg.append("g").attr("class", "focus");
                var context = localg.append("g").attr("class", "context"); 
                var queseq = localg.append("g").attr("class", "queseq")
                    .attr("transform", "translate(0," + stackseqgap + ")")
                    .attr('width', width)
                    .attr('height', seqblockheight);
                    
                var diff_acc = {};
                var diff_err = {};
                var diff_rank = {};
                var diff_sub = {};
                var diff_type = {};
                // for diff_acc
                for(var i in one['accept_num']) {
                    var temp = {};
                    temp['hard'] = one['accept_num'][i]['hard'] - two['accept_num'][i]['hard'];
                    temp['medium'] = one['accept_num'][i]['medium'] - two['accept_num'][i]['medium'];
                    temp['easy'] = one['accept_num'][i]['easy'] - two['accept_num'][i]['easy'];
                    temp['key'] = formatmonth(i);
                    diff_acc[i] = temp;
                };

                //for diff_err
                for(var i in one['errortype_num']) {
                    var temp = {};
                    temp['accepted_num'] = one['errortype_num'][i]['accepted_num'] - two['errortype_num'][i]['accepted_num'];
                    // temp['careless_num'] = one['errortype_num'][i]['careless_num'] - two['errortype_num'][i]['careless_num'];
                    temp['wrong_answer_num'] = one['errortype_num'][i]['wrong_answer_num'] - two['errortype_num'][i]['wrong_answer_num'] + one['errortype_num'][i]['careless_num'] - two['errortype_num'][i]['careless_num'];
                    temp['key'] = formatmonth(i);
                    diff_err[i] = temp;
                };

                // for diff_rank
                for(var i in one['ranking']) {
                    var temp = {};
                    if(!isNaN(one['ranking'][i])&&(!isNaN(two['ranking'][i]))) {
                        temp = one['ranking'][i] - two['ranking'][i];
                    } else if (isNaN(one['ranking'][i])&&(isNaN(two['ranking'][i]))) {
                        temp = 0;
                    } else if (isNaN(one['ranking'][i])) {
                        temp = 1000;
                    } else {
                        temp = -1000;
                    }
                    diff_rank[i] = temp;
                };

                // for diff_sub
                var subratiosumone = {};
                for(var i in one['submission_type_ratio']) {
                    var sumtemp = {};
                    sumtemp['unsuccessful_try'] = one['submission_type_ratio'][i]['0'] + one['submission_type_ratio'][i]['2'];
                    sumtemp['successful_try'] = one['submission_type_ratio'][i]['1'] + one['submission_type_ratio'][i]['4'];
                    sumtemp['inquiring_try'] = one['submission_type_ratio'][i]['3'] + one['submission_type_ratio'][i]['5'];
                    subratiosumone[i] = sumtemp;
                };
                for(var j in subratiosumone) {
                    subratiosumone[j]['unsuccessful_try'] = parseInt(subratiosumone[j]['unsuccessful_try'] * one['errortype_num_sum'][j]);
                    subratiosumone[j]['successful_try'] = parseInt(subratiosumone[j]['successful_try'] * one['errortype_num_sum'][j]);
                    subratiosumone[j]['inquiring_try'] = parseInt(subratiosumone[j]['inquiring_try'] * one['errortype_num_sum'][j]);
                };
                var subratiosumtwo = {};
                for(var i in two['submission_type_ratio']) {
                    var sumtemp = {};
                    sumtemp['unsuccessful_try'] = two['submission_type_ratio'][i]['0'] + two['submission_type_ratio'][i]['2'];
                    sumtemp['successful_try'] = two['submission_type_ratio'][i]['1'] + two['submission_type_ratio'][i]['4'];
                    sumtemp['inquiring_try'] = two['submission_type_ratio'][i]['3'] + two['submission_type_ratio'][i]['5'];
                    subratiosumtwo[i] = sumtemp;
                };
                for(var j in subratiosumtwo) {
                    subratiosumtwo[j]['unsuccessful_try'] = parseInt(subratiosumtwo[j]['unsuccessful_try'] * two['errortype_num_sum'][j]);
                    subratiosumtwo[j]['successful_try'] = parseInt(subratiosumtwo[j]['successful_try'] * two['errortype_num_sum'][j]);
                    subratiosumtwo[j]['inquiring_try'] = parseInt(subratiosumtwo[j]['inquiring_try'] * two['errortype_num_sum'][j]);
                };
                for(var i in subratiosumone) {
                    var temp = {};
                    temp['unsuccessful_try'] = subratiosumone[i]['unsuccessful_try'] - subratiosumtwo[i]['unsuccessful_try'];
                    temp['successful_try'] = subratiosumone[i]['successful_try'] - subratiosumtwo[i]['successful_try'];
                    temp['inquiring_try'] = subratiosumone[i]['inquiring_try'] - subratiosumtwo[i]['inquiring_try'];
                    temp['key'] = formatmonth(i);
                    diff_sub[i] = temp;
                };

                // for diff_type
                for(var i_type in one['problem_type']) {
                    diff_type[i_type] = one['problem_type'][i_type] - two['problem_type'][i_type];
                };

                var cal_data = {};
                cal_data['accept_num'] = diff_acc;
                cal_data['errortype_num'] = diff_err;
                cal_data['ranking_one'] = one['ranking'];
                cal_data['ranking_two'] = two['ranking'];
                cal_data['diffday'] = [skill4Rank[DataService.compareSelected[0]-1]['newRank'],skill4Rank[DataService.compareSelected[1]-1]['newRank'] ]
                cal_data['problem_sequence'] = one['problem_sequence'];
                cal_data['sub_num'] = diff_sub;
                cal_data['problem_type'] = diff_type;
        
                draw(cal_data);
                        
                function draw(data){   
                    var typedata = data['problem_type'];   
                    var rankdataone = data['ranking_one'];
                    var rankdatatwo = data['ranking_two']
                    var accdata = data['accept_num'];
                    var errdata = data['errortype_num'];
                    var diffday = data['diffday'];

                    var stackacc = d3.stack()
                        .keys(function() {                         
                            return ['hard','medium','easy'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging)
                        // .offset(d3.stackOffNone);
                    var stackerr = d3.stack()
                        .keys(function() {
                            return ['wrong_answer_num','accepted_num'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging)
                        // .offset(d3.stackOffNone);

                    var stacksub = d3.stack()
                        .keys(function() {
                            return ['unsuccessful_try','successful_try','inquiring_try'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging);

                    // draw type bar
                    var typesum = 0;
                    for(var i in typedata) {
                        typesum = typesum + Math.abs(typedata[i]);
                    };
                    var typetrans = 0;
                    var typeindex = 0;

                    var typebar_tooltip = typebar.append("text")
                        .attr('class', "typebar_tooltip")
                        .style("z-index", "2")
                        .style('font-size', typebar_fontsize)
                        .style("visibility", "hidden")
                        .style('fill', valid_ButtonColor);

                    var sortofType = [];
                    var sortofTrans = [];

                    for(var j in typedata) {
                        sortofTrans.push(typetrans);
                        if(typedata[j] > 0) {
                            typebar.append('rect')
                                .attr("class", "_bar")
                                .attr("height", typebar_height)
                                .attr("width", function() {
                                        return (width - 7*typebar_gap) * typedata[j] / typesum;
                                })
                                .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                .attr("stroke", valid_ButtonColor)
                                .attr("fill", lineone_Color)
                                .attr('opacity', bar_opacity);
                        } else if(typedata[j] < 0) {
                            typebar.append('rect')
                                .attr("class", "_bar")
                                .attr("height", typebar_height)
                                .attr("width", function() {
                                        return (width - 7*typebar_gap) * Math.abs(typedata[j]) / typesum;
                                })
                                .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                .attr("stroke", valid_ButtonColor)
                                .attr("fill", linetwo_Color)
                                .attr('opacity', bar_opacity);
                        } else {
                            typebar.append('rect')
                                .attr("class", "_bar")
                                .attr("height", typebar_height)
                                .attr("width", function() {
                                        return 1;
                                })
                                .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                .attr("stroke", "#312520")
                                .attr("fill", "white");
                        }

                        if(typeindex%2 == 0){
                            typebar.append("text")
                                .text(typeDict[j])
                                .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                .style("font-size", typebar_fontsize)
                                .style("fill", typebar_Color);
                        } else {
                            typebar.append("text")
                                .text(typeDict[j])
                                .attr("transform", "translate(" + typetrans + "," + (type_margintop + type_textgap) +")")
                                .style("font-size", typebar_fontsize)
                                .style("fill", typebar_Color);
                        }                       
                        typetrans = typetrans + (width -7*typebar_gap) * Math.abs(typedata[j]) / typesum + typebar_gap;
                        typeindex++;    
                        sortofType.push(j);  
                    };

                    typebar.selectAll('._bar')
                        .on('mousemove', function(d, i) {                         
                            typebar_tooltip.attr("transform", "translate(" + (d3.mouse(this)[0]+sortofTrans[i]-mouseleft_gap) + "," + (d3.mouse(this)[1] - mouseup_gap)+ ")")
                                .text(sortofType[i] + ": " + typedata[sortofType[i]])
                                .style("visibility", "visible");  
                        })
                        .on('mouseout', function(){
                            typebar.select('.typebar_tooltip').style("visibility", "hidden");
                        });
                    

                    // push accept_num into an array 'accarr' and sort it by date
                    var  accarr=[];
                    for(var i in accdata) {
                        accarr.push([formatmonth(i),accdata[i]]);
                    };
                    accarr = accarr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });
                    // adjust accarr's format so that can be stack()
                    for (var i = 0; i < accarr.length; i++) {
                        var obj = accarr[i][1];
                        obj.key = accarr[i][0]
                        delete accarr[i][1];
                        delete accarr[i][0];
                        accarr[i] = obj;                    
                    };

                    // push errortype_num into an array 'errarr' and sort it by date
                    var  errarr=[];
                    for(var i in errdata) {
                        errarr.push([formatmonth(i),errdata[i]]);
                    };
                    errarr = errarr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });
                    // adjust errarr's format so that can be stack()
                    for (var i = 0; i < errarr.length; i++) {
                        var obj = errarr[i][1];
                        obj.key = errarr[i][0]
                        delete errarr[i][1];
                        delete errarr[i][0];
                        errarr[i] = obj;             
                    };

                    // push ranking into an array 'rankarr' and sort it by date
                    var rankarr = [];

                    for(var i in rankdataone) {
                        rankarr.push([formatrankmonth(i),rankdataone[i]]);
                    }
                    rankarr = rankarr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });

                    var rankarrtwo = [];

                    for(var i in rankdatatwo) {
                        rankarrtwo.push([formatrankmonth(i),rankdatatwo[i]]);
                    }
                    rankarrtwo = rankarrtwo.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });

                    var layer_accept = stackacc(accarr);
                    var layer_error = stackerr(errarr);

                    function testmin() {
                                var a = d3.min(layer_error, function(layer) {
                                    return d3.min(layer, function(d) {
                                        return d[0];
                                    })
                                });
                                var b = d3.min(layer_accept, function(layer) {
                                    return d3.min(layer, function(d) {
                                        return d[0];
                                    })
                                });
                                if(a<b) {return a} else {return b};
                            };
                    function testmax() {
                                var a = d3.max(layer_error, function(layer) {
                                    return d3.max(layer, function(d) {
                                        return d[1];
                                    })
                                });
                                var b = d3.max(layer_accept, function(layer) {
                                    return d3.max(layer, function(d) {
                                        return d[1];
                                    })
                                });
                                if(a>b) {return a} else {return b};
                            }
                    var yaxis_max = testmax();
                    var yaxis_min = testmin();

                    ////////////////////////////////////////////////////////////////////////////////////////
                    // draw the pass rate and difficulty change
                    var seqdata = []
                     function time2date(time) {
                        return time.split(' ')[0];
                    }

                    seqdata.push(one['submission_sequence'])
                    seqdata.push(two['submission_sequence'])
                    var passRate = []
                    var averageDifficulty = []
                    // calculate pass rate of every day
                    for(var j = 0; j < seqdata.length; j++){
                        var tempPassRate = []
                        var tempAverageDifficulty = []
                        // var difficultPassRata = []
                        // var mediumPassRate = []
                        // var easyPassRate = []
                        
                        var dayTotalSubmission = []
                        var dayTotalAccept = []
                        var dayTotalDifficulty = []
                        var currentSubmission = 0
                        var currentAccept = 0
                        var currentDifficulty = 0
                        var previousDay = 0
                    
                        for(var i = 0; i < seqdata[j].length; i++)
                        {
                            var currentDate = time2date( seqdata[j][i]['time'])
                            var currentDay = currentDate.split('-')[2]
                            if(currentDay != previousDay)
                            {
                                previousDay = currentDay
                                currentSubmission = currentSubmission + 1
                                
                                
                                dayTotalSubmission.push(currentSubmission)
                                currentSubmission = 0
                                
                                if(i == 0)
                                    dayTotalAccept.push(0)
                                else{
                                    dayTotalAccept.push(currentAccept)
                                    currentAccept = 0
                                }

                                dayTotalDifficulty.push(currentDifficulty)
                                currentDifficulty = 0

                                if(seqdata[j][i]['judgeStatus'] == 'Accepted')
                                currentAccept += 1
                                currentDifficulty += seqdata[j][i]['difficulty']
 
                            }
                            else
                            {
                                currentSubmission += 1;
                                if(seqdata[j][i]['judgeStatus'] == 'Accepted')
                                currentAccept += 1
                                currentDifficulty += seqdata[j][i]['difficulty']
                            }
                            
                        }
                        
                         if(currentSubmission == 0)
                        currentSubmission = 1
                        dayTotalSubmission.push(currentSubmission + 1)
                        dayTotalAccept.push(currentAccept)
                        dayTotalDifficulty.push(currentDifficulty)


                        // var drawPassRate = []
                        for(var i = 0; i < dayTotalSubmission.length; i++)
                        {
                            tempPassRate.push(dayTotalAccept[i]/dayTotalSubmission[i])
                            tempAverageDifficulty.push(dayTotalDifficulty[i]/dayTotalSubmission[i])
                        }
                        
                        passRate.push(tempPassRate)
                        averageDifficulty.push(tempAverageDifficulty)
                        }
                    
                //    console.log(dayTotalSubmission)
                //    console.log(dayTotalAccept)

                    var xTicks = d3.max([passRate[0].length, passRate[1].length])

                    var x1 = d3.scaleLinear().range([0, width]);
                    x1.domain([0, xTicks])
                    var y1 = d3.scaleLinear().range([xloc_focus, yloc_down]);
                    y1.domain([0, 1])
                    
                    var passline = d3.line()
                    .curve(d3.curveBasis)
                    .x(function(d) {
                        return x1(d[0]);
                    })
                    .y(function(d) {
                        return y1(d[1])
                    })

                    var passLineOne = []
                    var passLineTwo = []
                    var averageDifficultyOne = []
                    var averageDifficultyTwo = []
                    for(var i = 0; i < passRate[0].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(passRate[0][i])
                        passLineOne.push(temp)
                    }
                    for(var i = 0; i < passRate[1].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(passRate[1][i])
                        passLineTwo.push(temp)
                    }

                    for(var i = 0; i < averageDifficulty[0].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[0][i] * 0.2 + passRate[0][i])
                        averageDifficultyOne.push(temp)
                    }

                    for(var i = 0; i < averageDifficulty[1].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[1][i] * 0.2 + passRate[1][i])
                        averageDifficultyTwo.push(temp)
                    }

                    for(var i = passRate[0].length - 1; i >= 0; i--){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[0][i] * 0.2 + passRate[0][i])
                        passLineOne.push(temp)
                    }
                    for(var i = passRate[1].length - 1; i >= 0; i--){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[1][i] * 0.2 + passRate[1][i])
                        passLineTwo.push(temp)
                    }
                    
                   
                    context.append("path")
                        .datum(passLineOne)
                        .attr("class", "min_rankline")
                        .attr("d", passline)
                        .attr("fill", lineone_Color)
                        .attr('stroke', lineone_Color)
                        .attr('stroke-width', 2)
                        .attr("opacity", 0.8);
                    
                    context.append("path")
                        .datum(passLineTwo)
                        .attr("class", "min_rankline")
                        .attr("d", passline)
                        .attr("fill", linetwo_Color)
                        .attr('stroke', linetwo_Color)
                        .attr('stroke-width', 2)
                        .attr('opacity', 0.8)

                    // context.append("path")
                    //     .datum(averageDifficultyOne)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", passline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', lineone_Color)
                    //     .attr('stroke-width', 2);
                    
                    // context.append("path")
                    //     .datum(averageDifficultyTwo)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", passline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', linetwo_Color)
                    //     .attr('stroke-width', 2);

                    ////////////////////////////////////////////////////////////////////////////////////////

                    x.domain(d3.extent(accarr, function(d) {
                        return d.key;
                    }));
                    y_up.domain([yaxis_min, yaxis_max])
                        .range([yloc_down/2, yloc_up]);
                    y_down.domain([yaxis_min, yaxis_max])
                        .range([yloc_down/2, yloc_down]);
                        // .range([yloc_down, xloc_focus]);
                    x_context.domain(x.domain());
                    
                    y_context.domain([0, rankmax])
                        .range([yloc_up, xloc_focus]);
                    x_diffday.domain([0, xTicks])
                        .range([0, width]);

                    myfocus.append('rect')
                        .attr("class", "zero_border")
                        .attr("x", 0)
                        .attr("y", y_up(0))
                        .attr("height", y_down(0)-y_up(0))
                        .attr("width", width)
                        .attr("fill", "#c2ccd0")
                        .attr("opacity", 0.2);

                    myfocus.append('rect')
                        .attr("class", "zero_border")
                        .attr("x", 0)
                        .attr("y", yloc_up)
                        .attr("height", y_up(0) - yloc_up)
                        .attr("width", width)
                        .attr("fill", "#e0eee8")
                        .attr("opacity", 0.2);

                    myfocus.append('rect')
                        .attr("class", "zero_border")
                        .attr("x", 0)
                        .attr("y", y_down(0))
                        .attr("height", xloc_focus - y_down(0))
                        .attr("width", width)
                        .attr("fill", "#e0eee8")
                        .attr("opacity", 0.2);

                    // draw theme river
                    // for(var diffindex = 0; diffindex<layer_accept.length; diffindex++) {
                    //     for(var i = 0; i < layer_accept[diffindex].length; i++) {
                    var layer = myfocus.selectAll(".focus")
                        .data(layer_accept)
                        .enter().append("g")
                        .attr("class", "layer")
                        .style("fill", function(d, i) { return z_up(i); });
                    layer.selectAll("rect")
                        .data(function(d) {return d; })
                        .enter().append("rect")
                        .attr("class", "min_rect")
                        .attr('id', 'one')
                        .attr("x", function(d) {
                            return x(new Date(d.data.key));
                        })
                        .attr("y", function(d) {
                            if(isNaN(d[1])) {
                                return y_up(d[0]);
                            }
                            else {
                                return y_up(d[1]);
                            }
                        })
                        .attr("height", function(d) {
                            if(isNaN(d[1])) {
                                return 0;
                            }
                            else {
                                return Math.abs(y_up(d[1])-y_up(d[0]));
                            }
                        })
                        .attr("width", barwidth);

                    for(var diffindextwo = 0; diffindextwo<layer_error.length; diffindextwo++) {
                        for(var i = 0; i < layer_error[diffindextwo].length; i++) {
                            myfocus.append('rect')
                                .data([layer_error[diffindextwo][i]])
                                .attr("class", "min_rect")
                                .attr('id', 'two')
                                .attr("x", function(d) {
                                    return x(new Date(d.data.key));
                                })
                                .attr("y", function(d) {
                                    return y_down(d[0]);
                                })
                                .attr("height", function(d) {
                                    if(isNaN(d[1])) {
                                        return 0;
                                    }
                                    else {
                                        return Math.abs(y_down(d[0]) - y_down(d[1]));
                                    }
                                })
                                .attr("width", barwidth)
                                .attr("fill", function(d) {
                                    return z_down(diffindextwo);
                                });
                        }
                    };

                    myfocus.selectAll('.diffday_circle')
                        .data(diffday)
                        .enter()
                        .append('circle')
                        .attr("class", "diffday_circle")
                        // .attr("cx", function(d) {
                        //     if(d<1000) {
                        //         return x_diffday(d);
                        //     } else {
                        //         return x_diffday(1000);
                        //     };    
                        // })
                        .attr("cx", function(d){ return x1(d)})
                        .attr("cy", y1(0))
                        .attr("r", 10)
                        .attr("fill", function(d, i) {
                            if(i==0) {
                                return lineone_Color;
                            } else {
                                return linetwo_Color;
                            }
                        })
                        .attr("opacity", 0.7);

                    myfocus.append("g")
                        .attr("class", "x_axis")
                        .attr("transform", "translate(0," + xloc_focus + ")")
                        .call(d3.axisBottom(x1).ticks(xTicks/6));

                    // draw myfocus's axis
                    myfocus.append("g")
                        .attr("class", "x_axis")
                        .attr("transform", "translate(0," + xloc_focus1 + ")")
                        .call(d3.axisTop(x).ticks(9).tickFormat(d3.timeFormat('%b')));
                    // myfocus.append("g")
                    //     .attr("class", "y_axis")
                    //     .attr("transform", "translate(" + width + ",0)")
                    //     .call(d3.axisRight(y_context).ticks(ticknum, "s"));

                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .attr("transform", "translate(" + 0 + ",0)")
                        .call(d3.axisLeft(y1).ticks(ticknum, "s"));

                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .attr("transform", "translate(" + width + ",0)")
                        .call(d3.axisRight(y_up).ticks(ticknum, "s"));
                    // myfocus.append("g")
                    //     .attr("class", "y_axis")
                    //     .attr("transform", "translate(" + width + ",0)")
                    //     .call(d3.axisRight(y_down).ticks(ticknum ,"s"));
                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .attr("transform", "translate(" + width + ",0)")
                        .call(d3.axisRight(y_down).ticks(ticknum, "s"));
                    // myfocus.append("g")
                    //     .attr("class", "diffx_axis")
                    //     .attr("transform", "translate(0," + (xloc_focus + diffaxis_gap) + ")")
                    //     .call(d3.axisBottom(x_diffday).ticks(difftick_num));
                    // context.append("path")
                    //     .datum(rankarr)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", rankline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', lineone_Color)
                    //     .attr('stroke-width', 2);

                    // context.append("path")
                    //     .datum(rankarrtwo)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", rankline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', linetwo_Color)
                    //     .attr('stroke-width', 2);

                    myfocus.select('.diffx_axis path')
                        .style('stroke', diffx_Color)
                        .style('fill', diffx_Color)
                        .style('opacity', 0.4);
                    myfocus.select('.diffx_axis tick line')
                        .style('stroke', diffx_Color)

                    myfocus.selectAll('.x_axis')
                        .selectAll('text')
                        .style('font-size', xaxis_fontsize);

                    myfocus.selectAll('.y_axis')
                        .selectAll('text')
                        .style('font-size', yaxis_fontsize);

                    // set tooltip
                    var tooltip = localg.select('.focus')
                        .append("text")
                        .style("z-index", "20")
                        .style("visibility", "hidden");

                    // highlight the hovering area
                    myfocus.selectAll(".min_rect")
                        .attr("opacity", 1)
                        .on("mousemove", function(d, i) {
                            myfocus.selectAll(".min_rect").transition()
                                .duration(100)
                                .attr("opacity", function(d, j) {
                                    return j != i ? 0.3 : 1;
                                })
                            var mousex = d3.mouse(this);                         
                            mousex = mousex[0];
                            var invertedx = x.invert(mousex);                           
                            invertedx = invertedx.getFullYear() + invertedx.getMonth() + (invertedx.getFullYear() - 2017) * 11;
                            var selected = d;
                            for (var k = 0; k < accarr.length; k++) {
                                datearray[k] = new Date(accarr[k].key)
                                var mid = datearray[k]
                                datearray[k] = mid.getFullYear() + mid.getMonth() + (mid.getFullYear() - 2017) * 11;
                            };

                            try {
                                var mousedate = datearray.indexOf(invertedx);
                                if(d[0] < 0) {
                                    tooltip.attr("transform", "translate(" + (d3.mouse(this)[0]-20) + "," + (d3.mouse(this)[1] - 10) + ")")
                                        .text(d[0]-d[1])
                                        .style("visibility", "visible"); 
                                } else {
                                    tooltip.attr("transform", "translate(" + (d3.mouse(this)[0]-20) + "," + (d3.mouse(this)[1] - 10) + ")")
                                        .text(d[1]-d[0])
                                        .style("visibility", "visible"); 
                                }
                                   
                            }
                            catch(err) {
                                //catchCode
                                document.getElementsByClassName("min_rect").innerHTML = err.message;
                            } 
                        })
                        .on("mouseout", function(d, i) {
                            var pro = [];
                            localg.selectAll(".min_rect")
                                .transition()
                                .duration(100)
                                .attr("opacity", "1");
                            tooltip.style("visibility", "hidden");
                        })

                }
            }

            function charttwo(one, two) {

                svg.append("rect")
                    .attr("width", titlerect_length)
                    .attr("height", titlerect_length)
                    .style("fill", lineone_Color)
                    .attr("transform", "translate(" + (-titlerect_length-5 - titlerect_x) +"," + titlerect_y + ")")
                    // .attr('opacity', bar_opacity);

                svg.append("rect")
                    .attr("width", titlerect_length)
                    .attr("height", titlerect_length)
                    .style("fill", linetwo_Color)
                    .attr("transform", "translate(" + (-1 + text_Length - titlerect_x) +"," + titlerect_y + ")")
                    // .attr('opacity', bar_opacity);
                
                svg.append("text")
                    .text("Rank " + compareSelected[0] + " with Rank " + compareSelected[1])
                    .style("font-size", titletext_size)
                    .style("fill", valid_ButtonColor)
                    .attr("textLength", text_Length)
                    .attr("transform", "translate(" + (-3 - titlerect_x) +"," + titletext_y + ")");

                var formatmonth = d3.timeParse("%Y-%m");
                // var formatmonth = d3.timeParse("%Y-%m-%d");
                var formatdate = d3.timeParse("%Y-%m-%d");
                var formatrankmonth = d3.timeParse("%Y-%m");
                var x = d3.scaleTime().range([0, width]);
                var y_up = d3.scaleLinear();
                var y_down = d3.scaleLinear(); 
                var z_up = d3.scaleOrdinal().range(myfocus_upcolor);
                var z_down = d3.scaleOrdinal().range(myfocus_downcolor);
                var x_context = d3.scaleTime().range([0, width]);
                var y_context = d3.scaleLinear();
                var x_diffday = d3.scaleLinear();
                var colorScale = d3.scaleLinear().domain([0,1]).range(['white', '#2f7ce0']);


                var nest = d3.nest()
                    .key(function(d) {
                        return d.time;
                    });
                var areatop = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        if(isNaN(d[1])) {
                            return y_up(d[0]);
                        }
                        else {
                            return y_up(d[1]);
                        }
                    });
                var areadown = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        return y_up(d[0]);                       
                    });               
                var areatop_verse = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        if(isNaN(d[1])) {
                            return y_down(d[0]);
                        }
                        else {
                            return y_down(d[1]);
                        }
                    });
                var areadown_verse = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(new Date(d.data.key));
                    })
                    .y(function(d) {
                        return y_down(d[0]);                       
                    });
                var rankline = d3.line()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) {
                        return x(d[0]);
                    })
                    .y(function(d) {
                        if(d[1]>rankmax) {
                            return y_context(rankmax);
                        } else {
                            return y_context(d[1]);
                        }
                    })

                var localg = svg.append("g").attr("transform", "translate(0,60)")
                    .attr("width", width)
                    .attr("height", elheight)
                var typebar = svg.append("g").attr("class", "typebar").attr("transform", "translate(0,30)")
                    .attr("width", width)
                    .attr("height", 30);           
                var myfocus = localg.append("g").attr("class", "focus");
                var context = localg.append("g").attr("class", "context"); 
                var queseq = localg.append("g").attr("class", "queseq")
                    .attr("transform", "translate(0," + stackseqgap + ")")
                    .attr('width', width)
                    .attr('height', seqblockheight);
                    
                var add_acc = {};
                var add_err = {};
                var add_rank = {};
                var add_sub = {};
                var add_type = {};
                // for add_acc
                for(var i in one['accept_num']) {
                    var temp = {};
                    temp['hard'] = one['accept_num'][i]['hard'] + two['accept_num'][i]['hard'];
                    temp['medium'] = one['accept_num'][i]['medium'] + two['accept_num'][i]['medium'];
                    temp['easy'] = one['accept_num'][i]['easy'] + two['accept_num'][i]['easy'];
                    temp['key'] = formatmonth(i);
                    add_acc[i] = temp;
                };

                //for add_err
                for(var i in one['errortype_num']) {
                    var temp = {};
                    temp['accepted_num'] = one['errortype_num'][i]['accepted_num'] + two['errortype_num'][i]['accepted_num'];
                    // temp['careless_num'] = one['errortype_num'][i]['careless_num'] + two['errortype_num'][i]['careless_num'];
                    temp['wrong_answer_num'] = one['errortype_num'][i]['wrong_answer_num'] + two['errortype_num'][i]['wrong_answer_num'] + one['errortype_num'][i]['careless_num'] + two['errortype_num'][i]['careless_num'];
                    temp['key'] = formatmonth(i);
                    add_err[i] = temp;
                };

                // for add_rank
                for(var i in one['ranking']) {
                    var temp = {};
                    if(!isNaN(one['ranking'][i])&&(!isNaN(two['ranking'][i]))) {
                        temp = one['ranking'][i] - two['ranking'][i];
                    } else if (isNaN(one['ranking'][i])&&(isNaN(two['ranking'][i]))) {
                        temp = 0;
                    } else if (isNaN(one['ranking'][i])) {
                        temp = 1000;
                    } else {
                        temp = -1000;
                    }
                    add_rank[i] = temp;
                };

                // for add_sub
                var subratiosumone = {};
                for(var i in one['submission_type_ratio']) {
                    var sumtemp = {};
                    sumtemp['unsuccessful_try'] = one['submission_type_ratio'][i]['0'] + one['submission_type_ratio'][i]['2'];
                    sumtemp['successful_try'] = one['submission_type_ratio'][i]['1'] + one['submission_type_ratio'][i]['4'];
                    sumtemp['inquiring_try'] = one['submission_type_ratio'][i]['3'] + one['submission_type_ratio'][i]['5'];
                    subratiosumone[i] = sumtemp;
                };
                for(var j in subratiosumone) {
                    subratiosumone[j]['unsuccessful_try'] = parseInt(subratiosumone[j]['unsuccessful_try'] * one['errortype_num_sum'][j]);
                    subratiosumone[j]['successful_try'] = parseInt(subratiosumone[j]['successful_try'] * one['errortype_num_sum'][j]);
                    subratiosumone[j]['inquiring_try'] = parseInt(subratiosumone[j]['inquiring_try'] * one['errortype_num_sum'][j]);
                };
                var subratiosumtwo = {};
                for(var i in two['submission_type_ratio']) {
                    var sumtemp = {};
                    sumtemp['unsuccessful_try'] = two['submission_type_ratio'][i]['0'] + two['submission_type_ratio'][i]['2'];
                    sumtemp['successful_try'] = two['submission_type_ratio'][i]['1'] + two['submission_type_ratio'][i]['4'];
                    sumtemp['inquiring_try'] = two['submission_type_ratio'][i]['3'] + two['submission_type_ratio'][i]['5'];
                    subratiosumtwo[i] = sumtemp;
                };
                for(var j in subratiosumtwo) {
                    subratiosumtwo[j]['unsuccessful_try'] = parseInt(subratiosumtwo[j]['unsuccessful_try'] * two['errortype_num_sum'][j]);
                    subratiosumtwo[j]['successful_try'] = parseInt(subratiosumtwo[j]['successful_try'] * two['errortype_num_sum'][j]);
                    subratiosumtwo[j]['inquiring_try'] = parseInt(subratiosumtwo[j]['inquiring_try'] * two['errortype_num_sum'][j]);
                };
                for(var i in subratiosumone) {
                    var temp = {};
                    temp['unsuccessful_try'] = subratiosumone[i]['unsuccessful_try'] + subratiosumtwo[i]['unsuccessful_try'];
                    temp['successful_try'] = subratiosumone[i]['successful_try'] + subratiosumtwo[i]['successful_try'];
                    temp['inquiring_try'] = subratiosumone[i]['inquiring_try'] + subratiosumtwo[i]['inquiring_try'];
                    temp['key'] = formatmonth(i);
                    add_sub[i] = temp;
                };

                // for add_type
                for(var i_type in one['problem_type']) {
                    add_type[i_type] = one['problem_type'][i_type] + two['problem_type'][i_type];
                };

                var cal_data = {};
                cal_data['accept_num'] = add_acc;
                cal_data['errortype_num'] = add_err;
                cal_data['ranking_one'] = one['ranking'];
                cal_data['ranking_two'] = two['ranking'];
                // cal_data['diffday'] = [one['skill_point']['4'],two['skill_point']['4']];
                cal_data['diffday'] = [skill4Rank[DataService.compareSelected[0]-1]['newRank'],skill4Rank[DataService.compareSelected[1]-1]['newRank'] ]
                cal_data['problem_sequence'] = one['problem_sequence'];
                cal_data['sub_num'] = add_sub;
                cal_data['problem_type'] = add_type;
        
                draw(cal_data);
                        
                function draw(data){   
                    var typedata = data['problem_type'];   
                    var rankdataone = data['ranking_one'];
                    var rankdatatwo = data['ranking_two']
                    var accdata = data['accept_num'];
                    var errdata = data['errortype_num'];
                    var seqdata = data['problem_sequence'];
                    // var errdata = data['sub_num'];
                    var diffday = data['diffday'];

                    var stackacc = d3.stack()
                        .keys(function() {                         
                            return ['hard','medium','easy'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging)
                        // .offset(d3.stackOffNone);
                    var stackerr = d3.stack()
                        .keys(function() {
                            return ['wrong_answer_num','accepted_num'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging)
                        // .offset(d3.stackOffNone);

                    var stacksub = d3.stack()
                        .keys(function() {
                            return ['unsuccessful_try','successful_try','inquiring_try'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging);

                    // draw type bar
                    var typesum = 0;
                    for(var i in typedata) {
                        typesum = typesum + Math.abs(typedata[i]);
                    };
                    var typetrans = 0;
                    var typeindex = 0;

                    var typebar_tooltip = typebar.append("text")
                        .attr('class', "typebar_tooltip")
                        .style("z-index", "2")
                        .style('font-size', typebar_fontsize)
                        .style("visibility", "hidden")
                        .style('fill', valid_ButtonColor);

                    var sortofType = [];
                    var sortofTrans = [];
                    for(var j in typedata) {
                        sortofTrans.push(typetrans);
                        if(typedata[j] > 0) {
                            typebar.append('rect')
                                .attr("class", "_bar")
                                .attr("height", typebar_height)
                                .attr("width", function() {
                                        return (width - 7*typebar_gap) * typedata[j] / typesum;
                                })
                                .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                .attr("stroke", valid_ButtonColor)
                                .attr("fill", "#e9f1f6");
                        } else {
                            typebar.append('rect')
                                .attr("class", "_bar")
                                .attr("height", typebar_height)
                                .attr("width", function() {
                                        return 1;
                                })
                                .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                .attr("stroke", "#312520")
                                .attr("fill", "white");
                        }

                        if(typeindex%2 == 0){
                            typebar.append("text")
                                .text(typeDict[j])
                                .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                .style("font-size", typebar_fontsize)
                                .style("fill", typebar_Color);
                        } else {
                            typebar.append("text")
                                .text(typeDict[j])
                                .attr("transform", "translate(" + typetrans + "," + (type_margintop + type_textgap) +")")
                                .style("font-size", typebar_fontsize)
                                .style("fill", typebar_Color);
                        }                       
                        typetrans = typetrans + (width -7*typebar_gap) * Math.abs(typedata[j]) / typesum + typebar_gap;
                        typeindex++;  
                        sortofType.push(j);    
                    };

                    typebar.selectAll('._bar')
                        .on('mousemove', function(d, i) {                         
                            typebar_tooltip.attr("transform", "translate(" + (d3.mouse(this)[0]+sortofTrans[i]- mouseleft_gap) + "," + (d3.mouse(this)[1] - mouseup_gap) + ")")
                                .text(sortofType[i] + ": " + typedata[sortofType[i]])
                                .style("visibility", "visible");  
                        })
                        .on('mouseout', function(){
                            typebar.select('.typebar_tooltip').style("visibility", "hidden");
                        });
                    

                    // push accept_num into an array 'accarr' and sort it by date
                    var  accarr=[];
                    for(var i in accdata) {
                        accarr.push([formatmonth(i),accdata[i]]);
                    };
                    accarr = accarr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });
                    // adjust accarr's format so that can be stack()
                    for (var i = 0; i < accarr.length; i++) {
                        var obj = accarr[i][1];
                        obj.key = accarr[i][0]
                        delete accarr[i][1];
                        delete accarr[i][0];
                        accarr[i] = obj;                    
                    };

                    // push errortype_num into an array 'errarr' and sort it by date
                    var  errarr=[];
                    for(var i in errdata) {
                        errarr.push([formatmonth(i),errdata[i]]);
                    };
                    errarr = errarr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });
                    // adjust errarr's format so that can be stack()
                    for (var i = 0; i < errarr.length; i++) {
                        var obj = errarr[i][1];
                        obj.key = errarr[i][0]
                        delete errarr[i][1];
                        delete errarr[i][0];
                        errarr[i] = obj;             
                    };

                    /////////////////////////////////////////////////////////////////////////////////////////
                     // draw the pass rate and difficulty change
                    var seqdata = []
                     function time2date(time) {
                        return time.split(' ')[0];
                    }

                    seqdata.push(one['submission_sequence'])
                    seqdata.push(two['submission_sequence'])
                    var passRate = []
                    var averageDifficulty = []
                    // calculate pass rate of every day
                    for(var j = 0; j < seqdata.length; j++){
                        var tempPassRate = []
                        var tempAverageDifficulty = []
                        // var difficultPassRata = []
                        // var mediumPassRate = []
                        // var easyPassRate = []
                        
                        var dayTotalSubmission = []
                        var dayTotalAccept = []
                        var dayTotalDifficulty = []
                        var currentSubmission = 0
                        var currentAccept = 0
                        var currentDifficulty = 0
                        var previousDay = 0
                    
                        for(var i = 0; i < seqdata[j].length; i++)
                        {
                            var currentDate = time2date( seqdata[j][i]['time'])
                            var currentDay = currentDate.split('-')[2]
                            if(currentDay != previousDay)
                            {
                                previousDay = currentDay
                                currentSubmission = currentSubmission + 1
                                
                                
                                dayTotalSubmission.push(currentSubmission)
                                currentSubmission = 0
                                
                                if(i == 0)
                                    dayTotalAccept.push(0)
                                else{
                                    dayTotalAccept.push(currentAccept)
                                    currentAccept = 0
                                }

                                if(i == 0)
                                    dayTotalDifficulty.push(0)
                                else{
                                    dayTotalDifficulty.push(currentDifficulty)
                                    currentDifficulty = 0
                                }

                                // dayTotalDifficulty.push(currentDifficulty)
                                // currentDifficulty = 0

                                if(seqdata[j][i]['judgeStatus'] == 'Accepted')
                                currentAccept += 1

                                currentDifficulty += seqdata[j][i]['difficulty']

                            }
                            else
                            {
                                currentSubmission += 1;
                                if(seqdata[j][i]['judgeStatus'] == 'Accepted')
                                currentAccept += 1
                                currentDifficulty += seqdata[j][i]['difficulty']
                            }                        
                        }
                        if(currentSubmission == 0)
                        currentSubmission = 1
                        dayTotalSubmission.push(currentSubmission)
                        dayTotalAccept.push(currentAccept)
                        dayTotalDifficulty.push(currentDifficulty)
                        
                        // var drawPassRate = []
                        for(var i = 0; i < dayTotalSubmission.length; i++)
                        {
                            tempPassRate.push(dayTotalAccept[i]/dayTotalSubmission[i])
                            tempAverageDifficulty.push(dayTotalDifficulty[i]/dayTotalSubmission[i])
                        }
                        
                        passRate.push(tempPassRate)
                        averageDifficulty.push(tempAverageDifficulty)
                        }
                    
                   
                    var xTicks = d3.max([passRate[0].length, passRate[1].length])

                    var x1 = d3.scaleLinear().range([0, width]);
                    x1.domain([0, xTicks])
                    var y1 = d3.scaleLinear().range([xloc_focus, yloc_down]);
                    y1.domain([0, 1])
                    
                    var passline = d3.line()
                    .curve(d3.curveBasis)
                    .x(function(d) {
                        return x1(d[0]);
                    })
                    .y(function(d) {
                        return y1(d[1])
                    })

                    var passLineOne = []
                    var passLineTwo = []
                    var averageDifficultyOne = []
                    var averageDifficultyTwo = []
                    for(var i = 0; i < passRate[0].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(passRate[0][i])
                        passLineOne.push(temp)
                    }
                    for(var i = 0; i < passRate[1].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(passRate[1][i])
                        passLineTwo.push(temp)
                    }

                    for(var i = 0; i < averageDifficulty[0].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[0][i] * 0.1 + passRate[0][i])
                        averageDifficultyOne.push(temp)
                    }

                    for(var i = 0; i < averageDifficulty[1].length; i++){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[1][i] * 0.1 + passRate[1][i])
                        averageDifficultyTwo.push(temp)
                    }

                    for(var i = passRate[0].length - 1; i >= 0; i--){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[0][i] * 0.1 + passRate[0][i])
                        passLineOne.push(temp)
                    }
                    for(var i = passRate[1].length - 1; i >= 0; i--){
                        temp = []
                        temp.push(i)
                        temp.push(-averageDifficulty[1][i] * 0.1 + passRate[1][i])
                        passLineTwo.push(temp)
                    }

                    context.append("path")
                        .datum(passLineOne)
                        .attr("class", "min_rankline")
                        .attr("d", passline)
                        .attr("fill", lineone_Color)
                        .attr('stroke', lineone_Color)
                        .attr('stroke-width', 2);
                    
                    context.append("path")
                        .datum(passLineTwo)
                        .attr("class", "min_rankline")
                        .attr("d", passline)
                        .attr("fill", linetwo_Color)
                        .attr('stroke', linetwo_Color)
                        .attr('stroke-width', 2);

                    // context.append("path")
                    //     .datum(averageDifficultyOne)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", passline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', lineone_Color)
                    //     .attr('stroke-width', 2);
                    
                    // context.append("path")
                    //     .datum(averageDifficultyTwo)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", passline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', linetwo_Color)
                    //     .attr('stroke-width', 2);

                    myfocus.append("g")
                        .attr("class", "x_axis")
                        .attr("transform", "translate(0," + xloc_focus + ")")
                        .call(d3.axisBottom(x1).ticks(xTicks/5));
                    ///////////////////////////////////////////////////////////////////////////////////////

                    // push ranking into an array 'rankarr' and sort it by date
                    var rankarr = [];

                    for(var i in rankdataone) {
                        rankarr.push([formatrankmonth(i),rankdataone[i]]);
                    }
                    rankarr = rankarr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });

                    var rankarrtwo = [];

                    for(var i in rankdatatwo) {
                        rankarrtwo.push([formatrankmonth(i),rankdatatwo[i]]);
                    }
                    rankarrtwo = rankarrtwo.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });

                    var layer_accept = stackacc(accarr);
                    var layer_error = stackerr(errarr);

                    x.domain(d3.extent(accarr, function(d) {
                        return d.key;
                    }));
                    y_up.domain([
                            d3.min(layer_error, function(layer) {
                                return d3.min(layer, function(d) {
                                    return d[0];
                                });
                            }), 
                            d3.max(layer_error, function(layer) {
                                return d3.max(layer, function(d) {
                                    return d[1];
                                });
                            })
                        ])
                        .range([yloc_down/2, yloc_up]);
                    y_down.domain([
                            d3.min(layer_error, function(layer) {
                                return d3.min(layer, function(d) {
                                    return d[0];
                                })
                            }), 
                            d3.max(layer_error, function(layer) {
                                return d3.max(layer, function(d) {
                                    return d[1];
                                })
                            })
                        ])
                        .range([yloc_down/2, yloc_down]);
                        // .range([yloc_down, xloc_focus]);
                    x_context.domain(x.domain());
                    
                    y_context.domain([0, rankmax])
                        .range([yloc_up, xloc_focus]);
                    x_diffday.domain([0, xTicks])
                        .range([0, width]);

                    myfocus.append('rect')
                        .attr("class", "zero_border")
                        .attr("x", 0)
                        .attr("y", y_up(0))
                        .attr("height", y_down(0)-y_up(0))
                        .attr("width", width)
                        .attr("fill", "#c2ccd0")
                        .attr("opacity", 0.2);

                    myfocus.append('rect')
                        .attr("class", "zero_border")
                        .attr("x", 0)
                        .attr("y", yloc_up)
                        .attr("height", y_up(0) - yloc_up)
                        .attr("width", width)
                        .attr("fill", "#e0eee8")
                        .attr("opacity", 0.2);

                    myfocus.append('rect')
                        .attr("class", "zero_border")
                        .attr("x", 0)
                        .attr("y", y_down(0))
                        .attr("height", xloc_focus - y_down(0))
                        .attr("width", width)
                        .attr("fill", "#e0eee8")
                        .attr("opacity", 0.2);

                    // draw theme river

                    var layer = myfocus.selectAll(".focus")
                        .data(layer_accept)
                        .enter().append("g")
                        .attr("class", "layer")
                        .style("fill", function(d, i) { return z_up(i); });
                    layer.selectAll("rect")
                        .data(function(d) {return d; })
                        .enter().append("rect")
                        .attr("class", "min_rect")
                        .attr('id', 'one')
                        .attr("x", function(d) {
                            return x(new Date(d.data.key));
                        })
                        .attr("y", function(d) {
                            if(isNaN(d[1])) {
                                return y_up(d[0]);
                            }
                            else {
                                return y_up(d[1]);
                            }
                        })
                        .attr("height", function(d) {
                            if(isNaN(d[1])) {
                                return 0;
                            }
                            else {
                                return Math.abs(y_up(d[1])-y_up(d[0]));
                            }
                        })
                        .attr("width", barwidth);

                    for(var diffindextwo = 0; diffindextwo<layer_error.length; diffindextwo++) {
                        for(var i = 0; i < layer_error[diffindextwo].length; i++) {
                            myfocus.append('rect')
                                .data([layer_error[diffindextwo][i]])
                                .attr("class", "min_rect")
                                .attr('id', 'two')
                                .attr("x", function(d) {
                                    // console.log(d);
                                    return x(new Date(d.data.key));
                                })
                                .attr("y", function(d) {
                                    return y_down(d[0]);
                                })
                                .attr("height", function(d) {
                                    if(isNaN(d[1])) {
                                        return 0;
                                    }
                                    else {
                                        return Math.abs(y_down(d[0]) - y_down(d[1]));
                                    }
                                })
                                .attr("width", barwidth)
                                .attr("fill", function(d) {
                                    return z_down(diffindextwo);
                                });
                        }
                    }

                    myfocus.selectAll('.diffday_circle')
                        .data(diffday)
                        .enter()
                        .append('circle')
                        .attr("class", "diffday_circle")
                        .attr("cx", function(d){ return x1(d)})
                        .attr("cy", y1(0))
                        .attr("r", 10)
                        .attr("fill", function(d, i) {
                            if(i==0) {
                                return lineone_Color;
                            } else {
                                return linetwo_Color;
                            }
                        })
                        .attr("opacity", 0.7);

                    // draw myfocus's axis
                    myfocus.append("g")
                        .attr("class", "x_axis")
                        .attr("transform", "translate(0," + xloc_focus1 + ")")
                        .call(d3.axisTop(x).ticks(9).tickFormat(d3.timeFormat('%b')));
                    // myfocus.append("g")
                    //     .attr("class", "y_axis")
                    //     .attr("transform", "translate(" + width + ",0)")
                    //     .call(d3.axisRight(y_context).ticks(ticknum, "s"));
                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .attr("transform", "translate(" + 0 + ",0)")
                        .call(d3.axisLeft(y1).ticks(ticknum, "s"));
                    myfocus.append("g")
                        .attr("class", "y_axis")
                        // .attr("transform", "translate(0,0)")
                        .attr("transform", "translate(" + width + ",0)")
                        .call(d3.axisRight(y_up).ticks(ticknum, "s"));
                    // myfocus.append("g")
                    //     .attr("class", "y_axis")
                    //     .attr("transform", "translate(" + width + ",0)")
                    //     .call(d3.axisRight(y_down).ticks(ticknum ,"s"));
                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .attr("transform", "translate(" + width + ",0)")
                        .call(d3.axisRight(y_down).ticks(ticknum, "s"));
                    // myfocus.append("g")
                    //     .attr("class", "diffx_axis")
                    //     .attr("transform", "translate(0," + (xloc_focus+diffaxis_gap) + ")")
                    //     .call(d3.axisBottom(x_diffday).ticks(difftick_num));
                    // context.append("path")
                    //     .datum(rankarr)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", rankline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', lineone_Color)
                    //     .attr('stroke-width', 2);
                    // context.append("path")
                    //     .datum(rankarrtwo)
                    //     .attr("class", "min_rankline")
                    //     .attr("d", rankline)
                    //     .attr("fill", 'none')
                    //     .attr('stroke', linetwo_Color)
                    //     .attr('stroke-width', 2);

                    myfocus.select('.diffx_axis path')
                        .style('stroke', diffx_Color)
                        .style('fill', diffx_Color)
                        .style('opacity', 0.4);
                    myfocus.select('.diffx_axis tick line')
                        .style('stroke', diffx_Color)

                    myfocus.selectAll('.x_axis')
                        .selectAll('text')
                        .style('font-size', xaxis_fontsize);

                    myfocus.selectAll('.y_axis')
                        .selectAll('text')
                        .style('font-size', yaxis_fontsize);

                    // set tooltip
                    var tooltip = localg.select('.focus')
                        .append("text")
                        .style("z-index", "20")
                        .style("visibility", "hidden");

                    // highlight the hovering area
                    myfocus.selectAll(".min_rect")
                        .attr("opacity", 1)
                        .on("mousemove", function(d, i) {
                            myfocus.selectAll(".min_rect").transition()
                                .duration(100)
                                .attr("opacity", function(d, j) {
                                    return j != i ? 0.3 : 1;
                                })
                            var mousex = d3.mouse(this);                         
                            mousex = mousex[0];
                            var invertedx = x.invert(mousex);                           
                            invertedx = invertedx.getFullYear() + invertedx.getMonth() + (invertedx.getFullYear() - 2017) * 11;
                            var selected = d;
                            for (var k = 0; k < accarr.length; k++) {
                                datearray[k] = new Date(accarr[k].key)
                                var mid = datearray[k]
                                datearray[k] = mid.getFullYear() + mid.getMonth() + (mid.getFullYear() - 2017) * 11;
                            };

                            try {
                                var mousedate = datearray.indexOf(invertedx);
                                if(d[0] < 0) {
                                    tooltip.attr("transform", "translate(" + (d3.mouse(this)[0]-20) + "," + (d3.mouse(this)[1] - 10) + ")")
                                        .text(d[0]-d[1])
                                        .style("visibility", "visible"); 
                                } else {
                                    tooltip.attr("transform", "translate(" + (d3.mouse(this)[0]-20) + "," + (d3.mouse(this)[1] - 10) + ")")
                                        .text(d[1]-d[0])
                                        .style("visibility", "visible"); 
                                }
                                   
                            }
                            catch(err) {
                                //catchCode
                                document.getElementsByClassName("min_rect").innerHTML = err.message;
                            } 
                        })
                        .on("mouseout", function(d, i) {
                            var pro = [];
                            localg.selectAll(".min_rect")
                                .transition()
                                .duration(100)
                                .attr("opacity", "1");
                            tooltip.style("visibility", "hidden");
                        })

                }
            }

            function radartext() {
                var drawRankone = []
                var modifyvalue = 5;
                for(var i =0; i<3;i++){
                    var temp = {}
                    temp['x'] = center_point[0] + radiuslength * Math.sin(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.cos(angle[i]* Math.PI / 180)*1.6/3
                    temp['y'] = center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.sin(angle[i]*Math.PI/180)*1.6/3+ transformDown
                    temp['value'] = newRank[i][compareSelected[0] - 1]['newRank']
                    temp['rotate'] = angle[i]
                    drawRankone.push(temp)
                }

                for(var i =3; i<6;i++){
                    var temp = {}
                    temp['x'] = center_point[0] + (radiuslength+5+transformDown) * Math.sin(angle[i]* Math.PI / 180) + radiuslength * Math.tan(Math.PI/6) * Math.cos(angle[i]* Math.PI / 180)*1.6/3
                    temp['y'] = (center_point[1] - (radiuslength+5+transformDown) * Math.cos(angle[i]* Math.PI / 180)) + (radiuslength+transformDown) * Math.tan(Math.PI/6) * Math.sin(angle[i]* Math.PI / 180)*1.6/3 + transformDown
                    temp['value'] = newRank[i][compareSelected[0] - 1]['newRank']
                    temp['rotate'] = angle[i] + 180
                    drawRankone.push(temp)
                }
                var textone = svg0.selectAll(".MyTextone")
                      .data(drawRankone)
                      .enter()
                      .append("g")
                      .attr("class", "MyTextone")
                      .append("text")
                      .attr("transform", function(d, i){
                          return "translate(" + d.x+"," + d.y +")" + "rotate(" + d.rotate + ")" 
                      })
                      .text(function(d, i){
                          return d.value
                      })
                      .attr("font-size", 20)
                      .attr("fill", lineone_Color)
                      .attr('opacity', 1.3)

                var drawRanktwo = []
                for(var i =0; i<3;i++){
                    var temp = {}
                    temp['x'] = center_point[0] + radiuslength * Math.sin(angle[i]* Math.PI / 180) + radiuslength * Math.tan(Math.PI/6) * Math.cos(angle[i]* Math.PI / 180)/3
                    temp['y'] = center_point[1] - radiuslength * Math.cos(angle[i]* Math.PI / 180) + radiuslength * Math.tan(Math.PI/6) * Math.sin(angle[i]*Math.PI/180)/3+ transformDown
                    temp['value'] = newRank[i][compareSelected[1] - 1]['newRank']
                    temp['rotate'] = angle[i]
                    drawRanktwo.push(temp)
                }

                for(var i =3; i<6;i++){
                    var temp = {}
                    temp['x'] = center_point[0] + (radiuslength+5+transformDown) * Math.sin(angle[i]* Math.PI / 180) - radiuslength * Math.tan(Math.PI/6) * Math.cos(angle[i]* Math.PI / 180)/3
                    temp['y'] = (center_point[1] - (radiuslength+5+transformDown) * Math.cos(angle[i]* Math.PI / 180)) - (radiuslength+transformDown) * Math.tan(Math.PI/6) * Math.sin(angle[i]* Math.PI / 180)/3 + transformDown
                    temp['value'] = newRank[i][compareSelected[1] - 1]['newRank']
                    temp['rotate'] = angle[i] + 180
                    drawRanktwo.push(temp)
                }

                var texttwo = svg0.selectAll(".MyTexttwo")
                      .data(drawRanktwo)
                      .enter()
                      .append("g")
                      .attr("class", "MyTexttwo")
                      .append("text")
                      .attr("transform", function(d, i){
                          return "translate(" + d.x+"," + d.y +")" + "rotate(" + d.rotate + ")" 
                      })
                      .text(function(d, i){
                          return d.value
                      })
                      .attr("font-size", 20)
                      .attr("fill", linetwo_Color)
                      .attr('opacity', 1.3)
            }
        }    
    }
}
</script>
