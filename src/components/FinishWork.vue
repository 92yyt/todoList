<template>
    <div>
        <header>
            <span>已经完成({{ count }})</span>
        </header>
        <div class="workBox">
            <div v-for="(item,index) in ActiveList" :key="index"   
            @mouseenter="handleMouseEnter(item.id)" @mouseleave="handleMouseLeave(item.id)">
                <a-tag color="success" v-if="item.Active" class="workItem">
                    <template #icon>
                        <check-circle-outlined/>
                    </template>
                    {{item.content}}
                    <close-circle-two-tone two-tone-color="red" class="DoIcon" v-if="item.id == showIndex" @click="removeWork(item.id)"/>
                </a-tag>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { CheckCircleOutlined, CloseCircleTwoTone } from '@ant-design/icons-vue';

    export default {
        name:"FinishWork",
        components:{
            CheckCircleOutlined,
            CloseCircleTwoTone
        },
        data(){
            return{
                showIndex: ''
            }
            
        },
        computed: {
            ...mapGetters('work', ['workList']),
            count(){
                return this.ActiveList.length
            },
            ActiveList(){
                return this.workList.filter((item) => item.Active)
            }
        },
        methods:{
            ...mapActions('work', ['addWork',"updateWork"]),
            handleMouseEnter(index){
                this.showIndex = index
            },
            handleMouseLeave(index){
                console.log(index)
                this.showIndex = "-1"
            },
            removeWork(id){
                let newList = this.workList.filter((item) => item.id !== id);  
                this.updateWork(newList);  
            }
        }
    }
</script>
<style lang="scss" scoped>
header{
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
    background: linear-gradient(to right, #23AAF2, #fff 90%);
}
header>span{
    height: 30px;
    display: flex;
    width: 120px;
    justify-content: left;
    align-items: center;
    font-size: 15px;
    color: #ffffff;
    text-align: left;
    margin-left: 5px;
}
.workBox{
    display: flex;
    flex-wrap: wrap;

    .workItem{
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        .DoIcon{
            margin-left:5px;
        }
    }
}
</style>