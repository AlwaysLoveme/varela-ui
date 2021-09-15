<template>
  <div class="count-down" :style="{ color, fontSize: `${size}px` }">
    <span class="time">{{ days }}</span>
    <span class="delimiter" :style="{ fontSize: `${delimiterSize}px` }">
      {{ delimiter }}
    </span>

    <span class="time">{{ hours }}</span>
    <span class="delimiter" :style="{ fontSize: `${delimiterSize}px` }">
      {{ delimiter }}
    </span>

    <span class="time">{{ minutes }}</span>
    <span class="delimiter" :style="{ fontSize: `${delimiterSize}px` }">
      {{ delimiter }}
    </span>

    <span class="time">{{ seconds }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";

interface Props {
  size: string;
  color: string;
  endTime: number;
  timeType: string;
  delimiter: string;
  delimiterSize: string;
}

export default defineComponent({
  name: "CountDown",
  props: {
    //类型 countdown: 倒计时 timing: 计时
    type: {
      type: String,
      default: "countdown",
    },
    // 传入时间类型, second: 秒数 millisecond: 毫秒
    timeType: {
      type: String,
      default: "second",
    },
    endTime: {
      type: Number,
      default: 0,
    },
    // 分隔符
    delimiter: {
      type: String,
      default: ":",
    },
    color: {
      type: String,
      default: "#000000",
    },
    size: {
      type: String,
      default: "14",
    },
    delimiterSize: {
      type: String,
      default: "17",
    },
  },
  emits: ["end"],
  setup(props: Props, { emit }) {
    const { endTime, timeType } = toRefs(props);
    const timeState = reactive({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });

    let timer: any;
    const start = () => {
      let endDate: number = endTime.value;
      if (timeType.value === "millisecond")
        endDate = Math.round(endTime.value / 1000);

      timer = setInterval(() => {
        if (endDate > 0) {
          countDown(endDate);
          return endDate--;
        }
        clearInterval(timer);
        timeState.days = "00";
        timeState.hours = "00";
        timeState.minutes = "00";
        timeState.seconds = "00";
        emit("end");
      }, 1000);
    };
    const countDown = (time: number) => {
      let day, hours, minutes, seconds;
      day = Math.floor(time / 60 / 60 / 24);
      hours = Math.floor((time / 60 / 60) % 24);
      minutes = Math.floor((time / 60) % 60);
      seconds = Math.floor(time % 60);

      // 格式化
      if (day < 10) day = "0" + day;
      if (hours < 10) hours = "0" + hours;
      if (seconds < 10) seconds = "0" + seconds;
      if (minutes < 10) minutes = "0" + minutes;

      timeState.days = day === 0 ? "" : (day as string);
      timeState.hours = hours as string;
      timeState.minutes = minutes as string;
      timeState.seconds = seconds as string;
    };

    watch(endTime, () => {
      clearInterval(timer);
      start();
    });

    onMounted(start);

    return {
      ...toRefs(timeState),
    };
  },
});
</script>

<style scoped lang="scss">
@import "./CountDown";
</style>
