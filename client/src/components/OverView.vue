<template>
    <div class="content" id="OverViewSVG" style="height: 810px; overflow:hidden">
    </div>
    
</template>
<script>
import * as d3 from 'd3';
import NetService from '../services/net-service';
import DataService from '../services/data-service';
import PipeService from '../services/pipe-service';

export default {
    name: 'OverView',
    data() {
        return {
            width: null,
            height: null,
            svg : null,
            data: null,
            range: null,
            authorSelected: null,
            ratio: null,
            barPosition: null,
            };
        },
    mounted() {
        this.initialize();
        // this.drawOneCircle(this.svg); 
        PipeService.$on(PipeService.UPDATE_OVERVIEW,()=>{
            this.authorSelected = DataService.authorSelected
            this.range = DataService.range
            this.data = DataService.data
            this.ratio = DataService.ratio
            this.barPosition = DataService.barPosition
            this.drawGlyph(this.svg, this.data, this.range, this.authorSelected, this.ratio, this.barPosition)
        })     
    },
  
    methods: { 
    initialize(){
        this.width = d3.select('#OverViewSVG').node().getBoundingClientRect().width;
        this.height = d3.select('#OverViewSVG').node().getBoundingClientRect().height;
        this.svg = d3.select('#OverViewSVG').append('svg')
                    .attr('class', 'd3SVG')
                    .attr('width', this.width)
                    .attr('height', this.height);
    },
    
    drawGlyph(svgNode, data, range, authorSelected, ratio, barPosition)
    {
        svgNode.selectAll('*').remove();
        var svg = svgNode.append("g")
        var width = svgNode.node().getBoundingClientRect().width
        var height = svgNode.node().getBoundingClientRect().height
        // var color = d3.scaleLinear()
        //             .domain([8, 1])
        //             // .range(['#bccece', '#634451'])
        //             .range(['#e5dbe4', '#eac56d'])
        var color = ['#9cd6da', '#bee2d6', '#9cd6da', '#97d6db', '#79c7de', '#5fb6d9', '#59a1c9', '#4e8ec0', '#4b73af']
        var arc_Color = [function(r){return color[r]}, "white", '#f8c45f', 'white', '#f67193']//"#68bde1"];
        // var arc_Color = [function(r){return color(r)}, "#161823", '#ffa011', 'black', "#83a0d1"];
        var outest_strokeColor = '#29241a', arcPath5_strokewidth = 1, arcPath5_width = 5;
        var highlight_Color = 'black';
        var smallcircle_opacity = 0.2;
        var arcPath5_strokewidth = 1, arcPath5_width = 5; 

         var brush = svg.append("g")
            .attr("class", "brush")
            .call(d3.brush()
            .extent([[0, 0], [width, height]])
            .on("end", brushed));

        //对data里面的数据取出skill和最后一个月的排名
        var skill = []

        for(var each_author in data){
            var temp = {}
            temp['rank'] = data[each_author]['ranking']['2018-8']
            temp['skill'] = data[each_author]['skill_point']
            temp['ranking'] = data[each_author]['ranking']
            skill.push(temp)
        }

        for(var i = 0; i< skill.length; i++){
            var rankingList = []
            for(var each_month in skill[i]['ranking'])
            {
                var temp = {}
                temp['month'] =each_month
                temp['monthRank']= skill[i]['ranking'][each_month]
                rankingList.push(temp)
                
            }
            function compareMonthRank(a, b){
                return a.month - b.month
            }
            
            rankingList.sort(compareMonthRank)
            skill[i]['SortedRanking'] = rankingList
        }

        //对skill数组按照排名进行排序
        function smallToBig(a, b){
            return a.rank - b.rank
        }
        skill.sort(smallToBig);

        var currentFeature = 3
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
        // console.log(skill0Rank)

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
        // console.log(skill1Rank)

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
        // console.log(skill2Rank)

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
        // console.log(skill3Rank)
    
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
            skill4Rank[i]['newRank'] = skill4Rank[i]['score'];
        }
        skill4Rank.sort(smallToBig)
        newRank.push(skill4Rank) 
        // console.log(skill4Rank)

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
        // console.log(skill5Rank)
//33333333333333333333333333333333333333333333333333333333333333333333
 //计算每个glyph的数据
        var rSmallMax = 0
        for(var i = 0; i < skill.length; i++){
            if(skill[i]['skill']['0'] > rSmallMax)
            rSmallMax = skill[i]['skill']['0'];
        }

        var drawData = []
        var minR = 15
        var maxR = 35
        var maxRR = 80
        for(var i = 0; i < skill.length; i++){
            temp = {}
            var rSmall = minR + skill[i]['skill']['0']/rSmallMax * maxR;
            temp['rSmall'] = rSmall
            
            var rMiddle = rSmall*Math.sqrt(skill[i]['skill']['10']/skill[i]['skill']['0'])
            temp['rMiddle'] = rMiddle

            var rBig = rSmall*Math.sqrt(skill[i]['skill']['3']/skill[i]['skill']['0'])
            temp['rBig'] = rBig

            var difficultRatio = skill[i]['skill']['1'] * Math.PI * 2

            temp['difficultRatio'] = difficultRatio

            var diversity = skill[i]['skill'][2]
            temp['diversity'] = diversity
            
            // if(skill[i]['skill']['4'] > 100)
            // var startDifficult = 2 * Math.PI
            // else
            var startDifficult = skill[i]['skill']['4']/30 * Math.PI * 2

            temp['startDifficult'] = startDifficult

            var difficultTried = skill[i]['skill']['8']/skill[i]['skill']['3'] * Math.PI * 2

            temp['difficultTried'] = difficultTried

            if(skill[i]['skill']['8'] == 0)
            temp['difficultRatioRadius']  = 0;
            else
            {
                var difficultRatio1 = (skill[i]['skill']['1'] * skill[i]['skill']['0'])/skill[i]['skill']['8']
                temp['difficultRatioRadius'] = rBig * Math.sqrt(difficultRatio1)

                var difficultMiddle = skill[i]['skill']['12'] /skill[i]['skill']['8']
                temp['difficultMiddle'] = rBig * Math.sqrt(difficultMiddle)
            }
           
           


            // if(skill[i]['skill']['5'] > 1000)
            // var variance = 1/4 * Math.PI
            // else
            // var variance = skill[i]['skill']['5']/1000 * 1/4 * Math.PI

            // temp['variance'] = variance

            var cy = skill[i]['rank']
            temp['cy'] = cy

            // var cx =  newRank[currentFeature][i]['newRank']
            // temp['cx'] = cx


            //计算新的横轴坐标，根据feature的组合
            var sum = 0
            for(var j =0; j < ratio.length; j++)
            {
                sum += newRank[j][i]['newRank'] * ratio[j]
            }
            temp['cx'] = sum

            temp['rank'] = i
            var inquiringScore = skill[i]['skill'][5] * 10
            // console.log(inquiringScore)
            temp['is'] = inquiringScore
            

            //总共做题的天数
            var days = skill[i]['skill']['9']
            if(days > 30)
            days = 30;
            temp['days'] = days

            temp['active'] = skill[i]['skill']['9']/skill[i]['skill']['11']
            drawData.push(temp)
        }

        //计算最大的inquiringScore并把别人的数除以这个数得到一个数值
        var maxIS = 0
        for(var i = 0; i < drawData.length; i++)
        {
            if (drawData[i]['is'] > maxIS)
            maxIS = drawData[i]['is']
        }
        for(var i = 0; i < drawData.length; i++){
            drawData[i]['is'] = drawData[i]['is']/maxIS * 10
            if(drawData[i]['is'] > 1)
            drawData[i]['is'] = 1
        }

        //计算每个人20个月每个月较上个排名变化的浮动
         for(var i = 0; i < skill.length; i++){
             var change = []
            //  console.log(skill[i]['SortedRanking'].length)
             for(var j = 1; j < skill[i]['SortedRanking'].length; j++)
             {
                var widthControl = 8
                var temp = skill[i]['SortedRanking'][j]['monthRank'] - skill[i]['SortedRanking'][j-1]['monthRank']
                // console.log(skill[i]['SortedRanking'][j])
                if(Math.abs(temp) <= 10)
                temp = 0;
                else if(temp < -100)
                temp = -100;
                else if (temp > 100)
                temp = 100;

                temp = temp/100 * widthControl;
                change.push(temp)
             }
          skill[i]['rankingChange'] = change
         }

        //计算排名变化曲线的控制点
        for(var i = 0; i < skill.length; i++){
            var positionChange = []
            var startMonth = 0
            if(skill[i]['SortedRanking'][0]['month'].split('-')[0] == '2017')
            startMonth = parseInt(skill[i]['SortedRanking'][0]['month'].split('-')[1])
            else
            startMonth = parseInt(skill[i]['SortedRanking'][0]['month'].split('-')[1]) + 12

            // console.log(startMonth)
         for(var j = 0; j < skill[i]['rankingChange'].length; j++){
             positionChange.push((startMonth + j) * 2*Math.PI/20)
         } 
        //  console.log(positionChange)
         skill[i]['positionChange'] = positionChange
        }


       //计算缩放比例
        var xMargin = 150 
        var startRank = parseInt(range['startRank'])
        var endRank = parseInt(range['endRank'])
        
        var xRankRange = []
        for(var i = startRank; i <= endRank; i++)
        {
            xRankRange.push(drawData[i]['cx'])
        }
        var xMinRank = d3.min(xRankRange)
        var xMaxRank = d3.max(xRankRange)
        

        //画坐标轴
         var xStartRank = d3.max([startRank - 10, 0])
         var xEndRank = d3.min([endRank + 10, Object.keys(data).length-1])
         var x = d3.scaleLinear().range([0, this.height-150])
         var xScale = x.domain([xStartRank+1, xEndRank+1])
         
        svg.append('g')
                    .attr("transform", 'translate('+ 35 + "," + 110 +")")
                    .attr('class', 'xAxis')
                    .call(d3.axisLeft(xScale))
        var yStartRank = d3.min([xMaxRank + 10, Object.keys(data).length-1])
        var yEndRank = d3.max([xMinRank - 10, 0])

         var y = d3.scaleLinear().range([0, this.width - 150])
         var yScale = y.domain([yStartRank+1, yEndRank+1])

         svg.append('g')
                    .attr("transform", "translate(" + 35 + "," + (this.height - 35)+ ")")
                    .attr('class', 'yAxis')
                    .call(d3.axisBottom(yScale))
        svg.selectAll('.yAxis')
                    .selectAll('text')
                    .style('font-size', '18px');
        svg.selectAll('.xAxis')
                    .selectAll('text')
                    .style('font-size', '18px');
        //画坐标轴上的字
         svg.append('g')
                   .append("text")
                   .attr('x', 10)
                   .attr('y', 90)
                   .attr('class', 'text')
                   .text("ELO Rank")
                   .style('font-size', '25px');

        svg.append('g')
                   .append("text")
                   .attr('x', this.width -230)
                   .attr('y', this.height-50)
                   .attr('class', 'text')
                   .text("Customized Rank")
                   .style('font-size', '25px');
        svg.append("svg:image")
                .attr('x', -9)
                .attr('y', -12)
                .attr('width', 120)
                .attr('height', 300)
                .attr("xlink:href", "../../static/legend.png")
                .attr("transform","translate(630, 440)")
        var scale = (this.width - 150)/(xMaxRank-xMinRank)
        var yScale1 = (this.height - 150)/(endRank-startRank)
        // console.log(this.height)
        var y = yScale1

//计算偏移量并放入drawData
        var xTransform = 30
        var yTransform = 105
        for(var i = 0; i < drawData.length; i++)
        {
            drawData[i]['transX'] = (xTransform + yScale(drawData[i]['cx']))
            drawData[i]['transY'] = (yTransform +  xScale(drawData[i]['rank']))
        }
// console.log(drawData)

         //画glyph
        //制造画的数据
       
        var pathData = [] //画透明的圆的数据
        for( var i = startRank; i <= endRank; i++){
            var temp = {}
            temp['cx'] =  drawData[i]['transX']
            temp['cy'] = drawData[i]['transY']
            temp['r'] = drawData[i]['rBig']
            temp['color'] = "#000"    
            temp['rank'] = i 
            temp['rank2'] = drawData[i]['cx']   
            pathData.push(temp)

        }
        // 把圆按外半径从小到大排序，这样就不会完全遮挡

        // console.log(skill3Rank)
        for(var i =0; i < Object.keys(data).length; i++)
        {
            DataService.drawOrder[i] = -1;
        }
        for(var i = startRank; i <= endRank; i++){
            // if(i != 0 && i != 1 && i != 2 && i!= 3 &&i != 4 && i != 5 && i != 7 && i != 8 && i != 9 && i != 10 && i != 12 && i != 14 && i!= 25 && i != 40 && i!= 70)
            DataService.drawOrder[skill3Rank[i]['newRank']] = i;
        }
       
        for( var j = 0; j < Object.keys(data).length; j++)
        { 
            // if(DataService.drawOrder[j] != -1 && j != 0 && j != 1 && j != 2 && j != 4 && j != 5 && j != 9 && j != 10 && j != 12 && j != 14 && j!= 25 && j != 40 && j!= 70)
            if(DataService.drawOrder[j] != -1)
            {
            var i = DataService.drawOrder[j]
            var arcPath1 = d3.arc()
                        .innerRadius(0)
                        .outerRadius(drawData[i]['rBig'])
                        .startAngle(0)
                        .endAngle(2 * Math.PI)

            var arcPath2 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[i]['rSmall'])
                            .startAngle(0)
                            .endAngle(2 * Math.PI)
            
            var arcPath3 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[i]['rBig'])
                            .startAngle(drawData[i]['startDifficult'])
                            .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])
            
            var arcPath4 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[i]['difficultRatioRadius'])
                            .startAngle(drawData[i]['startDifficult'])
                            .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])

            var arcPath5 = d3.arc()
                            .innerRadius(drawData[i]['rBig'])
                            .outerRadius(drawData[i]['rBig'] + arcPath5_width)
                            .startAngle(0)
                            .endAngle(drawData[i]['active']*2 * 2 *Math.PI)

            // var arcPath6 = d3.arc()
            //                 .innerRadius(drawData[i]['rMiddle'])
            //                 .outerRadius(drawData[i]['rMiddle'] + 1)
            //                 .startAngle(0)
            //                 .endAngle(2 *Math.PI)

            // var arcPath7 = d3.arc()
            //                 .innerRadius(drawData[i]['difficultMiddle'])
            //                 .outerRadius(drawData[i]['difficultMiddle'] + 1)
            //                 .startAngle(drawData[i]['startDifficult'])
            //                 .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])
            var arcPath6 = d3.arc()
                            .innerRadius(drawData[i]['rSmall'])
                            .outerRadius(drawData[i]['rSmall'] +1)
                            .startAngle(0)
                            .endAngle(2 * Math.PI)
            var arcPath7 = d3.arc()
                             .innerRadius(drawData[i]['difficultRatioRadius']-1)
                            .outerRadius(drawData[i]['difficultRatioRadius'])
                            .startAngle(drawData[i]['startDifficult'])
                            .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])


             svg.append('path')
                .attr('d', arcPath1())
                 .attr('stroke', outest_strokeColor)
                .attr('stroke-width', 1)
                .attr('fill', function(){
                    return arc_Color[0](drawData[i]['diversity'])})
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');


             svg.append('path')
                .attr('d', arcPath2())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', arc_Color[1])
                .attr('opacity', smallcircle_opacity)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            svg.append('path')
                .attr('d', arcPath6())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', "white")
                .attr('opacity', 1)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            svg.append('path')
                .attr("class", "pacnic")
                .attr('d', arcPath3())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', arc_Color[2])
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');
            
             svg.append('path')
                .attr("class", "pacnic")
                .attr('d', arcPath4())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', arc_Color[3])
                .attr("opacity", smallcircle_opacity)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            svg.append('path')
                .attr('d', arcPath5())
                .attr('stroke', 'none')
                .attr('stroke-width', arcPath5_strokewidth)
                .attr('fill', arc_Color[4])
                .attr('opacity', 1)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            svg.append('path')
                .attr("class", "pacnic")
                .attr('d', arcPath7())
                .attr('stroke-width', 1)
                .attr('fill', "white")
                .attr("opacity", 1)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            // svg.append('line')
            //    .attr('x1', drawData[i]['transX'])
            //    .attr('y1', drawData[i]['transY']- drawData[i]['rBig'])
            //    .attr('x2', drawData[i]['transX'])
            //    .attr('y2', drawData[i]['transY']- drawData[i]['rBig'] + drawData[i]['rBig'] * drawData[i]['is'])
            //    .style("stroke", "black")
            //    .attr("opacity", "1")
            //    .attr("stroke-width", "1px")
            // for(var j = 0; j < skill[i]['rankingChange'].length; j++)
            // {
            //     var arcPath4 = d3.arc()
            //             .innerRadius(drawData[i]['rBig'])
            //             .outerRadius(drawData[i]['rBig'] + Math.abs(skill[i]['rankingChange'][j]))
            //             .startAngle(skill[i]['positionChange'][j])
            //             .endAngle(skill[i]['positionChange'][j] + 2*Math.PI / 20)

            //     svg.append('path')
            //         .attr('d', arcPath4())
            //         .attr('stroke', 'none')
            //         .attr('stroke-width', 1)
            //         .attr('fill', '#efad0d')
            //        .attr('transform', 'translate(' + (scale*(drawData[i]['cx']-xMinRank)) + ',' +  yScale1*(i-startRank) +')')
                
            // }

            }              
      }
         for(var j = 0; j < DataService.authorSelected.length; j++){
             var i = authorSelected[j]
            var arcPath1 = d3.arc()
                        .innerRadius(0)
                        .outerRadius(drawData[i]['rBig'])
                        .startAngle(0)
                        .endAngle(2 * Math.PI)

            var arcPath2 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[i]['rSmall'])
                            .startAngle(0)
                            .endAngle(2 * Math.PI)
            
            var arcPath3 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[i]['rBig'])
                            .startAngle(drawData[i]['startDifficult'])
                            .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])
            
            var arcPath4 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[i]['difficultRatioRadius'])
                            .startAngle(drawData[i]['startDifficult'])
                            .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])

            var arcPath5 = d3.arc()
                            .innerRadius(drawData[i]['rBig'])
                            .outerRadius(drawData[i]['rBig'] + arcPath5_width + 2)
                            .startAngle(0)
                            .endAngle(drawData[i]['active']*2 * 2 *Math.PI)

            // var arcPath6 = d3.arc()
            //                 .innerRadius(drawData[i]['rMiddle'])
            //                 .outerRadius(drawData[i]['rMiddle'] + 1)
            //                 .startAngle(0)
            //                 .endAngle(2 *Math.PI)

            // var arcPath7 = d3.arc()
            //                 .innerRadius(drawData[i]['difficultMiddle'])
            //                 .outerRadius(drawData[i]['difficultMiddle'] + 1)
            //                 .startAngle(drawData[i]['startDifficult'])
            //                 .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])
            var arcPath6 = d3.arc()
                            .innerRadius(drawData[i]['rSmall'])
                            .outerRadius(drawData[i]['rSmall'] +1)
                            .startAngle(0)
                            .endAngle(2 * Math.PI)
            var arcPath7 = d3.arc()
                             .innerRadius(drawData[i]['difficultRatioRadius']-1)
                            .outerRadius(drawData[i]['difficultRatioRadius'])
                            .startAngle(drawData[i]['startDifficult'])
                            .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])

             svg.append('path')
                .attr('d', arcPath1())
                 .attr('stroke', outest_strokeColor)
                .attr('stroke-width', 1)
                .attr('fill', function(){
                    return arc_Color[0](drawData[i]['diversity'])})
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');


             svg.append('path')
                .attr('d', arcPath2())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', arc_Color[1])
                .attr('opacity', smallcircle_opacity)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

             svg.append('path')
                .attr('d', arcPath6())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', "white")
                .attr('opacity', 1)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            svg.append('path')
                .attr("class", "pacnic")
                .attr('d', arcPath3())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', arc_Color[2])
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');
            
             svg.append('path')
                .attr("class", "pacnic")
                .attr('d', arcPath4())
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', arc_Color[3])
                .attr("opacity", smallcircle_opacity)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            svg.append('path')
                .attr('d', arcPath5())
                .attr('stroke', 'none')
                .attr('stroke-width', arcPath5_strokewidth)
                .attr('fill', arc_Color[4])
                .attr('opacity', 1)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            svg.append('path')
                .attr("class", "pacnic")
                .attr('d', arcPath7())
                .attr('stroke-width', 1)
                .attr('fill', "white")
                .attr("opacity", 1)
                .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            //  svg.append('path')
            //     .attr('d', arcPath5())
            //     .attr('stroke', 'none')
            //     .attr('stroke-width', 1)
            //     .attr('fill', arc_Color[4])
            //     .attr('opacity', 1)
            //     .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            // svg.append('line')
            //    .attr('x1', drawData[i]['transX'])
            //    .attr('y1', drawData[i]['transY']- drawData[i]['rBig'])
            //    .attr('x2', drawData[i]['transX'])
            //    .attr('y2', drawData[i]['transY']- drawData[i]['rBig'] + drawData[i]['rBig'] * drawData[i]['is'])
            //    .style("stroke", "black")
            //    .attr("opacity", "1")
            //    .attr("stroke-width", "1px")

         }
    
         var circle = svg.selectAll(".MyCircle")
                           .data(pathData)
                           .enter()
                           .append("g")
                           .attr("class", "MyCircle")
                           .append("circle")
                           

            var arcPath1 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[0]['rBig'])
                            .startAngle(0)
                            .endAngle(2 * Math.PI)

            var arcPath2 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[0]['rSmall'])
                            .startAngle(0)
                            .endAngle(2 * Math.PI)
            
            var arcPath3 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[0]['rBig'])
                            .startAngle(drawData[0]['startDifficult'])
                            .endAngle(drawData[0]['startDifficult'] + drawData[0]['difficultTried'])

            var arcPath4 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[0]['difficultRatioRadius'])
                            .startAngle(drawData[0]['startDifficult'])
                            .endAngle(drawData[0]['startDifficult'] + drawData[0]['difficultTried'])

            var arcPath5 = d3.arc()
                            .innerRadius(drawData[0]['rBig'])
                            .outerRadius(drawData[0]['rBig'] + arcPath5_width + 2)
                            .startAngle(0)
                            .endAngle(drawData[0]['active']*2 * 2 *Math.PI)

            // var arcPath6 = d3.arc()
            //                 .innerRadius(drawData[0]['rMiddle'])
            //                 .outerRadius(drawData[0]['rMiddle'] + 1)
            //                 .startAngle(0)
            //                 .endAngle(2 *Math.PI)

            // var arcPath7 = d3.arc()
            //                 .innerRadius(drawData[0]['difficultMiddle'])
            //                 .outerRadius(drawData[0]['difficultMiddle'] + 1)
            //                 .startAngle(drawData[0]['startDifficult'])
            //                 .endAngle(drawData[0]['startDifficult'] + drawData[0]['difficultTried'])

            var arcPath6 = d3.arc()
                            .innerRadius(drawData[i]['rSmall'])
                            .outerRadius(drawData[i]['rSmall'] +1)
                            .startAngle(0)
                            .endAngle(2 * Math.PI)
            var arcPath7 = d3.arc()
                             .innerRadius(drawData[i]['difficultRatioRadius']-1)
                            .outerRadius(drawData[i]['difficultRatioRadius'])
                            .startAngle(drawData[i]['startDifficult'])
                            .endAngle(drawData[i]['startDifficult'] + drawData[i]['difficultTried'])

            var path1 =  svg.append('path')
                            .attr('class', "path1")
                            .attr('d', arcPath1())
                            .attr('stroke', 'none')
                            .attr('stroke-width', 1)
                            .attr('fill', "none")
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            var path2 = svg.append('path')
                            .attr("class", "path2")
                            .attr('d', arcPath2())
                            .attr('stroke', 'none')
                            .attr('stroke-width', 1)
                            .attr('fill', "none")
                            .attr('opacity', 0.3)
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            var path6 = svg.append('path')
                            .attr('d', arcPath6())
                            .attr("class", "path6")
                            .attr('stroke', 'none')
                            .attr('stroke-width', 1)
                            .attr('fill', "white")
                            .attr('opacity', 1)
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            var path3 = svg.append('path')
                            .attr("class", "path3")
                            .attr('d', arcPath3())
                            .attr('stroke', 'none')
                            .attr('stroke-width', 1)
                            .attr('fill', 'none')
                            // .attr('opacity', 0.5)
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');             
            
            var path4 = svg.append('path')
                            .attr("class", "path4")
                            .attr('d', arcPath4())
                            .attr('stroke', 'none')
                            .attr('stroke-width', 1)
                            .attr('fill', 'none')
                            .attr("opacity", 0)
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            var path5 = svg.append('path')
                            .attr("class", "path5")
                            .attr('d', arcPath5())
                            .attr('stroke', 'none')
                            .attr('stroke-width', arcPath5_strokewidth)
                            .attr('fill', 'none')
                            .attr("opacity", 0)
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            var path7 = svg.append('path')
                            .attr("class", "path7")
                            .attr('d', arcPath7())
                            .attr('stroke-width', 1)
                            .attr('fill', "white")
                            .attr("opacity", 1)
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')');

            // var line =  svg.append('line')
            //                .attr("class",'onlyline')
            //    .attr('x1', drawData[i]['transX'])
            //    .attr('y1', drawData[i]['transY']- drawData[i]['rBig'])
            //    .attr('x2', drawData[i]['transX'])
            //    .attr('y2', drawData[i]['transY']- drawData[i]['rBig'] + drawData[i]['rBig'] * drawData[i]['is'])
            //    .style("stroke", "black")
            //    .attr("opacity", "0")
            //    .attr("stroke-width", "1px") 
             
             
             var tooltip = svg.append("text")
                         .style("z-index", 20)
                         .style("visibility", "hidden")

             circle.attr("cx", function(d){
                     return d.cx})
                 .attr('cy', function(d){
                     return d.cy
                 })
                 .attr('r', function(d){
                     return d.r
                 })
                 .attr('fill', "black")
                 .attr('opacity', 0)
                 .on("mouseover", function(d, i){
                    DataService.hover = d.rank;
                    tooltip.attr("transform", "translate(" + drawData[d.rank]['transX'] + "," + drawData[d.rank]['transY'] +")")
                                // .text((d.rank +1) + "," + parseInt(d.rank2 + 1))
                                .text(d.rank +1)
                                .style("visibility", "visible")
                    // PipeService.$emit(PipeService.UPDATE_RANKINGVIEW)
                    arcPath1 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[d.rank]['rBig'])
                            .startAngle(0)
                            .endAngle(2 * Math.PI)

                     arcPath2 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[d.rank]['rSmall'])
                            .startAngle(0)
                            .endAngle(2 * Math.PI)

                     arcPath3 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[d.rank]['rBig'])
                            .startAngle(drawData[d.rank]['startDifficult'])
                            .endAngle(drawData[d.rank]['startDifficult'] + drawData[d.rank]['difficultTried'])

                    arcPath4 = d3.arc()
                            .innerRadius(0)
                            .outerRadius(drawData[d.rank]['difficultRatioRadius'])
                            .startAngle(drawData[d.rank]['startDifficult'])
                            .endAngle(drawData[d.rank]['startDifficult'] + drawData[d.rank]['difficultTried'])

                    arcPath5 = d3.arc()
                            .innerRadius(drawData[d.rank]['rBig'])
                            .outerRadius(drawData[d.rank]['rBig'] + arcPath5_width + 2)
                            .startAngle(0)
                            .endAngle(drawData[d.rank]['active'] * 2 * 2 *Math.PI)


                    // arcPath6 = d3.arc()
                    //         .innerRadius(drawData[d.rank]['rMiddle'])
                    //         .outerRadius(drawData[d.rank]['rMiddle'] + 1)
                    //         .startAngle(0)
                    //         .endAngle(2 *Math.PI)

                    // arcPath7 = d3.arc()
                    //         .innerRadius(drawData[d.rank]['difficultMiddle'])
                    //         .outerRadius(drawData[d.rank]['difficultMiddle'] + 1)
                    //         .startAngle(drawData[d.rank]['startDifficult'])
                    //         .endAngle(drawData[d.rank]['startDifficult'] + drawData[d.rank]['difficultTried'])

                    var arcPath6 = d3.arc()
                            .innerRadius(drawData[d.rank]['rSmall'])
                            .outerRadius(drawData[d.rank]['rSmall'] +1)
                            .startAngle(0)
                            .endAngle(2 * Math.PI)

                    var arcPath7 = d3.arc()
                             .innerRadius(drawData[d.rank]['difficultRatioRadius']-1)
                            .outerRadius(drawData[d.rank]['difficultRatioRadius'])
                            .startAngle(drawData[d.rank]['startDifficult'])
                            .endAngle(drawData[d.rank]['startDifficult'] + drawData[d.rank]['difficultTried'])

                     d3.selectAll(".path1")
                        .attr('d', arcPath1())
                        .attr('stroke', outest_strokeColor)
                        .attr('stroke-width', 1)
                        .attr('fill', function(){
                            return arc_Color[0](drawData[d.rank]['diversity'])})
                         .attr('transform', 'translate(' + drawData[d.rank]['transX'] + ',' +  drawData[d.rank]['transY']+')')
                         .on('click', function(){
                     
                    Array.prototype.indexOf = function(val) {
                        // console.log(val);
                        // console.log(this);
                        for (var i = 0; i < this.length; i++) {
                            // console.log(this[i]);
                            if (this[i] == val) return i;
                        }
                        return -1;
                    };
                    Array.prototype.remove = function(val) {
                        var index = this.indexOf(val);
                        if (index > -1) {
                            this.splice(index, 1);
                        }
                    }
                    if (authorSelected.indexOf(d.rank) != -1){
                        DataService.actionflag = 0;
                        DataService.authorSelected.remove(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW); 
                        // PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);    
                    }
                    else
                    {
                        DataService.authorSelected.push(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                    }
                })

                    //  console.log(d)
                    // var d1 = d.rank
                     d3.selectAll(".path2")
                        .attr('d', arcPath2())
                        .attr('stroke', 'none')
                        .attr('stroke-width', 1)
                        .attr('fill', arc_Color[1])
                        .attr('opacity', 0.3)
                        .attr('transform', 'translate(' + drawData[d.rank]['transX'] + ',' +  drawData[d.rank]['transY']+')')
                        .on('click', function(){
                     
                    Array.prototype.indexOf = function(val) {
                        // console.log(val);
                        // console.log(this);
                        for (var i = 0; i < this.length; i++) {
                            // console.log(this[i]);
                            if (this[i] == val) return i;
                        }
                        return -1;
                    };
                    Array.prototype.remove = function(val) {
                        var index = this.indexOf(val);
                        if (index > -1) {
                            this.splice(index, 1);
                        }
                    }
                    if (authorSelected.indexOf(d.rank) != -1){
                        DataService.actionflag = 0;
                        DataService.authorSelected.remove(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW); 
                        PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);    
                    }
                    else
                    {
                        DataService.authorSelected.push(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                    }
                })

                    d3.selectAll(".path6")
                        .attr('d', arcPath6())
                        .attr('stroke', 'none')
                        .attr('stroke-width', 1)
                        .attr('fill', "white")
                        .attr('opacity', 1)
                        .attr('transform', 'translate(' + drawData[d.rank]['transX'] + ',' +  drawData[d.rank]['transY']+')')
                        .on('click', function(){
                     
                    Array.prototype.indexOf = function(val) {
                        // console.log(val);
                        // console.log(this);
                        for (var i = 0; i < this.length; i++) {
                            // console.log(this[i]);
                            if (this[i] == val) return i;
                        }
                        return -1;
                    };
                    Array.prototype.remove = function(val) {
                        var index = this.indexOf(val);
                        if (index > -1) {
                            this.splice(index, 1);
                        }
                    }
                    if (authorSelected.indexOf(d.rank) != -1){
                        DataService.actionflag = 0;
                        DataService.authorSelected.remove(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW); 
                        PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);    
                    }
                    else
                    {
                        DataService.authorSelected.push(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                    }
                })   
                           
                    d3.selectAll(".path3")
                       .attr('d', arcPath3())
                        .attr('stroke', 'none')
                        .attr('stroke-width', 1)
                        .attr('fill', arc_Color[2])
                        .attr('transform', 'translate(' + drawData[d.rank]['transX'] + ',' +  drawData[d.rank]['transY']+')')
                        .on('click', function(){
                     
                    Array.prototype.indexOf = function(val) {
                        // console.log(val);
                        // console.log(this);
                        for (var i = 0; i < this.length; i++) {
                            // console.log(this[i]);
                            if (this[i] == val) return i;
                        }
                        return -1;
                    };
                    Array.prototype.remove = function(val) {
                        var index = this.indexOf(val);
                        if (index > -1) {
                            this.splice(index, 1);
                        }
                    }
                    if (authorSelected.indexOf(d.rank) != -1){
                        DataService.actionflag = 0;
                        DataService.authorSelected.remove(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW); 
                        PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);    
                    }
                    else
                    {
                        DataService.authorSelected.push(d.rank);
                        PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                        PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                        PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                    }
                })   
                    

                    d3.selectAll(".path4")
                            .attr('d', arcPath4())
                            .attr('stroke', 'none')
                            .attr('stroke-width', 1)
                            .attr('fill', arc_Color[3])
                            .attr("opacity", smallcircle_opacity)
                            .attr('transform', 'translate(' + drawData[d.rank]['transX'] + ',' +  drawData[d.rank]['transY']+')')
                            .on('click', function(){
                     
                            Array.prototype.indexOf = function(val) {
                                // console.log(val);
                                // console.log(this);
                                for (var i = 0; i < this.length; i++) {
                                    // console.log(this[i]);
                                    if (this[i] == val) return i;
                                }
                                return -1;
                            };
                            Array.prototype.remove = function(val) {
                                var index = this.indexOf(val);
                                if (index > -1) {
                                    this.splice(index, 1);
                                }
                            }
                            if (authorSelected.indexOf(d.rank) != -1){
                                DataService.actionflag = 0;
                                DataService.authorSelected.remove(d.rank);
                                PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                                PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW); 
                                PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);    
                            }
                            else
                            {
                                DataService.authorSelected.push(d.rank);
                                PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                                PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                            }
                   }) 

                    d3.selectAll(".path5")
                            .attr('d', arcPath5())
                            .attr('stroke', 'none')
                            .attr('stroke-width', arcPath5_strokewidth)
                            .attr('fill', arc_Color[4])
                            .attr("opacity", 1)
                            .attr('transform', 'translate(' + drawData[d.rank]['transX'] + ',' +  drawData[d.rank]['transY']+')')
                            .on('click', function(){
                     
                            Array.prototype.indexOf = function(val) {
                                // console.log(val);
                                // console.log(this);
                                for (var i = 0; i < this.length; i++) {
                                    // console.log(this[i]);
                                    if (this[i] == val) return i;
                                }
                                return -1;
                            };
                            Array.prototype.remove = function(val) {
                                var index = this.indexOf(val);
                                if (index > -1) {
                                    this.splice(index, 1);
                                }
                            }
                            if (authorSelected.indexOf(d.rank) != -1){
                                DataService.actionflag = 0;
                                DataService.authorSelected.remove(d.rank);
                                PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                                PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW); 
                                PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);    
                            }
                            else
                            {
                                DataService.authorSelected.push(d.rank);
                                PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                                PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                            }
                   }) 

                   d3.selectAll(".path7")
                            .attr("class", "pacnic")
                            .attr('d', arcPath7())
                            .attr('stroke-width', 1)
                            .attr('fill', "white")
                            .attr("opacity", 1)
                            .attr('transform', 'translate(' + drawData[i]['transX'] + ',' +  drawData[i]['transY']+')')
                            .on('click', function(){
                     
                            Array.prototype.indexOf = function(val) {
                                // console.log(val);
                                // console.log(this);
                                for (var i = 0; i < this.length; i++) {
                                    // console.log(this[i]);
                                    if (this[i] == val) return i;
                                }
                                return -1;
                            };
                            Array.prototype.remove = function(val) {
                                var index = this.indexOf(val);
                                if (index > -1) {
                                    this.splice(index, 1);
                                }
                            }
                            if (authorSelected.indexOf(d.rank) != -1){
                                DataService.actionflag = 0;
                                DataService.authorSelected.remove(d.rank);
                                PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                                PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW); 
                                PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);    
                            }
                            else
                            {
                                DataService.authorSelected.push(d.rank);
                                PipeService.$emit(PipeService.UPDATE_OVERVIEW);
                                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                                PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW);
                            }
                   }) 

                        // d3.selectAll(".onlyline")
                        // .attr('x1', drawData[d.rank]['transX'])
                        // .attr('y1', drawData[d.rank]['transY']- drawData[d.rank]['rBig'])
                        // .attr('x2', drawData[d.rank]['transX'])
                        // .attr('y2', drawData[d.rank]['transY']- drawData[d.rank]['rBig'] + drawData[d.rank]['rBig'] * drawData[d.rank]['is'])
                        // .style("stroke", "black")
                        // .attr("opacity", "1")
                        // .attr("stroke-width", "2px")
  
                 })



        //画选中的人高亮的圈和字
        for(var i = 0; i < authorSelected.length; i++){
            if(authorSelected[i] >= startRank && authorSelected[i] <= endRank){
                var arcPathSelected = d3.arc()
                            .innerRadius(drawData[authorSelected[i]]['rBig'] + 5)
                            .outerRadius(drawData[authorSelected[i]]['rBig'] + 8)
                            .startAngle(0)
                            .endAngle(2*Math.PI)

             svg.append('path')
                .attr("class", "pacnic")
                .attr('d', arcPathSelected())
                .attr('opacity', 1)
                .attr('stroke-width', 3)
                .attr('fill', highlight_Color)
                .attr('opacity', 0.8)
               .attr('transform', 'translate(' + drawData[authorSelected[i]]['transX'] + ',' +  drawData[authorSelected[i]]['transY']+')')
             
             svg.append('text')
                .attr('class', "textSelected")
                .attr('x', drawData[authorSelected[i]]['transX'])
                .attr('y', drawData[authorSelected[i]]['transY'])
                .style('font-family', 'Arial')
                .text(authorSelected[i] + 1)
                .attr('fill', 'black')
            }
        }
        
        function brushed(){
           var selection = d3.event.selection;

           var brushMin = 1000
           var brushMax = 0
           for(var i =0; i < Object.keys(data).length; i++){
               if(selection[0][0] <= drawData[i]['transX'] && drawData[i]['transX'] < selection[1][0] 
                 && selection[0][1] <= drawData[i]['transY'] && drawData[i]['transY'] < selection[1][1])
                 {
                    if(i > brushMax)
                    brushMax = i
                    if(i < brushMin)
                    brushMin = i
                }
           }
           if(brushMin == 1000 && brushMax == 0)
            {
               return;
            }
            else{
                DataService.range['startRank'] = brushMin
                DataService.range['endRank'] = brushMax
                PipeService.$emit(PipeService.UPDATE_OVERVIEW)
                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW)
                PipeService.$emit(PipeService.UPDATE_CORRELATIONVIEW)
            }
        // console.log(brushMin)
        // console.log(brushMax)
           
        }

        //画返回键
        var selected = false;
         svg.append("rect")
            .attr("x", 20)
            .attr("y",20)
            .attr("width", 80)
            .attr("height", 30)
            .attr("fill", "grey")
            .attr("opacity", 0.3)
            .style("stroke", "black")
            .on("click", function(){
                DataService.range['startRank'] = 0
                DataService.range['endRank'] = 99
                PipeService.$emit(PipeService.UPDATE_OVERVIEW)
                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW)
                PipeService.$emit(PipeService.UPDATE_CORRELATIONVIEW)
            })

            svg.append('g')
                   .append("text")
                   .attr('x', 30)
                   .attr('y', 40)
                   .attr('class', 'text')
                   .style('font-size', 23)
                   .text("Back")
                   .attr('fill', '#black')
                   .on("click", function(){
                DataService.range['startRank'] = 0
                DataService.range['endRank'] = 99
                PipeService.$emit(PipeService.UPDATE_OVERVIEW)
                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW)
                PipeService.$emit(PipeService.UPDATE_CORRELATIONVIEW)
            })
        
    //     //画feature比例分配的bar
    //     var colors = ['black', '#b6d7a8','#4291f7','#e29c45','#6b6882','#b0a4e3','#ffd966']
    //     var barWidth = 8
    //     var barHeight = 30

    //      var drag = d3.drag()
    //                 .on('start', null)
    //                 .on('drag', function(d, i){
    //                     var drag_dx = d3.event.dx;
    //                     if(i != 0 && i != 6){
    //                      drawBar[i]['x'] = parseFloat(d3.select(this).attr("x")) + 1*drag_dx
    //                     //边缘碰撞检测
    //                     if(drawBar[i]['x'] < drawBar[0]['x'] + 1.2*barWidth)
    //                      drawBar[i]['x'] = drawBar[0]['x'] + 1.2*barWidth
    //                     else if(drawBar[i]['x'] > drawBar[6]['x'] - barWidth)
    //                      drawBar[i]['x'] = drawBar[6]['x'] - barWidth
                        
    //                     //旁边一起移动
    //                     for(var i =1; i < 6; i++)
    //                     {
    //                         // console.log("current = "　+ drawBar[2]['x'] + " left = " + (drawBar[1]['x']+barWidth))
    //                         if(drawBar[i]['x'] < drawBar[i-1]['x'] + barWidth+1){
    //                             // console.log("okokokokok")
    //                             drawBar[i-1]['x'] = drawBar[i]['x'] - 1.2*barWidth
                                
    //                             if(drawBar[i-1]['x'] < drawBar[0]['x'] + 1.2*barWidth*(i-1))
    //                             {
    //                                 drawBar[i-1]['x'] = drawBar[0]['x'] + 1.2*barWidth*(i-1)
    //                                 drawBar[i]['x'] = drawBar[i-1]['x'] + 1.2*barWidth
    //                             }
    //                         }

    //                         if(drawBar[i]['x'] > drawBar[i + 1]['x'] - barWidth){
    //                             // console.log("okokokok")
    //                             drawBar[i +1]['x'] = drawBar[i]['x'] + barWidth
    //                             if(drawBar[i+1]['x'] > drawBar[6]['x'] - barWidth*(5-i))
    //                             {
    //                             drawBar[i+1]['x'] = drawBar[6]['x'] - barWidth*(5-i)
    //                             drawBar[i]['x'] = drawBar[i+1]['x'] - barWidth
    //                             }
    //                         }
    //                     }
                        
    //                     }


    //                     // const newBar = svg.selectAll(".MyBar")
    //                     //                   .data(drawBar)
    //                     //                   .select("rect")
    //                         // ratio = []

    //                         for(var i = 1; i < 7; i++){
    //                             drawRatio[i-1]['value'] = (drawBar[i]['x'] - drawBar[i-1]['x'])/(600-barWidth*6)
    //                             drawRatio[i-1]['value'] = drawRatio[i-1]['value'].toFixed(1)
    //                         }
    //                     //    console.log(drawRatio)

    //                         // const newText = svg.selectAll(".MyText")
    //                         //                    .data(drawRatio)
    //                         //                    .select("text")
    //                         text.attr("x", function(d, i){
    //                                 return d.x
    //                             })
    //                             .attr("y", function(d, i){
    //                                 return d.y
    //                             })
    //                             .text(function(d, i){
    //                                 return d.value
    //                             })
    //                             .attr("fill", "black")

    //                      bar.attr("x", function(d){
    //                             return d.x
    //                         })
    //                         .attr("y", function(d){
    //                             return d.y
    //                         })
    //                         .attr("width", function(d){
    //                             return d.width
    //                         })
    //                         .attr("height", function(d){
    //                             return d.height
    //                         })
    //                         .attr("fill", function(d){
    //                             return d.color
    //                         })

                           
    //                         console.log(drawRatio)
    //                         for(var i =0; i < drawRatio.length; i++){
    //                             DataService.ratio[i] = drawRatio[i]['value']
    //                         }

    //                         for(var i =0; i < 7; i++){
    //                             DataService.barPosition[i] = drawBar[i]['x']
    //                         }
                              
    //                         // drawGlyph(svgNode, data, range, authorSelected, ratio)
    //                         console.log(DataService.ratio)
    //                         PipeService.$emit(PipeService.UPDATE_OVERVIEW)
                            
    //                     })


    //         var drawBar = []
    //                 // var ratio = [0.17, 0.17, 0.17, 0.17, 0.17, 0.17]
    //                 for(var i = 0; i < 7; i++){
    //                     var temp = {}
    //                     temp['x'] = barPosition[i]
    //                     temp['y'] = 750
    //                     temp['width'] = barWidth
    //                     temp['height'] = barHeight
    //                     temp['color'] = colors[i]
    //                     drawBar.push(temp)
    //                     }

    //     var bar = svg.selectAll(".MyBar")
    //                 .data(drawBar)
    //                 .enter()
    //                 .append("g")
    //                 .attr("class", "MyBar")
    //                 .append("rect")
    //                 .attr("x", function(d){
    //                     return d.x
    //                 })
    //                 .attr("y", function(d){
    //                     return d.y
    //                 })
    //                 .attr("width", function(d){
    //                     return d.width
    //                 })
    //                 .attr("height", function(d){
    //                     return d.height
    //                 })
    //                 .attr("fill", function(d){
    //                     return d.color
    //                 })
    //                 .call(drag)
        
    //     var drawRatio = []
    //     for(var i =0; i<6;i++){
    //         var temp = {}
    //         temp['x'] = 130 + 100*i
    //         temp['y'] = 795
    //         temp['value'] = ratio[i]
    //         drawRatio.push(temp)
    //     }
    // // console.log(ratio)
    // //   console.log(drawRatio)
    //      var text = svg.selectAll(".MyText")
    //                   .data(drawRatio)
    //                   .enter()
    //                   .append("g")
    //                   .attr("class", "MyText")
    //                   .append("text")
    //                   .attr("x", function(d, i){
    //                       return d.x
    //                   })
    //                   .attr("y", function(d, i){
    //                       return d.y
    //                   })
    //                   .text(function(d, i){
    //                       return d.value
    //                   })
    //                   .attr("fill", "black")

    },
    }
}































