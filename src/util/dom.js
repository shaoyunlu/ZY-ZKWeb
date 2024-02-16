import {XmvLoading} from 'xiaomeng-vue-ui'
import {XmvMessage} from 'xiaomeng-vue-ui'

let loading

export function loadingOpen (){
    loading = XmvLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.3)',
    })
}

export function loadingClose(){
    loading.close()
}

export function message(text='操作成功',type='success'){
    XmvMessage({
        message : text,
        type : type
    })
}