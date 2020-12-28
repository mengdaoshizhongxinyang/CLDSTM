<template>
  <div>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="articles">
      <template #renderItem="item">
        <a-list-item key="item.title">
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.name }}</a>
          </a-list-item-meta>
          {{moment(item.mtime).format('YYYY-MM-DD HH:mm')}}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment"
export default {
  computed: {
    ...mapGetters(["fileList"]),
    articles() {
      // return this.fileList['static']['ProjectRecord']
      return Object.values(this.fileList["static"].children['project'].children).filter(item=>{
        return item.type=='article'
      });
    },
  },
  data(){
    return{
      pagination: {
        pageSize: 5,
      },
    }
  },
  methods:{
    moment
  }
};
</script>

<style lang="less" scoped>
</style>