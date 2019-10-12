<template>
  <div>
    <div v-for="(it,i) in Object.keys(attributes.attributes)" :key="i">
      <div>{{it}}</div>
      <a-input v-if="attributes.attributes[it].type==='text'" v-model="attributes.attributes[it].value" @input="changeAttribute()"></a-input>
      <a-input v-else-if="attributes.attributes[it].type==='string'" v-model="attributes.attributes[it].value" @input="changeAttribute()"></a-input>
      <a-input v-else-if="attributes.attributes[it].type==='slot'" v-model="attributes.attributes[it].value" @input="changeAttribute()"></a-input>
      <iconList v-else-if="attributes.attributes[it].type==='icon'" :value="attributes.attributes[it].value" @change="e=>onChange(e,it)"></iconList>
    </div>
  </div>
</template>

<script>
import iconList from "./iconSelect/iconList.vue";
export default {
  props: {
    attributes: {
      type: Object
    }
  },
  components: {
    iconList
  },
  model:{
    prop:'attributes',
    event:'update'
  },
  methods:{
    onChange(e,it){
      this.attributes.attributes[it].value=e
      this.changeAttribute()
    },
    changeAttribute(){
      this.$emit('update',this.attributes)
    }
  }
};
</script>

<style lang="less" scoped>
</style>