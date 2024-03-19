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

/** 返回一个树形结构  */
export function tranListToTreeDate(listData, rootValue, idKey, pIdKey) {
    let list = Object.assign([], listData)
    const arr = []
    list.forEach(itemD => {
        let item = Object.assign({}, itemD)
        if (item[pIdKey] == rootValue) {
            const children = tranListToTreeDate(list, item[idKey], idKey, pIdKey)
            if (children.length) {
                item.children = children
            }
            arr.push(item)
        }
    })
    return arr
}