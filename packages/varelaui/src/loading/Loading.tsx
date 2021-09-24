import { CSSProperties, defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "VLoading",
  props: {
    spinType: {
      type: String,
      default: "spin",
    },
    color: {
      type: String,
      default: "#333",
    },
    size: {
      type: [Number, String],
      default: 44,
    },
  },
  setup(props, { attrs }) {
    const instance = getCurrentInstance();

    const spinLoading = () => (
      <div
        v-bind={attrs}
        class="loading-spinner"
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
      >
        <div class="spinner-inner">
          <div class="spinner-inner-line"></div>
          <div class="spinner-inner-line"></div>
          <div class="spinner-inner-line"></div>
          <div class="spinner-inner-line"></div>
          <div class="spinner-inner-line"></div>
          <div class="spinner-inner-line"></div>
          <div class="spinner-inner-line"></div>
          <div class="spinner-inner-line"></div>
        </div>
      </div>
    );
    const mdLoading = () => (
      <div
        v-bind={attrs}
        class="preloader"
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
      >
        <span class="preloader-inner">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16"></circle>
          </svg>
        </span>
      </div>
    );
    // const circleLoading = () => (
    //   <svg
    //     x="0px"
    //     y="0px"
    //     version="1.1"
    //     viewBox="0 0 40 40"
    //     v-bind={instance?.attrs}
    //     enable-background="new 0 0 40 40"
    //     xmlns="http://www.w3.org/2000/svg"
    //     style={{
    //       width: `${props.size}px`,
    //       height: `${props.size}px`,
    //       fill: props.color,
    //     }}
    //   >
    //     <path
    //       opacity="0.2"
    //       d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    // s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    // c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
    //     />
    //     <path
    //       d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    // C22.32,8.481,24.301,9.057,26.013,10.047z"
    //     >
    //       <animateTransform
    //         attributeType="xml"
    //         attributeName="transform"
    //         type="rotate"
    //         from="0 20 20"
    //         to="360 20 20"
    //         dur="0.55s"
    //         repeatCount="indefinite"
    //       />
    //     </path>
    //   </svg>
    // );

    // const lackLoading = () => (
    //   <svg
    //     version="1.1"
    //     x="0px"
    //     y="0px"
    //     v-bind={instance?.attrs}
    //     viewBox="0 0 50 50"
    //     v-if="spinType === 'lack'"
    //     xmlns="http://www.w3.org/2000/svg"
    //     style={
    //       {
    //         width: `${props.size}px`,
    //         height: `${props.size}px`,
    //         fill: props.color,
    //         "enable-background": "new 0 0 50 50",
    //       } as CSSProperties
    //     }
    //   >
    //     <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
    //       <animateTransform
    //         attributeType="xml"
    //         attributeName="transform"
    //         type="rotate"
    //         from="0 25 25"
    //         to="360 25 25"
    //         dur="0.55s"
    //         repeatCount="indefinite"
    //       />
    //     </path>
    //   </svg>
    // );

    const renderLoading = () => {
      switch (props.spinType) {
        case "spin":
          return spinLoading();
        case "md":
          return mdLoading();
        // case "circle":
        //   return circleLoading();
        // case "lack":
        //   return lackLoading();
        default:
          return "";
      }
    };

    return () => <>{renderLoading()}</>;
  },
});
