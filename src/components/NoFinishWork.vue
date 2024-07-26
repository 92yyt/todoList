<template>
    <div>
        <header>
            <span>正在进行({{ count }})</span>
        </header>
        <div class="workBox">
            <div v-for="(item,index) in NoActiveList" :key="index" 
            @mouseenter="handleMouseEnter(item.id)" @mouseleave="handleMouseLeave(item.id)" >
                <a-tag color="processing" v-if="!item.Active" class="workItem">
                    <template #icon>
                        <sync-outlined :spin="true" />
                    </template>
                    {{item.content}}
                    <check-circle-two-tone two-tone-color="#23AAF2" class="DoIcon" v-if="item.id == showIndex" @click="finishWork(item.id)" />
                    <close-circle-two-tone two-tone-color="red" class="DoIcon" v-if="item.id == showIndex" @click="removeWork(item.id)"/>
                    <EditTwoTone two-tone-color="#ffcf48" class="DoIcon" v-if="item.id == showIndex" @click="updateWorkItem(item)"/>
                </a-tag>
            </div>
        </div>
        <a-modal v-model:open="open" :title="updateTitle" @ok="handleOk">
            <a-input class="workInput" v-model:value="updateStr"/>
        </a-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { SyncOutlined } from '@ant-design/icons-vue';
    import { CheckCircleTwoTone,CloseCircleTwoTone,EditTwoTone } from '@ant-design/icons-vue';
    export default {
        name:"NoFinishWork",
        components:{
            SyncOutlined,
            CheckCircleTwoTone,
            CloseCircleTwoTone,
            EditTwoTone
        },
        data(){
            return{
                showIndex: '',
                open: false,
                updateStr:'',
                updateTitle:'修改任务',
                updateIngId:""
            }
        },
        computed: {
            ...mapGetters('work', ['workList']), // 使用模块名称
            count(){
                return this.NoActiveList.length
            },
            NoActiveList(){
                return this.workList.filter((item) => !item.Active)
            }
        },
        methods:{
            ...mapActions('work', ['addWork','updateWork']),
            handleMouseEnter(id){
                this.showIndex = id
            },
            handleMouseLeave(id){
                console.log(id)
                this.showIndex = '-1'
            },
            finishWork(id){
                const index = this.workList.findIndex(item => item.id === id); 
                if (index !== -1) {
                    this.workList[index].Active = true
                }
                this.updateWork(this.workList)
            },
            removeWork(id){
                let newList = this.workList.filter((item) => item.id !== id);  
                this.updateWork(newList);  
            },
            handleOk (){
                console.log(this.updateStr)
                const index = this.workList.findIndex(item => item.id === this.updateIngId);
                if (index !== -1) {
                    this.workList[index].content = this.updateStr || this.workList[index].content
                }
                this.updateWork(this.workList)
                this.open = false;
                this.updateIngId = ""
                this.updateStr = ""
            },
            updateWorkItem(item){
                this.updateTitle = "修改任务-" +item.content
                this.open = true
                this.updateIngId = item.id
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