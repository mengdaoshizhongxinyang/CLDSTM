
import { ReturnGetters, Store, ActionContext } from '@/types/store';
import modal  from 'ant-design-vue/lib/modal';
export const SET_RUNING_APPS = 'SET_RUNING_APPS'
export const CLOSE_RUNING_APPS = 'CLOSE_RUNING_APPS'
export const ACTIVE_RUNING_APPS = 'ACTIVE_RUNING_APPS'
export const SET_FILELIST = 'SET_FILELIST'
export const CREATE_FILE = 'CREATE_FILE'
export const MERGE_APPS = 'MERGE_APPS'
export const MINIMIZE_APPS = 'MINIMIZE_APPS'
export const SET_FILETYPES = 'SET_FILETYPES'
export const UPDATE_FILENAME='UPDATE_FILENAME'
/** @typedef {typeof state} DesktopState */

const state = {
    desktopApps: {
        apps: [] as any,
        maxZindex: 0,
        id: 0
    },
    apps: {
        'article': 'ArticleMd',
        'Money': 'Money',
        'folder': 'Folder',
        'vscode':'vscode'
    },
    fileList:{} as any,
    fileTypes:{}
}
type State=typeof state

/** @type MutationTree<DesktopState> */
const mutations = {
    [SET_FILELIST](state :State,item :Object){
        state.fileList=item
    },
    [SET_RUNING_APPS](state :State, item:Object) {
        state.desktopApps.apps.push({
            apps: state.apps[item.type],
            ...item,
            mini:false,
            id: ++state.desktopApps.id,
            zindex: ++state.desktopApps.maxZindex
        })
    },
    [CLOSE_RUNING_APPS](state :State, index :Number) {
        state.desktopApps.apps.splice(index,1)
    },
    [ACTIVE_RUNING_APPS](state :State, index :string) {
        state.desktopApps.apps[index].zindex=++state.desktopApps.maxZindex
    },
    [MINIMIZE_APPS](state :State,index :string){
        state.desktopApps.apps[index].mini=!state.desktopApps.apps[index].mini
    },
    [CREATE_FILE](state :State,obj :any){
        let {type,path,name,icon,other}=obj
        let i=1;
        let tempName=''
        let nameArray=Object.keys(state.fileList)
        while(nameArray.indexOf(name+tempName)>-1){
            tempName=(++i).toString()
        }
        let fileTree :any=state.fileList
        let pathArray=path.split('/')
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
                message: `此位置包含同名文件`,
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

/** @type ActionTree<DesktopState, RootState> */
const actions = {
    openApps({ commit }: ActionContext<State, Getters>, icon :any) {
        commit(SET_RUNING_APPS, icon)
    },
    closeApps({commit}: ActionContext<State, Getters>,index:any){
        commit(CLOSE_RUNING_APPS,index)
    },
    minimizeApps({commit}: ActionContext<State, Getters>,index:any){
        commit(MINIMIZE_APPS,index)
    },
    updateApps({commit}: ActionContext<State, Getters>,data:any){
        commit(CLOSE_RUNING_APPS,data)
    },
    activeApps({commit}: ActionContext<State, Getters>,index:any){
        commit(ACTIVE_RUNING_APPS,index)
    },
    createFile({commit}: ActionContext<State, Getters>,{path,type,name}:any){
        commit(CREATE_FILE,{path,type,name,icon:'folder',other:{children:{}}})
    },
    renameFile({commit}:ActionContext<State,Getters>,{name,path,oldName}:{name:string,path:string,oldName:string}){
        commit(UPDATE_FILENAME,{name,path,oldName})
    }
}

/** @type GetterTree<DesktopState, RootState> */
const getters = {
    desktopApps(state:State) {
        return state.desktopApps
    },
    fileList(state:State){
        return state.fileList
    },
    getAppInfo(state:State){
        return (id :string)=>{
            return state.desktopApps.apps[id] || {name:""}
        }
    }
}
type Getters = ReturnGetters<typeof getters>;
/** @type Module<DesktopState, RootState> */
const vuexModule = {
    state,
    mutations,
    actions,
    getters
}

export default vuexModule