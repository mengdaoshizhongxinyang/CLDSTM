import { defineComponent, h } from "vue";
import VueMd from "markdown-vue-next";
import "./ArticleBase.less"

export default defineComponent({
  components:{
    VueMd
  },
  setup(props){
    return ()=>h(
      <div class="markdown-body">
        <vue-md source={props.content} class="markdown-content"></vue-md>
      </div>
    )
  },
  props: {
    content: {
      type: String,
      default: "",
    },
  }
})