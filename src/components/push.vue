<template>
  <v-container>
    <v-row class=" FormPadding">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                產品編號
              </th>
              <th class="text-left">
                圖片
              </th>
              <th class="text-left">
                商品類別
              </th>
              <th class="text-left">
                商品名稱
              </th>
              <th class="text-left">
                價錢
              </th>
              <th class="text-left">
                庫存數量
              </th>
              <th class="text-left">
                說明
              </th>
              <th class="text-left">
                備註
              </th>
              <th class="text-left">
                <v-dialog v-model="dialog" max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      商品增加
                    </v-btn>
                  </template>
                  <v-form @submit.prevent="onSubmit" @reset="onReset">
                    <v-card>
                      <v-card-title>
                        <span class="headline">圖片上傳</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="商品名稱" required v-model="name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="價格" required v-model="price"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-autocomplete :items="['10', '20', '30', '40', '50', '100']" label="庫存數量" v-model="amount"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field label="備註" required v-model="remarks"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field label="商品編號" required v-model="number"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-file-input multiple v-model="image" accept="image/*" label="圖片上傳"></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-autocomplete
                                :items="['自動鉛筆', '鉛筆', '塑膠筆', '多用筆', '沾水筆', '文具', '色鉛筆', '原子筆', '鋼筆', '鋼珠筆', '獨特類','水晶筆','漂浮筆']"
                                label="種類"
                                v-model="sort"
                              ></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea label="商品說明" auto-grow rows="3" row-height="25" :state="descState" v-model="description" shaped></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" type="reset">
                          清除
                        </v-btn>
                        <v-btn type="submit">
                          送出
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-form>
                </v-dialog>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(image, idx) in images" :key="image._id">
              <td>
                <v-text-field v-if="image.edit" v-model="image.modelNumber"></v-text-field>
                <p v-else>{{ image.number }}</p>
              </td>
              <td><v-img height="50px" width="50px" :src="image.files[0]" v-pswp="image"></v-img></td>
              <td>
                <v-text-field v-if="image.edit" v-model="image.modelSort"></v-text-field>
                <p v-else>{{ image.sort }}</p>
              </td>
              <td>
                <v-text-field v-if="image.edit" v-model="image.modelName"></v-text-field>
                <p v-else>{{ image.name }}</p>
              </td>
              <td>
                <v-text-field v-if="image.edit" v-model="image.modelPrice"></v-text-field>
                <p v-else>{{ image.price }}</p>
              </td>
              <td>
                <v-text-field v-if="image.edit" v-model="image.modelAmount"></v-text-field>
                <p v-else>{{ image.amount }}</p>
              </td>
              <td>
                <v-textarea v-if="image.edit" v-model="image.modelDescription" counter label="Text" :rules="rules" :value="value"></v-textarea>
                <p v-else>{{ image.description }}</p>
              </td>
              <td>
                <v-text-field v-if="image.edit" v-model="image.modelRemarks"></v-text-field>
                <p v-else>{{ image.remarks }}</p>
              </td>
              <td>
                <v-btn color="orange" v-if="image.edit" @click="cancel(image)"> 取消 </v-btn>
                <v-btn v-if="image.edit" @click="save(image)">保存</v-btn>
                <v-btn v-if="!image.edit" @click="edit(image)">編輯</v-btn>
                <v-btn v-if="!image.edit" @click="del(image, idx)">刪除</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-container>
</template>
<script>
// import Back from '../components/Back.vue'
export default {
  name: 'Album',
  data() {
    return {
      image: null,
      name: '',
      price: '',
      remarks: '',
      amount: '',
      description: '',
      number: '',
      sort: '',
      images: [],
      rules: [v => v.length <= 500 || 'Max 500 characters'],
      value: 'Hello!'
    }
  },
  computed: {
    descState() {
      if (this.description.length === 0) {
        return null
      } else if (this.description.length > 200) {
        return false
      } else {
        return true
      }
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    onSubmit() {
      this.image.forEach(element => {
        if (element.size > 1024 * 1024) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '圖片太大'
          })
        }
        if (!element.type.includes('image')) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '檔案格式錯誤'
          })
        }
      })
      const fd = new FormData()
      for (const image of this.image) {
        fd.append('image', image)
      }

      fd.append('price', this.price)
      fd.append('name', this.name)
      fd.append('remarks', this.remarks)
      fd.append('amount', this.amount)
      fd.append('description', this.description)
      fd.append('number', this.number)
      fd.append('sort', this.sort)
      console.log(this.price)

      this.axios
        .post(process.env.VUE_APP_API + '/albums/', fd)
        .then(res => {
          if (res.data.success) {
            // 將新增的圖片塞進相簿陣列
            res.data.result.src = process.env.VUE_APP_API + '/albums/file/' + res.data.result.files
            res.data.result.edit = false
            // 老師ㄉ偶不敢刪
            // res.data.result.title = res.data.result.description
            // res.data.result.model = res.data.result.description
            // 有加model是指原本的名稱
            // 商品名稱
            res.data.result.modelName = res.data.result.name
            // 價格
            res.data.result.modelPrice = res.data.result.price
            // 備註
            res.data.result.modelRemarks = res.data.result.remarks
            // 數量
            res.data.result.modelAmount = res.data.result.amount
            // 說明
            res.data.result.modelDescription = res.data.result.description
            // 產品編號
            res.data.result.modelNumber = res.data.result.number
            // 產品類別
            res.data.result.modelSort = res.data.result.sort
            delete res.data.result.files
            delete res.data.result.description
            this.images.push(res.data.result)
            // 送出後清空表單
            this.image = null
            this.description = ''
            this.name = ''
            this.price = ''
            this.remarks = ''
            this.amount = ''
            this.number = ''
            this.sort = ''
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    cancel(image) {
      image.edit = false
      image.modelName = image.name
      image.modelprice = image.price
      image.modelremarks = image.remarks
      image.modelAmount = image.amount
      image.modelDescription = image.description
      image.modelNumber = image.number
      image.modelSort = image.sort
    },
    save(image) {
      this.axios
        .patch(process.env.VUE_APP_API + '/albums/' + image._id, {
          description: image.modelDescription,
          name: image.modelName,
          price: image.modelPrice,
          remarks: image.modelRemarks,
          amount: image.modelAmount,
          number: image.modelNumber,
          sort: image.modelSort
        })
        .then(res => {
          if (res.data.success) {
            image.edit = false
            image.name = image.modelName
            image.price = image.modelprice
            image.remarks = image.modelremarks
            image.amount = image.modelAmount
            image.description = image.modelDescription
            image.number = image.modelNumber
            image.sort = image.modelSort
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    edit(image) {
      image.edit = true
      // image.model = image.title
      image.modelName = image.name
      image.modelprice = image.price
      image.modelremarks = image.remarks
      image.modelAmount = image.amount
      image.modelDescription = image.description
      image.modelNumber = image.number
      image.modelSort = image.sort
    },
    del(image, idx) {
      this.axios
        .delete(process.env.VUE_APP_API + '/albums/' + image._id)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.images.splice(idx, 1)
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    onReset() {
      this.description = ''
      this.name = ''
      this.price = ''
      this.remarks = ''
      this.amount = ''
      this.number = ''
      this.sort = ''
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/albums')
      .then(res => {
        if (res.data.success) {
          this.images = res.data.result.map(image => {
            image.file = process.env.VUE_APP_API + '/albums/file/' + image.file
            image.files = image.files.map(file => {
              return process.env.VUE_APP_API + '/albums/file/' + file.file
            })
            // image.title = image.description
            image.edit = false
            // image.model = image.description
            // delete image.files
            // delete image.description
            return image
          })
          console.log(this.images)
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
      .catch(err => {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: err.response.data.message
        })
      })
  }
}
</script>

<style>
.width {
  height: 450px;
  width: 500px;
  background: bisque;
  padding: 50px;
}
</style>
