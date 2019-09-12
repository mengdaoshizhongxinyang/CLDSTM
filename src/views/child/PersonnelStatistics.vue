<template>
  <div style="height:272px">
    <CardTitle title="人员统计" style="position:absolute"></CardTitle>
    <div style="width:300px;height:100%;padding-left:24px;color:#fff;line-height:14px">
      <div style="height:72px"></div>
      <div style="display:flex;justify-content: start;width:300px">
        <div style="width:120px">
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>男性人员
          </div>
          <div style="display:flex;start: space-between;margin-top:24px">
            <div style="width:14px;height:14px;background:#326c91;margin-right:8px"></div>党员
          </div>
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>发展对象
          </div>
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>年龄≤25
          </div>
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>年龄31-35
          </div>
        </div>
        <div style="width:120px">
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>女性人员
          </div>
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#326c91;margin-right:8px"></div>预备党员
          </div>
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>入党积极分子
          </div>
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>年龄26-30
          </div>
          <div style="display:flex;start: space-between">
            <div style="width:14px;height:14px;background:#3fb1e3;margin-right:8px"></div>年龄≥36
          </div>
        </div>
      </div>
    </div>
    <div ref="pie" style="width:340px;height:242px"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>