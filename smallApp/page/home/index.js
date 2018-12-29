//index.js
//获取应用实例
const app = getApp()



Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    lists:{},
    isTodayWeek: false,
    todayIndex: 0
  },
  goadd: function(){
    getApp().globalData.meetingadd = true;
    getApp().globalData.meetId ='';
    wx.navigateTo({
      url: '../home/addmeeting?type=add',
    })
  },
  gomine: function(e){
    getApp().post('index/fomrids', {formId: e.detail.formId})
    wx.navigateTo({
        url: '../mine/index',
    })

    
    
  },
  goaddmeeting(e){
    console.log(e);
    getApp().post('index/fomrids',{formId: e.detail.formId});
      getApp().globalData.meetingadd = true;
      getApp().globalData.meetId = '';
      wx.navigateTo({
        url: '../home/addmeeting?type=add',
      })

   
  },
  getcomming:function(){
    getApp().post('affair/hangAffairs?page=1&size=100').then(res=>{
      for(var i in res){
        res[i].active_time = getApp().datetostring(res[i].active_time,'MM-dd ww hh:mm')
      }
      this.setData({
        'lists.ing':res
      })
    })
  },
  onLoad: function () {
    
    // this.getalllist(2)
    if (!wx.getStorageSync('ppid')){
      wx.redirectTo({
        url: '../home/start',
      })

    }
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })

  },
  onShow:function(){
    this.getcomming();

    // wx.getWeRunData({
    //   success(res) {
    //     const encryptedData = res.encryptedData;
    //     console.log(res.encryptedData);
    //   }
    // })


    this.getalllist(0);
    this.getalllist(1);
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  getalllist: function (state) {//0：进行中，1：待关闭，2：活动结束
    getApp().post('affair/lists?page=1&size=1000',{
    status: state
    }).then(res=>{
      if (state ==0){
        for (var i in res) {
          res[i].active_time = getApp().datetostring(res[i].active_time, 'MM-dd ww hh:mm')
        }
        this.setData({
          'lists.close':res
        })
      } else  {
        for (var i in res) {
          res[i].active_time = getApp().datetostring(res[i].active_time, 'MM-dd ww hh:mm')
        }
        this.setData({
          'lists.end': res
        })
      } 

    })

  },
  checkkDay:function(e){
    console.log(e);

  }
})