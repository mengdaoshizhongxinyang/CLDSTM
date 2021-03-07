import ArticleBase from "./ArticleBase";
import { AppFrame } from "@/components";
import { defineComponent, h } from "vue";
export default defineComponent({
  components:{
    ArticleBase,
    AppFrame
  },
  setup(props,{attrs}){
    return ()=>h(
      <app-frame {...attrs} initialH={600} initialW={1000}>
        <article-base content={props.content}></article-base>
      </app-frame>
    )
  },
  props: {
    content: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "article",
    },
    position:{
      type:String,
      default:"/"
    },
    // description:"",
    // mtime:null,
    // ctime:null
  }
})
