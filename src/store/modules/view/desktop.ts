
import { ReturnGetters, Store, ActionContext } from '@/types/store';
import modal  from 'ant-design-vue/lib/modal';
import { ActionTree } from 'vuex';
export const SET_RUNING_APPS = 'SET_RUNING_APPS'
export const CLOSE_RUNING_APPS = 'CLOSE_RUNING_APPS'
export const ACTIVE_RUNING_APPS = 'ACTIVE_RUNING_APPS'
export const SET_FILELIST = 'SET_FILELIST'
export const CREATE_FILE = 'CREATE_FILE'
export const MERGE_APPS = 'MERGE_APPS'
export const MINIMIZE_APPS = 'MINIMIZE_APPS'
export const SET_FILETYPES = 'SET_FILETYPES'
export const UPDATE_FILENAME='UPDATE_FILENAME'

const state = {
    desktopApps: {
        apps: [] as Array<AppRun>,
        maxZindex: 0,
        id: 0
    },
    apps: {
        'article': 'ArticleMd',
        'Money': 'Money',
        'folder': 'Folder',
        'vscode':'vscode'
    },
    fileList:{} as App,
    fileTypes:{}
}

type State=typeof state
type App={
    type:keyof State['apps']
    name?:string
    path?:string
    icon?:string
    [key:string]:any
}
type AppRun=App&{
    mini:boolean
    id:number
    zindex:number
    apps:State['apps'][keyof State['apps']]
}
type actions=ActionContext<State,Getters>
const mutations = {
    [SET_FILELIST](state :State,item :App){
        state.fileList=item
    },
    [SET_RUNING_APPS](state :State, item:App) {
        state.desktopApps.apps.push({
            apps: state.apps[item.type],
            ...item,
            mini:false,
            id: ++state.desktopApps.id,
            zindex: ++state.desktopApps.maxZindex
        })
    },
    [CLOSE_RUNING_APPS](state :State, index :number) {
        state.desktopApps.apps.splice(index,1)
    },
    [ACTIVE_RUNING_APPS](state :State, index :number) {
        state.desktopApps.apps[index].zindex=++state.desktopApps.maxZindex
    },
    [MINIMIZE_APPS](state :State,index :number){
        state.desktopApps.apps[index].mini=!state.desktopApps.apps[index].mini
    },
    [CREATE_FILE](state :State,obj :App){
        let {type,path,name,icon,other}=obj
        let i=1;
        let tempName=''
        let nameArray=Object.keys(state.fileList)
        while(nameArray.indexOf(name+tempName)>-1){
            tempName=(++i).toString()
        }
        let fileTree :any=state.fileList
        let pathArray=path!.split('/')
        pathArray.forEach(item=>{
            if(item){
                fileTree=fileTree[item]
            }
        })
        fileTree[name+tempName]={type,name:name+tempName,position:path,icon,...other}
        state.fileList=Object.assign({},state.fileList)
        state.fileList=JSON.parse(JSON.stringify(state.fileList))
    },
    [MERGE_APPS](state :State,apps={}){
        state.apps=Object.assign(state.apps,apps)
    },
    [SET_FILETYPES](state :State,types={}){
        state.fileTypes=types
    },
    [UPDATE_FILENAME](state :State,info:{name:string,path:string,oldName:string}){

        let temp=state.fileList
        info.path.split('/').forEach((name,index)=>{
            if(index!=0 && name){
                temp=temp[name]['children']
            }
        })

        let content=Object.assign(temp[info.oldName])
        if(info.oldName == info.name){
            return;
        }else if(temp[info.name]){
            let i=2
            temp[info.oldName]=content
            while(temp[`${info.name}(${i})`]){
                i++;
            }
            modal.confirm({
                title: `要将"${info.oldName}"重命名为"${info.name}(${i})"吗`,
                content: "此位置包含同名文件",
                onOk() {
                    delete temp[info.oldName]
                    temp[`${info.name}(${i})`]=Object.assign(content,{name:`${info.name}(${i})`});
                },
                onCancel() {
                    return
                },
            });
        }else{
            delete temp[info.oldName]
            temp[info.name]=Object.assign(content,{name:info.name});
        }
    }
}


const actions = {
    openApps({ commit }: actions, icon :App) {
        commit(SET_RUNING_APPS, icon)
    },
    closeApps({commit}: actions,index:any){
        commit(CLOSE_RUNING_APPS,index)
    },
    minimizeApps({commit}: actions,index:number){
        commit(MINIMIZE_APPS,index)
    },
    updateApps({commit}: actions,data:any){
        commit(CLOSE_RUNING_APPS,data)
    },
    activeApps({commit}: actions,index:any){
        commit(ACTIVE_RUNING_APPS,index)
    },
    createFile({commit}: actions,{path,type,name}:any){
        commit(CREATE_FILE,{path,type,name,icon:'folder',other:{children:{}}})
    },
    renameFile({commit}:actions,{name,path,oldName}:{name:string,path:string,oldName:string}){
        commit(UPDATE_FILENAME,{name,path,oldName})
    }
}

const getters = {
    desktopApps(state:State) {
        console.log(state.desktopApps)
        return state.desktopApps
    },
    fileList(state:State){
        return state.fileList
    },
    getAppInfo(state:State){
        return (id :number)=>{
            return state.desktopApps.apps[id] || {name:""}
        }
    }
}
type Getters = ReturnGetters<typeof getters>;

const vuexModule = {
    state,
    mutations,
    actions:actions,
    getters
}

export default vuexModule