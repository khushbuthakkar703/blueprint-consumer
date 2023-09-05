<template>
  <div class="full-width order-history-page">
    <label class="order-history-heading">
      <!-- <img src="../../assets/review-blue.svg" class="lt-md review-icon" /> -->
      Order history</label
    >
    <div
      class="full-width table-data"
      v-if="orderHistory.length > 0 && !isLoading"
    >
      <q-markup-table
        flat
        bordered
        class="full-width order-history-table gt-xs"
        style="background: #FFFFFF !important; width: 100% !important;"
      >
        <thead class="" style="background: #F9FAFB !important">
          <tr>
            <th class="text-left">
              <div class="">Order</div>
            </th>
            <th class="text-left">
              <div class="">Amount</div>
            </th>
            <th class="text-left">
              <div class="">Date</div>
            </th>
            <th class="text-left">
              <div class="">Status</div>
            </th>
            <th class="text-left">
              <div class="lt-md">Download</div>
            </th>
          </tr>
        </thead>
        <tbody class="full-width" style="background: #F9FAFB !important;">
          <tr v-for="order in orderHistory" :key="order.id">
            <td class="text-left order-text" style="width:30% !important">
              {{ `Order #${order.id.slice(0, 7)}` }}
            </td>
            <td class="text-left amount-date-text">
              {{ `USD $${order.attributes.amount}` }}
            </td>
            <td class="text-left text-capitalize amount-date-text">
              {{ getDate(order.attributes.created) }}
            </td>
            <td class="text-left text-capitalize">
              <label
                class="status-text"
                v-if="order.attributes.status == 'paid'"
              >
                <q-img
                  src="../../assets/check.svg"
                  width="12px"
                  height="12px"
                  style="margin-right: 4px !important"
                />
                {{ order.attributes.status }}
              </label>
              <label
                class="status-text bg-red-1"
                style="color: #B63C16 !important"
                v-else
              >
                <q-icon name="close" color="red" class="q-mr-xs" />
                Failed</label
              >
            </td>
            <td class="text-left text-capitalize">
              <div
                :style="
                  `
                      width:20px !important;height:20px !important;
                      background-image:url(${downloadIcon})
                      background-size: 100%;
                      background-repeat: no-repeat;
                      `
                "
                @click="downloadInvoice(order.id)"
                v-if="order.attributes.status == 'paid'"
                class="cursor-pointer gt-sm"
              ></div>
              <div
                :style="
                  `
                      width:20px !important;height:20px !important;
                      background-image:url(${downloadIcon})
                      background-size: 100%;
                      background-repeat: no-repeat;
                      position: relative;
                      margin-left:20px
                      `
                "
                @click="downloadInvoice(order.id)"
                v-if="order.attributes.status == 'paid'"
                class="cursor-pointer lt-md"
              ></div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <!-- ********************* for mobile ********************* -->
      <q-markup-table
        flat
        bordered
        class="full-width order-history-table lt-sm"
        style="background: #FFFFFF !important; width: 100% !important;letter-spacing: 0.075px"
      >
        <thead class="" style="background: #F9FAFB !important">
          <tr>
            <th class="text-left">
              <div class="">Invoice</div>
            </th>
            <th class="text-left">
              <div class="">Amount</div>
            </th>
            <th class="text-left">
              <div class="">Status</div>
            </th>
            <th class="text-left">
              <div class="">Download</div>
            </th>
          </tr>
        </thead>
        <tbody class="full-width" style="background: #F9FAFB !important;">
          <tr v-for="order in orderHistory" :key="order.id">
            <td class="text-left " style="width:30% !important">
              <div class="">
                <label class="order-text flex">
                  {{ `#${order.id.slice(0, 7)}` }}
                </label>
                <label class="text-capitalize amount-date-text flex">
                  {{ getDate(order.attributes.created) }}
                </label>
              </div>
            </td>
            <td class="text-left amount-date-text">
              {{ `$${order.attributes.amount}` }}
            </td>
            <td class="text-left text-capitalize">
              <label
                class="status-text"
                v-if="order.attributes.status == 'paid'"
              >
                <q-img
                  src="../../assets/check.svg"
                  width="12px"
                  height="12px"
                  style="margin-right: 4px !important"
                />
                {{ order.attributes.status }}
              </label>
              <label
                class="status-text bg-red-1"
                style="color: #B63C16 !important"
                v-else
                ><q-icon name="close" color="red" class="q-mr-xs" />
                Failed</label
              >
            </td>
            <td class="text-left text-capitalize">
              <div
                :style="
                  `
                      width:20px !important;height:20px !important;
                      background-image:url(${downloadIcon})
                      background-size: 100%;
                      background-repeat: no-repeat;
                      top: 5px;
                      position: relative;
                      margin-left:20px
                      `
                "
                @click="downloadInvoice(order.id)"
                v-if="order.attributes.status == 'paid'"
                class="cursor-pointer"
              ></div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="flex flex-center full-width">
        <q-btn
          v-if="
            orderHistory.length < orderHistoryCount &&
              !isLoading &&
              !showSpinner
          "
          color="primary"
          class="text-body1 see-more-btn"
          no-caps
          label="See more"
          @click="loadMore"
          style="margin-top: 40px !important"
        />
        <q-spinner-ios
          v-if="showSpinner"
          class="items-center"
          color="primary"
          size="50px"
          style="margin-top: 40px !important"
        />
      </div>
    </div>
    <q-markup-table
      v-if="isLoading"
      flat
      bordered
      class="full-width order-history-table"
      style="background: #FFFFFF !important; width: 100% !important; margin-top: 30px !important"
    >
      <thead class="" style="background: #F9FAFB !important">
        <tr>
          <th class="text-left">
            <div class="gt-xs">Order</div>
            <div class="lt-sm">Invoice</div>
          </th>
          <th class="text-left">
            <div class="">Amount</div>
          </th>
          <th class="text-left gt-xs">
            <div class="">Date</div>
          </th>
          <th class="text-left">
            <div class="">Status</div>
          </th>
          <th class="text-right">
            <div class="lt-md">Download</div>
          </th>
        </tr>
      </thead>
      <tbody class="full-width" style="background: #F9FAFB !important;">
        <tr v-for="i in 8" :key="i" class="full-width">
          <td class="text-left" style="width:45% !important">
            <q-skeleton type="text"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td class="text-left " style="width:15% !important">
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td
            class="text-left text-capitalize gt-xs"
            style="width:15% !important"
          >
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td class="text-left text-capitalize" style="width:15% !important">
            <q-skeleton type="text" width="100px" class="gt-xs"></q-skeleton>
            <q-skeleton type="text" class="lt-sm"></q-skeleton>
          </td>
          <td class="text-left text-capitalize">
            <q-btn flat style="margin: 0px 4px !important;">
              <q-skeleton type="text" width="40px"></q-skeleton>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div
      v-if="orderHistory.length === 0 && !isLoading"
      class="flex flex-center full-width q-py-xl q-px-md"
      style=""
    >
      <NoDataMessageDisplay
        style="margin: auto !important; color: black !important"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import NoDataMessageDisplay from './NoDataMessageDisplay.vue'
