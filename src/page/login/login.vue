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
                
                <div class="__button">
                    <xmv-button type="primary" @click="handleFormClick" :disabled="buttonDisabledRef">提交</xmv-button>
                </div>
            </xmv-form>
        </div>
    </div>
</template>

<script>
import {defineComponent, onMounted, reactive ,ref} from 'vue'
import http from 'util/http'
import {blobHttp} from 'util/http'
import {loadingOpen,loadingClose,messageDialog} from 'util/dom'
import {useRouter} from 'vue-router'
import {setUser} from 'data/runtime'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const router = useRouter()
        const formRef = ref(null)
        const buttonDisabledRef = ref(false)

        const srcRef = ref('')

        const formMode = reactive({
            name : 'admin',
            password : 'syl118100',
            validateNum : '9999'
        })

        const formRule = reactive({
            name : [{required : true}],
            password : [{required : true}],
            validateNum : [{required : true}]
        })

        const handleImgClick = ()=>{
            createCaptcha()
        }
        const handleFormClick = ()=>{
            formRef.value.validate().then(()=>{
                loadingOpen()
                http.post('login' ,formMode).then(data=>{
                    messageDialog('登录成功，正在为您跳转...','success',2000)
                    buttonDisabledRef.value = true
                    setUser(data)
                    setTimeout(()=>{
                        router.push('/frame/user')
                    } ,2000)
                }).catch(error=>{
                    createCaptcha()
                    formMode.validateNum = ''
                    messageDialog(error.message ,'error')
                }).finally(()=>{
                    loadingClose()
                })
            })
        }

        const createCaptcha = ()=>{
            blobHttp.get('captcha').then((data)=>{
                const url = URL.createObjectURL(data.data)
                srcRef.value = url
            })
        }

        onMounted(()=>{
            createCaptcha()
        })

        return {formRef ,formMode ,formRule ,srcRef ,buttonDisabledRef,
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

        .__button{
            padding-left: 100px;
        }
    }
</style>
