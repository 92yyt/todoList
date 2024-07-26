<template>
  <div class="hello">
    <div class="inputBox">
      <a-input-group compact>
        <a-input class="workInput" v-model:value="work"/>
        <a-button class="workSumit" type="primary"  @click="submitWork">Submit</a-button>
      </a-input-group>
    </div>
    
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return {
      work:"",
    }
  },
  computed: {
    ...mapGetters('work', ['workList']) // 使用模块名称
  },
  methods: {
    ...mapActions('work', ['addWork']),
    submitWork() {
      console.log(this.work)
      if(this.work.trim() !== ""){
        this.addWork({
          id:Date.now()+this.workList.length,
          content:this.work,
          Active:false,
          date:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })
        this.work = "";
      }else{
        message.error("Please enter the content")
      }
      console.log(this.workList[0])
    }
  }

}
</script>


<style lang="scss" scoped>
.inputBox{
  margin: 20px;
  text-align: center;

  .workInput{
    width: 500px;
    height: 35px;
    font-size: 15px;
    text-align: left;
  } 
  .workSumit{
    height: 35px;
    font-size: 15px;
    background: #23AAF2;
  }
}

</style>