import axios from 'axios'
export default {
  name: 'OrderHistory',
  components: { NoDataMessageDisplay },
  data() {
    return {
      orderHistoryList: [],
      isLoading: false,
      downloadIcon: require('../../assets/download-invoice.svg'),
      pageNo: 0,
      showSpinner: false
    }
  },
  methods: {
    ...mapActions(['getOrderHistory', 'getProductInvoice']),
    getDate(date) {
      return moment(date).format('ll')
    },
    async downloadInvoice(productID) {
      const { data } = await this.getProductInvoice(productID)
      axios({
        url: `${data.attributes.message}`,
        method: 'GET',
        responseType: 'arraybuffer'
      }).then(response => {
        var fileURL = window.URL.createObjectURL(
          new Blob([response.data], { type: 'purchase' })
        )
        var fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', `invoice.pdf`)
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    },
    async loadMore() {
      this.showSpinner = true
      await this.getOrderHistory({
        offset: this.orderHistory.length,
        limit: 10,
        type: 'loadMore'
      })
      this.showSpinner = false
    }
  },
  async created() {
    this.isLoading = true
    await this.getOrderHistory({ offset: 0, limit: 10, type: 'get' })
    this.isLoading = false
  },
  computed: {
    ...mapGetters(['orderHistory', 'orderHistoryCount'])
  }
}
</script>

<style lang="scss" scoped>
.order-history-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #152141;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding: 30px 15px 0px !important;
    color: #000000 !important;
  }
}
.order-history-table {
  background: #ffffff !important;
  border: 1px solid #e4e7ec !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06) !important;
  border-radius: 8px !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    box-shadow: none !important;
    border-radius: 0px !important;
  }
}
.status-text {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 8px !important;
  background: #ecfdf3;
  border-radius: 16px;
  font-family: Poppins !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 18px !important;
  text-align: center;
  color: #027a48;
  max-width: fit-content;
}
.q-table td {
  padding: 16px 10px !important;
  background-color: #ffffff !important;
  border-color: #e4e7ec !important;
}
.q-table th {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #667085;
  background: #f9fafb;
  padding: 12px 10px !important;
  border-color: #e4e7ec !important;
}
.amount-date-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
}
.order-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #101828;
}
.order-history-page {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0px 0px 40px !important;
  }
}
.table-data {
  margin-top: 20px !important;
  @media only screen and (min-width: $breakpoint-sm-max) {
    max-height: 60vh !important;
    overflow-y: auto !important;
    padding-right: 10px !important;
    margin-top: 30px !important;
    // padding-bottom: 10px !important;
  }
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 2px;
}
.q-table td {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-left: 15px !important;
    word-break: break-word !important;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}
.q-table th {
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-left: 15px !important;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}
.q-table tr {
  @media only screen and (max-width: $breakpoint-xs-max) {
    vertical-align: initial !important;
  }
}
.see-more-btn {
  width: 220px;
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
  // margin-top: 20px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-weight: normal;
  }
}
</style>
