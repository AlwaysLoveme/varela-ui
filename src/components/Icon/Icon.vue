<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "VIcon",
  props: {
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#333",
    },
    size: {
      type: String,
      default: "20",
    },
  },
  render() {
    return h(
      "i",
      {
        class: "material-icons icon",
        style: {
          fontSize: this.size + "px",
          color: this.color,
        },
      },
      this.icon
    );
  },
  // setup(props) {
  //   return () => {
  //     return h(
  //       "i",
  //       {
  //         class: "material-icons icon",
  //         style: {
  //           fontSize: props.size + "px",
  //           color: props.color,
  //         },
  //       },
  //       props.icon
  //     );
  //   };
  // },
});
</script>