//2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    //     //计算每个glyph的数据
    //     var rBigMax = 0
    //     for(var i = 0; i < skill.length; i++){
    //         if(skill[i]['skill']['0'] > rBigMax)
    //         rBigMax = skill[i]['skill']['0'];
    //     }

    //     var drawData = []
    //     for(var i = 0; i < skill.length; i++){
    //         temp = {}
    //         var rBig = 10 + skill[i]['skill']['0']/rBigMax * 50;
    //         temp['rBig'] = rBig

    //         var rSmall = skill[i]['skill']['0']/skill[i]['skill']['3'] * rBig
    //         temp['rSmall'] = rSmall

    //         var difficultRatio = skill[i]['skill']['1'] * Math.PI

    //         temp['difficultRatio'] = difficultRatio

    //         var diversity = skill[i]['skill'][2]
    //         temp['diversity'] = diversity
            
    //         if(skill[i]['skill']['4'] > 100)
    //         var startDifficult = Math.PI
    //         else
    //         var startDifficult = skill[i]['skill']['4']/100 * Math.PI

    //         temp[startDifficult] = startDifficult

    //         if(skill[i]['skill']['5'] > 1000)
    //         var variance = 1/4 * Math.PI
    //         else
    //         var variance = skill[i]['skill']['5']/1000 * 1/4 * Math.PI

    //         temp['variance'] = variance

    //         var cy = skill[i]['rank']
    //         temp['cy'] = cy

    //         var cx =  newRank[currentFeature][i]['newRank']
    //         temp['cx'] = cx
    //         drawData.push(temp)

    //     }

    //     //计算每个人18个月每个月较上个排名变化的浮动
    //      for(var i = 0; i < skill.length; i++){
    //          var change = []
    //         //  console.log(skill[i]['SortedRanking'].length)
    //          for(var j = 1; j < skill[i]['SortedRanking'].length; j++)
    //          {
    //             var widthControl = 8
    //             var temp = skill[i]['SortedRanking'][j]['monthRank'] - skill[i]['SortedRanking'][j-1]['monthRank']
    //             // console.log(skill[i]['SortedRanking'][j])
    //             if(Math.abs(temp) <= 10)
    //             temp = 0;
    //             else if(temp < -100)
    //             temp = -100;
    //             else if (temp > 100)
    //             temp = 100;

    //             temp = temp/100 * widthControl;
    //             change.push(temp)
    //          }
    //       skill[i]['rankingChange'] = change
    //      }

    //     //计算排名变化曲线的控制点
    //     for(var i = 0; i < skill.length; i++){
    //         var positionChange = []
    //         var startMonth = 0
    //         if(skill[i]['SortedRanking'][0]['month'].split('-')[0] == '2017')
    //         startMonth = parseInt(skill[i]['SortedRanking'][0]['month'].split('-')[1])
    //         else
    //         startMonth = parseInt(skill[i]['SortedRanking'][0]['month'].split('-')[1]) + 12

    //         // console.log(startMonth)
    //      for(var j = 0; j < skill[i]['rankingChange'].length; j++){
    //          temp = {}
    //          var x = (drawData[i]['rBig'] + 8 + skill[i]['rankingChange'][j]) * Math.sin((startMonth - 1 + j)*Math.PI/18)
    //          var y = (drawData[i]['rBig'] + 8 + skill[i]['rankingChange'][j]) * Math.cos((startMonth - 1 + j)*Math.PI/18)
    //          temp['x'] = x
    //          temp['y'] = y
    //          positionChange.push(temp)
    //      } 
    //     //  console.log(positionChange)
    //      skill[i]['positionChange'] = positionChange
    //     }

    //     console.log(skill)

    //     //把控制点处理成lineData

        
    //     for(var i = 0; i < skill.length; i++)
    //     {
    //         var lineData = []
    //         for(var j = 0; j < skill[i]['positionChange'].length; j++)
    //         {
    //             temp = {}
    //             temp['x'] = skill[i]['positionChange'][j]['x']
    //             temp['y'] = skill[i]['positionChange'][j]['y']
    //             lineData.push(temp)
    //         }
    //         skill[i]['lineData'] = lineData
    //     }


    //     //画glyph
    //     var startRank = 1
    //     var endRank = 10
    //     var scale = 500/(endRank-startRank)
    //     var color_low = d3.rgb(182, 215, 168)
    //     var color_high = d3.rgb(226, 156, 69)
    //     var color = d3.scaleLinear()
    //                 .domain([1, 8])
    //                 .range(['#e29c45', '#b6d7a8'])
    //                 .interpolate(d3.interpolateHcl); 
                   
    // //    console.log(color(i))
    //     for( var i = startRank; i <= endRank; i++){

    //         var arcPath1 = d3.arc()
    //                     .innerRadius(0)
    //                     .outerRadius(drawData[i]['rBig'])
    //                     .startAngle(0)
    //                     .endAngle(Math.PI)

    //         var arcPath2 = d3.arc()
    //                         .innerRadius(0)
    //                         .outerRadius(drawData[i]['rSmall'])
    //                         .startAngle(-Math.PI)
    //                         .endAngle(0)
            
    //         var arcPath3 = d3.arc()
    //                         .innerRadius(drawData[i]['rSmall'])
    //                         .outerRadius(drawData[i]['rSmall'] + 8)
    //                         .startAngle(0- drawData[i]['difficultRatio'] )
    //                         .endAngle(0)

    //         var arcPath4 = d3.arc()
    //                         .innerRadius(drawData[i]['rSmall'] + 8)
    //                         .outerRadius(drawData[i]['rSmall'] + 16)
    //                         .startAngle(0 - drawData[i]['diversity'] /8 * Math.PI )
    //                         .endAngle(0)

    //          svg.append('path')
    //             .attr('d', arcPath1())
    //             .attr('stroke', '#6b6882')
    //             .attr('stroke-width', 1)
    //             .attr('fill', '#6b6882')
    //             .attr('transform', 'translate(' + (drawData[i]['cx'] + scale*(i-startRank)) + ',' +  (drawData[i]['cy']+ scale*(i-startRank)) +')');

    //          svg.append('path')
    //             .attr('d', arcPath2())
    //             .attr('stroke', function(){
    //                 return color(drawData[i]['diversity'])
    //             })
    //             .attr('stroke-width', 1)
    //             // .attr('fill', '#b6d7a8')
    //             .attr('fill', function(){
    //                 // console.log(i,skill[2][i], skill[2][i]['score']-1);
    //                 return color(drawData[i]['diversity'])
    //                     })
    //             .attr('transform', 'translate(' + (drawData[i]['cx'] + scale*(i-startRank)) + ',' +  (drawData[i]['cy']+ scale*(i-startRank)) +')');

    //         svg.append('path')
    //             .attr("class", "pacnic")
    //             .attr('d', arcPath3())
    //             .attr('stroke', '#4291f7')
    //             .attr('stroke-width', 1)
    //             .attr('fill', '#4291f7')
    //             .attr('transform', 'translate(' + (drawData[i]['cx'] + scale*(i-startRank)) + ',' +  (drawData[i]['cy']+ scale*(i-startRank)) +')');
            
    //         svg.append('path')
    //             .attr("class", "pacnic")
    //             .attr('d', arcPath4())
    //             .attr('stroke', '#e29c45')
    //             .attr('stroke-width', 1)
    //             .attr('fill', '#e29c45')
    //             .attr('transform', 'translate(' + (drawData[i]['cx'] + scale*(i-startRank)) + ',' +  (drawData[i]['cy']+ scale*(i-startRank)) +')');

    //             //calculate the position to draw the startDifficulty
             
    //          var lineFunction = d3.line()
    //                               .x(function(d){return d.x;})
    //                               .y(function(d){return d.y;})
                                  
            
    //         // console.log(skill[i]['lineData'])
    //         svg.append('path')
    //            .data([skill[i]['lineData']])
    //            .attr("d", lineFunction)
    //            .attr("stroke", "blue")
    //            .attr("stroke-width", 2)
    //            .attr("fill", "none")
    //            .attr('transform', 'translate(' + (drawData[i]['cx'] + scale*(i-startRank)) + ',' +  (drawData[i]['cy']+ scale*(i-startRank)) +')');
       




