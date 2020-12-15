import { defineComponent, h } from "vue";
import VueMd from "vue-markdown";
import Frame from "@/components/Frame";
//TODO rewrite VueMd
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