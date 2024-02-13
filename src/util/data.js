// 判断数据是否为空
export function isEmpty(obj ,withZero = false){

    if (obj == undefined){
        return true
    }
    else if(typeof obj == "string"){
        return !obj
    }
    else if(typeof obj == "object"){
        if (obj instanceof Array)
            return obj.length == 0
        else
            return !obj
    }else if(typeof obj == "number"){
      if (withZero){
          return obj == 0
      }
      return false
    }
}