<template>
  <div id="app">
    <div id="top">
      <div><img src="./assets/email.png"></div>
      <div>自选</div>
      <div><img src="./assets/search.png"></div>
    </div>
    <div id="connection_error"><a class="check" href="#">检查设置</a> <span><img
      src="./assets/error.png">网络连接中断，请检查后重试</span></div>
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
    <table>
      <tr class="header">
        <th class="float-left">
          <button type="button">取消排序</button>
        </th>
        <th class="clickable" @click="sortByPrice()">最新价 <span v-if="sortPrice">↑</span><span v-else>↓</span></th>
        <th>涨跌幅 ↓</th>
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
    <table id="bottom">
      <tr>
        <td>标普500</td>
        <td class="up">2467.70</td>
        <td class="up">+116.60</td>
        <td class="up">+4.96% ⌃</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Hello from './components/Hello'

  export default {
    name: 'app',
    data () {
      return {
        sortPrice: false,
        stocks: [
          {stockName: '上证指数', subTitle: 'SH000001', price: 2483.09, percent: -0.0061},
          {
            stockName: '标普500ETF-SPDR',
            subTitle: 'SPY',
            blueMark: 'US',
            price: 246.18,
            pre: 242.56,
            percent: 0.0505,
            percentDetail1: '-1.47%',
            percentDetail2: '盘前'
          },
          {stockName: '小米集团-W', subTitle: '01810', pinkMark: 'HK', price: 12.92, percent: -0.0182}
        ]
      }
    },
    methods: {
      sortByPrice () {
        this.sortPrice = !this.sortPrice
        this.stocks.sort((a, b) => {
          if (this.sortPrice) {
            return a.price - b.price
          } else {
            return b.price - a.price
          }
        })
      }
    },
    components: {
      Hello
    }
  }
</script>

<style>
  #app {
    height: 100%;
    background: black;
    color: #babdc2;
    min-width: 320px;
    max-width: 450px;
    width: 100%;
  }

  .float-left {
    float: left;
  }

  #top {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    background: #171a23;
  }

  #top img {
    background: white;
    height: 18px;
    margin-top: 3px;
  }

  #connection_error {
    background: #4f181e;
    color: gray;
    font-size: 12px;
    padding: 8px 16px;
  }

  #connection_error a.check {
    text-decoration: none;
    float: right;
  }

  #connection_error img {
    width: 14px;
    margin-right: 8px;
    background: red;
  }

  #nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 12px 0;
    background: #171a23;
  }

  #nav li {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    padding-bottom: 8px;
  }

  #nav li.active {
    color: blue;
    border-bottom: 2px solid blue;
  }

  #nav img {
    height: 14px;
    background: white;
  }

  .header button {
    background: #1a2333;
    border: none;
    color: #266bb7;
    padding: 4px;
  }

  table {
    background: #171a23;
    margin-top: 12px;
    width: 100%;
    font-size: 14px;
    padding: 12px 0 12px 12px;
  }

  th {
    padding: 8px 0;
    font-size: 12px;
  }

  td {
    text-align: center;
  }

  td:first-child {
    text-align: left;
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
    position: fixed;
    bottom: 0;
    padding: 5px;
    width: calc(100% - 63px);
  }

  .clickable {
    cursor: pointer;
  }
</style>
