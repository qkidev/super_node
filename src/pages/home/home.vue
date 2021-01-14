<template>
  <div class="container">
    <div class="head flex_v_center">
      <div style="align-self: flex-end; margin-top: 5px; margin-bottom: 5px">
        <div class="rule_bg flex_h_center_center normalInverseBoldTxt">规则</div>
      </div>
      <img :src="require('../../assets/logo1.png')" alt="" class="logo1" />
      <img :src="require('../../assets/logo2.png')" alt="" class="logo2" />
      <div class="pool_bg flex_h_center_center mt_50 hugestInverseBoldTxt" @click="togglePoolShow = true">{{currPool}}U</div>
      <div class="flex_h mt_15">
        <img :src="require('../../assets/toggle.png')" alt="" class="toggle_icon"/>
        <span class="smallestInverseTxt" style="opacity: 0.4">点击星球切换星球池</span>
      </div>
      <div class="smallInverseTxt mt_50">当前合约地址内余额</div>
      <div class="biggestInverseThinTxt mt_20">{{totalSupply}}</div>
      <div class="smallInverseThinTxt mt_20">QKI</div>
    </div>
    <div class="hy">
      <div class="space-between">
        <div class="smallestInverseTxt ellipsis">{{ contractAddress }}</div>
        <img src="../../assets/copy.png" class="copy" @click="h5Copy(contractAddress)" mode />
      </div>
    </div>
    <!-- <div class="hr_v"></div> -->
    <div class="flex_h_center">
      <div class="flex_v_center_center flex1">
        <div class="smallInverseTxt">凭证数量</div>
        <div class="biggestInverseThinTxt mt_50">{{balance}}</div>
      </div>
      <div class="hr_h"></div>
       <div class="flex_v_center flex1">
        <div class="smallInverseTxt">存入数量(QKI)</div>
        <div class="biggestInverseThinTxt mt_50">{{storeAmount}}</div>
      </div>
    </div>
    <div class="hr_v"></div>
    <div class="flex_h">
      <div class="smallInverseTxt flex1">当前QKI价格</div>
      <div class="flex1">
        <span class="biggerInverseThinTxt">{{price}} </span>
        <span class="smallerInverseThinTxt">USDT</span>
      </div>
    </div>
    <div class="fixed_bottom_placeholder"></div>
    <div class="fixed_bottom flex_v" v-if="true">
     <div class="flex_h_between">
       <div class="withdraw_btn flex_h_center_center smallerInverseTxt" @click="withDrawShow = true">立即提现</div>
       <div class="store_btn flex_h_center_center smallerInverseTxt" @click="storeShow = true">立即存入</div>
     </div>
     <div class="flex_h_between mt_65">
       <span class="smallestMainInverseThinTxt">* 当价格到达{{withdrawPrice}} USDT可进行提现</span>
       <div class="flex_h_center" @click="upgredeShow = true">
         <img :src="require('../../assets/upgrade.png')" alt="" class="upgrade_btn">
         <span class="smallestInverseTxt">升级到10U星球池</span>
       </div>
     </div>
    </div>
    <div class="fixed_bottom flex_v" v-else>
     <div class="flex_h_center_center">
       <div class="store_btn flex_h_center_center smallerInverseTxt" @click="startPoolShow=true">开启你的星球池</div>
     </div>
    </div>

    <!-- 提现 -->
    <div class="bg" v-show="withDrawShow">
      <div class="flex-box">
        <div class="box flex_v_center">
          <img src="../../assets/withdraw_model_head.png" class="withdraw_model_bg" mode />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">提现数量</div>
          </div>
          <div class="input-box space-between">
            <input type="text" class="input" value placeholder="请输入你存入数量" v-model="amount" />
            <div class="align-center">
              <!-- <div class="text2">burn</div> -->
              <div class="line"></div>
              <div class="smallestBlackTxt">QKI</div>
            </div>
          </div>
          <div class="submit_btn flex_h_center_center middleInverseTxt" @click="withDraw">
            确定提现
          </div>
          <div class="smallGrey2Txt" @click="withDrawShow = false">取消切换</div>
        </div>
      </div>
    </div>
    <!-- 升级 -->
    <div class="bg" v-show="upgredeShow">
      <div class="flex-box">
        <div class="box flex_v_center">
          <img src="../../assets/pool_bg.png" class="pool_model_bg" mode />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">升级10U星际池</div>
          </div>
          <div class="input-box space-between">
            <input type="text" class="input" value placeholder="请输入你的凭证数量" v-model="amount" />
            <div class="align-center">
              <div class="line"></div>
              <div class="smallestBlackTxt" @click="inputAll">全部</div>
            </div>
          </div>
          <div class="submit_btn flex_h_center_center middleInverseTxt" @click="upgrade">
            确定升级
          </div>
          <div class="smallGrey2Txt" @click="upgredeShow = false">取消升级</div>
        </div>
      </div>
    </div>
    <!-- 存入 -->
    <div class="bg" v-show="storeShow">
      <div class="flex-box">
        <div class="box flex_v_center">
          <img src="../../assets/rocket.png" class="rocket_bg" mode />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">存入数量</div>
          </div>
          <div class="input-box space-between">
            <input type="text" class="input" value placeholder="请输入你的存入数量" v-model="amount" />
            <div class="align-center">
              <div class="line"></div>
              <div class="smallestBlackTxt">QKI</div>
            </div>
          </div>
          <div class="submit_btn flex_h_center_center middleInverseTxt" @click="store">
            确定存入
          </div>
          <div class="smallGrey2Txt" @click="storeShow = false">取消存入</div>
        </div>
      </div>
    </div>
    <!-- 切换星球 -->
    <div class="bg" v-show="togglePoolShow">
      <div class="flex-box">
        <div class="box1 flex_v_center">
          <img src="../../assets/pool_bg.png" class="pool_model_bg" mode />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">选择星球池</div>
          </div>
          <div class="pool_list flex_h_between mt_65" style="flex-wrap: wrap; width: 100%">
            <div :class="['pool_item', 'flex_h_center_center', currPool === item.amount ? 'currItem' : '']" v-for="(item, index) in poolList" :key="index">
              {{item.amount}}U 星球池
              <img :src="require('../../assets/cuttItem.png')" alt="" class="img" v-show="currPool === item.amount">
            </div>
          </div>
          <div class="submit_btn flex_h_center_center middleInverseTxt" @click="togglePool">
            确定切换
          </div>
          <div class="smallGrey2Txt" @click="togglePoolShow = false">取消切换</div>
        </div>
      </div>
    </div>
    <!-- 开启星球 -->
    <div class="bg" v-show="startPoolShow">
      <div class="flex-box">
        <div class="box1 flex_v_center">
          <img src="../../assets/pool_bg.png" class="pool_model_bg" mode />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">选择星球池</div>
          </div>
          <div class="pool_list flex_h_between mt_65" style="flex-wrap: wrap; width: 100%">
            <div :class="['pool_item', 'flex_h_center_center', currPool === item.amount ? 'currItem' : '']" v-for="(item, index) in poolList" :key="index">
              {{item.amount}}U 星球池
              <img :src="require('../../assets/cuttItem.png')" alt="" class="img" v-show="currPool === item.amount">
            </div>
          </div>
          <div class="input-box space-between" style="margin-top: 0">
            <input type="text" class="input" value placeholder="请输入你的存入数量" v-model="amount" />
            <div class="align-center">
              <div class="line"></div>
              <div class="smallestBlackTxt">QKI</div>
            </div>
          </div>
          <div class="submit_btn flex_h_center_center middleInverseTxt" @click="start">
            确定开启
          </div>
          <div class="smallGrey2Txt" @click="startPoolShow = false">取消开启</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import h5Copy from '../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
