<template>
  <div id="app">
    <div id="top">
      <div><img class="email" src="./assets/email.png"></div>
      <div>自选</div>
      <div><img class="search" src="./assets/search.png"></div>
    </div>
    <div id="connection_error">
      <a class="check" href="#">检查设置</a>
      <div class="info">
        <img src="./assets/error.png"> 网络连接中断，请检查后重试
      </div>
    </div>
    <!--<div v-if="global.connectionError" id="connection_error"><a class="check" href="#">检查设置</a> <span><img-->
      <!--src="./assets/error.png">网络连接中断，请检查后重试</span></div>-->
    <ul id="nav">
      <li>全部</li>
      <li>沪深</li>
      <li>港股</li>
      <li>美股</li>
      <li class="active">观察</li>
      <li>
        <img src="./assets/sort.png">
      </li>
    </ul>
    <div id="loading" v-if="stocks.length == 0">
      数据加载中...
    </div>
    <table v-else>
      <tr class="header">
        <th>
          <button type="button" @click="cancelSort()">取消排序</button>
        </th>
        <th class="clickable" @click="sort('price')">
          <div>最新价 <img src="./assets/sort1.png" alt=""></div>
          <!--<span v-if="price">↑</span><span v-else>↓</span>-->
        </th>
        <th class="clickable" @click="sort('percent')">
          <div>
            涨跌幅
            <img src="./assets/sort2.png" alt="">
            <img class="mode" src="./assets/mode.png" alt="">
          </div>
           <!--<span v-if="percent">↑</span><span v-else>↓</span>-->
        </th>
      </tr>
      <tr v-for="s in stocks">
        <td>{{s.stockName}}
          <span v-if="s.subTitle" class="subtitle">
            <span v-if="s.pinkMark" class="pink-mark">{{s.pinkMark}}</span>
            <span v-if="s.blueMark" class="blue-mark">{{s.blueMark}}</span>
            {{s.subTitle}}
          </span>
        </td>
        <td :class="{up: s.percent > 0, down: s.percent < 0}">
          {{s.price}}
          <span v-if="s.pre" class="subtitle">{{s.pre}}</span>
        </td>
        <td>
          <button type="button" :class="{'up-button': s.percent > 0, 'down-button': s.percent < 0}" class="">
            {{parseFloat((s.percent * 100).toPrecision(12))+"%"}}
          </button>
          <span v-if="s.percentDetail1" class="subtitle">{{s.percentDetail1}} <span class="pre">{{s.percentDetail2}}</span></span>
        </td>
      </tr>
    </table>
    <div id="bottom">
      <div>标普500</div>
      <div class="up">2467.70</div>
      <div class="up">+116.60</div>
      <div class="up">+4.96% <span class="white">⌃</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        global: window.global,
        price: false, // 按价格排序的升降标志
        percent: false, // 按涨跌幅排序的升降标志
        stocks: [],
        previousRequest: null
      }
    },
    mounted () {
      setTimeout(this.fetchData, 3000) // TODO 故意延迟了3秒，不然看不到: 数据加载中...
      setInterval(this.fetchData, 10 * 1000) // 10s 取一次数据
    },
    methods: {
      fetchData () {
        this.$http.get('./static/data.json', {
          before (request) {
            // https://github.com/pagekit/vue-resource/blob/master/docs/recipes.md#abort-a-request
            if (this.previousRequest) {
              this.previousRequest.abort()
            }
            this.previousRequest = request
          }
        }).then((res) => {
          this.stocks = res.data
        })
      },
      cancelSort () {
        this.stocks.sort((a, b) => {
          return a.order - b.order
        })
      },
      sort (field) {
        this[field] = !this[field]
        this.stocks.sort((a, b) => {
          if (this[field]) {
            return a[field] - b[field]
          } else {
            return b[field] - a[field]
          }
        })
      }
    }
  }
</script>

<style>
  #app {
    height: 100%;
    background: #0d1015;
    color: #a2a5ab;
    min-width: 320px;
    max-width: 450px;
    width: 100%;
    position: relative;
  }

  .float-left {
    float: left;
  }

  #top {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    padding: 10px;
    background: #171a23;
  }

  #top img {
    background: white;
    height: 20px;
    margin-top: 5px;
  }

  #top img.email{
    margin-left: 9px;
  }

  #top img.search{
    margin-right: 9px;
  }

  #connection_error {
    background: #4f181e;
    color: gray;
    font-size: 14px;
    padding: 8px 16px;
  }

  #connection_error a.check {
    text-decoration: none;
    float: right;
    color: #425171;
  }

  #connection_error .info {
    display: flex;
    align-items: center;
  }

  #connection_error img {
    width: 18px;
    margin-right: 10px;
  }

  #nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 12px 0 0;
    background: #171a23;
  }

  #nav li {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 17px;
    padding-bottom: 8px;
  }

  #nav li.active {
    color: #2474d6;
    border-bottom: 2px solid #2474d6;
  }

  #nav img {
    height: 17px;
  }

  .header button {
    background: #1a2333;
    border: none;
    color: #266bb7;
    padding: 4px 6px;
    font-size: 14px;
    border-radius: 2px;
  }

  table {
    background: #171a23;
    margin-top: 9px;
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
  }

  th,td{
    text-align: right;
    height: 35px;
    box-sizing: border-box;
  }

  th {
    padding: 12px 0;
    border-bottom: 1px solid #0b0e16;
  }

  th .sort{
    height: 15px;
  }

  td {
    font-size: 17px;
    padding-bottom: 12px;
    color: #c1c5c4;
    border-bottom: 1px solid #0c0f17;
  }

  td:first-child,th:first-child {
    text-align: left;
    padding-left: 18px;
  }

  td:last-child,th:last-child {
    padding-right: 18px;
  }

  td span.subtitle {
    display: block;
    font-size: 12px;
    color: rgba(128, 128, 128, 0.61);
  }

  .down {
    color: green;
  }

  .down-button {
    background: green;
    color: white;
    border: none;
    padding: 8px;
    width: 70px;
    text-align: right;
  }

  .up {
    color: red;
  }

  .up-button {
    background: red;
    color: white;
    border: none;
    padding: 8px;
    width: 70px;
    text-align: right;
  }

  .blue-mark {
    background: blue;
    color: black;
  }

  .pink-mark {
    background: #9f3bc4;
    color: black;
  }

  .pre {
    background: #80808052;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.42);
    padding: 2px 4px;
  }

  #bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 9px 0;
    font-size: 14px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    background: #171a23;
  }

  .clickable {
    cursor: pointer;
  }

  .clickable div{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .clickable div img{
    height: 15px;
    margin-left: 3px;
  }

 .clickable div img.mode{
    height: 18px;
    margin-left: 8px;
  }

  .white {
    color: white
  }

  #loading{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }

</style>
