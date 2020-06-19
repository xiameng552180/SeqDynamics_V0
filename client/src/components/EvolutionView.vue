<template>
<div class= "row" style = "overflow:hidden">
    <div class = "content" id = "Evol_Legend" style="height: 50px; width: 100%; overflow:hidden; position: fixed ! important;"></div>
    <div class = "content" id = "EvolutionViewSVG" style = "height: 710px; width: 100%; overflow-x:hidden;"></div>
    <div class = "content" id = "SelectSVG" style = "height: 50px; width: 100%; position: fixed ! important;"></div>
</div>   
</template>
<script>
import NetService from '../services/net-service';
import DataService from '../services/data-service';
import PipeService from '../services/pipe-service';

import * as d3 from 'd3';

export default {
    name: 'EvolutionView',
    data() {
        return {
            data: null,
            width: null,
            height: null,
            svg: null,
            newMessage:null,
            authorSelected: null,
            compareSelected: null,
        };
    },
    mounted() {
        this.initialize();
        PipeService.$on(PipeService.UPDATE_EVOLUTIONVIEW, ()=>{
            this.authorSelected = DataService.authorSelected;
            this.compareSelected = DataService.compareSelected;
            this.data = DataService.data;
            this.draw_legend();
            this.drawThemeRiver(this.svg, this.data, this.selectsvg, this.authorSelected, this.compareSelected);     
        })
        this.newMessage = this.message;  
    },
    methods: {
        initialize(){
            this.width = d3.select('#EvolutionViewSVG').node().getBoundingClientRect().width;
            this.height = d3.select('#EvolutionViewSVG').node().getBoundingClientRect().height;
            this.svg = d3.select('#EvolutionViewSVG').append('svg')
                        .attr('class', 'd3SVG')
                        .attr('width', this.width)
                        .attr('height', this.height+10000);
            this.selectsvg = d3.select('#SelectSVG').append('svg')
                        .attr("class", 'selectSVG')
                        .attr('width', this.width)
                        .attr('height', 50);
        },
        draw_legend() {
            var legend_margin = {
                top: 5,
                right: 50,
                bottom: 0,
                left: 50,
            }
            var legwidth = d3.select("#Evol_Legend").node().getBoundingClientRect().width;
            var legheight = d3.select("#Evol_Legend").node().getBoundingClientRect().height;
            var stroke_Color = '#392f41';
            var myfocus_upcolor = ["#fbc052", 'white']
            var myfocus_upcolorlegend = ["#fbc052", "#f9e37d", "#f7f796"] //difficult - easy
            var myfocus_downcolor = [["#52c4a8", "#8ddbc7", "#d4ebe4"], ["#ff7575", "#f1a6a6", "#ffdbdb"]] //success - unsuccess
            var myfocus_uptext = ['unsolved problem', 'solved problem'];
            var myfocus_downtext = ["unsuccessful submission", "successful submission"];
            var rectwidth = 15;
            var rectheight = 15;
            var type_fontsize = 21;
            var legend_svg = d3.select('#Evol_Legend').append('svg')
                        .attr('class','legend_d3SVG')
                        .attr('width', this.width)
                        .attr('height', 50);
            var acclegend = legend_svg.append('g').attr('class', 'acclegend');
            var solved_compute = d3.interpolate('#fbc052', '#f7f796');
            var success_compute = d3.interpolate('#52c4a8', '#d4ebe4');
            var unsuccess_compute = d3.interpolate('#ff7575', '#ffdbdb');
            var legend_width = 60;
            var linear = d3.scaleLinear().domain([0, legend_width]).range([0, 1])

            acclegend.append('rect')
                .style('fill', '#e9f1f6')
                .style('opacity', 0.5)
                .style('stroke-color', 'white')
                .attr('width', legwidth)
                .attr('height', legheight);

            acclegend.append('rect')
                .style('fill', 'white')
                .attr('width', legwidth)
                .attr('height', 4)
                .attr("transform", "translate(0," + (legheight-4) + ")");

            for(var upindex = 0; upindex < myfocus_upcolor.length; upindex++) {
                acclegend.append('rect')
                    .attr("x", legend_margin.left + legwidth * upindex / 3)
                    .attr("y", 2)
                    .attr("width", rectwidth)
                    .attr("height", rectheight)
                    .attr('stroke', stroke_Color)
                    .style("fill", myfocus_upcolor[myfocus_upcolor.length - 1 - upindex]);
                acclegend.append('text')
                    .attr("x", legend_margin.left + 20 + legwidth * upindex / 3)
                    .attr("y", 15)
                    .text(myfocus_uptext[upindex])
                    .attr("class", "textselected")
                    .style("text-anchor", "start")
                    .style("font-size", type_fontsize)
            };
            for(var downindex = 0; downindex < myfocus_downcolor.length; downindex++) {
                acclegend.append('rect')
                    .attr("x", legend_margin.left + legwidth * downindex / 3)
                    .attr("y", legheight / 2-3)
                    .attr("width", rectwidth)
                    .attr("height", rectheight)
                    .attr('stroke', stroke_Color)
                    .style("fill", myfocus_downcolor[myfocus_downcolor.length - 1 - downindex][0]);
                acclegend.append('text')
                    .attr("x", legend_margin.left + 20 + legwidth * downindex / 3)
                    .attr("y", legheight/2 + 10)
                    .text(myfocus_downtext[downindex])
                    .attr("class", "textselected")
                    .style("text-anchor", "start")
                    .style("font-size", type_fontsize)
            }
            acclegend.append("svg:image")
                .attr('x', 900)
                .attr('y', 0)
                .attr('width', 200)
                .attr('height', 50)
                .attr("xlink:href", "../../static/legend1.png")
                .attr("transform","translate(0, 0)")    
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_upcolorlegend[0])
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + 20)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_downcolor[0][0])
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + 40)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_downcolor[1][0])

            // // acclegend.selectAll('.success_legend')
            // //     .data(d3.range(legend_width))
            // //     .enter()
            // //     .append('rect')
            // //     .attr('class', '.success_legend')
            // //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*8/5 + i)
            // //     .attr('y', 2)
            // //     .attr('width', 1)
            // //     .attr('height', rectheight)
            // //     .style('fill', (d,i) => success_compute(linear(d)))
            // // acclegend.append('rect')
            // //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*8/5 + i)
            // //     .attr('y', 2)
            // //     .attr('width', legend_width)
            // //     .attr('height', rectheight)
            // //     .style('stroke', stroke_Color)
            // //     .style('fill', 'none')
            // acclegend.append('text')
            //     .attr('x', legend_margin.left + legwidth * 2 / 3 + 60)
            //     .attr('y', 14)
            //     .attr('textLength', legend_width*8/5 - 60)
            //     .style('stroke', stroke_Color)
            //     .text('---->')
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*8/5)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_upcolorlegend[1])
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*8/5 + 20)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_downcolor[0][1])
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*8/5 + 40)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_downcolor[1][1])
            // acclegend.append('text')
            //     .attr('x', legend_margin.left + legwidth * 2 / 3 + legend_width*8/5 + 60)
            //     .attr('y', 14)
            //     .attr('textLength', legend_width*8/5 - 60)
            //     .style('stroke', stroke_Color)
            //     .text('---->')
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*16/5)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_upcolorlegend[2])
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*16/5 + 20)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_downcolor[0][2])
            // acclegend.append('rect')
            //     .attr('class', 'deep_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*16/5 + 40)
            //     .attr('y', 2)
            //     .attr('width', 20)
            //     .attr('stroke', stroke_Color)
            //     .attr('height', rectheight)
            //     .style('fill', myfocus_downcolor[1][2])

            // acclegend.selectAll('.unsuccess_legend')
            //     .data(d3.range(legend_width))
            //     .enter()
            //     .append('rect')
            //     .attr('class', '.unsuccess_legend')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*16/5 + i)
            //     .attr('y', 2)
            //     .attr('width', 1)
            //     .attr('height', rectheight)
            //     .style('fill', (d,i) => unsuccess_compute(linear(d)))
            // acclegend.append('rect')
            //     .attr('x', (d,i) => legend_margin.left + legwidth * 2 / 3 + legend_width*16/5 + i)
            //     .attr('y', 2)
            //     .attr('width', legend_width)
            //     .attr('height', rectheight)
            //     .style('stroke', stroke_Color)
            //     .style('fill', 'none')
            // acclegend.append('text')
            //     .attr('x', legend_margin.left + legwidth * 2 / 3)
            //     .attr('y', legheight/2 + 10)
            //     .attr('textLength', legend_width*16/5+legend_width)
            //     .style('stroke', stroke_Color)
            //     .text('Difficulty: Hard ----> Easy')
        },
        drawThemeRiver(svgNode, data, selectsvgNode, authorSelected, compareSelected){
            var testexistarr = [];
            for(var i = 0; i < compareSelected.length; i++) {
                var testexist = 0;
                for(var j = 0; j < authorSelected.length; j++) {
                    if(authorSelected[j] == compareSelected[i]) {
                        testexist = 1;
                    }
                }
                testexistarr.push(testexist);
            }
            function sum(arr) {
                var sum = 0
                for(var i = 0; i < arr.length; i++) {
                    sum = sum + arr[i];
                };
                return sum;
            };
            if(sum(testexistarr) != testexistarr.length) {
                DataService.compareSelected = [];
                compareSelected = [];
            }
            // clean the svg
            svgNode.selectAll('*').remove();
            selectsvgNode.selectAll('*').remove();

            // set myfocus's margin
            var margin = {
                top: 15,
                right: 50,
                bottom: 10,
                left: 50,
            };
            // set context's margin
            var margin2 = {
                top: 15,
                right: 50,
                bottom: 10,
                left: 50
            };

            var width = svgNode.node().getBoundingClientRect().width - margin.left - margin.right;
            var height = svgNode.node().getBoundingClientRect().height- margin2.top - margin.bottom;
            var selectwidth = d3.select("#SelectSVG").node().getBoundingClientRect().width;
            var selectheight = d3.select("#SelectSVG").node().getBoundingClientRect().height;
            var svg = svgNode.append("g").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
            var selectsvg = selectsvgNode.append('g').attr('transform', "translate(0,0)");

            // sort the show order by ranking in August, 2018 and display the theme river
            // dataindex controls the display number of the theme river 
            var ranknum = 0;
            for(var i = 0; i < authorSelected.length; i ++) {
                ranknum = authorSelected[i] + 1;
                for(var j in data){   
                    if(data[j]['ranking']['2018-8'] == ranknum) {
                        chart(data[j], i, ranknum);             
                    };                         
                };
            }

            selectsvg.append('rect')
                .style('fill', '#e9f1f6')
                .style('opacity', 0.5)
                .style('stroke-color', 'white')
                .attr('width', selectwidth)
                .attr('height', selectheight);
            
            // chart(data['caohongyi'],0);
            // chart(data['ksws0305545'],1);
            // chart(data['Rluxferre'],2);

            var datearray = [];// time axis (x-axis) mark to find mouse's index on time axis

            function chart(csvpath,n, ranknum) {


                // var myfocus_upcolor = ["#ffdc80", "#eabc74", "#ff9d00"];// easy -> difficult
                var myfocus_upcolor = ["#f7f796", "#f9e37d", "#fbc052"]
                var myfocus_downcolor = [["#52c4a8", "#8ddbc7", "#d4ebe4"], ["#ff7575", "#f1a6a6", "#ffdbdb"]]// success - unsuccess
                // var myfocus_downcolor = ["#6471bc" ,"#52adb8", "#f15e77" ]; // inquiry - success - unsuccess
                var lineone_Color = '#cf9d21', linetwo_Color = '#85b3e5'
                var rankline_color = '#6e5773', rankcircle_Radius = 22, rank_fontsize = 20;
                var typebar_height = 10;
                var type_margintop = 7, typebar_gap = 20, text_gap = 27, typebar_Color = "#3d3b4f", mouseup_gap = 6, typebar_Backgroundcolor = "#e9f1f6";
                var height_context = 55;// set context's height
                var elheight = 180; // element's height
                var xloc_context = 55;
                var xloc_focus = 170;
                var yloc_up = 30;
                var yloc_down = 100;
                var x_fontsize = 23, y_fontsize = 18,type_fontsize = 23;
                var adjust_gap = 5;
                var rankmax = 1000;
                var brushheight = 20, brushcolor = '#e0eee8', brushhandlercolor = '#75664d';
                var ticknum = 3;
                var tipmargin_top = xloc_focus - typebar_height;
                var tipmargin_right = width - 230;
                var seqblockwidth = 20, seqblockheight = 20, stackseqgap = 20, colnumset = 6, seqtip_widthnum = 10;
                var buttonwidth = 20;
                var invalid_ButtonColor = "white", valid_ButtonColor = "#808080", stroke_ButtonColor = "#c2ccd0";
                var add_ButtonColor = '#CD5C5C' , substract_ButtonColor = '#6e8b74';

                // var select_Color = "#e4c6d0";
                var select_Color = "#9bd4e0", unselect_Color = "#ddeef2";
                var divgap = 152;//height/3 - elheight - seqblockheight ;

                // var formatmonth = d3.timeParse("%Y-%m-%d");
                var formatmonth = d3.timeParse("%Y-%m");
                var formatdate = d3.timeParse("%Y-%m-%d");
                var formatrankmonth = d3.timeParse("%Y-%m");
                var x = d3.scaleTime().range([0, width - adjust_gap]);
                var y_up = d3.scaleLinear();
                var y_down = d3.scaleLinear(); 
                var z_up = d3.scaleOrdinal().range(myfocus_upcolor);
                var z_down = ['#ff7575', '#52c4a8'];
                // var myfocus_downcolor = [["#52c4a8", "#8ddbc7", "#d4ebe4"], ["#ff7575", "#f1a6a6", "#ffdbdb"]]
                var x_context = d3.scaleTime().range([0, width]);
                var y_context = d3.scaleLinear();
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
                        return x_context(d[0]);
                    })
                    .y(function(d) {
                        if(d[1]>rankmax) {
                            return y_context(rankmax);
                        } else {
                            return y_context(d[1]);
                        }
                    })

                var localg = svg.append("g").attr("transform", "translate(0," + ((elheight + divgap + seqblockheight) * n) + ")")
                    .attr("width", width)
                    .attr("height", elheight);
                var typebar = localg.append("g").attr("class", "typebar");           
                var myfocus = localg.append("g").attr("class", "focus");
                var context = localg.append("g").attr("class", "context"); 
                var queseq = localg.append("g").attr("class", "queseq")
                    .attr("transform", "translate(0," + stackseqgap + ")")
                    .attr('width', width)
		            .attr('height', seqblockheight);
           
                draw(csvpath);
               
                        
                function draw(data){   
                    // rank data
                    var rankdata = data['ranking'];

                    // accept theme data
                    var accdata = data['accept_num'];
                    var unfinishedques = data['unfinishedQ']


                    var errdata = data['errortype_num'];
                    // submission type theme data
                    var subratiodata = data['submission_type_ratio'];
                    var errsumdata = data['errortype_num_sum'];

                    // type bar data
                    var typedata = data['problem_type'];
                    var typetimedata = data['dateType'];

                    // sequence data
                    // var seqdata = data['problem_sequence'];
                    var seqdata = data['submission_sequence'];

                    var arcPathSelected = d3.arc()
                        .innerRadius(14)
                        .outerRadius(15)
                        .startAngle(0)
                        .endAngle(2*Math.PI)

                    if(DataService.compareSelected.length == 0) {
                        selectsvg.selectAll('.remind_text').remove()
                        selectsvg.selectAll('.select_block').remove()
                        selectsvg.append('text')
                            .attr('class', 'remind_text')
                            .text("You can click the rank number to choose two objects to compare.")
                            .style('font-size', 23)
                            .style('fill', 'black')
                            .attr('transform', 'translate(' + selectwidth/8 + ',' + selectheight*3/5 + ")")
                    }

                    var judgeselected = 0;
                    for(var i = 0; i < DataService.compareSelected.length; i++) {
                        if(DataService.compareSelected[i] == ranknum) {
                            judgeselected == 1;
                        }
                    }
                    if(judgeselected == 0) {
                        localg.append('circle')
                            .attr("class", "min_selectedcompare")
                            .attr('cx', -19)
                            .attr('cy', 0)
                            .attr('r', rankcircle_Radius)
                            .style('fill', unselect_Color)
                            

                    } else {
                        localg.append('circle')
                            .attr("class", "min_selectedcompare")
                            .attr('cx', -19)
                            .attr('cy', 0)
                            .attr('r', rankcircle_Radius)
                            .style('fill', select_Color)
                            .attr('opacity', 0.3)
                            .style('stroke', stroke_ButtonColor); 
                    };
                        
                    // label the rank of each selected person
                    localg.append("text")
                        .text(ranknum)
                        .style("fill", 'black')
                        .style("font-size", rank_fontsize)
                        // .attr('textLength', rank_textLength)
                        .attr("transform", "translate(-30, 5)")
                        .on("click", function() {
                            // calPassRate(); 
                            Array.prototype.indexOf = function(val) {
                                for (var i = 0; i < this.length; i++) {
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
                            if (DataService.compareSelected.indexOf(ranknum) != -1){
                                // console.log(DataService.compareSelected); 
                                // console.log(compareSelected.indexOf(ranknum));
                                DataService.compareSelected.remove(ranknum);
                                // PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);
                                localg.select(".min_selectedcompare")
                                    .style('fill', unselect_Color)
                                    .attr("stroke", "none");
                            }
                            else
                            {
                                // console.log(DataService.compareSelected); 
                                if(DataService.compareSelected.length < 2) {
                                    // console.log(ranknum);
                                    DataService.compareSelected.push(ranknum);
                                    // PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);
                                    localg.select(".min_selectedcompare")
                                          .style('fill', unselect_Color)
                                        //   .attr('opacity', 0.3)
                                          .attr("stroke", "black");
                            
                                        // .attr("stroke", select_Color);    
                                    // console.log(DataService.compareSelected);                         
                                }     
                            }

                            // console.log(DataService.compareSelected);
                            if(DataService.compareSelected.length == 0) {
                                selectsvg.selectAll('.remind_text').remove()
                                selectsvg.selectAll('.select_block').remove()
                                selectsvg.append('text')
                                    .attr('class', 'remind_text')
                                    .text("You haven't chosen any object to compare.")
                                    .style('font-size', 23)
                                    .attr('transform', 'translate(' + selectwidth/8 + ',' + selectheight*3/5 + ")")
                            } else if (DataService.compareSelected.length == 1) {
                                selectsvg.selectAll('.remind_text').remove()
                                selectsvg.selectAll('.select_block').remove()
                                selectsvg.append('text')
                                    .attr('class', 'remind_text')
                                    .text("You have chosen Rank " + DataService.compareSelected[0] + ". Please choose one more object to compare.")
                                    .style('textLength', selectwidth-50)
                                    .style('font-size', 23)
                                    .attr('transform', 'translate(' + selectwidth/8 + ',' + selectheight*3/5 + ")")
                            } else {
                                DataService.actionflag = 0;
                                selectsvg.selectAll('.remind_text').remove()
                                selectsvg.selectAll('.select_block').remove()
                                selectsvg.append('text')
                                    .attr('class', 'remind_text')
                                    .text("You have chosen Rank " + DataService.compareSelected[0] + " and Rank " + DataService.compareSelected[1] + ". Please choose action.")
                                    .style('textLength', selectwidth-50)
                                    .style('font-size', 20)
                                    .attr('transform', 'translate(' + selectwidth/8 + ',' + selectheight/3 + ")")

                                var add_button = selectsvg.append('rect')
                                    .attr('class', 'select_block')
                                    .attr('width', 50)
                                    .attr('height', selectheight/3)
                                    .attr('transform', 'translate(' + selectwidth/8 + ',' + (selectheight/3+8) + ")")
                                    .attr('fill', unselect_Color)
                                    .attr('stroke', 'black')
                                    .attr('stroke-width', 1)
                                    .attr('rx', 2)
                                    .attr('ry', 2);

                                selectsvg.append('text')
                                    .attr('class', 'remind_text')
                                    .text("+")
                                    .attr('text-size', 25)
                                    .attr('transform', 'translate(' + (selectwidth/8+55) + ',' + (selectheight*3/4) + ")")

                                var substract_button = selectsvg.append('rect')
                                    .attr('class', 'select_block')
                                    .attr('width', 50)
                                    .attr('height', selectheight/3)
                                    .attr('transform', 'translate(' + (selectwidth/8 + 100) + ',' + (selectheight/3+8) + ")")
                                    .attr('fill', unselect_Color)
                                    .attr('stroke', 'black')
                                    .attr('stroke-width', 1)
                                    .attr('rx', 2)
                                    .attr('ry', 2);
                                
                                selectsvg.append('text')
                                    .attr('class', 'remind_text')
                                    .text("-")
                                    .attr('text-size', 25)
                                    .attr('transform', 'translate(' + (selectwidth/8+155) + ',' + (selectheight*3/4) + ")")

                                add_button.on('click', function(){
                                    if(DataService.actionflag != 1) {
                                        substract_button.attr('stroke', 'black').attr('stroke-width', 1)
                                        DataService.actionflag = 1;
                                        PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);
                                        add_button.attr('stroke', substract_ButtonColor).attr('stroke-width', 5)
                                    } else {
                                        DataService.actionflag = 0;
                                        PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);
                                        add_button.attr('stroke', 'black').attr('stroke-width', 1)
                                        substract_button.attr('stroke', 'black').attr('stroke-width', 1)
                                    }
                                    
                                });
                                substract_button.on('click', function(){
                                    if(DataService.actionflag != 2) {
                                        add_button.attr('stroke', 'black').attr('stroke-width', 1)
                                        DataService.actionflag = 2;
                                        PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);
                                        substract_button.attr('stroke', substract_ButtonColor).attr('stroke-width', 5)                                   
                                    } else {
                                        DataService.actionflag = 0;
                                        PipeService.$emit(PipeService.UPDATE_COMPARISIONVIEW);
                                        substract_button.attr('stroke', 'black').attr('stroke-width', 1)
                                        add_button.attr('stroke', 'black').attr('stroke-width', 1)
                                    }
                                    
                                })
                            }
                        });
                    
                    // draw type bar
                    var typesum = 0;
                    for(var i in typedata) {
                        typesum = typesum+ typedata[i];
                    };
                    var typetrans = 5;
                    var typeindex = 0;

                    // sort the type's time
                    var typetimesort = [];
                    for(var i in typetimedata) {
                        if(typetimedata[i] != 0) {
                            typetimesort.push(typetimedata[i]);
                        }
                    };
                    typetimesort.sort();
                    var typesort = [];
                    for(var i =0; i < typetimesort.length; i++) {
                        for(var j in typetimedata) {
                            if((typetimedata[j] == typetimesort[i])&&(j!=typesort[typesort.length-1])) {
                                typesort.push(j);
                                break;
                            };
                        };
                    };
                    for(var i in typetimedata) {
                        if(typetimedata[i] == 0) {
                            typesort.push(i);
                        };
                    };

                    var typebar_tooltip = typebar.append("text")
                        .attr('class', "typebar_tooltip")
                        .style("z-index", "20")
                        .style('font-size', type_fontsize)
                        .style("visibility", "hidden")
                        .style('fill', valid_ButtonColor);

                    // console.log(typedata);
                    var sortofTrans = [];
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
                    // draw typebar
                    for(var j = 0; j < typesort.length; j++) {
                        sortofTrans.push(typetrans);
                        for(var i in typedata) {
                            if(i == typesort[j]) {
                                if(typedata[i] != 0) {
                                    typebar.append('rect')
                                        .attr("class", i.split(' ')[0] + "_bar")
                                        .attr("height", typebar_height)
                                        .attr("width", function() {
                                                return (width - 15 - 7*typebar_gap) * typedata[i] / typesum;
                                        })
                                        .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                        .attr("stroke", stroke_ButtonColor)
                                        .attr("fill", typebar_Backgroundcolor);
                                } else {
                                    typebar.append('rect')
                                        .attr("class", i.split(' ')[0] + "_bar")
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
                                        .text(typeDict[i])
                                        .attr("transform", "translate(" + typetrans + "," + type_margintop +")")
                                        .style("font-size", type_fontsize)
                                        .style("fill", typebar_Color);
                                } else {
                                    typebar.append("text")
                                        .text(typeDict[i])
                                        .attr("transform", "translate(" + typetrans + "," + (type_margintop + text_gap) +")")
                                        .style("font-size", type_fontsize)
                                        .style("fill", typebar_Color);
                                }                       
                                typetrans = typetrans + (width - 15 -7*typebar_gap) * typedata[i] / typesum + typebar_gap;
                                typeindex++;
                            }        
                        }
                    }

                    typebar.selectAll('rect')
                        .on('mousemove', function(d, i) {                         
                            typebar_tooltip.attr("transform", "translate(" + (d3.mouse(this)[0]+sortofTrans[i]-70) + "," + (d3.mouse(this)[1] - mouseup_gap) + ")")
                                .text(typesort[i] + ": " +typedata[typesort[i]]+ "(" + ((typedata[typesort[i]] / typesum) * 100).toFixed(1) + "%)")
                                .style("visibility", "visible");  
                        })
                        .on('mouseout', function(){
                            typebar.select('.typebar_tooltip').style("visibility", "hidden");
                        });

                    // console.log(seqdata);
                    var brush = d3.brushX()
                        .extent([
                            [0, xloc_focus],
                            [width, xloc_focus + brushheight]
                        ])
                        .on("brush end", brushed);
                    var stackacc = d3.stack()
                        .keys(function() {                         
                            return ['hard','medium','easy','unfinished'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffNone);
                    var stackerr = d3.stack()
                        .keys(function() {
                            // return ['wrong_answer_num','careless_num','accepted_num'];
                            return ['unsuccessful_try','successful_try'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffNone);
                    var stacksub = d3.stack()
                        .keys(function() {
                            return ['unsuccessful_try','successful_try','inquiring_try'];
                        })
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffNone);

                    // push accept_num into an array 'accarr' and sort it by date
                    var  accarr=[];
                    for(var i in accdata) {
                        accdata[i]['unfinished'] = unfinishedques[i]
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
                    for (var j = 0; j < errarr.length; j++) {
                        errarr[j]['unsuccessful_try'] = errarr[j]['wrong_answer_num'] + errarr[j]['careless_num'];
                        errarr[j]['successful_try'] = errarr[j]['accepted_num'];
                    }

                    var subratiosum = {};
                    for(var i in subratiodata) {
                        var sumtemp = {};
                        sumtemp['unsuccessful_try'] = subratiodata[i]['0'] + subratiodata[i]['2'];
                        sumtemp['successful_try'] = subratiodata[i]['1'] + subratiodata[i]['4'];
                        sumtemp['inquiring_try'] = subratiodata[i]['3'] + subratiodata[i]['5'];
                        subratiosum[i] = sumtemp;
                    };
                    for(var j in subratiosum) {
                        subratiosum[j]['unsuccessful_try'] = parseInt(subratiosum[j]['unsuccessful_try'] * errsumdata[j]);
                        subratiosum[j]['successful_try'] = parseInt(subratiosum[j]['successful_try'] * errsumdata[j]);
                        subratiosum[j]['inquiring_try'] = parseInt(subratiosum[j]['inquiring_try'] * errsumdata[j]);
                    };
                    // console.log(subratiosum);
                    var  subtypearr=[];
                    for(var i in subratiosum) {
                        subtypearr.push([formatmonth(i),subratiosum[i]]);
                    };
                    subtypearr = subtypearr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });
                    // adjust subtypearr's format so that can be stack()
                    for (var i = 0; i < subtypearr.length; i++) {
                        var obj = subtypearr[i][1];
                        obj.key = subtypearr[i][0]
                        delete subtypearr[i][1];
                        delete subtypearr[i][0];
                        subtypearr[i] = obj;             
                    };

                    // push ranking into an array 'rankarr' and sort it by date
                    var rankarr = [];
                    for(var i in rankdata) {
                        if(formatrankmonth(i).getFullYear() == 2017) {
                            rankarr.push([formatrankmonth(i),rankdata[i]]);
                        }                   
                    }
                    rankarr = rankarr.sort(function(a, b) {
                        return new Date(a[0]) > new Date(b[0]) ? 1 : -1;
                    });

                    var layer_accept = stackacc(accarr);
                    var layer_error = stackerr(errarr);
                    // var layer_error = stacksub(subtypearr);

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
                        .range([yloc_down, yloc_up]);
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
                        .range([yloc_down, xloc_focus]);
                    x_context.domain(x.domain());
                    // y_context.domain([
                    //     d3.min(rankarr,function(d) {
                    //        return d[1];
                    //     }),
                    //     d3.max(rankarr,function(d) {
                    //        return d[1];
                    //     })
                    // ]);
                    y_context.domain([1,rankmax])
                        .range([yloc_up, xloc_focus]);

                    // draw theme river
                    for(var diffindex = 0; diffindex<layer_accept.length - 1; diffindex++) {
                        myfocus.append('path')
                            .data([layer_accept[layer_accept.length-1-diffindex - 1]])
                            .attr("class", "min_line")
                            .attr('id', 'one')
                            .attr("d", function(d) {
                                var changeline = areatop(d);
                                var versearr = [];
                                for(var g=0; g<d.length;g++) {                                
                                    versearr[g] = d[d.length-1-g];
                                }
                                var changelinedown = areadown(versearr);
                                var firstel = changelinedown.split('M');
                                firstel.splice(0,1);
                                var down = 'L'+ firstel;
                                var back = changeline + down;
                                return back;
                            })
                            .attr("fill", function(d,i) {
                                return z_up(d.index);
                            });
                        // myfocus.append('text')
                        //     .attr('transform', 'translate(0,30)')
                        //     .text(authordata);
                    };
                    myfocus.append('path')
                            .data([layer_accept[layer_accept.length-1]])
                            .attr("class", "min_line")
                            .attr('id', 'one')
                            .attr("d", function(d) {
                                var changeline = areatop(d);
                                var versearr = [];
                                for(var g=0; g<d.length;g++) {                                
                                    versearr[g] = d[d.length-1-g];
                                }
                                var changelinedown = areadown(versearr);
                                var firstel = changelinedown.split('M');
                                firstel.splice(0,1);
                                var down = 'L'+ firstel;
                                var back = changeline + down;
                                return back;
                            })
                            .attr("fill", 'white')
                            .attr('stroke', '#7e6752');


                    for(var diffindextwo = 0; diffindextwo<layer_error.length; diffindextwo++) {
                        myfocus.append('path')
                            // .data([layer_error[layer_error.length-1-diffindextwo]])
                            .data([layer_error[layer_error.length-1-diffindextwo]])
                            .attr("class", "min_line")
                            .attr('id', 'two')
                            .attr("d", function(d) {
                                var changeline = areatop_verse(d);
                                var versearr = [];
                                for(var g=0; g<d.length;g++){                                  
                                    versearr[g] = d[d.length-1-g];
                                }
                                var changelinedown = areadown_verse(versearr);
                                var firstel = changelinedown.split('M');
                                firstel.splice(0,1);
                                var down = 'L'+ firstel;
                                var back = changeline + down;
                                return back;
                            })
                            .attr("fill", function(d,i) {
                                return z_down[d.index];
                            });
                            // .style("stroke", '#6b6882');
                    }

                    // draw myfocus's axis
                    myfocus.append("g")
                        .attr("class", "x_axis")
                        .attr("transform", "translate(0," + xloc_focus + ")")
                        .call(d3.axisBottom(x).ticks(9).tickFormat(d3.timeFormat('%b')));
                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .attr("transform", "translate(" + (width - adjust_gap) + ",0)")
                        .call(d3.axisRight(y_context).ticks(ticknum, "s"));
                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .attr("transform", "translate(0,0)")
                        .call(d3.axisLeft(y_up).ticks(ticknum));
                    myfocus.append("g")
                        .attr("class", "y_axis")
                        .call(d3.axisLeft(y_down).ticks(ticknum));
                    context.append("path")
                        .datum(rankarr)
                        .attr("class", "min_rankline")
                        .attr("d", rankline)
                        .attr("fill", 'none')
                        .attr('stroke', rankline_color)
                        .attr('stroke-width', 2);

                    myfocus.selectAll('.x_axis')
                        .selectAll('text')
                        .style('font-size', x_fontsize);
                    myfocus.selectAll('.y_axis')
                        .selectAll('text')
                        .style('font-size', y_fontsize);
                    
                    // draw context's brush and axis
                    context.append("g")
                        .attr("class", "brush")
                        .call(brush)
                        .call(brush.move, x.range());
                    context.select(".brush rect.selection")
                        .attr('opacity', '0.9')
                        .attr('fill', brushcolor);                  
                    context.selectAll(".brush rect.handle")
                        .attr('opacity', '0.5')
                        .attr('fill',brushhandlercolor)
                        .attr("width", 10)
                        .attr("height", 30);

                    // set tooltip
                    var tooltip = localg.select('.focus')
                        .append("text")
                        .attr("class", "remove")
                        .style("z-index", "20")
                        .style('font-size', type_fontsize)
                        .style("visibility", "hidden");

                    // highlight the hovering area
                    myfocus.selectAll(".min_line")
                        .attr("opacity", 1)
                        .on("mousemove", function(d, i) {
                            myfocus.selectAll(".min_line").transition()
                                .duration(100)
                                .attr("opacity", function(d, j) {
                                    return j != i ? 0.3 : 1;
                                })
                            var mousex = d3.mouse(this);                            
                            mousex = mousex[0];
                            var invertedx = x.invert(mousex);                           
                            invertedx = invertedx.getFullYear() + invertedx.getMonth() + (invertedx.getFullYear() - 2017) * 11;
                            var selected = (d);
                            for (var k = 0; k < selected.length; k++) {
                                datearray[k] = new Date(selected[k].data.key)
                                var mid = datearray[k]
                                datearray[k] = mid.getFullYear() + mid.getMonth() + (mid.getFullYear() - 2017) * 11;
                            }

                            try {
                                var mousedate = datearray.indexOf(invertedx);
                                var pro = d[mousedate].data[d.key];//error
                                tooltip.attr("transform", "translate(" + tipmargin_right + "," + tipmargin_top + ")")
                                    .text(d.key + ': ' + pro)
                                    .style("visibility", "visible");    
                            }
                            catch(err) {
                                //catchCode
                                document.getElementsByClassName("min_line").innerHTML = err.message;
                            } 
                        })
                        .on("mouseout", function(d, i) {
                            var pro = [];
                            localg.selectAll(".min_line")
                                .transition()
                                .duration(100)
                                .attr("opacity", "1");
                            localg.select('.remove')
                                .style("visibility", "hidden");
                        })

                    function statusScale(statusflag, diffvalue) {
                        if(statusflag == 'Accepted') {
                            if(diffvalue > 0.7)
                            return myfocus_downcolor[0][0];
                            else if(diffvalue > 0.5)
                            return myfocus_downcolor[0][1];
                            else
                            return myfocus_downcolor[0][2];
                        } else {
                           if(diffvalue > 0.7)
                            return myfocus_downcolor[1][0];
                            else if(diffvalue > 0.5)
                            return myfocus_downcolor[1][1];
                            else
                            return myfocus_downcolor[1][2];
                        }
                    }

                    function opacitychosen(diffvalue) {
                        if(diffvalue > 0.7) {
                            return 1;
                        } else if (diffvalue > 0.5) {
                            return 0.6
                        } else {
                            return 0.3;
                        }
                    }

                    function time2date(time) {
                        return time.split(' ')[0];
                    }

                    function brushed() {
                        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
                        var s = d3.event.selection || x_context.range();
                        
                        var invertbegin = x.invert(s[0]);
                        var invertend = x.invert(s[1]);
                        var begin_invertedx = (invertbegin.getFullYear() - 2017) * 11 + invertbegin.getMonth() + invertbegin.getFullYear();
                        var end_invertedx = (invertend.getFullYear() - 2017) * 11 + invertend.getMonth() + invertend.getFullYear();
                        // find brushed time range and store selected data in brushSeq
                        var brushSeq = [];
                        for(var queindex = 0; queindex < seqdata.length; queindex++) {
                            var tempdate_Year = formatdate(seqdata[queindex]['time'].split(' ')[0]).getFullYear()
                            var tempdate_Month = formatdate(seqdata[queindex]['time'].split(' ')[0]).getMonth()

                            var temp_invertedx = (tempdate_Year - 2017) * 11 + tempdate_Month + tempdate_Year
                            if((begin_invertedx <= temp_invertedx)&&(temp_invertedx <= end_invertedx)) {
                                brushSeq.push(seqdata[queindex]);
                            }
                        }

                        queseq.selectAll('*').remove();

                        context.selectAll(".brush rect.handle")
                            .attr('opacity', '0.5')
                            .attr('fill','#75664d')
                            .attr("width", 10)
                            .attr("height", 30);

                        queseq.append('rect')
                            .attr('width', seqblockwidth * seqtip_widthnum)
                            .attr('height', seqblockheight)
                            .attr('x', parseInt((width/seqblockwidth - seqtip_widthnum)/2) * seqblockwidth)
                            .attr('y', elheight + colnumset*seqblockheight)
                            .attr('fill', typebar_Backgroundcolor)

                        // calculate index of every question
                        var localindex_ques = 0;
                        var localindex_respo = [];
                        var lastdate = time2date(brushSeq[0]['time']);
                        for(var sub_index = 0; sub_index < brushSeq.length; sub_index++) {
                            var remainder = 0;
                            if(time2date(brushSeq[sub_index]['time']) == lastdate) {
                                localindex_respo.push([sub_index, localindex_ques]);
                                localindex_ques++;
                            } else {
                                lastdate = time2date(brushSeq[sub_index]['time']);
                                remainder = localindex_ques % colnumset;
                                if(remainder != 0) {
                                    localindex_ques = localindex_ques + (colnumset - remainder) + colnumset;
                                } else {
                                    localindex_ques = localindex_ques + colnumset;
                                }        
                                localindex_respo.push([sub_index, localindex_ques]);
                                localindex_ques++;
                            }
                        };
                        // console.log(localindex_respo);
                        var defs = svg.append('svg:defs')

                        defs.append('svg:marker')
                            .attr('id','left_button')
                            .attr('markerHeight', 25)
                            .attr('markerWidth', 25)
                            .attr('markerUnits', 'strokeWidth')
                            .attr('orient', 'auto')
                            .attr('refX', 0)
                            .attr('refY', 0)
                            .attr('viewBox', "0 0 455 455")
                            .append('svg:path')
                            .attr('d',  "M227.5,0C101.855,0,0,101.855,0,227.5S101.855,455,227.5,455S455,353.145,455,227.5S353.145,0,227.5,0z M334.411,276.772  L227.5,170.209L120.589,276.772l-21.178-21.248L227.5,127.852l128.089,127.673L334.411,276.772z")
                            .attr('fill',"grey")

                        defs.append('svg:marker')
                            .attr('id','right_button')
                            .attr('markerHeight', 25)
                            .attr('markerWidth', 25)
                            .attr('markerUnits', 'strokeWidth')
                            .attr('orient', 'auto')
                            .attr('refX', 0)
                            .attr('refY', 0)
                            .attr('viewBox', "0 0 455 455")
                            .append('svg:path')
                            .attr('d',  "M227.5,0C101.855,0,0,101.855,0,227.5S101.855,455,227.5,455S455,353.145,455,227.5S353.145,0,227.5,0z M334.411,276.772  L227.5,170.209L120.589,276.772l-21.178-21.248L227.5,127.852l128.089,127.673L334.411,276.772z")
                            .attr('fill',"grey")

                        var left_button = queseq.append('rect')
                            .attr("class", "left_button")
                            .attr("transform", "translate(0," + (elheight + (parseInt(colnumset/2)-1)*seqblockheight) + ")")
                            .attr("width", buttonwidth)
                            .attr("height", seqblockheight*(colnumset - (parseInt(colnumset/2)-1) * 2))
                            .attr("fill", 'white')
                            .attr("stroke", stroke_ButtonColor)
                            .attr("stroke-width", "2")
                            .attr("opacity", 0)

                        queseq.append("path")
                            .attr('d',"M0,0L0,1")
                            .attr("marker-start","url(#left_button)")
                            .attr("transform", "translate(" + 0 + "," + (25+elheight + (parseInt(colnumset/2)-1)*seqblockheight) + ") rotate(180)")
                
                        var right_button = queseq.append('rect')
                            .attr("class", "right_button")
                            .attr("transform", "translate(" + (width - buttonwidth) + "," + (elheight + (parseInt(colnumset/2)-1)*seqblockheight) + ")")
                            .attr("width", buttonwidth)
                            .attr("height", seqblockheight*(colnumset - (parseInt(colnumset/2)-1) * 2))
                            .attr("fill", function(){
                                if(Math.ceil(localindex_respo[localindex_respo.length-1][1]/(colnumset * (width-buttonwidth*2)/seqblockwidth)) < 2) {
                                    return invalid_ButtonColor;
                                } else {
                                    return valid_ButtonColor;
                                }
                            })
                            .attr("stroke", stroke_ButtonColor)
                            .attr("stroke-width", "2")
                            .attr("opacity", 0)

                         queseq.append("path")
                            .attr('d',"M0,0L0,1")
                            .attr("marker-start","url(#right_button)")
                            .attr("transform", "translate(" + (width) + "," + (elheight + (parseInt(colnumset/2)-1)*seqblockheight) + ")")

                        var clickindex = 0; // record the current page
                        var quesselect_flag = 0; // if a question be selected
                        var clickquestion = 0; // store selected question ID
                        var arrayrect = []; // store the rect show in the current page
                        var rect_pageindex = [], pageindex = 0;

                        queseq.selectAll('.seq_rect').remove();
                        drawpagesequence();
                        rectinteraction();
                        
                        left_button.on('click', function() {
                            if(clickindex > 0) {
                                clickindex--;
                            } else {
                                clickindex = 0;
                            };

                            if(clickindex==0) {
                                queseq.select('.left_button')
                                    .attr("fill", invalid_ButtonColor);
                            } else {
                                queseq.select('.left_button')
                                    .attr("fill", valid_ButtonColor);
                            };

                            if(clickindex!=parseInt(localindex_respo[localindex_respo.length - 1][1]/(colnumset * (width-buttonwidth*2)/seqblockwidth))) {
                                queseq.select('.right_button')
                                    .attr("fill", valid_ButtonColor);
                            } else {
                                queseq.select('.right_button')
                                    .attr("fill", invalid_ButtonColor);
                            }

                            queseq.selectAll('.seq_rect').remove();
                            drawpagesequence();
                            rectinteraction();
                        });
                        right_button.on('click', function() {

                            if(clickindex < parseInt(localindex_respo[localindex_respo.length - 1][1]/(colnumset * (width-buttonwidth*2)/seqblockwidth))) {
                                clickindex = clickindex + 1;
                                
                            };

                            if(clickindex!=0) {
                                queseq.select('.left_button')
                                    .attr("fill", valid_ButtonColor);
                            } else {
                                queseq.select('.left_button')
                                    .attr("fill", invalid_ButtonColor);
                            };

                            if(clickindex == parseInt(localindex_respo[localindex_respo.length - 1][1]/(colnumset * (width-buttonwidth*2)/seqblockwidth))) {
                                queseq.select('.right_button')
                                    .attr("fill", invalid_ButtonColor);
                            } else {
                                queseq.select('.right_button')
                                    .attr("fill", valid_ButtonColor);
                            }
                            queseq.selectAll('.seq_rect').remove();
                            drawpagesequence();
                            rectinteraction();                    
                        })

                        function drawpagesequence() {
                            arrayrect = [];
                            rect_pageindex = [];
                            pageindex = 0;
                            // for(var columnindex = 0; columnindex < parseInt((width-buttonwidth*2)/seqblockwidth); columnindex++) {
                            //     for(var seqindex = 0; seqindex < colnumset; seqindex++) {
                            //         if(seqindex + columnindex*colnumset + clickindex * colnumset * parseInt((width-buttonwidth*2)/seqblockwidth) < brushSeq.length){
                            //             // console.log(clickquestion == brushSeq[seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset]['problemID']);
                            //             if(clickquestion == brushSeq[seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset]['problemID']) {
                            //                 arrayrect.push(
                            //                     queseq.append('rect')
                            //                     .attr("class", "seq_rect")
                            //                     .attr("id", seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset)
                            //                     .attr("width", seqblockwidth)
                            //                     .attr("height", seqblockheight)
                            //                     .attr("transform", "translate("+ (buttonwidth + columnindex*seqblockwidth) + "," + (elheight+seqindex*seqblockheight) + ")")
                            //                     .style("opacity", opacitychosen(brushSeq[seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset]['difficulty']))
                            //                     .style("fill", statusScale(brushSeq[seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset ]['judgeStatus']))
                            //                     .style('stroke', 'black')
                            //                 )
                            //             } else {
                            //                 arrayrect.push(
                            //                     queseq.append('rect')
                            //                     .attr("class", "seq_rect")
                            //                     .attr("id", seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset)
                            //                     .attr("width", seqblockwidth)
                            //                     .attr("height", seqblockheight)
                            //                     .attr("transform", "translate("+ (buttonwidth + columnindex*seqblockwidth) + "," + (elheight+seqindex*seqblockheight) + ")")
                            //                     .style("opacity", opacitychosen(brushSeq[seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset]['difficulty']))
                            //                     .style("fill", statusScale(brushSeq[seqindex + columnindex*colnumset + clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset]['judgeStatus']))
                            //                     .style('stroke', 'none')
                            //                 )
                            //             }
                            //         }        
                            //     }; 
                            // };
                            for(var submission_index = 0; submission_index < localindex_respo.length; submission_index++) {
                                if((clickindex*parseInt((width-buttonwidth*2)/seqblockwidth)*colnumset <= localindex_respo[submission_index][1])&&(localindex_respo[submission_index][1] < (clickindex+1)*parseInt((width-buttonwidth*2)/seqblockwidth)*colnumset)) {
                                    if(clickquestion == brushSeq[submission_index]['problemID']) {
                                        arrayrect.push(
                                            queseq.append('rect')
                                            .attr("class", "seq_rect")
                                            .attr("id", submission_index)
                                            .attr("width", seqblockwidth)
                                            .attr("height", seqblockheight)
                                            .attr("transform", "translate("+ (buttonwidth + (parseInt(localindex_respo[submission_index][1]/colnumset) - clickindex * parseInt((width-buttonwidth*2)/seqblockwidth))*seqblockwidth) + "," + (elheight+(localindex_respo[submission_index][1]%colnumset)*seqblockheight) + ")")
                                            // .style("opacity", opacitychosen(brushSeq[submission_index]['difficulty']))
                                            .style("fill", statusScale(brushSeq[submission_index]['judgeStatus'], brushSeq[submission_index]['difficulty']))
                                            .style('stroke', 'black')
                                        );
                                        rect_pageindex.push([pageindex, submission_index])
                                        pageindex++;

                                    } else {
                                        arrayrect.push(
                                            queseq.append('rect')
                                            .attr("class", "seq_rect")
                                            .attr("id", submission_index)
                                            .attr("width", seqblockwidth)
                                            .attr("height", seqblockheight)
                                            .attr("transform", "translate("+ (buttonwidth + (parseInt(localindex_respo[submission_index][1]/colnumset) - clickindex * parseInt((width-buttonwidth*2)/seqblockwidth))*seqblockwidth) + "," + (elheight+(localindex_respo[submission_index][1]%colnumset)*seqblockheight) + ")")
                                            // .style("opacity", opacitychosen(brushSeq[submission_index]['difficulty']))
                                            .style("fill", statusScale(brushSeq[submission_index]['judgeStatus'], brushSeq[submission_index]['difficulty']))
                                            .style('stroke', 'none')
                                        )
                                        rect_pageindex.push([pageindex, submission_index])
                                        pageindex++;
                                    }      
                                }
                            }
                        }

                        function rectinteraction() {
                            if(quesselect_flag != 0) {
                                queseq.append('text')
                                    .attr('class', 'probID_tooltip')
                                    .text("Problem ID: " + clickquestion)
                                    .style('fill', typebar_Color)
                                    .style('font-size', seqblockheight-1)
                                    .attr('transform', "translate("+ (parseInt((width/seqblockwidth - seqtip_widthnum)/2) * seqblockwidth + seqblockwidth) + "," + (elheight+colnumset*seqblockheight+seqblockheight - 2) + ")")
                            }
                            queseq.selectAll('.seq_rect')
                                .on('mousemove', function(d, i) {
                                    
                                    if(quesselect_flag == 0) {
                                        var selectquestion = brushSeq[rect_pageindex[i][1]]['problemID'];
                                        // var findques_end = clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset + parseInt((width-buttonwidth*2)/seqblockwidth)*colnumset;
                                        // if(findques_end > brushSeq.length) {
                                        //     findques_end = brushSeq.length
                                        // }
                                        // for(var findques = clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset; findques < findques_end; findques++) {
                                        //     if(brushSeq[findques]['problemID'] == selectquestion) {
                                        //         arrayrect[findques - clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset].style('stroke', 'black')
                                        //     }
                                        // }
                                        for(var j = 0; j < rect_pageindex.length; j++) {
                                            if(brushSeq[rect_pageindex[j][1]]['problemID'] == selectquestion) {
                                                arrayrect[j].style('stroke', 'black');
                                            }
                                        }
                                        queseq.append('text')
                                            .attr('class', 'probID_tooltip')
                                            .text("Problem ID: " + selectquestion)
                                            .style('fill', typebar_Color)
                                            .style('font-size', seqblockheight-1)
                                            .attr('transform', "translate("+ (parseInt((width/seqblockwidth - seqtip_widthnum)/2) * seqblockwidth + seqblockwidth) + "," + (elheight+colnumset*seqblockheight+seqblockheight - 2) + ")")
                                    }
                                })
                                .on('mouseout', function(d, i) {
                                    if(quesselect_flag == 0) {
                                        queseq.selectAll('.seq_rect')
                                            .style('stroke', 'none');
                                        queseq.selectAll('.probID_tooltip').remove()
                                    }
                                })
                            queseq.selectAll('.seq_rect')
                                .on('click', function(d, i) {
                                    if(quesselect_flag == 0) {
                                        quesselect_flag = 1;
                                        clickquestion = brushSeq[rect_pageindex[i][1]]['problemID'];
                                        // var findques_end = (clickindex + 1) * parseInt((width-buttonwidth*2)/seqblockwidth)*colnumset;
                                        //     if(findques_end > brushSeq.length) {
                                        //         findques_end = brushSeq.length
                                        //     }
                                        // for(var findques = clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset; findques < findques_end; findques++) {
                                        //     if(brushSeq[findques]['problemID'] == clickquestion) {
                                        //         arrayrect[findques - clickindex * parseInt((width-buttonwidth*2)/seqblockwidth) * colnumset].style('stroke', 'black')
                                        //     }
                                        // }
                                        for(var j = 0; j < rect_pageindex.length; j++) {
                                            if(brushSeq[rect_pageindex[j][1]]['problemID'] == clickquestion) {
                                                arrayrect[j].style('stroke', 'black');
                                            }
                                        }
                                        queseq.append('text')
                                            .attr('class', 'probID_tooltip')
                                            .text("Problem ID: " + clickquestion)
                                            .style('fill', typebar_Color)
                                            .style('font-size', seqblockheight-1)
                                            .attr('transform', "translate("+ (parseInt((width/seqblockwidth - seqtip_widthnum)/2) * seqblockwidth + seqblockwidth) + "," + (elheight+colnumset*seqblockheight+seqblockheight - 2) + ")")
                                    } else {
                                        quesselect_flag = 0;
                                        clickquestion = 0;
                                        queseq.selectAll('.seq_rect')
                                            .style('stroke', 'none');
                                        queseq.selectAll('.probID_tooltip').remove();
                                    }

                                })
                        }

                    }


                }
            }
        }
    }
}
</script>

<style scoped>
    body {
        font: 10px sans-serif;
    }
    
    .chart {
        background: #fff;
    }
    
    p {
        font: 12px helvetica;
    }

    .y_context_axis path,
    .y_context_axis line {
        fill: none;
        stroke: #000;
        stroke-width: 0.5px;
        shape-rendering: crispEdges;
    }
</style>
