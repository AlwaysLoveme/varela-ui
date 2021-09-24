import Loading from "../loading";
import { MDCRipple } from "@material/ripple";
import { computed, onMounted, ref, getCurrentInstance, nextTick } from "vue";
import {
  PropType,
  CSSProperties,
  defineComponent,
  ButtonHTMLAttributes,
} from "vue";

export default defineComponent({
  name: "VButton",
  props: {
    type: {
      type: String,
      default: "",
    },
    buttonType: {
      type: String as PropType<ButtonHTMLAttributes["type"]>,
      default: "button",
    },
    text: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 图标， 位置默认前置
    icon: {
      type: String,
      default: "",
    },
    iconSize: {
      type: [String, Number],
      default: "20",
    },
    // 字体颜色
    labelColor: {
      type: String,
      default: "",
    },
  },
  setup(props, { slots }) {
    const zxButton = ref();
    const { disabled, type, icon } = props;

    const btnClass = computed(() => {
      return {
        disabled: disabled,
        // 有阴影填充
        "mdc-button--raised": type === "raised",
        // 无阴影填充
        "mdc-button--unelevated": type === "fill",
        // 有边框
        "mdc-button--outlined": type === "outline",
        "mdc-button--icon-leading": slots.before || icon,
      };
    });
    const contentStyle = computed<CSSProperties>(() => ({
      display: props.loading ? 'none' : 'inline-flex',
    }));
    const loadingColor = computed(() => {
      let color = "";
      switch (type) {
        case "raised":
        case "fill":
          color = "#fff";
          break;
        case "outline":
          color = "#333";
          break;
      }
      return color;
    });

    onMounted(() => {
      new MDCRipple(zxButton.value);
    });

    return () => (
      <button
        ref={zxButton}
        type={props.buttonType}
        class={{ ...btnClass.value, "zx-button": true, "mdc-button": true }}
      >
        <div class="mdc-button__ripple"></div>
        <div class="flex-center" style={contentStyle.value}>
          <slot name="before">
            {props.icon ? (
              <i
                class="material-icons"
                style={{ fontSize: `${props.iconSize}px` }}
              >
                {icon}
              </i>
            ) : (
              ""
            )}
          </slot>
          <div class="mdc-button__label">
            <slot>{props.text}</slot>
          </div>
          <slot name="after"></slot>
        </div>
        {props.loading ? (
          <Loading
            size="24"
            spinType="spin"
            class="position-center"
            color={loadingColor.value}
          />
        ) : (
          ""
        )}
      </button>
    );
  },
});
