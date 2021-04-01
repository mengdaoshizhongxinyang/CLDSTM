
import { RightClickMenu } from "@/components";
import { useStore } from "@/store";
import { h, onMounted, reactive,computed } from "vue";
import { defineComponent } from "vue";
import style from "./desktop.module.less"
type TypeMenu = {
    label: string;
    name: string;
    children?: Array<TypeMenu>;
    run?: string;
};
export default defineComponent({
    setup() {
        const store = useStore();
        const data = reactive({
            headerMenu: false,
            contextMenuOffset: {
                left: 0,
                top: 0,
            },
            list: {},
        })
        const menus = computed(() => {
            let language =
                store.state.core.language.languageSelected.desktop.contextMenu;

            let menuList: Array<TypeMenu> = [
                { label: "刷新", name: "refresh" },
                {
                    label: "创建",
                    name: "create",
                    children: [
                        { label: "文件夹", run: "createFolder", name: "createFolder" },
                    ],
                },
                { label: "个性化", name: "personalise", run: "personaliseFrame" },
            ];

            let queueMenus = menuList.concat([]);
            while (queueMenus.length != 0) {
                let menu = queueMenus.pop() as TypeMenu;
                menu.label =
                    language[menu.name as keyof typeof language] || menu.label;
                if (menu.children && menu.children.length > 0) {
                    queueMenus = queueMenus.concat(menu.children);
                }
            }
            return menuList;
        });
        const createFile = (info: any) => {
            store.dispatch("createFile", info);
        };
        const runEvent = {
            createFolder: () => {
                createFile({
                    type: "folder",
                    name: "新建文件夹",
                    path: "/",
                });
            },
            personaliseFrame() {
                let PersonaliseSetting: FileType = {
                    apps: 'Setting',
                    icon: "setting",
                    name: "设置",
                    type: "setting"
                };
                store.dispatch("openApps", PersonaliseSetting);
            },
        };
        const handleMenuItemClick = (menu: TypeMenu) => {
            if (runEvent[menu.run as keyof typeof runEvent]) {
                runEvent[menu.run as keyof typeof runEvent]();
            }
        };
        const rightClick = (e: MouseEvent) => {
            data.contextMenuOffset.left = e.x;
            data.contextMenuOffset.top = e.y;
            data.headerMenu = true;
        }
        const personaliseFrame = () => {
            store.dispatch("openApps", {
                type: "setting",
                apps: "Setting",
                icon: "SnippetsOutlined",
                name: "设置"
            });
        }
        onMounted(() => {
            data.list = configs.getActionsItem()
        })
        return () => h(
            <div class={style["desktop"]} onContextmenu={(e) => rightClick(e)}>
                <div class={style["desktop-rightmenu"]}>
                    <right-click-menu
                        offset={data.contextMenuOffset}
                        v-model={[data.headerMenu, 'show']}
                        menus={menus.value}
                        onMenuItemClick={handleMenuItemClick}
                    >
                    </right-click-menu>
                </div>
            </div>
        )
    },
    components: {
        RightClickMenu,
    },
});