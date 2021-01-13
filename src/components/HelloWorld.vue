<template>
  <div class="container">
    <div class="head">
      <div class="my flex">
        <img src="../assets/head.png" class="huo" mode="">
        <div class="right">
          <div class="num">12511.2102</div>
          <div class="align-center" @click="lvShow = true">
            <img src="../assets/lv1.png" class="lv" mode="">
            <div class="text">我的算力</div>
          </div>
        </div>
      </div>
      <div class="money space-between">
        <div class="item">
          <div class="align-center">
            <img src="../assets/wdye.png" class="img" mode="">
            <div class="text">我的余额</div>
          </div>
          <div class="num">1262.522644</div>
        </div>
        <div class="item">
          <div class="align-center">
            <img src="../assets/qwtx.png" class="img1" mode="">
            <div class="text">全网通证</div>
          </div>
          <div class="num">12625415.00</div>
        </div>
      </div>
      <div class="hy">
        <div class="text">燃烧挖矿合约</div>
        <div class="space-between">
          <div class="num ellipsis">{{contractAddress}}</div>
          <img src="../assets/copy.png" class="copy" @click="copy(contractAddress)" mode="">
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="tab space-between">
        <div class="item" @click="show(1)">
          <img src="../assets/tab1.png" class="img" mode="">
          <div class="text">燃烧原料</div>
        </div>
        <div class="item" @click="show(2)">
          <img src="../assets/tab2.png" class="img" mode="">
          <div class="text">挖取矿产</div>
        </div>
        <div class="item" @click="show(3)">
          <img src="../assets/tab3.png" class="img" mode="">
          <div class="text">领取奖励</div>
        </div>
        <div class="item">
          <img src="../assets/tab4.png" class="img" mode="">
          <div class="text">邀请好友</div>
        </div>
      </div>
      <div class="line">
        上次领取奖励：2020.11.30 15:15:44
      </div>
      <div class="my-box">
        <div class="top space-between">
          <div class="align-center">
            <img src="../assets/add.png" class="img" mode="">
            <div class="text">我的地址</div>
          </div>
          <div class="text">共邀请 155432 人</div>
        </div>
        <div class="copy space-between">
          <div class="num ellipsis">{{copyText}}</div>
          <img src="../assets/copy1.png" class="copy-img" @click="copy(copyText)" mode="">
        </div>
      </div>
      <div class="my-box">
        <div class="top space-between">
          <div class="align-center">
            <img src="../assets/bind.png" class="img1" mode="">
            <div class="text">绑定邀请人</div>
          </div>
        </div>
        <div class="copy copy1 space-between">
          <div class="num ellipsis">{{copyText}}</div>
          <div class="text1">已绑定</div>
          <!-- <div class="flex-box">确定绑定</div> -->
        </div>
      </div>
    </div>
    <div class="bg" v-show="lvShow">
      <div class="flex-box">
        <div class="box">
          <div class="align-center">
            <img src="../assets/wenhao.png" class="wenhao" mode="">
            <div class="text">等级说明</div>
          </div>
          <div class="text1">
            <text class="tit">转账手续费销毁功能</text><br>
            <text class="lv first">v1</text>
            <text class="tit">20%</text>
            <text class="lv">v2</text>
            <text class="tit">10%</text>
            <text class="lv">v3</text>
            <text class="tit"> 8%</text>
            <text class="lv">v4</text>
            <text class="tit"> 6%</text>
            <text class="lv">v5</text>
            <text class="tit"> 4%</text><br><br>
            *例如转账100个，转出方扣除120个，接收方获得100个，20个销毁。<br>
            刷新页面后，需要重新领取算力
          </div>
          <div class="flex-box btn" @click="lvShow = false">好的</div>
        </div>
      </div>
    </div>
    <div class="bg" v-show="bgShow">
      <div class="flex-box">
        <div class="box1" v-if="type == 1">
          <div class="align-center">
            <img src="../assets/rs.png" class="rs" mode="">
            <div class="text">燃烧原料</div>
          </div>
          <div class="text1">
            可用余额 <text>152152.311</text> burn
          </div>
          <div class="input-box space-between">
            <input type="text" class="input" value="" placeholder="输入燃烧数量" placeholder-style="font-size:26px;color:#B9B9B9;font-weight:bold" />
            <div class="align-center">
              <div class="text2">burn</div>
              <div class="line"></div>
              <div class="text3">全部</div>
            </div>
          </div>
          <div class="tit">* 确定提交后你燃烧的余额将销毁变成3倍算力</div>
          <div class="flex-box btn">确定燃烧</div>
          <div class="text4" @click="bgShow = false">取消</div>
        </div>
        <div class="box1" v-if="type == 2">
          <div class="align-center">
            <img src="../assets/wq.png" class="wq" mode="">
            <div class="text">挖取矿产</div>
          </div>
          <div class="text5">
            <text>152152.311</text><br>
            待更新通证算力
          </div>
          <div class="tit tit1">我当前通证算力总量：12511.2102</div>
          <div class="flex-box btn">增加更新</div>
          <div class="text4" @click="bgShow = false">取消</div>
        </div>
        <div class="box1" v-if="type == 3">
          <div class="align-center">
            <img src="../assets/lqjl.png" class="lq" mode="">
            <div class="text">领取收益</div>
          </div>
         <!-- <div class="text5">
            <text>152.311</text><br>
            burn
          </div> -->
          <div class="time-box">
            <div class="time">2</div>
            <div class="time">2</div>
            <div class="bi">:</div>
            <div class="time">2</div>
            <div class="time">2</div>
            <div class="bi">:</div>
            <div class="time">2</div>
            <div class="time">2</div>
          </div>
          <div class="last-time">上次领取奖励：2020.11.30 15:15:44</div>
          <!-- <div class="tit tit1">* 产出收益最多保留5天</div> -->
          <div class="tit tit1 tit2">* 产出收益最多保留5天</div>
          <div class="flex-box btn">确定领取</div>
          <div class="text4" @click="bgShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import h5Copy from '../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
  import {h5Copy, initEth} from '@/utils/utils';
  import { ethers } from 'ethers';
