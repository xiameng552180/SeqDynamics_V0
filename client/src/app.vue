<template>
    <div class = "container">
        <div class = "row" >
            <div class="col-lg-2">
                <div id="ranking" class="window">
                    <div class="title">
                        <span class="name"><i class="fa fa-filter" aria-hidden="true"></i>&nbsp;Ranking View</span>
                    </div>
                    <div class="content" style="overflow: hidden">
                         <div> 
                            <input  id = "startRank" type="text" placeholder="startRank:1" style="width:160px"/>
                            <input  id = "endRank" type="text" placeholder="endRank:100" style="width:170px"/>
                            <button v-on:click="update" type="button">Ok!</button>
                    </div>
                        <ranking-view></ranking-view>
                    </div>
                </div>
            </div>

            <div class="col-lg-10">
                <div class = "row">
                    <div class="col-lg-4">
                        <div id="overview" class="window">
                            <div class="title">
                                <span class="name"><i class="fa fa-filter" aria-hidden="true"></i>&nbsp;ProjectionView</span>
                            </div>
                            <div class="content">
                                <!-- <candidates @child-event = 'parentEvent'></candidates> -->
                                <over-view></over-view>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-7" >
                            <div id="evolution" class="window">
                            <div class="title">
                                <span class="name"><i class="fa fa-filter" aria-hidden="true"></i>&nbsp;Evolution</span>
                            </div>
                            <div class="content" style="overflow-x:hidden">
                                <evolution-view :message="authorname"></evolution-view>
                            </div>
                            </div>
                    </div>
                </div>
                
                <div class = "row">
                    <div class="col-lg-2">
                        <div id="correlation" class="window">
                                <div class="title">
                                    <span class="name"><i class="fa fa-filter" aria-hidden="true"></i>&nbsp;Correlation</span>
                                </div>
                                <div class="content">
                                    <correlation-view></correlation-view>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div id="comparison" class="window">
                            <div class="title">
                                <span class="name"><i class="fa fa-filter" aria-hidden="true"></i>&nbsp;Comparison/Cooperation</span>
                            </div>
                            <div class="content">
                                <comparison-view></comparison-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import RankingView from './components/RankingView';
    import OverView from './components/OverVIew';
    import EvolutionView from './components/EvolutionView';
    import CorrelationView from './components/CorrelationView';
    import ComparisonView from './components/ComparisonView';
    import NetService from './services/net-service';
    import DataService from './services/data-service';
    import PipeService from './services/pipe-service';

    export default {
        name: 'App',
        components: {
            EvolutionView,
            ComparisonView,
            OverView,
            CorrelationView,
            RankingView,
        },
        data(){
            return {
                authorname: "ok",
            }
        },
        mounted() {
            this.$nextTick(function foo() {
                this.initialize();
            });
        },
        methods: {
            update() {
                NetService.loadData((resp)=>{          
                var start = document.getElementById("startRank").value
                var end = document.getElementById("endRank").value
                DataService.range['startRank'] = start - 1
                DataService.range['endRank'] = end - 1
                // console.log(start)
                PipeService.$emit(PipeService.UPDATE_RANKINGVIEW)
                PipeService.$emit(PipeService.UPDATE_OVERVIEW)
                PipeService.$emit(PipeService.UPDATE_CORRELATIONVIEW)
                })
            },
            
            initialize() {
                console.log('this is the starting point');
                // NetService.loadRank((resp)=>{
                //     DataService.finalRankData = resp.data;
                //     // console.log(resp.data)
                //     PipeService.$emit(PipeService.UPDATE_RANKINGVIEW);
                // })
                // document.addEventListener('touchstart', handler, {passive: true});
                NetService.loadData((resp)=>{
                    var range = {}
                    // console.log(resp.data)
                    DataService.data = resp.data['0']
                    DataService.finalRankData = resp.data['1']
                    DataService.get_rank_data(DataService.data)
                    DataService.get_skill_data(DataService.data)
                    // console.log(DataService.rankData)
                    PipeService.$emit(PipeService.UPDATE_RANKINGVIEW)
                    PipeService.$emit(PipeService.UPDATE_OVERVIEW)
                    PipeService.$emit(PipeService.UPDATE_EVOLUTIONVIEW)
                    PipeService.$emit(PipeService.UPDATE_CORRELATIONVIEW)
                    
                })
                }
            },
            
    };
</script>

<style scoped>

.col-lg-2 {
    padding-right: 0px;
    padding-left: 0px;
}
.col-lg-3 {
    padding-right: 0px;
    padding-left: 0px;
}
.col-lg-4 {
    padding-right: 0px;
    padding-left: 0px;
}
.col-lg-6 {
    padding-right: 0px;
    padding-left: 0px;
}
.col-lg-7 {
    padding-right: 0px;
    padding-left: 0px;
}
.col-lg-8 {
    padding-right: 0px;
    padding-left: 0px;
}
.col-lg-9 {
    padding-right: 0px;
    padding-left: 0px;
}
.container {
        width: 95%;
        margin: auto; 
        background: repeating-linear-gradient(45deg, #eee, #eee 10px, #eee 10px, #eee 20px);
    }

    p {
        display: inline-block;
    }

    .window {
        margin: 8px 4px 0px 4px;
        padding: 0px 0px 0px 0px;
        box-shadow: 0px 1px 1px #666;
        background-color: #ffffff;
        border-color: #ffffff;
        border-width: 1px;
        border-style: solid;
        border-radius: 2px; }
        .window .title {
            padding: 1px 2px 1px 2px;
            font-size: 16px;
            color: #000;
            border-color: #666;
            border-style: solid;
            font-weight: 600;
            border-width: 0px 0px 1px 0px; }
        .window .content {
            background-color: #ffffff;
            border-radius: 3px;
            padding: 5px;
            overflow-x: auto;
            overflow-y: auto; }
            .window .content .filter {
            width: 100%;
            font-size: 14px;
            margin: 2px 0px 0px 0px; }
            .window .content .filter select {
                width: 240px; }
            .window .content .filter .select2-container {
                font-size: 16px; }
                .window .content .filter .select2-container .select2-selection {
                min-height: 20px; }
            .window .content .filter .select2-container--default .select2-selection--multiple .select2-selection__choice {
                margin-top: 2px;
                margin-right: 2px; }
        .window .controls {
            padding: 5px;
            font-size: 16px; }
        .window .icon-fold-up {
            float: right;
            font-size: 10px; }

</style>

