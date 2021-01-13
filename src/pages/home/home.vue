<template>
  <div class="container">
    <div class="head flex_v_center">
      <div class="flex_v_end">
        <div class="rule_bg flex_h_center_center normalInverseBoldTxt">规则</div>
      </div>
      <img :src="require('../../assets/logo1.png')" alt="" class="logo1" />
      <img :src="require('../../assets/logo2.png')" alt="" class="logo2" />
      <div class="pool_bg flex_h_center_center mt_65 hugestInverseBoldTxt">{{poolLevel}}U</div>
      <div class="flex_h mt_15">
        <img :src="require('../../assets/toggle.png')" alt="" class="toggle_icon"/>
        <span class="smallestInverseTxt" style="opacity: 0.4">点击星球切换星球池</span>
      </div>
      <div class="smallInverseTxt mt_85">当前合约地址内余额</div>
      <div class="biggestInverseThinTxt mt_30">225,486.2789</div>
      <div class="smallInverseThinTxt mt_20">QKI</div>
    </div>
    <div class="hy">
      <div class="space-between">
        <div class="smallestInverseTxt ellipsis">{{ contractAddress }}</div>
        <img src="../../assets/copy.png" class="copy" @click="h5Copy(contractAddress)" mode />
      </div>
    </div>
    <!-- <div class="hr_v"></div> -->
    <div class="flex_h">
      <div class="flex_v_center flex1">
        <div class="smallInverseTxt">凭证数量</div>
        <div class="biggestInverseThinTxt mt_50">100.00</div>
      </div>
      <div class="hr_h"></div>
       <div class="flex_v_center flex1">
        <div class="smallInverseTxt">存入数量(QKI)</div>
        <div class="biggestInverseThinTxt mt_50">100.00</div>
      </div>
    </div>
    <div class="hr_v"></div>
    <div class="flex_h">
      <div class="smallInverseTxt flex1">当前QKI价格</div>
      <div class="flex1">
        <span class="biggerInverseThinTxt">100.00</span>
        <span class="smallerInverseThinTxt">USDT</span>
      </div>
    </div>
    <div class="fixed_bottom_placeholder"></div>
    <div class="fixed_bottom flex_v">
     <div class="flex_h_between ">
       <div class="withdraw_btn flex_h_center_center smallerInverseTxt">立即提现</div>
       <div class="store_btn flex_h_center_center smallerInverseTxt">立即存入</div>
     </div>
     <div class="flex_h_between mt_65">
       <span class="smallestMainInverseThinTxt">* 当价格到达5 USDT可进行提现</span>
       <div class="">
         <img :src="require('../../assets/upgrade.png')" alt="" class="upgrade_btn">
         <span class="smallestInverseTxt">升级到10U星球池</span>
       </div>
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
          <div class="submit_btn flex_h_center_center middleInverseTxt">
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
          <div class="submit_btn flex_h_center_center middleInverseTxt">
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
          <div class="submit_btn flex_h_center_center middleInverseTxt">
            确定存入
          </div>
          <div class="smallGrey2Txt" @click="storeShow = false">取消存入</div>
        </div>
      </div>
    </div>
    <!-- 选择星球 -->
    <div class="bg" v-show="togglePoolShow">
      <div class="flex-box">
        <div class="box flex_v_center">
          <img src="../../assets/pool_bg.png" class="pool_model_bg" mode />
          <div class="align-center mt_50">
            <div class="bigFontThinTxt">选择星球池</div>
          </div>
          
          <div class="submit_btn flex_h_center_center middleInverseTxt">
            确定切换
          </div>
          <div class="smallGrey2Txt" @click="storeShow = false">取消切换</div>
        </div>
      </div>
    </div>
    <!-- 燃烧原料 -->
    <div class="bg" v-show="showBurnFlag">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <!-- <img src="../../assets/rs.png" class="rs" mode /> -->
            <div class="text">燃烧原料</div>
          </div>
          <div class="text1 alignLeft">
            可用余额
            <span class="smallMainTxt">{{ balance }}</span>burn
          </div>
          <div class="input-box space-between">
            <input type="text" class="input" value placeholder="输入燃烧数量" v-model="amount" />
            <div class="align-center">
              <div class="text2">burn</div>
              <div class="line"></div>
              <div class="text3" @click="inputAll">全部</div>
            </div>
          </div>
          <div class="tit alignLeft">* 确定提交后你燃烧的余额将销毁变成3倍算力</div>
          <div class="flex-box btn" @click="burn">确定燃烧</div>
          <div class="text4" @click="showBurnFlag = false">取消</div>
        </div>
      </div>
    </div>
    <!-- 挖取矿产 -->
    <div class="bg" v-show="bgShow">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <!-- <img src="../../assets/wq.png" class="wq" mode /> -->
            <div class="text">挖取矿产</div>
          </div>
          <div class="text5">
            <span>152152.311</span>
            <br />待更新通证算力
          </div>
          <div class="tit tit1">我当前通证算力总量：{{ power }}</div>
          <div class="flex-box btn">增加更新</div>
          <div class="text4" @click="bgShow = false">取消</div>
        </div>
      </div>
    </div>
    <!-- 领取收益弹框 -->
    <div class="bg" v-show="incomeFlag">
      <div class="flex-box">
        <div class="box1">
          <div class="align-center">
            <!-- <img src="../../assets/lqjl.png" class="lq" mode /> -->
            <div class="text">领取收益</div>
          </div>
          <div class="text5" v-if="receiveAble">
            <span class="hugeMainTxt">{{ expectAmount }}</span>
            <br />burn
          </div>
          <div class="time-box" v-else>
            <div class="time" v-for="(item, index) in hour" :key="'1_' + index">{{ item }}</div>

            <div class="bi">:</div>
            <div class="time" v-for="(item, index) in minutes" :key="'2_' + index">{{ item }}</div>
            <div class="bi">:</div>
            <div class="time" v-for="(item, index) in seconds" :key="'3_' + index">{{ item }}</div>
          </div>
          <div class="last-time" v-if="!receiveAble">上次领取奖励：{{ receiveTime }}</div>
          <!-- <div class="tit tit1">* 产出收益最多保留5天</div> -->
          <div class="tit tit1 tit2">* 等级达到Lv2,产出收益最多累计5天</div>
          <div
            :class="['flex-box', receiveAble ? 'btn' : 'btn-disable']"
            @click="getReceiveIncome"
          >{{ receiveAble ? "确定领取" : "明日再来" }}</div>
          <div class="text4" @click="incomeFlag = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import h5Copy from '../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