// import {abi} from './config';
  export default {
    data() {
      return {
        contractAddress: '0X5ASDWQF5F1WE6G2G5XCS65FFWE32FE5E56',
        lvShow: false,
        bgShow:false,
        type:1
      }
    },
    onLoad() {},
    mixins: [h5Copy, initEth],
    methods: {
      show(num){
        this.type = num;
        this.bgShow = true;
      },
      getBalance(){
        // var contract = new ethers.Contract(this.contractAddress, abi, this.signer);
      
        this.signer.getAddress().then((address) => {
          // 获取主网qki的余额
          this.provider.getBalance(address).then((balance) => {
            let etherString = ethers.utils.formatEther(balance);
            this.balance = parseFloat(etherString);
          });
          // 获取合约
          // contract.balanceOf(address).then((balance) => {
          //   let etherString = ethers.utils.formatEther(balance);
          //   this.parisBalance = parseFloat(etherString);
          // }, (data) => {
          //     if (data.code == "INSUFFICIENT_FUNDS") {
          //       Toast("矿工费不足");
          //     } else if (data.code == 4001) {
          //       Toast("用户取消");
          //     } else {
          //       Toast("错误代码:" + data.code);
          //     }
          //   })        
        });
      },
      // copy() {
        
        // this.h5Copy('te');
        // let cont = content.toString();
        // const result = h5Copy(content)
        // if (result === false) {
          
        //   uni.showToast({
        //     title: '不支持',
        //   })
        // } else {
        //   uni.showToast({
        //     title: '复制成功',
        //     icon: 'none'
        //   })
        // }
      // },
      // getShare() {
      //   const that = this;
      //   uni.request({
      //     url: '/poster/get-qr/free' + '?token=' + uni.getStorageSync('APP_TOKEN'),
      //     header: {
      //       'Accept': 'application/json',
      //       "X-Requested-With": "XMLHttpRequest"
      //     },
      //     method: 'GET',
      //     success: function(res) {
      //       uni.stopPullDownRefresh();
      //       if (res.data.code === 0) {
      //         that.imgData = res.data.data.imgData
      //       } else {

      //       }
      //     },
      //     fail: function() {
      //       uni.stopPullDownRefresh();
      //     }
      //   });
      // },
      tab(num) {
        this.active = num;
      },
    },
  }
</script>

