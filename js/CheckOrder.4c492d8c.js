(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CheckOrder"],{"09a5":function(e,t,a){},4480:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{},[a("v-row",{staticClass:"FormPadding"},[a("v-data-table",{staticClass:"elevation-1 containerheight",attrs:{headers:e.headers,items:e.orders},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("會員訂購清單")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),void 0,a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Dessert name"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Calories"},model:{value:e.editedItem.price,callback:function(t){e.$set(e.editedItem,"price",t)},expression:"editedItem.price"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Fat (g)"},model:{value:e.editedItem.quantity,callback:function(t){e.$set(e.editedItem,"quantity",t)},expression:"editedItem.quantity"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Carbs (g)"},model:{value:e.editedItem.carbs,callback:function(t){e.$set(e.editedItem,"carbs",t)},expression:"editedItem.carbs"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Protein (g)"},model:{value:e.editedItem.protein,callback:function(t){e.$set(e.editedItem,"protein",t)},expression:"editedItem.protein"}})],1)],1)],1)],1)],2)],1)],1)]},proxy:!0},{key:"item.product",fn:function(t){var i=t.item;return e._l(i.products,(function(t,i){return a("p",{key:i},[e._v("1."+e._s(t.name))])}))}},{key:"item.quantity",fn:function(t){var i=t.item;return e._l(i.products,(function(t,i){return a("p",{key:i},[e._v(e._s(t.quantity))])}))}},{key:"item.price",fn:function(t){var i=t.item;return e._l(i.products,(function(t,i){return a("p",{key:i},[e._v(e._s(t.price))])}))}},{key:"item.actions",fn:function(t){var i=t.item;return[a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(i,e.index)}}},[e._v(" mdi-delete ")])]}}])})],1)],1)},r=[],n=(a("a434"),a("b0c0"),{data:function(){return{dialog:!1,dialogDelete:!1,orders:[],name:"",price:"",id:"",quantity:"",headers:[{text:"訂購人",align:"start",sortable:!1,value:"user"},{text:"商品",value:"product"},{text:"訂購價格",value:"price"},{text:"商品數量",value:"quantity"},{text:"狀態",value:"what",switch1:!0,switch2:!1},{text:"Actions",value:"actions",sortable:!1}],editedIndex:-1,editedItem:{name:"",price:0,quantity:0},defaultItem:{name:"",price:0,quantity:0}}},computed:{formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"},orderitems:function(){return this.orders}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()}},created:function(){this.initialize()},methods:{initialize:function(){this.orders=[]},deleteItem:function(e,t){var a=this;console.log("https://penking.herokuapp.com/users/order/"+e._id),this.axios.delete("https://penking.herokuapp.com/users/order/"+e._id).then((function(e){e.data.success?(console.log(a.items),a.orders.splice(t,1)):a.$swal({icon:"error",title:"錯誤",text:e.data.message})})).catch((function(e){a.$swal({icon:"error",title:"錯誤",text:e.response.data.message})}))}},mounted:function(){var e=this;this.axios.get("https://penking.herokuapp.com/users/user").then((function(t){if(t.data.success)for(var a=t.data.result,i=0;i<a.length;i++){for(var r=0;r<a[i].orders.length;r++)e.orders.push(a[i].orders[r]),a[i].orders[r].user=a[i].name;console.log(e.orders)}else e.$swal({icon:"error",title:"錯誤",text:t.data.message})})).catch((function(t){e.$swal({icon:"error",title:"錯誤",text:t.response.data.message})}))}}),s=n,o=(a("f672"),a("2877")),l=a("6544"),d=a.n(l),c=a("b0af"),u=a("99d9"),m=a("62ad"),f=a("a523"),v=a("8fea"),p=a("169a"),h=a("ce7e"),x=a("132d"),b=a("0fd9"),g=a("2fa4"),k=a("8654"),I=a("71d9"),w=a("2a7f"),y=Object(o["a"])(s,i,r,!1,null,null,null);t["default"]=y.exports;d()(y,{VCard:c["a"],VCardText:u["b"],VCardTitle:u["c"],VCol:m["a"],VContainer:f["a"],VDataTable:v["a"],VDialog:p["a"],VDivider:h["a"],VIcon:x["a"],VRow:b["a"],VSpacer:g["a"],VTextField:k["a"],VToolbar:I["a"],VToolbarTitle:w["a"]})},f672:function(e,t,a){"use strict";a("09a5")}}]);
//# sourceMappingURL=CheckOrder.4c492d8c.js.map