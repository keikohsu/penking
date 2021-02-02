<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            圖片
          </th>
          <th class="text-left">
            商品名稱
          </th>
          <th class="text-left">
            數量
          </th>
          <th class="text-left">
            價格
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="baskets in basket"
          :key="baskets.name"
        >
        <td><v-img
        :src="baskets.image"
        height="60px"
        width="60px"
        >
          </v-img></td>
          <td>{{ baskets.name }}</td>
          <td>{{ baskets.quantity }}</td>
          <td>{{ baskets.price }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>總共</td>
          <td>{{ total }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: 'ckeck',
  data () {
    return {
      e1: 1,
      name: '',
      price: '',
      description: '',
      quantity: 1
    }
  },
  computed: {
    basket () {
      return this.$store.getters.getBasketItems
    },
    total () {
      return this.$store.getters.total
    }
  }
}
</script>
