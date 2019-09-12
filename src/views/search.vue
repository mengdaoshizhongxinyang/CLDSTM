<template>
  <div class="main">
    <div class="search">
      <CardTitle title="条件"></CardTitle>
      <div class="search-content">
        <div style="width:100%;display:flex;justify-content:space-between;padding:12px 0">
          <div style="color:#fff">
            <span style="color:#189fff">|&nbsp;&nbsp;</span>添加表格
          </div>
          <div style="color:#fff">
            <span style="color:#189fff">|&nbsp;&nbsp;</span>添加表格
          </div>
          <div style="color:#fff">
            <span style="color:#189fff">|&nbsp;&nbsp;</span>添加表格
          </div>
          <div></div>
        </div>
        <div style="background:#a6a6a6;width:100%;height:1px"></div>
        <div class="search-filed-table">
          <div class="search-filed-table-th" v-for="(item,i) in data" :key="i">
            <div class="search-filed-table-td">
              <SearchSelect
                :data="table"
                :plus="item.tableName!==''"
                :value="item.tableName"
                @onChange="e=>change(e,i)"
                @add="addFile(i)"
                @del="del(i)"
              ></SearchSelect>
            </div>

            <div v-for="(it,j) in item.data" :key="j" class="search-filed-table-tr">
              <div style="width:33%"></div>
              <div class="search-filed-table-td">
                <SearchSelect
                  :data="tableData[item.tableName]"
                  :value="it.filedName"
                  @onChange="e=>fileChange(e,i,j)"
                  @add="addFile(i)"
                  @del="delFile(i,j)"
                ></SearchSelect>
              </div>
              <div class="search-filed-table-td" style="padding-top:14px" >
                  <a-range-picker v-if="tableType[it.filedName]==='time'" v-model="item.data[j].keyName">
                    <a-icon slot="suffixIcon" type="smile" />
                  </a-range-picker>
                <input type="text" v-model="item.data[j].keyName" style="color:#000" v-else/>
              </div>
            </div>
          </div>
          <div class="search-filed-table-th">
            <div class="search-filed-table-td" style="cursor:pointer" @click="add">
              <a-icon type="plus" stlye="color:#189fff;margin-top:21px;margin-right:8px;"></a-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <div style="display:flex;justify-content:flex-end">
        <span style="font-size:40px;line-height:80px">在线政工系统</span>
        <div
          style="width:208px;background:#ffffff11;text-align:center;margin-left:12px;padding:12px 0"
        >
          <div>南湖区公安分局</div>
          <div style="margin-top:8px">{{time}}</div>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;margin:24px 0">
        <div class="button" style="margin-right: 24px;" @click="reset">重置</div>
        <div
          @click="handleSubmit"
          style="background:linear-gradient(90deg,#4399f0, #4555ff);border:0"
          class="button"
        >搜索</div>
      </div>
      <div class="table-div">
        <CardTitle title="搜索结果"></CardTitle>
        <div class="table-content">
          <div class="table-head">
            <div style="width:238px;font-size:18px;line-height:18px">
              <span style="color:#189fff">|&nbsp;&nbsp;</span>人员姓名
            </div>
            <div style="width:238px;font-size:18px;line-height:18px">
              <span style="color:#189fff">|&nbsp;&nbsp;</span>所在科室
            </div>
            <div style="width:238px;font-size:18px;line-height:18px">
              <span style="color:#189fff">|&nbsp;&nbsp;</span>性别
            </div>
          </div>
          <div style="height:1px;width:100%;background:#fff;margin:12px 0"></div>
          <div class="table-list">
            <div v-for="(item,i) in userList" :key="i" class="table-td">
              <div class="table-tr">{{item.FName}}</div>
              <div class="table-tr">{{item.FBrNOName}}</div>
              <div class="table-tr">{{item.FGender}}</div>
              <div class="table-tr" style="background:#ffffff11" @click="getInfo(item.FItemID)" >
                <a-icon type="file-text" style="color:#29afff;margin-right:12px"></a-icon>
                <span style="color:#29afff">查看详细表格</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal :visible="visible" @cancel="handleCancel" @ok="handleCancel" :width="640">
      <table>
        <tr>
          <td>姓名</td>
          <td>{{user.name}}</td>
          <td>性别</td>
          <td>{{user.gender}}</td>
        </tr>
        <tr>
          <td>职务</td>
          <td>{{user.fDuty}}</td>
          <td>警号</td>
          <td>{{user.fNumber}}</td>
        </tr>
        <tr>
          <td>参加工作时间</td>
          <td>{{user.fWorkDate}}</td>
          <td>民族</td>
          <td>{{user.femail}}</td>
        </tr>
        <tr>
          <td>身份证</td>
          <td>{{user.fid}}</td>
          <td>政治面貌</td>
          <td>{{user.fzzmm}}</td>
          
        </tr>
        <tr>
          <td>入党时间</td>
          <td>{{user.joinDate}}</td>
          <td>转正时间</td>
          <td>{{user.fjobdate}}</td>
        </tr>
        
      </table>
      <table v-for="(item,i) in user.withTable" :key="i">
          <caption style="caption-side:top">
              {{item.title}}
          </caption>

            <tr>
                <td v-for="(it,j) in item.headData" :key="j">
                    {{ it.content }}
                </td>
            </tr>
            <tr v-for="(it,j) in item.data" :key="j">
                <td v-for="(cell,k) in item.headData" :key="k">
                    {{ it[cell.field] }}
                </td>
            </tr>
            
        </table>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import { Search, SearchPersonal } from "@/api/search.js";
