import Vue from 'vue';

const PipeService = new Vue({
    data: {
        UPDATE_OVERVIEW: 'update_overview',
        UPDATE_RANKINGVIEW: 'update_rankingview',
        UPDATE_EVOLUTIONVIEW: 'update_evolutionview',
        UPDATE_CORRELATIONVIEW: 'update_correlationview',
        UPDATE_COMPARISIONVIEW: 'update_comparisionview',
    },
});

export default PipeService;