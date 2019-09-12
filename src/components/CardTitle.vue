<template>
    <div class="card-title">
        {{title}}
    </div>
</template>

<script>
    export default {
        props:{
            title:String,
        }
    }
</script>

<style lang="less" scoped>
.card-title{
    width:192px;
    height: 48px;
    padding-left:20px;
    background: #ffffff22;
    font-size: 20px;
    display: flex;
    align-items:center;
    color:#fff;
    clip-path: polygon(0 0,100% 0,144px 100%,0 100%);
}
</style>