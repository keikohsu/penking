(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ConnectionList"],{"9cd3":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",{staticClass:"FormPadding"},[a("v-col",{staticClass:"d-flex justify-center"},[a("v-card",[a("v-card-title",[e._v(" 訪客留言管理 "),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("v-data-table",{attrs:{headers:e.headers,items:e.messages,search:e.search},scopedSlots:e._u([{key:"item.actions",fn:function(t){var s=t.item;return[a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(s,e.index)}}},[e._v(" mdi-delete ")])]}}])})],1)],1)],1)],1)},n=[],c=(a("a434"),{data:function(){return{search:"",messages:[],headers:[{text:"姓名",align:"start",sortable:!1,value:"name"},{text:"公司名",value:"company"},{text:"手機",value:"cellphone"},{text:"電話",value:"phone"},{text:"信箱",value:"email"},{text:"訊息",value:"message"},{text:"填寫日期",value:"date"},{text:"刪除",value:"actions",sortable:!1}]}},methods:{deleteItem:function(e,t){var a=this;this.axios.delete("https://penking.herokuapp.com/connection/"+e._id).then((function(e){e.data.success?a.messages.splice(t,1):a.$swal({icon:"error",title:"錯誤",text:e.data.message})})).catch((function(e){a.$swal({icon:"error",title:"錯誤",text:e.response.data.message})}))}},mounted:function(){var e=this;this.axios.get("https://penking.herokuapp.com/connection/getorder").then((function(t){t.data.success?(e.messages=t.data.result,console.log(e.messages)):e.$swal({icon:"error",title:"錯誤",text:t.data.message})})).catch((function(t){e.$swal({icon:"error",title:"錯誤",text:t.response.data.message})}))}}),i=c,o=a("2877"),r=a("6544"),l=a.n(r),d=a("b0af"),u=a("99d9"),m=a("62ad"),h=a("a523"),p=a("8fea"),v=a("132d"),f=a("0fd9"),x=a("2fa4"),g=a("8654"),w=Object(o["a"])(i,s,n,!1,null,null,null);t["default"]=w.exports;l()(w,{VCard:d["a"],VCardTitle:u["c"],VCol:m["a"],VContainer:h["a"],VDataTable:p["a"],VIcon:v["a"],VRow:f["a"],VSpacer:x["a"],VTextField:g["a"]})}}]);
//# sourceMappingURL=ConnectionList.f4dcc780.js.map