//1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    //     for(var i = 0; i < skill[0].length; i++){
    //         skill[0][i]['score'] = skill[0][i]['score']/skill[3][i]['score'];
    //     }

    //     var maxValue = Math.max.apply(Math,skill[3].map(function(o){return o.score;}))


    //     for(var i = 0; i < skill[3].length; i++){
    //        skill[3][i]['score'] = skill[3][i]['score']/maxValue*50;
    //     }

    //     console.log(skill)
   
    //     function random(min, max){
    //                 return Math.floor(Math.random() * (max - min)) + min;
    //             }
    //     // //计算排名的波动
    //     // var newvariance = {};
    //     // console.log(allRank)
    //     // for(var each_author in allRank){
    //     //     var sum = 0;
    //     //     var count = 0;
    //     //     for(var each_month in allRank[each_author]){
    //     //         if(allRank[each_author][each_month] != 0){
    //     //             count++;
    //     //         }
    //     //         sum += parseInt(allRank[each_author][each_month])
    //     //     }
    //     //     var average = sum/count;
    //     //     var sumSquare = 0;
    //     //     for(var each_month in allRank[each_author]){
    //     //         if(allRank[each_author][each_month]!=0)
    //     //         sumSquare += (allRank[each_author][each_month] - average)*(allRank[each_author][each_month] - average)
    //     //     }           
    //     //     newvariance[each_author] = Math.sqrt(sumSquare)
    //     // }

    //     // console.log(newvariance)
    //     // 随机生成的模拟数据
    //     var variance = []
    //     for(var i = 0; i < 1000; i++){
    //         variance.push(random(1, 1000));
    //     }

    //     //整合一个按照最后排名的数组，包括学生的六个skill还有成绩的波动作为第7个
    //     var skillSet = []
    //     console.log(rank)
    //     // for(var i =0; i < )

    //     var middle = []
    //     for(var i = 0; i < 1000; i++){
    //         middle.push(random(-1/2*Math.PI, 1/2*Math.PI))
    //     }
        
    //     var ratio = []
    //     for(var i=0; i < 1000; i++){
    //         ratio.push(random(0,0.8));
    //     }

    //     var start = []
    //     var end = []
    //     for(var i =0; i < 1000; i++)
    //     {
    //         // start.push(middle[i] - skill[1][i]['score']*Math.PI/2);
    //         // end.push(middle[i] + skill[1][i]['score']*Math.PI/2);
    //         // start.push(middle[i] - ratio[i]*Math.PI/2);
    //         // end.push(middle[i] + ratio[i]*Math.PI/2);
    //         // start.push(random(-1/2*Math.PI, 0))
    //         // end.push(random(0, 1/2*Math.PI))
    //         start.push(random(-1/2*Math.PI, 0));
    //         end.push(start[0] + skill[1][i]['score'] * Math.PI)
    //     }
    //     // console.log(rank)
    //     var questionTypeColor = ["#f7fbff",
    //                             "#deebf7",
    //                             "#c6dbef",
    //                             "#9ecae1",
    //                             "#6baed6",
    //                             "#4292c6",
    //                             "#41ae76",
    //                             "#41ae76",]

    //     add(0, 1000);
    //     function add(a, b)
    //     {
    //     for(var i = a; i < b; i++)
    //     {
    //         var arcPath1 = d3.arc()
    //                     .innerRadius(0)
    //                     .outerRadius(skill[3][i]['score'])
    //                     .startAngle(1/2*Math.PI)
    //                     .endAngle(3/2*Math.PI)

    //         var arcPath2 = d3.arc()
    //                         .innerRadius(0)
    //                         .outerRadius(skill[0][i]['score']*skill[3][i]['score'])
    //                         .startAngle(-1/2*Math.PI)
    //                         .endAngle(1/2*Math.PI)
            
    //         var arcPath3 = d3.arc()
    //                         .innerRadius(0)
    //                         .outerRadius(skill[3][i]['score'])
    //                         .startAngle(start[i])
    //                         .endAngle(end[i])

    //             svg.append('path')
    //             .attr('d', arcPath1())
    //             .attr('stroke', '#000')
    //             .attr('stroke-width', 1)
    //             .attr('fill', '#e6b8af')
    //             .attr('transform', 'translate(' + variance[i] + ',' +  ((rank[i]*10)+ 100) +')');

    //             svg.append('path')
    //             .attr('d', arcPath2())
    //             .attr('stroke', '#000')
    //             .attr('stroke-width', 1)
    //             // .attr('fill', '#b6d7a8')
    //             .attr('fill', function(){
    //                 // console.log(i,skill[2][i], skill[2][i]['score']-1);
    //                 return questionTypeColor[(skill[2][i]['score']-1)]
    //                     })
    //                 // return "#a1d99b"
    //             .attr('transform', 'translate(' + variance[i] + ',' +  ((rank[i]*10)+ 100) +')');

    //             svg.append('path')
    //             .attr("class", "pacnic")
    //             .attr('d', arcPath3())
    //             .attr('stroke', '#000')
    //             .attr('stroke-width', 1)
    //             .attr('fill', 'none')
    //             .attr('transform', 'translate(' + variance[i] + ',' +  ((rank[i]*10) + 100) +')');

    //     }
    //     }
    // },
    // drawOneCircle(svgNode) 
    // {
    //     var width = svgNode.node().getBoundingClientRect().width,
    //         height = svgNode.node().getBoundingClientRect().height,
    //         outerRadius = height / 7 - 10,
    //         innerRadius = 30; 
    //     var margin = {
    //         top: 30,
    //         bottom: 30,
    //         left:30,
    //         right:30,
    //     }
    //     svgNode.selectAll('*').remove();
    //     var svg = svgNode.append("g")
    //     .attr("transform", "translate(" + width / 2 + "," + height / 7 + ")");

    //     var formatDate = d33.time.format("%a"),
    //             formatDay = function(d) { return formatDate(new Date(2007, 0, d)); };    

    //     var angle = d33.scale.linear()
    //         .range([0, 2 * Math.PI]);

    //     var radius = d33.scale.linear()
    //         .range([innerRadius, outerRadius]);

    //     var color = d33.scale.category20c();

    //     var stack = d33.layout.stack()
    //         .offset("zero")
    //         .values(function(d) { return d.values; })
    //         .x(function(d) { return d.time; })
    //         .y(function(d) { return parseInt(d.value); });

    //     var nest = d33.nest()
    //         .key(function(d) { return d.key; });

    //     var line = d33.svg.line.radial()
    //         .interpolate("cardinal-closed")
    //         .angle(function(d) { return angle(d.time); })
    //         .radius(function(d) { return radius(parseInt(d.y0) + parseInt(d.y)); });

    //     var area = d33.svg.area.radial()
    //         .interpolate("cardinal-closed")
    //         .angle(function(d) { return angle(d.time); })
    //         .innerRadius(function(d) { return radius(d.y0); })
    //         .outerRadius(function(d) { var x = radius(d.y0 + d.y);
    //                                    return x; });

    //                 const path = 'http://localhost:5003/circular';
    //                 d33.csv(path, function(error, data) {
    //                 if (error) throw error;
    //                 var layers = stack(nest.entries(data));

    //                 // Extend the domain slightly to match the range of [0, 2π].
    //                 angle.domain([0, d33.max(data, function(d) { return parseInt(d.time) + 1; })]);
    //                 radius.domain([0, d33.max(data, function(d) { return parseInt(d.y0) + parseInt(d.y); })]);

    //                 svg.selectAll(".layer")
    //                     .data(layers)
    //                     .enter().append("path")
    //                     .attr("class", "layer")
    //                     .attr("d", function(d) { 
    //                         return area(d.values); })
    //                     .style("fill", function(d, i) { return color(i); });

    //                 // svg.selectAll(".axis")
    //                 //     .data(d33.range(angle.domain()[1]))
    //                 //     .enter().append("g")
    //                 //     .attr("class", "axis")
    //                 //     .attr("stroke","#000")
    //                 //     .attr("fill","none")
    //                 //     .attr("width", "1px")
    //                 //     .attr("transform", function(d) { return "rotate(" + angle(d) * 180 / Math.PI + ")"; })
    //                 //     .call(d33.svg.axis()
    //                 //                 .scale(radius.copy().range([-innerRadius, -outerRadius]))
    //                 //                 .orient("left"))
    //                 //                 .append("text")
    //                 //                 .attr("fill", "#000")
    //                 //                 .attr("y", -innerRadius + 6)
    //                 //                 .attr("dy", ".71em")
    //                 //                 .attr("text-anchor", "middle")
    //                 //                 .text(function(d) { return formatDay(d); })
    //                 });

    //                 function type(d) {
    //                 d.time = +d.time;
    //                 d.value = +d.value;
    //                 return d;
    //                 }
    //             }
            
    // },