<style scoped lang="scss">
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
  .head {
    width: 100%;
    height: 575px;
    background: url(../assets/bj.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 188px;
    position: relative;
    box-sizing: border-box;
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
          margin-left: 8px;

          .lv {
            width: 44px;
            height: 28px;
          }

          .text {
            font-size: 26px;
            color: #FFCDCD;
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
          color: #FFCDCD;
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

    .hy {
      width: 653px;
      height: 112px;
      background: linear-gradient(135deg, #FFC308 0%, #F6874F 100%);
      border-radius: 30px;
      margin: 40px auto 0 auto;
      padding: 23px 45px 0 50px;
      position: relative;
      z-index: 9;
      box-sizing: border-box;
      .text {
        font-size: 24px;
        color: #fff;
        font-weight: bold;
      }

      .space-between {
        margin-top: 4px;

        .num {
          font-size: 20px;
          color: #fff;
          font-weight: bold;
        }

        .copy {
          width: 34px;
          height: 34px;
        }
      }
    }
  }

  .cont {
    width: 100%;
    background: #FFFFFF;
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

    .line {
      text-align: center;
      font-size: 22px;
      color: #C0C0C0;
      width: 608px;
      height: 2px;
      margin: 53px auto 0 auto;
      padding-top: 20px;
      border-top: 1px solid #F2F2F2;
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
        color: #B09B99;
        margin-left: 14px;
      }

      .text1 {
        font-size: 24px;
        color: #7D7D82;
      }

      .copy {
        width: 100%;
        height: 65px;
        background: #FFF1EF;
        border-radius: 21px;
        padding: 0 45px 0 42px;
        margin-top: 26px;
        box-sizing: border-box;
        &.copy1 {
          height: 102px;
          background: #F3F3F3;
          padding: 0 33px 0 40px;
        }

        .flex-box {
          width: 156px;
          height: 62px;
          background: #DC5242;
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
        height: 623px;
        background: #FFFFFF;
        border-radius: 20px;
        padding: 90px 78px 0 63px;
        box-sizing: border-box;
        .wenhao {
          width: 40px;
          height: 40px;
        }

        .text {
          font-size: 38px;
          color: #7D7D82;
          margin-left: 10px;
          font-weight: bold;
        }

        .text1 {
          font-size: 26px;
          color: #7D7D82;
          margin-top: 30px;
          line-height: 37px;

          .tit {
            font-weight: 600;
          }

          .lv {
            color: #DC5242;
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
          background: #DC5242;
          border-radius: 20px;
          font-size: 32px;
          color: #fff;
          margin-top: 50px;
        }
      }

      .box1 {
        width: 654px;
        height: 699px;
        background: #FFFFFF;
        border-radius: 20px;
        padding: 71px 56px 0 56px;
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
          color: #7D7D82;
          font-weight: bold;
          margin-left: 13px;
        }
        .text1 {
          font-size: 26px;
          color: #B9B9B9;
          font-weight: 500;
          margin-top: 13px;
          uni-text {
            color: #DC5242;
          }
        }
        .input-box {
          width: 100%;
          height: 120px;
          background: #F3F3F3;
          border-radius: 20px;
          margin-top: 34px;
          padding: 0 37px;
          .input {
            width: 280px;
          }
        }
        .text2 {
          font-size: 26px;
          color: #B9B9B9;
          font-weight: bold;
        }
        .line {
          width: 1px;
          height: 51px;
          background: #D8D8D8;
          margin: 0 13px;
        }
        .text3 {
          font-size: 26px;
          font-weight: 500;
          color: #DC5242;
        }
        .tit {
          font-size: 24px;
          color: #DC5242;
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
          background: #DC5242;
          border-radius: 20px;
          font-size: 32px;
          color: #fff;
          margin-top: 28px;
        }
        .text4 {
          text-align: center;
          font-size: 32px;
          color: #B9B9B9;
          margin-top: 34px;
        }
        .text5 {
          text-align: center;
          font-size: 24px;
          color: #B9B9B9;
          margin-top: 80px;
          uni-text {
            font-size: 50px;
            color: #DC5242;
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
            background: #F3F3F3;
            border-radius: 19px;
            font-size: 50px;
            color: #7D7D82;
            font-weight: bold;
          }
          .bi {
            font-size: 35px;
            color: #7D7D82;
          }
        }
        .last-time {
          text-align: center;
          margin-top: 60px;
          font-size: 22px;
          color: #C0C0C0;
        }
      }
    }
  }
</style>
