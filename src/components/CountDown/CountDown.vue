<template>
  <div class="count-down" :style="{ color, fontSize: `${size}px` }">
    <span class="time">{{ days }}</span>
    <span class="delimiter" :style="{ fontSize: `${delimiterSize}px` }">
      {{ daySplit }}
    </span>

    <span class="time">{{ hours }}</span>
    <span class="delimiter" :style="{ fontSize: `${delimiterSize}px` }">
      {{ hourSplit }}
    </span>

    <span class="time">{{ minutes }}</span>
    <span class="delimiter" :style="{ fontSize: `${delimiterSize}px` }">
      {{ minSplit }}
    </span>

    <span class="time">{{ seconds }}</span>
    <span class="delimiter" :style="{ fontSize: `${delimiterSize}px` }">
      {{ secSplit }}
    </span>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch, PropType } from "vue";
import { onMounted, onUnmounted, defineComponent } from "vue";

interface CountDownState {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
}
type countDownType = "countdown" | "timing";

export default defineComponent({
  name: "CountDown",
  props: {
    //类型 countdown: 倒计时 timing: 计时
    type: {
      type: String as PropType<countDownType>,
      default: "countdown",
    },
    timeValue: {
      type: Number,
      default: 0,
    },
    isMilliSecond: {
      type: Boolean,
      default: false,
    },
    // 分隔符
    daySplit: {
      type: String,
      default: ":",
    },
    hourSplit: {
      type: String,
      default: ":",
    },
    minSplit: {
      type: String,
      default: ":",
    },
    secSplit: {
      type: String,
      default: "",
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
  setup(props, { emit }) {
    const { timeValue } = toRefs(props);
    const timeState = reactive<CountDownState>({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });

    const start = () => {
      if (props.type === "countdown") {
        return handlerCountDown();
      }
      handlerTiming(timeValue.value);
    };

    let timer!: ReturnType<typeof setInterval>;
    const handlerCountDown = () => {
      let endTime = timeValue.value;
      if (props.isMilliSecond) endTime = Math.floor(endTime / 1000);

      const countDown = () => {
        let day, hours, minutes, seconds;
        day = Math.floor(endTime / 60 / 60 / 24);
        hours = Math.floor((endTime / 60 / 60) % 24);
        minutes = Math.floor((endTime / 60) % 60);
        seconds = Math.floor(endTime % 60);

        // 格式化
        if (day < 10) day = "0" + day;
        if (hours < 10) hours = "0" + hours;
        if (seconds < 10) seconds = "0" + seconds;
        if (minutes < 10) minutes = "0" + minutes;

        timeState.days = day === 0 ? "" : day;
        timeState.hours = hours;
        timeState.minutes = minutes;
        timeState.seconds = seconds;
      };
      countDown();

      timer = setInterval(() => {
        if (endTime > 0) {
          countDown();
          return endTime--;
        }
        clearInterval(timer);
        timeState.days = "00";
        timeState.hours = "00";
        timeState.minutes = "00";
        timeState.seconds = "00";
        emit("end");
      }, 1000);
    };

    // 处理计时
    const handlerTiming = (time: number) => {
      const timeDifference = new Date().valueOf() - new Date(time).valueOf();
      const transformTime = (timeStamp: number) => {
        return timeStamp < 10 ? "0" + timeStamp : timeStamp;
      };
      if (timeDifference > 0) {
        let timeCount = Math.floor(timeDifference / 1000);
        const timing = () => {
          timeState.seconds = transformTime(Math.floor(timeCount % 60));
          timeState.minutes = transformTime(Math.floor((timeCount / 60) % 60));
          timeState.days = transformTime(Math.floor(timeCount / 60 / 60 / 24));
          timeState.hours = transformTime(
            Math.floor((timeCount / 60 / 60) % 24)
          );
        };
        timing();
        timer = setInterval(() => {
          timeCount++;
          timing();
        }, 1000);
      }
    };

    watch(timeValue, () => {
      clearInterval(timer);
      start();
    });

    onMounted(start);

    onUnmounted(() => {
      if (timer) clearInterval(timer);
    });

    return {
      ...toRefs(timeState),
    };
  },
});
</script>