// }
</script>

<style scoped>

body {
  background: linear-gradient(45deg,
            #fb3 25%, #58a 0, #58a 50%,
            #fb3 0, #fb3 75%, #58a 0);
            background-size: 42.4px 42.4px;
  background-color: #F1F3F3    
}
.axis {
	font: 15px sans-serif;
}
.axis path,
.axis line {
  fill: none;
  stroke: #D4D8DA;
  stroke-width: 2px;
  shape-rendering: crispEdges;
}
#chart {
	position: absolute;
	top: 50px;
	left: 100px;
}
  
  .toolTip {
  pointer-events: none;
	position: absolute;
    display: none;
  min-width: 50px;
  height: auto;
  background: none repeat scroll 0 0 #ffffff;
  padding: 9px 14px 6px 14px;
  border-radius: 2px;
  text-align: center;
  line-height: 1.3;
  color: #5B6770;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, .15);
}
.toolTip:after {
  content: "";
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid white;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -12px;
}  
.toolTip span {
	font-weight: 500;
  color: #081F2C;
}
</style>



// M9.28982071924635e-15,-151.71428571428572
// C43.20000000000001,-151.71428571428572,
// 147.42857142857142,-46.54285714285716,
// 147.42857142857142,0
// L120,0
// S36.000000000000014,-120,7.34788079488412e-15,-120
// L9.28982071924635e-15,-151.71428571428572Z

