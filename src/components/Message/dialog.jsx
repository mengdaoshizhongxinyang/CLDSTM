export default {
  props: {
    autoMount: true,
    autoDestroy: true,
    visible: true,
    forceRender: false,
    parent: null,

    children: null,
  },

  mounted() {
    if (this.autoMount) {
      this.renderComponent();
    }
  },

  updated() {
    if (this.autoMount) {
      this.renderComponent();
    }
  },

  beforeDestroy() {
    if (this.autoDestroy) {
      this.removeContainer();
    }
  },
  methods: {
    getComponent(){
      return(
        <div></div>
      )
    },
    children(){
      this.renderComponent()
      this.removeContainer();
      return null;
    },
    getContainer(){
      const container = document.createElement('div');
      if (this.getContainer) {
        this.getContainer().appendChild(container);
      } else {
        document.body.appendChild(container);
      }
      return container;
    },
    removeContainer() {
      if (this.container) {
        this._component && this._component.$destroy();
        this.container.parentNode.removeChild(this.container);
        this.container = null;
        this._component = null;
      }
    },

    renderComponent(props = {}, ready) {
      const { visible, forceRender, getContainer, parent } = this;
      const self = this;
      if (visible || parent.$refs._component || forceRender) {
        let el = this.componentEl;
        if (!this.container) {
          this.container = getContainer();
          el = document.createElement('div');
          this.componentEl = el;
          this.container.appendChild(el);
        }
        if (!this._component) {
          this._component = new this.$root.constructor({
            el,
            parent: self,
            data: {
              comProps: props,
            },
            mounted() {
              this.$nextTick(() => {
                if (ready) {
                  ready.call(self);
                }
              });
            },
            updated() {
              this.$nextTick(() => {
                if (ready) {
                  ready.call(self);
                }
              });
            },
            render() {
              return self.getComponent(this.comProps);
            },
          });
        } else {
          this._component.comProps = props;
        }
      }
    },
  },

  render() {
    return this.children();
  },
};
