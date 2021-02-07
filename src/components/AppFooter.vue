<template>
  <v-footer color="#657b6c" padless>
    <v-col cols="12" class="white--text pt-0">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <p class="position-title footer-color-text">服務</p>
            <router-link to="/product/all" class="navnoline">
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-pencil-outline</v-icon>產品</p>
            </router-link>
            <router-link to="/DescriptionBuy" class="navnoline">
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-tray-full</v-icon> 印刷</p>
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-gift-outline</v-icon>禮品包裝</p>
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-truck-outline</v-icon>運送與送貨</p>
            </router-link>
          </v-col>
          <v-col cols="6" sm="3">
            <p class="position-title footer-color-text">支援</p>
            <router-link to="/Connection" class="navnoline">
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-account</v-icon>聯絡我們</p>
            </router-link>
            <router-link to="/DescriptionBuy" class="navnoline">
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-help-circle-outline</v-icon>相關問題</p>
            </router-link>
            <router-link to="/Connection" class="navnoline">
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-message-processing-outline</v-icon>商品回饋</p>
            </router-link>
          </v-col>
          <v-col cols="6" sm="4">
            <p class="position-title footer-color-text">關於筆王</p>
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-map-marker</v-icon>新北市新店區郵政10030號信箱</p>
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-cellphone</v-icon>+886-932200350</p>
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-phone</v-icon>+886-2-2918-4618</p>
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-printer</v-icon>Fax: +886-2-2914-2822</p>
            <p class="position footer-color-text"><v-icon class="position-icons" color="#f7f3e1">mdi-email</v-icon>penking@penking.com.tw</p>
            <!-- Fax: +886-2-2914-2822 -->
          </v-col>
          <v-col cols="6" sm="2" class="">
            <p class="footer-color-text">信箱與社群</p>
            <v-card-text>
              <a class="navnoline " href="mailto:penking@penking.com.tw">
                <v-btn color="#f7f3e1" class="mx-4 white--text" icon>
                  <v-icon size="24px">
                    mdi-email
                  </v-icon>
                </v-btn>
              </a>
              <a class="navnoline" href="https://www.facebook.com/%E7%AD%86%E7%8E%8B-102899565151073/?ref=page_internal">
                <v-btn icon color="#f7f3e1"> <v-icon>mdi-facebook</v-icon> </v-btn>
              </a>
              <a class="navnoline" href="https://line.me/ti/p/CM1uefzuxM">
              <v-btn icon color="#f7f3e1"><v-icon>mdi-chat-processing-outline</v-icon></v-btn>
              </a>
            </v-card-text>
            </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text class="white--text text footer-color-bottom">
        {{ new Date().getFullYear() }} — <strong class="text-center">筆王工業有限公司 新奇國際有限公司</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style>
.position {
  padding-bottom: 15px;
}
.position-title {
  padding-left: 5px;
  padding-bottom: 30px;
}
.position-icons {
  padding-right: 10px;
}
.padding-none {
  padding: 0;
}
.v-card__text.text {
  text-align: center;
}
.footer-color-text{
  color:#F4F2E8  !important;
}
.footer-color-bottom{
background:#BACEC1 ;
}
</style>
