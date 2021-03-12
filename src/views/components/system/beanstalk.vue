<template>
  <div>
      
  </div>
</template>

<script>
import {
    user
} from "@config/api.js"
export default {
    components: {
    },
    data(){
        return{

        }
    },
    mounted(){
        this.getStat();
    },
    methods:{
        getStat(){
            this.getRequest('beansTalk/getStat').then(res=>{
                console.error(res);
            }).catch(err=>{
                console.error('err',err);
            });
        }
    }
}
</script>

<style>

</style>