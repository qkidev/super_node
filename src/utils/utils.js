import { Toast } from 'vant';
const h5Copy = {
  methods: {
    h5Copy(content) {
      if (!document.queryCommandSupported('copy')) {
        // 不支持
        return false
      }

      let textarea = document.createElement("textarea")
      textarea.value = content
      textarea.readOnly = "readOnly"
      document.body.appendChild(textarea)
      textarea.select() // 选择对象
      textarea.setSelectionRange(0, content.length) //核心
      document.execCommand("copy") // 执行浏览器复制命令
      textarea.remove()
      Toast('复制成功');

    }
  }
}

const vertify = {
  methods: {
    // 验证电话号码
    isPhoneNumber(phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        return false;
      }
      return true
    },
    // 验证正整数
    isAllNumber(number) {
      if ((/^\d{1,}$/.test(number))) {
        return false;
      }
      return true

    },
    // 验证身份证
    isIdCards(ids) {
      var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (idcardReg.test(ids)) {
        return false;
      }
      return true;
    },
    // 验证英文和数字组合
    isEnAndNumber(str) {
      var reg = /^[a-zA-Z0-9]+$/;
      if (reg.test(str)) {
        return false;
      }
      return true;
    },
    // 验证带小数点的数字
    isFloatNumber(str) {
      var reg = /^([1-9]\d*\.?\d*)|(0\.\d*[1-9])$/;
      if (reg.test(str)) {
        return false;
      }
      return true;
    },
		/**
		 * 乘法函数，用来得到精确的乘法结果
		 * @param {Object} arg1
		 * @param {Object} arg2
		 */
    accMul(arg1, arg2) {
      var m = 0;
      m += this.deal(arg1);
      m += this.deal(arg2);
      var r1 = Number(arg1.toString().replace(".", ""));
      var r2 = Number(arg2.toString().replace(".", ""));
      return (r1 * r2) / Math.pow(10, m)
    },
		/**
		 * 求小数点后的数据长度
		 */
    deal(arg) {
      var t = 0;
      try {
        t = arg.toString().split(".")[1].length
      } catch (e) {
        console.log(e)
      }
      return t;
    }
  }
}

// 初始化智能合约
import { ethers } from "ethers";
const initEth = {
  data() {
    return {
      provider: {},
      signer: {},
      chainId: 0
    }
  },
  async created() {
    if (typeof ethereum == "undefined") {
      Toast('请安装metamask插件、或者使用qkpay打开')
    } else {
      // const qkiUrk = 'https://hz.node.quarkblockchain.cn ';
      // let customHttpProvider = new ethers.providers.JsonRpcProvider(qkiUrk);
      window.ethereum.enable();
      let customHttpProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );

      if (window.ethereum.isMetaMask) {
        window.ethereum
          .request({
            method: 'net_version'
          })
          .then((chainId) => {
            //可以把
            if (chainId != "20181205")
              Toast('请使用QKI主网,请切换到QKI主网')
            this.chainId = chainId;
          })
          .catch((error) => {
            // If the request fails, the Promise will reject with an error.
            console.log(error)
          });
      }
      window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have a very good reason not to.
        if (chainId != "0x133f0d5") {
          Toast('请使用qki主网')
        }
        // setTimeout(function () {
        //   window.location.reload()
        // }, 2500)
      });

      this.provider = customHttpProvider;
      this.signer = customHttpProvider.getSigner();
    }
  },
  methods: {
    async isQKI() {
      let network = await this.provider.getNetwork();
      let networkVersion = network.chainId;
      if (networkVersion != 20181205) {
        Toast('你当前没有使用QKI主网，请切换主网为QKI');
        return false
      }
      return true;
    },
    to(fnPromise){
      return fnPromise.then(res => [null, res]).catch(error => [error]);
    },
  }
}


const timeUtils = {
  data(){
    return {
      day: '0',
      hour:'00',
      minutes: '00',
      seconds: '00'
    }
  },
  methods: {
    // 时间戳转时间
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 倒计时
    countDown(maxtime, fnCallback) {
      let distance = maxtime;
      if (maxtime >= 0) {
        // 距离结束剩下多少天
        let day = Math.floor(maxtime / 86400);
        // 得到剩下的分钟数
        maxtime -= day * 86400;
        let hour = Math.floor(maxtime / 3600);
        // 得到剩下的分钟数
        maxtime -= hour * 3600;
        let minutes = Math.floor(maxtime / 60);
        let seconds = Math.floor(maxtime % 60);
        --distance;
        this.day = day.toString();
        if (hour < 10) {
          hour = "0" + hour;
        }
        this.hour = hour.toString();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        this.minutes = minutes.toString();
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        this.seconds = seconds.toString();
        this.timer = setTimeout(() => {
          this.countDown(distance, fnCallback);
        }, 1000);
        return {
          status: 'ing',
          day,
          hour,
          minutes,
          seconds
        }
      } else {
        clearInterval(this.timer);
        fnCallback && fnCallback();
      }
    },
  }
}

export {
	h5Copy,
  vertify,
  initEth,
  timeUtils
}