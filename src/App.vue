<template>
  <div id="timeRange">
    <div v-if="type === 'date'" class="clearfix rangeItem">
      <el-date-picker
        v-model="startTime"
        type="date"
        value-format="yyyy-MM-dd"
        :editable="false"
        :placeholder="startPlaceHolder"
        :clearable="false"
        class="hf pull-left"
        @change="handlerStartTime">
      </el-date-picker>
      <span class="mar">-</span>
      <el-date-picker
        v-model="endTime"
        type="date"
        value-format="yyyy-MM-dd"
        :editable="false"
        :picker-options="endPicker"
        :placeholder="endPlaceHolder"
        :clearable="false"
        class="hf pull-left"
        @change="handlerEndTime">
      </el-date-picker>
    </div>
    <div v-else-if="type === 'month'" class="clearfix rangeItem">
      <el-date-picker
        v-model="startTime"
        type="month"
        value-format="yyyy-MM"
        :editable="false"
        :placeholder="startPlaceHolder"
        :clearable="false"
        class="hf pull-left">
      </el-date-picker>
      <span class="mar">-</span>
      <el-date-picker
        v-model="endTime"
        type="month"
        value-format="yyyy-MM"
        :editable="false"
        :picker-options="endPicker"
        :placeholder="endPlaceHolder"
        :clearable="false"
        class="hf pull-left">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      startTime: '',
      endTime: '',
      endPicker: {
        disabledDate (time) {
          return false
        }
      }
    }
  },
  props: {
    // 控件类型
    type: {
      type: String,
      default: 'date'
    },
    // 起始时间
    sTime: String,
    // 结束时间
    eTime: String,
    // 是否需要默认值
    isNeedDefault: {
      type: Boolean,
      default: true
    },
    startPlaceHolder: {
      type: String,
      default: '起始时间'
    },
    endPlaceHolder: {
      type: String,
      default: '结束时间'
    }
  },
  methods: {
    handlerStartTime (val) {
      if (this.endTime && (Date.parse(this.endTime) < Date.parse(val) || moment(this.endTime).diff(moment(val), 'days') > 366)) {
        this.endTime = val
      }
    },
    handlerEndTime (val) {

    }
  },
  watch: {
    'startTime': {
      handler (newVal, oldVal) {
        this.$emit('update:sTime', newVal)
        if (newVal) {
          this.endPicker.disabledDate = (time) => {
            let d1 = moment(time)
            let d2 = moment(newVal)
            return Date.parse(time) < Date.parse(newVal) - 8.64e7 || d1.diff(d2, 'days') > 366
          }
        } else {
          this.endPicker.disabledDate = (time) => {
            return false
          }
        }
      }
    },
    'endTime' (newVal, oldVal) {
      this.$emit('update:eTime', newVal)
    },
    'sTime': {
      handler (newVal, oldVal) {
        this.startTime = newVal
      },
      immediate: true
    },
    'eTime': {
      handler (newVal, oldVal) {
        this.endTime = newVal
      },
      immediate: true
    }
  },
  created () {
    if (this.isNeedDefault) {
      this.startTime = this.$utils.formatDate(new Date(new Date().getFullYear(), new Date().getMonth()))
      this.endTime = this.$utils.formatDate(new Date())
    }
  }
}
</script>

<style lang='less'>
  #timeRange {
    width: 100%;
    height: 100%;
    .clearfix {
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
    .rangeItem {
      line-height: 40px;
      .mar {
        margin: 0 5px;
      }
    }
  }
</style>
