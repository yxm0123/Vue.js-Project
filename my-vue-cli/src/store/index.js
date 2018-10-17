
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const cart  = JSON.parse(localStorage.getItem('cart')) ||[]
const store =new Vuex.Store({
    state:{
        cart
    },
    mutations:{
        //添加商品到购物车中
        addCart(state,payload){

            const goods = state.cart.find(item=>{
                item.id===(payload.id - 0)
            })

            if(goods){
                //如果已经存在就添加其数量
                goods.count +=payload.count
            }else{
                state.cart.push({
                    id:payload.id,
                    count:payload.count
                })
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
          

        },
        //修改购物车
        changeCart(state,payload){
            state.cart = payload.newList

        }
    }, 
    
    //相当于计算属性
    getters:{

        allCount(state){
            let count = 0
            state.cart.forEach(item=>{
                count+=item.count
            })

            return count
        },
        //把ids传递给添加购物车中的ids
        ids(state){
            let idStr = ''
            state.cart.forEach(item=>{
                idStr += item.id + ','
            })
            return idStr.slice(0,-1)
        },
        //根据id获取count的值
        //返回值：{id1：count,id2:count}
        // 返回值：{ 88: 1, 89: 2 }
        id2Count(state){
            let obj={}
            state.cart.forEach(item=>{
                obj[item.id] = item.count
            })
            return obj
        }
    },

})

export default store