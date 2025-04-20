<template>
  <div class="login-page">
    <div class="shell">
      <!--      <div id="img-box">-->
      <!--        <img src="../assets/img/11.png" alt="">-->
      <!--      </div>-->
      <form method="post" @submit.prevent>
        <div id="form-body">
          <div id="welcome-lines">
            <div id="w-line-1">HI,Sika</div>
            <div id="w-line-2">Welcome Back</div>
          </div>
          <div id="input-area">
            <div class="f-inp">
              <input type="text" placeholder="Customer Login Name" v-model="loginUser.username">
            </div>
            <div class="f-inp" v-if="currentType === 'REGISTER'">
              <input type="text" placeholder="Customer Nickname" v-model="loginUser.nickname">
            </div>
            <div class="f-inp">
              <input type="password" placeholder="Customer Password" v-model="loginUser.password">
            </div>
          </div>
          <div id="submit-button-cvr">
            <button id="submit-button" @click="handleClick">{{ currentType }}</button>
          </div>
          <div id="forgot-register">
            <span>Forgot Password?</span>
            <span @click="handleTipsSwitch">{{ inOrUpTips }}</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useLoginHooks} from "@/hooks/useLoginHooks.ts";
import {ref} from 'vue'

const {loginUser, handleLogin, handleRegister} = useLoginHooks();

const inOrUpTips = ref<'Don\'t have account?' | 'already has account!'>('Don\'t have account?')
const currentType = ref<'LOGIN' | 'REGISTER'>('LOGIN')
const handleClick = ref<() => void>(handleLogin)

const handleTipsSwitch = () => {
  if (currentType.value === 'LOGIN') {
    currentType.value = 'REGISTER'
    inOrUpTips.value = 'Don\'t have account?'
    handleClick.value = handleRegister
  } else {
    currentType.value = 'LOGIN'
    inOrUpTips.value = 'already has account!'
    handleClick.value = handleLogin
  }
}

</script>

<style scoped lang="scss">
.login-page {
  background: linear-gradient(45deg, #FBDA61, #FF5ACD);
  /*background: linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0));*/
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.shell,
form {
  position: relative;
}


.shell {
  display: flex;
  justify-content: center;

  #img-box {
    width: 330px;
    height: 520px;

    img {
      height: 100%;
    }
  }
}

form {
  width: 562px;
  height: 520px;
  background-color: #fff;
  box-shadow: 0 15px 40px #B6354E;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  #form-body {
    width: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    #welcome-lines {
      width: 100%;
      text-align: center;
      line-height: 1;

      #w-line-1 {
        color: #7F7F7F;
        font-size: 50px;
      }

      #w-line-2 {
        color: #9C9C9C;
        font-size: 30px;
        margin-top: 17px;
      }
    }

    #input-area {
      width: 100%;
      margin-top: 40px;

      .f-inp {
        padding: 7px 25px;
        border: 2px solid #6E6D6D;
        line-height: 1;
        border-radius: 20px;
        margin-bottom: 15px;

        input {
          font-size: 20px;
          width: 100%;
          padding: 0;
          margin: 0;
          border: 0;
        }

        input::placeholder {
          color: #B9B9B9;
        }

        input:focus {
          outline: none !important; /* 去除默认的聚焦边框 */
          border: none !important; /* 确保没有边框 */
        }
      }
    }

    #submit-button-cvr {
      margin-top: 20px;

      #submit-button {
        display: block;
        width: 100%;
        color: #FFFFFF;
        font-size: 14px;
        margin: 0;
        padding: 14px 40px;
        border: 0;
        background-color: #F5506E;
        border-radius: 25px;
        line-height: 1;
        cursor: pointer;
      }
    }

    #forgot-register {
      text-align: center;
      margin-top: 10px;

      span {
        color: #868686;
        font-size: 12px;
        text-decoration: none;
        margin-right: 30px;
      }
    }
  }
}
</style>