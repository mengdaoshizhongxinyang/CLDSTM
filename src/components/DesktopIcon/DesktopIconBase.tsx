/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-07 22:15:14
 * @Description: 
 */
import { IconManage, RightClickMenu } from "@/components";
import { defineComponent, h, reactive, ref, nextTick } from "vue";
import { PropTypes } from "@/utils/proptypes";
import { useStore } from "@/store";
import { IconList } from "@/types";
import style from "./DesktopIconBase.module.less";
import { IconInfo } from "./type";
export default defineComponent({
    props: {
        iconInfo: PropTypes.object<IconInfo>({})
    },
    components: {
        IconManage,
        RightClickMenu,
    },
    setup(props, { emit }) {
        const store = useStore()
        const data = reactive({
            actived: false,
            type: "show",
            tempName: props.iconInfo.name,
            iconShow: false,
            iconMenuOffset: {
                left: 0,
                top: 0,
            },
            menuList: [
                { label: "重命名", run: "rename" },
                { label: "属性", run: "attribute" },
            ] as Menu[],
        })
        type Menu = { label: string, run: FuncKeys }
        const inputRef = ref<HTMLInputElement>()
        function openApps(e: MouseEvent) {
            e.preventDefault();

            emit("openApps");
        }
        function handleKeypress(e: KeyboardEvent) {
            if (e.key == "Enter") {
                e.preventDefault();
                // this.changeName();
                inputRef.value!;
            }
        }
        function handleMenuItemClick(menu: Menu) {
            if (menuFunction[menu.run]) {
                menuFunction[menu.run]();
            }
        }
        const menuFunction = {
            rename() {
                data.type = "input";
                nextTick(() => {
                    inputRef.value!.focus();
                })
            },
            attribute() {
                const { iconInfo } = props;
                store.dispatch("openApps", {
                    type: "attribute",
                    icon: iconInfo.icon!,
                    name: iconInfo.name + " 属性",
                    position: iconInfo.position,
                    fileName: iconInfo.name,
                    apps: "Properties"
                });
            }
        }
        type FuncKeys = keyof typeof menuFunction
        function changeName() {
            let newName = inputRef.value!.textContent;
            const { iconInfo } = props;
            store.dispatch("renameFile", {
                name: newName!,
                oldName: iconInfo.name!,
                path: iconInfo.position!,
            });
            data.type = "show";
        }
        function handleIconMenu(e: MouseEvent) {
            data.iconMenuOffset = {
                left: e.x,
                top: e.y,
            };
            let X = e.x,
                Y = e.y;
            let w = document.body.offsetWidth;
            let h = document.body.offsetHeight;
            while (X + 320 >= w) {
                X -= 56;
            }
            while (Y + 480 >= h) {
                Y -= 88;
            }
            store.dispatch("setPosition", { X, Y });
            data.iconShow = true;
        }
        return () => h(
            <div class={style['desktop-icon']} tabindex={-1}>
                <div onDblclick={(e) => openApps(e)} onContextmenu={handleIconMenu}>
                    <div class={style["desktop-icon-icon"]}>

                            <div class={style["desktop-icon-icon-default"]}>
                                <IconManage
                                    icon={props.iconInfo.icon}
                                ></IconManage>
                            </div>

                    </div>
                    {
                        data.type == 'show' ? <div class={style["desktop-icon-text"]}>
                            {props.iconInfo.name}
                        </div> : null
                    }

                </div >
                <div
                    class={style["desktop-icon-input"]}
                    style={{display:data.type=='input'?'block':'none'}}
                    ref={inputRef}
                    tabindex={1}
                    contenteditable="true"
                    onKeydown={handleKeypress}
                    onMousedown={(e) => { e.stopImmediatePropagation() }}
                    onBlur={changeName}
                >
                    {data.tempName}
                </div>
                <RightClickMenu
                    menus={data.menuList}
                    v-model={[data.iconShow, 'show']}
                    offset={data.iconMenuOffset}
                    style="text-align: left"
                    onMenuItemClick={(menu) => handleMenuItemClick(menu as Menu)}
                ></RightClickMenu>
            </div>
        )
    },
    emits:{
        openApps:()=>{return true}
    }
})