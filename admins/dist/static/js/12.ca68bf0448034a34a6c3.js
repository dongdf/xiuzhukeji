webpackJsonp([12],{AmgT:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("G7MN"),n=a("vp4Q"),i=a("giHb"),o=a("cPLa"),r={name:"caiji-manager",components:{Button:a("gMJu").a,productReport:e.a,no:o.a},data:()=>({affrisType:1,rtotal:0,psize:20,pnumb:1,cjlist:[],keyword:""}),mounted(){this.getcjList()},methods:{changetabs(t){this.psize=20,this.pnumb=1,this.cjlist=[],this.affrisType=t,this.getcjList()},viewmeeting(t){this.$mymsg(n.a,{data:{optbtn:!1,mid:t.id},methods:{}})},change:function(t){console.log(t),this.pnumb=t,this.getcjList()},search(){this.pnumb=1,this.getcjList()},delcj(t){let s=this;this.$mymsg(i.a,{data:{message:"确定删除此条记录？"},methods:{onOk(){s.$http.get("financial/bbService/cjglDelete?qyId="+t.companyId).then(a=>{if(1!=a.data.code)s.$Message.error(a.data.msg);else{var e=s.cjlist.findIndex(function(s){return s.companyId==t.companyId});s.cjlist.splice(e,1)}})}}})},edit(t){let s=this;0==t.hasReport?s.$router.push({name:"grade",query:{edit:1,id:t.companyId,cur:1}}):this.$mymsg(i.a,{data:{message:"编辑企业会将企业已生成的报告删除，继续操作请点击[确定]"},methods:{onOk(){s.$http.get("financial/reportService/deleteReport?qyId="+t.companyId+"&year=2018").then(a=>{s.$router.push({name:"grade",query:{edit:1,id:t.companyId,cur:1}})})}}})},isEdit(){},getcjList(){this.$http.get("affair/lists?size="+this.psize+"&page="+this.pnumb+"&type="+this.affrisType+"&id=").then(t=>{t.data.data.data.list&&(this.cjlist=t.data.data.data.list),this.rtotal=parseInt(t.data.data.data.count)})},productIng(t){let s=this;this.$mymsg(e.a,{data:{message:"you click me btn1",qyId:t.companyId},methods:{onOk(){alert("回调")},onBuy(){s.$router.push({name:"miyaoMgr"})},updateList(){s.getcjList()},viewbb(){alert("回调")}}})}}},c={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("Row",{staticStyle:{"border-bottom":"2px solid #EEE","padding-bottom":"10px"}},[a("Col",{attrs:{span:"18"}},[a("div",{staticClass:"cpageTitle"},[a("Icon",{attrs:{size:"20",type:"ios-construct-outline"}}),a("span",[t._v("会议统计")])],1)]),t._v(" "),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"6"}},[a("Input",{attrs:{placeholder:"请输入会议编号"},model:{value:t.keyword,callback:function(s){t.keyword=s},expression:"keyword"}},[a("span",{attrs:{slot:"prepend"},slot:"prepend"},[a("Icon",{attrs:{type:"ios-search"}})],1),t._v(" "),a("span",{attrs:{slot:"append"},slot:"append"},[a("Button",{attrs:{type:"primary"},on:{click:function(s){t.search()}}},[t._v("搜索")])],1)])],1)],1),t._v(" "),a("br"),t._v(" "),a("center",[a("ButtonGroup",[a("i-button",{staticClass:"ivu-btn ",class:1==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(1)}}},[t._v("\n\n        即将开始\n      ")]),t._v(" "),a("i-button",{staticClass:"ivu-btn",class:2==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(2)}}},[t._v("\n\n        待关闭\n      ")]),t._v(" "),a("i-button",{staticClass:"ivu-btn",class:3==t.affrisType?"ivu-btn-primary":"",on:{click:function(s){t.changetabs(3)}}},[t._v("\n\n        已结束\n      ")])],1)],1),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"ivheaders"},[a("Row",[a("Col",{attrs:{span:"2"}},[t._v("编号")]),t._v(" "),a("Col",{attrs:{span:"4"}},[t._v("会议名称")]),t._v(" "),a("Col",{attrs:{span:"2"}},[t._v("创建人")]),t._v(" "),a("Col",{attrs:{span:"4"}},[t._v("活动时间")]),t._v(" "),a("Col",{attrs:{span:"4"}},[t._v("创建时间")]),t._v(" "),a("Col",{attrs:{span:"2"}},[t._v("保证金")]),t._v(" "),a("Col",{attrs:{span:"4"}},[t._v("参与人/总人数")]),t._v(" "),a("Col",{attrs:{span:"2"}},[t._v("操作")])],1)],1),t._v(" "),t._l(t.cjlist,function(s){return a("div",{staticClass:"iv_items"},[a("Row",{staticStyle:{"font-weight":"normal"}},[a("Col",{attrs:{span:"2"}},[a("b",[t._v(t._s(s.id))])]),t._v(" "),a("Col",{attrs:{span:"4"}},[t._v(t._s(s.title))]),t._v(" "),a("Col",{attrs:{span:"2"}},[t._v(t._s(s.name))]),t._v(" "),a("Col",{attrs:{span:"4"}},[t._v(t._s(s.active_time))]),t._v(" "),a("Col",{attrs:{span:"4"}},[t._v(t._s(s.create_time))]),t._v(" "),a("Col",{attrs:{span:"2"}},[t._v(t._s(s.promise_money*s.persons))]),t._v(" "),a("Col",{attrs:{span:"4"}},[a("b",[t._v(t._s(s.persons)+"/"+t._s(s.quota))])]),t._v(" "),a("Col",{attrs:{span:"2"}},[a("Button",{attrs:{size:"small"},on:{click:function(a){t.viewmeeting(s)}}},[t._v("查看")])],1)],1)],1)}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.cjlist.length>0,expression:"cjlist.length>0"}],staticClass:"pager"},[a("Page",{attrs:{total:t.rtotal,current:t.pnumb,"page-size":t.psize,"show-total":""},on:{"on-change":t.change}})],1),t._v(" "),a("no",{directives:[{name:"show",rawName:"v-show",value:0==t.cjlist.length,expression:"cjlist.length == 0"}],attrs:{tipText:"暂无记录"}}),t._v(" "),a("br")],2)},staticRenderFns:[]};var l=a("VU/8")(r,c,!1,function(t){a("xb7F")},"data-v-95b97940",null);s.default=l.exports},xb7F:function(t,s){}});