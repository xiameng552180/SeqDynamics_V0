// import GlobalConfig from './global-config';

let instance = null;
class Service {
    constructor() {
        if (!instance) {
            instance = this;
        }

        this.serverIP = 'http://localhost:5003'
        this.serverUrl = `${this.serverIP}`;


        this.data = {};
        this.rankData = {}; //all
        this.finalRankData = {}; //read and save the final rank with the score
        this.authorSelected = [];
        this.compareSelected = [];
        this.actionflag = 0;
        this.skill = [];
        this.rankDiff = [];
        this.finalRank = []; //without name and use the order of for each author in the data
        this.range = {};
        this.range['startRank'] = 0;
        this.range['endRank'] = 21;
        this.ratio = [0.17, 0.17, 0.17, 0.17, 0.17, 0.17];
        this.barPosition = [];
        this.hover = -1;
        this.drawOrder = [];
        for(var i =0; i <1000; i++)
        {
            this.drawOrder.push(-1)
        }
        for (var i = 0; i < 7; i++) {
            this.barPosition.push(10 + 55 * i)
        }
        return instance;
    }


    get_skill_data(data) {
        // console.log(this.finalRankData)
        for (var i = 0; i < 6; i++) {
            var temp_skill = []
            for (var each_author in data) {
                //给overview用的东西
                if (i == 0) {
                    this.finalRank.push(data[each_author]["ranking"]['2018-8']);
                }
                //correlationView用的东西
                var temp = {}
                temp['name'] = each_author
                temp['score'] = data[each_author]["skill_point"][i]
                temp_skill.push(temp)
            }
            this.skill.push(temp_skill)
        }
        //   console.log(this.skill)
    }

    get_rank_data(data) {
            for (var each_author in data) {
                this.rankData[each_author] = data[each_author]['ranking'];
            }
        }
        // getServerVideoUrl() {
        //     return this.serverVideoUrl;
        // }

    // setUserId(data) {
    //     this.userId = data;
    // }

    // getUserId() {
    //     return this.userId;
    // }

}

const DataService = new Service();
export default DataService;