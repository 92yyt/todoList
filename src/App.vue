<template>
  <div>
    <header :style="backgroundStyle">
      <span>ToDoList</span>
    </header>
    <HelloWorld/>
    <div class="WorkBox">
      <div class="childwork"><NoFinishWork/></div>
      <div class="childwork"><FinishWork/></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FinishWork from './components/FinishWork.vue'
import NoFinishWork from './components/NoFinishWork.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    HelloWorld,
    FinishWork,
    NoFinishWork
  },
  data(){

  },
  computed:{
    ...mapGetters('work', ['workList']),
    proportion(){
      let active = this.workList.filter((item) => item.Active).length
      let length = this.workList.length
      if(length == 0)
        return "100%"
      return ( (active/length) * 100 ).toFixed(2) + '%'
    },
    backgroundStyle(){
      return {
        background:`linear-gradient(to right, #23AAF2, #F2F2F2 ${this.proportion})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  margin: 0;
  color: #2c3e50;
}
header{
  height: 50px;
  width: 100%;
  background: linear-gradient(to right, #23AAF2, #F2F2F2 100%);
}
header>span{
  display: flex;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
}
.WorkBox{
  display: flex;
  margin: 20px 40px;
  width: calc(100% - 80px);
  .childwork{
    flex: 1;
    margin: 20px;
    min-height: 400px;
    border-radius: 5px ;
  }
}
</style>