import { h5Copy, initEth, timeUtils, vertify } from "@/utils/utils";
import { ethers } from "ethers";
import { abi } from "./abi";
import { Toast } from "vant";
export default {
  data() {
    return {
      contractAddress: "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3", // 合约地址
      contract: null, // 当前的合约对象
      myAddress: "", // 我的地址
      balance: "0.00", // 当前星球的凭证数量
      amount: '',
      storeAmount: '0.00',
      totalSupply: "0.00", // 全网通证总量
      
      power: "0", // 我的算力
      level: 1,
      withDrawShow: false,
      bgShow: false,
      upgredeShow: false,
      storeShow: false,
      togglePoolShow: false,
      startPoolShow: false,
      type: 1,
      epoch: 86400, // 挖矿周期
      inviteCount: "0", // 邀请的人数
      // receiveTimestamp: 0, // 上次领取奖励的时间戳
      receiveTime: "", // 上次领取奖励的时间
      inviteAddress: "", // 已绑定邀请人地址
      inviteAddressInput: "", // 输入邀请人的地址
      rewardCount: 0, // 获取累计收益
      incomeFlag: false, // 领取收益弹框
      deadline: "", // 截止日期
      hour: "00", // 时
      minutes: "00", // 分
      seconds: "00", // 秒
      showBurnFlag: false, // 燃烧算力弹框
      receiveAble: false, // 收益是否可以被领取
      // amount: "", // 燃烧数量
      expectAmount: 0, // 预估收益
      decimals: 2, //精度

      poolLevel: 5,
      poolList: [{amount: 5, address: ''}, {amount: 100, address: ''}],
      currPool: 5,
      withdrawPrice: 0.00,
      price: '0.00',
      next_pool: '',
    };
  },
  async created() {
    await this.getAddress();
    // this.contractAddress = poolList[0].address
    // var contract = new ethers.Contract(
    //   this.contractAddress,
    //   abi,
    //   this.signer
    // );
    // this.contract = contract;
    this.getContract()
    await this.getDecimals();
    this.getTotalSupply();
    await this.getBalance();
    this.geUsers();
    if(this.storeAmount !== 0) {
      this.getWithdrawPrice();
      this.getNextPoolAddress();
    }
  },
  mixins: [h5Copy, initEth, timeUtils, vertify],
  methods: {
    show(num) {
      this.type = num;
      this.bgShow = true;
    },
    // 初始化合约
    getContract (address) {
      this.contractAddress = address
      var contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
      this.contract = contract;
    },
    async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if (error == null) {
        this.myAddress = address;
      } else {
        console.log(error);
      }
    },
    // 获取主网qki的余额
    async getQkiBalance() {
      let [error, balance] = await this.to(
        this.provider.getBalance(this.myAddress)
      );
      if (error == null) {
        let etherString = ethers.utils.formatEther(balance);
        return parseFloat(etherString);
      }
      return 0.0;
    },
    // TODO:得到凭证数量，切换星球的时候如何获取选择星球的凭证数量呐？
    async getBalance() {
      let [error, balance] = await this.to(
        this.contract.balanceOf(this.myAddress)
      );
      this.doResponse(error, balance, "balance", this.decimals);
    },
    // 得到合约的余额
    async getTotalSupply() {
      let [error, res] = await this.to(this.contract.totalSupply());
      this.doResponse(error, res, "totalSupply", this.decimals);
    },
    // 获得解锁价格
    async getWithdrawPrice() {
      let [error, res] = await this.to(this.contract.withdrawPrice());
      this.doResponse(error, res, "withdrawPrice", this.decimals);
    },
    // 获取下一个可升级的星球池
    async getNextPoolAddress() {
      let [error, res] = await this.to(this.contract.next_pool());
      this.doResponse(error, res, "", this.decimals);
    },
    // 获得用户的累计存入数量
    async geUsers() {
      let [error, res] = await this.to(this.contract.users(this.myAddress));
      console.log("geUsers======", error, res)
      // this.doResponse(error, res, "withdrawPrice", this.decimals);
    },
    // 获得当前价格
    async getPrice() {
      let [error, res] = await this.to(this.contract.getPrice());
      console.log("getPrice======", error, res)
      // qusdt的精度为6
      // this.doResponse(error, res, "withdrawPrice", 6);
    },
    // 得到精度
    async getDecimals() {
      let [error, res] = await this.to(this.contract.decimals());
      this.doResponse(error, res, "decimals");
    },
    // 处理工单
    async dealOrder(type, modelKeyName) {
      if (this.amount == "") {
        Toast("请输入您的存入的数量");
        return;
      }
      let amount =
        ethers.FixedNumber.from(this.amount.toString()) * 10 ** 18;
      let response;
      if(type === 'start') {
        response = await this.to(this.contract.deposit(amount))
      } else if (type === 'upgrade') {
        response = await this.to(this.contract.upgrade(amount))
      } else if( type === 'withdraw') {
        response = await this.to(this.contract.withdraw(amount))
      } else if(type === 'store') {
        response = await this.to(this.contract.deposit(amount))
      }
      let [error, res] = response;
      if (this.doResponse(error, res)) {
        this[modelKeyName] = false;
        this.amount = '';
        Toast("提交请求成功，等待区块确认");
        await this.queryTransation(res.hash, () => {
          this.getTotalSupply();
          this.getBalance();
          this.geUsers();
          this.getWithdrawPrice();
          this.getNextPoolAddress();
        });
      }
    },
    // 开启星球 TODO: 如何给所选星球存入数量
    async start() {
      this.dealOrder('start', 'startPoolShow')
    },
    // 切换星球
    async togglePool() {
      this.contractAddress = this.currPool
      var contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
      this.contract = contract;
      this.getTotalSupply();
      this.getBalance();
      this.geUsers();
      this.getWithdrawPrice();
    },
    // 升级星球
    async upgrade() {
      this.dealOrder('upgrade', 'upgredeShow')
    },
    // 存入
    async store() {
      this.dealOrder('store', 'storeShow')
    },
    // 提现
    async withDraw() {
      this.dealOrder('withdraw', 'withDrawShow')
    },
    // 十六进制转10进制
    hex2int(hex) {
      if (hex.indexOf("0x") >= 0) {
        hex = hex.substring("2");
      }
      var len = hex.length,
        a = new Array(len),
        code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }
      return a.reduce(function(acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    // response公共处理方法
    doResponse(error, res, keyName, Decimal = 0) {
      console.log(keyName+'================', error, res);
      if (error == null) {
        if (keyName) {
          let hex = ethers.utils.hexValue(res);
          let Value =
            this.hex2int(hex) / ethers.BigNumber.from(10).pow(Decimal);
          this[keyName] = Value;
        }
        return true;
      } else {
        if (error.code == "INSUFFICIENT_FUNDS") {
          Toast("矿工费不足");
        } else if (error.code == 4001) {
          Toast("用户取消");
        } else {
          Toast("错误代码:" + error.code);
        }
        return false;
      }
    },
    // 输入全部
    inputAll() {
      this.amount = this.balance;
    },

    tab(num) {
      this.active = num;
    }
  },
  watch: {
    power(newPower) {
      if (newPower < 500) {
        this.level = 1;
      } else if (newPower < 5000) {
        this.level = 2;
      } else if (newPower < 10000) {
        this.level = 3;
      } else if (newPower < 20000) {
        this.level = 4;
      } else {
        this.level = 5;
      }
    },
  }
};
</script>

<style scoped lang="scss">
.mt_65{
  margin-top: 65px;
}
.mt_50{
  margin-top: 50px;
}
.mt_15{
  margin-top: 15px;
}
.mt_85{
  margin-top: 85px;
}
.mt_30{
  margin-top: 30px;
}
.mt_20{
  margin-top: 20px;
}
.container{
  background: linear-gradient(90deg, #262455 0%, #232150 100%);
  min-height: 100vh;
  padding-left: 60px;
  padding-right: 60px;
}
.head{
  background-image: url('../../assets/bg.png');
  background-repeat: no-repeat;
  // width: 100%;
  height: 821px;
  background-size: 100% 100%;
}
.rule_bg{
  background-image: url('../../assets/rule_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 104px;
  height: 104px;
}
.logo1{
  width: 202px;
  height: 33px;
}
.logo2{
  width: 207px;
  height: 76px;
  margin-top: 12px;
}
.toggle_icon{
  width: 27px;
  height: 35px;
  margin-right: 5px;
}
.copy{
  width: 28px;
  height: 29px;
  margin-left: 10px;
}
.upgrade_btn{
  width: 40px;
  height: 40px;
  margin-right: 8px;
}
.pool_bg{
  background-image: url('../../assets/pool_bg.png');
  background-repeat: no-repeat;
  width: 215px;
  height: 215px;
  background-size: 100% 100%;
}
.flex {
  display: flex;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.align-center {
  display: flex;
  align-items: center;
}
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hy {
  box-sizing: border-box;
  border-bottom: 2px solid rgba(235, 233, 237, .4);
  padding-bottom: 25px;
  margin-bottom: 50px;
}
.hr_v{
  height: 2px;
  width: 100%;
  background: rgba(235, 233, 237, .4);
  margin-top: 50px;
  margin-bottom: 50px;
}
.hr_h{
  height: 90px;
  width: 2px;
  background: rgba(235, 233, 237, .4);
}
.fixed_bottom_placeholder{
  width: 100%;
  height: 360px;
}
.fixed_bottom{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #232150;
  padding: 60px
}
.withdraw_btn{
  width: 285px;
  height: 94px;
  background-image: url('../../assets/withdraw_btn.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.store_btn{
  width: 285px;
  height: 94px;
  background-image: url('../../assets/store_btn.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.store_btn_big{
  width: 430px;
  height: 146px;
  background-image: url('../../assets/store_btn.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
 .line {
    width: 1px;
    height: 41px;
    background: #D1D1D1;
    margin-right: 20px;
  }
  .submit_btn{
    height: 119px;
    margin-left: 60px;
    margin-right: 60px;
    width: 100%;
    background: linear-gradient(95deg, #FE207B 0%, #D6117B 100%);
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 59px;
    margin-bottom: 25px;
  }
  .pool_item{
    width: calc((100% - 30px)/2);
    padding-top: 36px;
    padding-bottom: 36px;
    border: 1px solid #D1D1D1;
    border-radius: 80px;
    margin-bottom: 60px;
    position: relative;
    color: #D1D1D1;
    font-size: 30px;
    &.currItem{
      border: 1px solid #FF5746;
      color: #FF5746;
    }
    .img{
      position: absolute;
      width: 51px;
      height: 51px;
      left: 50%;
      top: -25px;
      transform: translateX(-50%);
    }
  }

.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba($color: #000000, $alpha: 0.5);

  .flex-box {
    width: 100%;
    height: 100%;
    .pool_model_bg{
      width: 215px;
      height: 215px;
      position: absolute;
      left: 50%;
      top: -100px;
      transform: translateX(-50%);
    }
    .box {
      width: 654px;
      height: 673px;
      background: #ffffff;
      border-radius: 20px;
      padding: 90px 78px 0 63px;
      box-sizing: border-box;
      position: relative;
      .withdraw_model_bg {
        width: 285px;
        height: 184px;
        position: absolute;
        left: 50%;
        top: -100px;
        transform: translateX(-50%);
      }
      .rocket_bg{
        width: 95px;
        height: 274px;
        position: absolute;
        left: 50%;
        top: 50%;
        top: -160px;
        transform: translateX(-50%);
      }
    }

    .box1 {
      margin-left: 50px;
      margin-right: 50px;
      width: 100%;
      background: #ffffff;
      border-radius: 20px;
      padding: 71px 56px 71px 56px;
      position: relative;
      .line {
        width: 1px;
        height: 51px;
        background: #d8d8d8;
        margin: 0 13px;
      }
    }
  }
}
.input-box {
  width: 100%;
  height: 92px;
  background: #EBEBEB;
  border-radius: 50px;
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 0 37px;
  box-sizing: border-box;
  .input {
    width: 70%;
    height: 100%;
    border: none;
    background-color: transparent;
  }
  
}
</style>