import CardTitle from "@/components/CardTitle.vue";
import SearchSelect from "@/components/SearchSelect.vue";
export default {
  components: {
    CardTitle,
    SearchSelect
  },
  data() {
    return {
      visible: false,
      time: "",
      tableData: {
        YG_EMP: [
          { name: "警号", value: "FNumber" },
          { name: "姓名", value: "FName" },
          { name: "民族", value: "FEmail" },
          { name: "手机号", value: "FPhone" },
          { name: "身份号号", value: "FID" },
          { name: "职务", value: "FDuty" },
          { name: "部门编号", value: "FDeptID" },
          { name: "工作单位", value: "FUnitID" },
          { name: "测评积分", value: "FBillerID" },
          { name: "政治面貌", value: "Fzzmm" },
          { name: "职务编号", value: "FJobID" },
          { name: "聘任日期", value: "fjobdate" ,type:'time'},
          { name: "入党时间", value: "FPaty" ,type:'time'},
          { name: "参加工作时间", value: "FWorkDate" ,type:'time'},
          { name: "工号", value: "FVirtual" }
        ],
        nh_resume_s: [
          { name: "起始日期", value: "En_Star",type:'time' },
          { name: "起止日期", value: "EN_entime" ,type:'time'},
          { name: "所在单位（机构)", value: "EN_Schoolname" },
          { name: "身份或职务", value: "EN_zyname" },
          { name: "职务级别", value: "en_levels" }
        ],
        YG_reanks_s: [
          { name: "职级批准文号", value: "En_wennumber" },
          { name: "职级层次", value: "EN_zcname" },
          { name: "批准日期", value: "EN_pzdate",type:'time' }
        ],
        YG_XL_S: [
          { name: "开学时间", value: "EN_star" ,type:'time'},
          { name: "毕业日期", value: "EN_graduate" ,type:'time'},
          { name: "学历", value: "EN_record" },
          { name: "学校名称", value: "EN_SchoolName" },
          { name: "专业名称", value: "EN_specialty" }
        ],
        YG_yeartest: [
          { name: "考核年度", value: "EN_ytest" },
          { name: "考核评论", value: "EN_comment" }
        ],
        YG_NewInfo_S: [
          { name: "批准日期", value: "EN_ratifytime" ,type:'time',type:'time'},
          { name: "同级连续起算日期", value: "En_success" ,type:'time'},
          { name: "批准文号", value: "EN_zc" },
          { name: "职级层次", value: "EN_levels" },
          { name: "职级", value: "En_ky" }
        ],
        YG_Work_S: [
          { name: "加班日期", value: "EN_years" ,type:'time'},
          { name: "办公室", value: "EN_sundDay" },
          { name: "主要内容", value: "En_daywork" }
        ],
        YG_XC_S: [
          { name: "授（晋）衔日期", value: "En_honour" ,type:'time'},
          { name: "授（晋）衔起算日期", value: "En_starhonour" ,type:'time'},
          { name: "衔称", value: "EN_xname" },
          { name: "授（晋）衔令号", value: "EN_Info" }
        ],
        nh_exame_S: [
          { name: "考核季度", value: "en_qoq" },
          { name: "考核年度", value: "EN_year" },
          { name: "备注", value: "EN_remark" },
          { name: "等级", value: "EN_level" },
          { name: "得分", value: "EN_diride" }
        ],
        nh_Leader_S: [
          { name: "考核季度", value: "en_qoq" },
          { name: "考核年度", value: "EN_year" },
          { name: "备注", value: "EN_remark" },
          { name: "等级", value: "EN_level" },
          { name: "得分", value: "EN_diride" }
        ],
        nh_enforceScore_S: [
          { name: "考核年度", value: "EN_year" },
          { name: "考核季度", value: "en_qoq" },
          { name: "执法办案积分", value: "EN_rank" },
          { name: "得分", value: "EN_diride" },
          { name: "备注", value: "EN_remark" },
          { name: "等级", value: "EN_level" }
        ]
      },
      data: [],
      table: [
        {
          name: "民警基本信息",
          value: "YG_EMP"
        },
        {
          name: "履历信息",
          value: "nh_resume_s"
        },
        {
          name: "职称信息集",
          value: "YG_reanks_s"
        },
        {
          name: "学历信息集",
          value: "YG_XL_S"
        },
        {
          name: "民警年度考核",
          value: "YG_yeartest"
        },
        {
          name: "职级信息集",
          value: "YG_NewInfo_S"
        },
        {
          name: "加班情况",
          value: "YG_Work_S"
        },
        {
          name: "衔称信息",
          value: "YG_XC_S"
        },
        {
          name: "民警个人考核",
          value: "nh_exame_S"
        },
        {
          name: "序列人员考核",
          value: "nh_Leader_S"
        },
        {
          name: "执法办案积分",
          value: "nh_enforceScore_S"
        }
      ],
      tableType:{},
      userList: [],
      user: {}
    };
  },
  methods: {
    setTime() {
      this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      setTimeout(() => {
        this.setTime();
      }, 1000);
    },
    add() {
      this.data.push({ tableName: "", data: [] });
    },
    del(index) {
      this.data.splice(index, 1);
    },
    addFile(index) {
      this.data[index].data.push({ filedName: "", keyName: "" });
    },
    delFile(index, j) {
      this.data[index].data.splice(j, 1);
    },
    reset() {
      this.data = [];
      this.userList = [];
    },
    handleSubmit() {
      let temp = JSON.parse(JSON.stringify(this.data));
      for (let index = 0; index < temp.length; index++) {
        for (let j = 0; j < temp[index].data.length; j++) {
          if (
            temp[index].data[j].filedName === "" ||
            temp[index].data[j].keyName === ""
          ) {
            temp[index].data.splice(j, 1);
            j--;
          }
        }
        if (temp[index].data.length === 0) {
          temp.splice(index, 1);
          index--;
        }
      }
      Search(temp).then(res => {
        this.userList = res.data;
      });
    },
    change(e, i) {
      this.data[i].data = [];
      this.data[i].tableName = e;
    },
    fileChange(e, i, j) {
      this.data[i].data[j].filedName = e;
    },
    getInfo(id) {
      SearchPersonal(id).then(res => {
          console.log(res.data)
        this.visible = true;
        this.user = res.data;
      });
    },
    handleCancel() {
      this.visible = false;
    }
  },
  mounted() {
    this.setTime();
    Object.keys(this.tableData).forEach(element=>{
        this.tableData[element].forEach(ele => {
            if(ele.type==='time')
            {
                this.tableType[ele.value]=ele.type
            }
        });
    })
  }
};
</script>

<style lang="less" scoped>
.main {
  background: no-repeat, url("/img/backimg.jpg");
  padding: 40px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: #fff;
}
.search {
  width: 776px;
  height: 100%;
  background: #ffffff11;
  display: flex;
  flex-direction: column;
}
.search-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 24px 24px;
}

.search-filed-table {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.search-filed-table-th {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.search-filed-table-tr {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.search-filed-table-td {
  width: 33%;
  height: 60px;
  background: #ffffff11;
  margin-bottom: 2px;
}
.table {
  width: 1040px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.button {
  border: 2px solid #189fff;
  border-radius: 3px;
  width: 208px;
  height: 64px;
  text-align: center;
  line-height: 64px;
  font-size: 24px;
}
.table-div {
  width: 100%;
  height: 100%;
  background: #ffffff11;
  display: flex;
  flex-direction: column;
}
.table-content {
  width: 100%;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.table-head {
  display: flex;
}
.table-list {
  overflow-x: hidden;
  height: 100%;
}
.table-td {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
}
.table-tr {
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  width: 24%;
}
table{
    border-collapse: collapse;
}
table,tr,th,td{
  border: 1px solid #d6d6d6;
}
td{
    padding:4px 8px;
}
</style>