<template>
  <v-container class="row-width">
    <v-row class=" py-15">
      <v-col class="background-expansion py-10 px-10">
        <p class="text-center">購物須知</p>
        <div>
          <v-expansion-panels class="mb-6 ">
            <v-expansion-panel v-for="item in items" :key="item.title" >
              <!-- expand-icon="mdi-menu-down" -->
              <v-expansion-panel-header class="field-text-white">
                {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="field-text-white"> {{ item.content }} </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels class="mb-6">
            <v-expansion-panel v-for="item in items1" :key="item.title">
              <v-expansion-panel-header class="field-text-white">
                {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="field-text-white">
                {{ item.content }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels >
            <v-expansion-panel v-for="item in items2" :key="item.title">
              <v-expansion-panel-header class="field-text-white">
                {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="field-text-white">
                {{ item.content }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: '在筆王如何下單',
          content: '在筆王無須註冊即可下單'
        },
        {
          title: '產品資訊',
          content: '各個產品頁面上列出了該商品所有可用尺寸與顏色、描述。按一下產品圖像可放大並查看所有細節。'
        },
        {
          title: '如何下單',
          content:
            '從商品頁面選擇所需的數量 將產品加入購物袋 完成購物後 按一下購物車中的「下一步」按鈕輸入電子信箱與送貨地址 選擇運送方式與付款方式檢查輸入的資訊是否正確，然後按一下「結帳」。不久之後，我們將為您出貨，郵件中將載明訂單詳情。'
        }
      ],
      items1: [
        {
          title: '貴公司有提供禮品包裝嗎？',
          content: '  筆王商店的商品採用裝盒或是OPP袋，或其他特殊包裝。結帳時，可以備註您要的方式。'
        },
        {
          title: '是否可印刷/雷雕?',
          content: '我們可以提供服務，但需酌收費用'
        },
        {
          title: '效果圖 樣本',
          content: '我們提供效果圖樣本，有需要demo可以跟我們諮詢'
        }
      ],
      items2: [
        {
          title: '發貨時間與費用',
          content: '我們以量制價，一個半月的工作天， 完成訂單時必須支付的總額包括：積欠地方機關的所有關稅和地方稅。包裹交貨時則不需要支付任何其他費用。'
        },
        {
          title: '發貨說明',
          content: '我們台北地區可以提供服務送貨服務，其他地區以宅配為主'
        },
        {
          title: '訂單發貨地',
          content: '所有訂單從台灣發貨'
        }
      ]
    }
  }
}
</script>

<style>
.background-expansion {
  background: #bacec1;
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
.v-expansion-panel-header {
  background: #f4f2e8;
}
.v-expansion-panel-content__wrap {
  background: #f4f2e8;
}
.row-width {
  justify-content: center;
  min-width: 200px;
  max-width: 1000px;
  color: #657b6c;
}
</style>
