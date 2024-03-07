<template>
    <div class="wrap-login-form">
        <div class="login-form">
            <xmv-form :mode="formMode" :rules="formRule" ref="formRef" label-width="100px">
                <xmv-form-item label="账号" prop="name">
                    <xmv-input v-model="formMode.name"/>
                </xmv-form-item>
                <xmv-form-item label="密码" prop="password">
                    <xmv-input v-model="formMode.password" type="password"></xmv-input>
                </xmv-form-item>
                <xmv-form-item label="验证码" prop="validateNum">
                    <xmv-input v-model="formMode.validateNum"></xmv-input>
                    <img style="width: 125px; height: 32px;margin-left: 10px;" :src="srcRef" @click="handleImgClick"/>
                </xmv-form-item>
                <xmv-form-item label=" ">
                    <xmv-button type="primary" @click="handleFormClick">提交</xmv-button>
                </xmv-form-item>
            </xmv-form>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive ,ref} from 'vue'
import http from 'util/http'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const formRef = ref(null)

        const formMode = reactive({
            name : 'admin',
            password : '123456',
            validateNum : '9999'
        })

        const formRule = reactive({
            name : [{required : true}],
            password : [{required : true}],
            validateNum : [{required : true}]
        })

        const captchaUrl = 'http://127.0.0.1:8080/captcha'
        const srcRef = ref(captchaUrl)
        const handleImgClick = ()=>{
            srcRef.value = captchaUrl + '?time=' + new Date().getTime()
        }
        const handleFormClick = ()=>{
            formRef.value.validate().then(()=>{
                http.post('login' ,formMode).then(data=>{

                })
            })
        }

        return {formRef ,formMode ,formRule ,srcRef ,
                handleImgClick ,handleFormClick}
    }
})
</script>

<style lang="less">

    .wrap-login-form{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-form{
        width: 600px;

        .xmv-input{
            width: 260px;
        }

        .xmv-form-item.is-required .xmv-form-item__label:before {
            content: "";
            color: var(--xmv-color-danger);
            margin-right: 4px;
        }
    }
</style>