import { h5Copy, initEth, timeUtils, vertify } from "@/utils/utils";
import { ethers } from "ethers";
import { abi, abiPro } from "./abi";
import { Toast } from "vant";
// 收益率,为了防止机器刷，LV1级qki余额大于1时，才能够拿到0.2%，否则拿到0.1%
const RATE = ["0.002", "0.005", "0.006", "0.007", "0.008"];
export default {
  data() {
    return {
      contractAddress: "0xD3e9448D573963344f8cF6E95E6b072dc5b701C3", // 合约地址
      contract: null, // 当前的合约对象
      myAddress: "", // 我的地址
      balance: "0.00", // 我的余额
      // totalPower: "0",// 全网通证总量
      totalSupply: "0", // 全网通证总量
      power: "0", // 我的算力
      level: 1,
      withDrawShow: false,
      bgShow: false,
      upgredeShow: false,
      storeShow: false,
      togglePoolShow: true,
      type: 1,
      epoch: 86400, // 挖矿周期
      inviteCount: "0", // 邀请的人数
      receiveTimestamp: 0, // 上次领取奖励的时间戳
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
      amount: "", // 燃烧数量
      expectAmount: 0, // 预估收益
      decimals: 2, //精度

      poolLevel: 5,
    };
  },
  async created() {
    this.contractAddress =
      process.env.NODE_ENV == "development"
        ? "0xD3e9448D573963344f8cF6E95E6b072dc5b701C3"
        : "0x3FB708e854041673433e708feDb9a1b43905b6f7";
    await this.getAddress();
    let currAbi = process.env.NODE_ENV == "development" ? abi : abiPro;
    var contract = new ethers.Contract(
      this.contractAddress,
      currAbi,
      this.signer
    );
    this.contract = contract;
    await this.getDecimals();
    await this.getEpoch();
    await this.getTotalSupply();
    await this.getinviteCount();
    await this.getReceiveTime();
    await this.getRewardCount();
    await this.getInviteAddress();
    await this.getBalance();
    await this.getPower();
  },
  mixins: [h5Copy, initEth, timeUtils, vertify],
  methods: {
    show(num) {
      this.type = num;
      this.bgShow = true;
    },
    // 展示领取收益
    async showIncome() {
      // 新用户且算力不为0，进入页面就可以领取一次收益
      if (this.receiveTimestamp == 0) {
        if (this.power != 0) {
          this.receiveAble = true;
          this.incomeFlag = true;
          // 默认领取一天的收益，传入参数只要是小于epoch的任何一个数都可以
          this.calcExpectAmount(10);
        } else {
          Toast("您当前还没有算力！");
          return;
        }
      } else {
        this.incomeFlag = true;
        let nowTimeStr = Date.now()
          .toString()
          .substring(0, 10);
        let distance = this.receiveTimestamp + this.epoch - Number(nowTimeStr);
        // 如果distance大于0表示收益还不可以领取。需要计算倒计时
        if (distance <= 0) {
          this.calcExpectAmount(distance);
        }
      }
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
    // 得到余额
    async getBalance() {
      let [error, balance] = await this.to(
        this.contract.balanceOf(this.myAddress)
      );
      this.doResponse(error, balance, "balance", this.decimals);
    },
    // 得到通证总量
    async getTotalSupply() {
      let [error, res] = await this.to(this.contract.totalSupply());
      this.doResponse(error, res, "totalSupply", this.decimals);
    },
    // 得到精度
    async getDecimals() {
      let [error, res] = await this.to(this.contract.decimals());
      this.doResponse(error, res, "decimals");
    },
    // 得到个人算力
    async getPower() {
      let [error, res] = await this.to(this.contract.power(this.myAddress));
      this.doResponse(error, res, "power", this.decimals);
    },
    // 获取累计收益
    async getRewardCount() {
      let [error, res] = await this.to(
        this.contract.rewardCount(this.myAddress)
      );
      this.doResponse(error, res, "rewardCount", this.decimals);
    },
    // 获取上次领取奖励的时间
    // 注：这个方法必须调用在getEpoch方法之后，因为他们两个共同影响倒计时的逻辑
    async getReceiveTime() {
      let [error, res] = await this.to(
        this.contract.last_miner(this.myAddress)
      );
      this.doResponse(error, res, "receiveTimestamp");
    },
    // 获取挖矿周期
    async getEpoch() {
      let [error, res] = await this.to(this.contract.epoch());
      this.doResponse(error, res, "epoch");
    },
    // 获取邀请人数
    async getinviteCount() {
      let [error, res] = await this.to(
        this.contract.inviteCount(this.myAddress)
      );
      this.doResponse(error, res, "inviteCount");
    },
    // 获取绑定人信息
    async getInviteAddress() {
      let [error, res] = await this.to(this.contract.invite(this.myAddress));
      if (this.doResponse(error, res)) {
        if (res == "0x0000000000000000000000000000000000000000") {
          res = "";
        }
        this.inviteAddress = res;
      }
    },
    // 绑定邀请人。
    async registration() {
      if (this.inviteAddressInput == "") {
        Toast("请输入绑定邀请的地址");
        return;
      }
      if(this.inviteAddressInput.toLowerCase() == this.myAddress.toLowerCase()){
         Toast("不能绑定自己！");
          this.inviteAddressInput = '';
        return;
      }
      if (this.inviteAddressInput.toLowerCase() == this.contractAddress.toLowerCase()) {
        Toast("不能绑定合约地址为邀请人！");
        this.inviteAddressInput = '';
        return;
      }

      // TODO: 如何验证地址的合法性？？
      let [error, res] = await this.to(
        this.contract.registration(this.inviteAddressInput)
      );
      if (this.doResponse(error, res)) {
        Toast("绑定成功");
        this.inviteAddress = this.inviteAddressInput;
      }
    },
    // 燃烧
    async burn() {
      if (this.amount == "") {
        Toast("请输入您的燃烧数量");
        return;
      }
      let burn_amount =
        ethers.FixedNumber.from(this.amount.toString()) * 10 ** this.decimals;
      let [error, res] = await this.to(this.contract.burn(burn_amount));
      if (this.doResponse(error, res)) {
        this.showBurnFlag = false;
        Toast("操作成功");
        await this.queryTransation(res.hash);
      }
    },
    // 领取挖矿收益
    async getReceiveIncome() {
      if (!this.receiveAble) {
        Toast("您今天已经领取过收益了,明天再来！");
        return;
      }
      let [error, res] = await this.to(this.contract.mint());
      if (this.doResponse(error, res, "")) {
        this.incomeFlag = false;
        Toast("收益领取成功！");
        await this.queryTransation(res.hash, true);
      }
    },
    // 查询Transaction
    async queryTransation(hash, updateTime) {
      await this.provider.waitForTransaction(hash).then(async receipt => {
        Toast("区块打包成功", receipt);
        await this.getBalance();
        await this.getPower();
        await this.getTotalSupply();
        if (updateTime) {
          await this.getRewardCount();
          await this.getEpoch();
          await this.getReceiveTime();
        }
      });
    },
    async calcExpectAmount(distance) {
      // 计算阶段奖励
      let currRate = "0.001";
      if (this.level == 1) {
        let balance = await this.getQkiBalance();
        if (balance < 1) {
          currRate = "0.001";
        } else {
          currRate = RATE[this.level - 1];
        }
      } else {
        currRate = RATE[this.level - 1];
      }
      // 奖励是否过期
      let day = Math.floor(Math.abs(distance) / this.epoch);
      day = day + 1;
      // let expectAmount = this.accMul(this.power, currRate);
      if (this.timestampToTime == 0) {
        day = 1;
      } else {
        if (this.level == 1) {
          if (day > 1) {
            day = 1;
          }
        } else {
          if (day > 5) {
            day = 5;
          }
        }
      }

      // let par1 =
      this.expectAmount = this.accMul(this.accMul(this.power, currRate), day);
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
      // console.log(keyName+'================', error, res);
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
  // computed: {
  //   receiveAble: function(){
  //     // 获取当前时间
  //     let nowTimeStr = Date.now()
  //       .toString()
  //       .substring(0, 10);
  //     return Number(nowTimeStr) - (this.receiveTimestamp + this.epoch) > 0
  //   }
  // },
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
    receiveTimestamp(newTime) {
      if (newTime != 0) {
        this.receiveTime = this.timestampToTime(this.receiveTimestamp);
      }
      // 获取当前时间
      let nowTimeStr = Date.now()
        .toString()
        .substring(0, 10);
      // 如果distance大于0表示收益还不可以领取。需要计算倒计时
      let distance = this.receiveTimestamp + this.epoch - Number(nowTimeStr);
      if (distance > 0) {
        this.countDown(distance, () => {
          this.calcExpectAmount(distance);
          this.receiveAble = true;
        });
        this.receiveAble = false;
      } else {
        this.calcExpectAmount(distance);
        this.receiveAble = true;
      }
    }
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
  width: 100%;
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
  margin-left: 13px;
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
.head {
  // width: 100%;
  // height: 500px;
  // background: url(../../assets/bj.png) no-repeat;
  // background-size: 100% 100%;
  // padding-top: 100px;
  // position: relative;
  // box-sizing: border-box;
  .my {
    margin-left: 101px;

    .huo {
      width: 93px;
      height: 104px;
    }

    .right {
      margin-left: 29px;
      margin-top: -10px;

      .num {
        font-size: 58px;
        color: #fff;
        font-weight: bold;
      }

      .align-center {
        .lv {
          width: 44px;
          height: 28px;
          margin-left: 10px;
        }

        .text {
          font-size: 26px;
          color: #ffcdcd;
          margin-left: 11px;
        }
      }
    }
  }

  .money {
    margin-top: 70px;
    padding: 0 110px;

    .item {
      text-align: center;

      .img {
        width: 33px;
        height: 31px;
      }

      .img1 {
        width: 25px;
        height: 33px;
      }

      .text {
        font-size: 24px;
        color: #ffcdcd;
        margin-left: 10px;
      }

      .num {
        font-size: 26px;
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }

  
}

.cont {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px -27px 81px 0px rgba(0, 0, 0, 0.02);
  border-radius: 35px 35px 0px 0px;
  margin-top: -28px;
  position: relative;
  padding-top: 103px;
  padding-bottom: 100px;
  .tab {
    padding: 0 58px;

    .item {
      text-align: center;

      .img {
        width: 116px;
        height: 116px;
      }

      .text {
        font-size: 26px;
        color: #737278;
        margin-top: 16px;
      }
    }
  }

 

  .my-box {
    margin-top: 60px;
    padding: 0 48px;

    .img {
      width: 26px;
      height: 35px;
    }

    .img1 {
      width: 30px;
      height: 30px;
    }

    .text {
      font-size: 24px;
      color: #b09b99;
      margin-left: 14px;
    }

    .text1 {
      font-size: 24px;
      color: #7d7d82;
    }

    .copy {
      width: 100%;
      height: 65px;
      background: #fff1ef;
      border-radius: 21px;
      padding: 0 45px 0 42px;
      margin-top: 26px;
      box-sizing: border-box;
      &.copy1 {
        height: 102px;
        background: #f3f3f3;
        padding: 0 33px 0 40px;
      }

      .flex-box {
        width: 156px;
        height: 62px;
        background: #dc5242;
        border-radius: 16px;
        font-size: 24px;
        color: #fff;
      }

      .num {
        font-size: 20px;
        color: #737278;
      }

      .copy-img {
        width: 34px;
        height: 34px;
      }
    }
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
      .pool_model_bg{
        width: 215px;
        height: 215px;
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

      .text {
        font-size: 38px;
        color: #7d7d82;
        margin-left: 10px;
        font-weight: bold;
      }

      .text1 {
        font-size: 26px;
        color: #7d7d82;
        margin-top: 30px;
        line-height: 37px;

        .tit {
          font-weight: 600;
        }

        .lv {
          color: #dc5242;
          padding-right: 10px;
          padding-left: 10px;

          &.first {
            padding-left: 0;
          }
        }
      }

      .btn {
        width: 100%;
        height: 120px;
        background: #dc5242;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 50px;
      }
    }

    .box1 {
      margin-left: 50px;
      margin-right: 50px;

      width: 100%;
      // height: 699px;
      background: #ffffff;
      border-radius: 20px;
      padding: 71px 56px 71px 56px;
      .rs {
        width: 30px;
        height: 45px;
      }
      .lq {
        width: 42px;
        height: 38px;
      }
      .wq {
        width: 40px;
        height: 40px;
      }
      .text {
        font-size: 38px;
        color: #7d7d82;
        font-weight: bold;
        margin-left: 13px;
      }
      .text1 {
        font-size: 26px;
        color: #b9b9b9;
        font-weight: 500;
        margin-top: 13px;
        uni-text {
          color: #dc5242;
        }
      }

      .text2 {
        font-size: 26px;
        color: #b9b9b9;
        font-weight: bold;
      }
      .line {
        width: 1px;
        height: 51px;
        background: #d8d8d8;
        margin: 0 13px;
      }
      .text3 {
        font-size: 26px;
        font-weight: 500;
        color: #dc5242;
      }
      .tit {
        font-size: 24px;
        color: #dc5242;
        font-weight: 500;
        margin-top: 73px;
        &.tit1 {
          text-align: center;
        }
        &.tit2 {
          margin-top: 26px;
        }
      }
      .btn {
        width: 100%;
        height: 120px;
        background: #dc5242;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 28px;
      }
      .btn-disable {
        width: 100%;
        height: 120px;
        background: #ccc;
        border-radius: 20px;
        font-size: 32px;
        color: #fff;
        margin-top: 50px;
      }
      .text4 {
        text-align: center;
        font-size: 32px;
        color: #b9b9b9;
        margin-top: 34px;
      }
      .text5 {
        text-align: center;
        font-size: 24px;
        color: #b9b9b9;
        margin-top: 80px;
        uni-text {
          font-size: 50px;
          color: #dc5242;
          font-weight: 500;
        }
      }
      .time-box {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 77px;
          height: 100px;
          background: #f3f3f3;
          border-radius: 19px;
          font-size: 50px;
          color: #7d7d82;
          font-weight: bold;
        }
        .bi {
          font-size: 35px;
          color: #7d7d82;
        }
      }
      .last-time {
        text-align: center;
        margin-top: 60px;
        font-size: 22px;
        color: #c0c0c0;
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
