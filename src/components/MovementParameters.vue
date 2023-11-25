<script>
export default {
  name: "Params",
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      coordinates: this.value,
      lastEmittedScaleValue: 0,
      showMenu: false,
      activeItem: "A",
      selectedPointCoordinates: {
        x: this.value.pointA?.x || 0,
        y: this.value.pointA?.y || 0,
      },
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      pointC: { x: 0, y: 0 },
      scaleValue: 1,
    };
  },
  computed: {
    coordinates() {
      return this.value;
    },
  },
  watch: {
    scaleValue(newValue) {
      this.$emit("input", { ...this.value, scale: newValue });
    },
  },
  methods: {
    handleMouseUp() {
      this.$emit("input", { ...this.value, scale: this.scaleValue });
    },
    selectClick() {
      this.showMenu = !this.showMenu;
    },
    setItemActive(item) {
      this.activeItem = item;
      this.showMenu = !this.showMenu;
    },
    handleInput(point, coord, value) {
      console.log(point);
      if (point == "pointA") {
        this.pointA[coord] = parseFloat(value);
      } else if (point == "pointB") {
        this.pointB[coord] = parseFloat(value);
      } else if (point == "pointC") {
        this.pointC[coord] = parseFloat(value);
      } else if (point == "scale") {
        this.scaleValue = parseFloat(value);
      }

      this.$emit("update:params", {
        pointA: this.pointA,
        pointB: this.pointB,
        pointC: this.pointC,
        scale: this.scaleValue,
      });
    },
  },
};
</script>

<template>
  <div class="params_container">
    <div class="coordinates_container">
      <div class="verticle_container">
        <p>Verticle:</p>
        <div class="dropdown">
          <div
            class="select"
            @click="selectClick"
            :class="{ select_clicked: showMenu }"
          >
            <span class="selected">{{ activeItem }}</span>
            <div class="caret" :class="{ caret_rotate: showMenu }"></div>
          </div>
          <ul class="menu" v-if="showMenu">
            <li
              :class="{ active: activeItem === 'A' }"
              @click="setItemActive('A')"
            >
              A
            </li>
            <li
              :class="{ active: activeItem === 'B' }"
              @click="setItemActive('B')"
            >
              B
            </li>
            <li
              :class="{ active: activeItem === 'C' }"
              @click="setItemActive('C')"
            >
              C
            </li>
          </ul>
        </div>
      </div>
      <div class="coordinates">
        <div class="coordinate" id="x">
          <p>x:</p>
          <input
            type="text"
            class="coorditane_value"
            v-model="selectedPointCoordinates.x"
            @input="handleInput('point' + activeItem, 'x', $event.target.value)"
          />
        </div>
        <div class="coordinate" id="y">
          <p>y:</p>
          <input
            type="text"
            class="coorditane_value"
            v-model="selectedPointCoordinates.y"
            @input="handleInput('point' + activeItem, 'y', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="scale_container">
      <div class="value_container">
        <p>Scale:</p>
        <span class="value">{{ scaleValue }}</span>
      </div>
      <input
        type="range"
        min="-10"
        max="10"
        v-model="scaleValue"
        class="slider"
        id="scale_slider"
        @input="handleInput('scale', 'scale', $event.target.value)"
      />
    </div>
  </div>
</template>

<style scoped>
.params_container {
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 32px 16px;
  border-radius: 16px;
  width: 300px;
}
.value_container {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  gap: 8px;
}
.coordinates_container {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
}
.coordinates {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.coordinate {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.coorditane_value {
  -webkit-appearance: none;
  border: none;
  width: 32px;
}
.verticle_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
}
p {
  margin: 0;
}
input {
  margin: 0;
}
.slider {
  height: 20px;
  -webkit-appearance: none;
  border-radius: 10px;
  width: 100%;
}
.slider::-webkit-slider-thumb {
  cursor: pointer;
  appearance: none;
  height: 20px;
  width: 20px;
  background: none;
  border: 2px solid #ffffff;
  border-radius: 10px;
}
#scale_slider {
  background: #000000;
}
.dropdown {
  width: 80px;
}
.select {
  background: #eae6dd;
  color: #000000;
  display: flex;
  width: 120px;
  justify-content: space-between;
  align-items: center;
  border: 2px #eae6dd solid;
  border-radius: 24px;
  padding: 8px 24px;
  cursor: pointer;
  margin-bottom: 10px;
}
.select_clicked {
  border: 2px #ea307e solid;
  box-shadow: 0 0 0.8em #ea307e;
}
.select:hover {
  background: #c3b699;
  border: 2px #c3b699 solid;
}
.caret {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #000000;
  transition: 0.3s;
}

.caret_rotate {
  transform: rotate(180deg);
}
.menu {
  display: flex;
  position: absolute;
  width: 120px;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 6px 0px;
  background: none;
  box-shadow: 0 0 0.5em 1em rgba (0, 0, 0, 0.2);
  color: #767676;
  transition: 0.2s;
  z-index: 10;
}
.menu li {
  padding: 0.7em 0.5em;
  border-radius: 8px;
  cursor: pointer;
  background: #eae6dd;
}
.menu li:hover {
  color: #000000;
}
.menu li.active {
  background: #c3b699;
  color: #000000;
}
</style>