// used line
// M147.42857142857142,0
// C147.42857142857142,46.54285714285716
// 43.20000000000001,158.57142857142858,
// 9.709699621811158e-15,158.57142857142858
// L7.34788079488412e-15,120
// C-36,120,120,36.00000000000001,120,0
// L147.42857142857142,0Z

// original line1
// d="
// M9.28982071924635e-15,-151.71428571428572
// C43.20000000000001,-151.71428571428572,147.42857142857142,-46.54285714285716,147.42857142857142,0
// S43.20000000000001,158.57142857142858,9.709699621811158e-15,158.57142857142858
// S-140.57142857142856,46.54285714285717,-140.57142857142856,1.7215035005157076e-14
// S-43.199999999999996,-151.71428571428572,9.28982071924635e-15,-151.71428571428572

//original line2
// M-120,1.469576158976824e-14C-120,36.00000000000002,-36,120,7.34788079488412e-15,120L9.709699621811158e-15,158.57142857142858S-140.57142857142856,46.54285714285717,-140.57142857142856,1.7215035005157076e-14Z

// M-120,1.469576158976824e-14
// C-120,36.00000000000002,-36,120,7.34788079488412e-15,120
// S120,36.00000000000001,120,0
// S36.000000000000014,-120,7.34788079488412e-15,-120
// S-120,-35.99999999999999,-120,1.469576158976824e-14Z"

//calculate the symetric control point
// function getMirrorPoint(a,b){
//     var dx = b.x - a.x
//     var dy = b.y - a.y
//     return {
//         x: b.x+dx,
//         y: b.y+dy
//     }
// }