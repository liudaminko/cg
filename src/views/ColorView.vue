<script>
import ActionButton from "../components/ActionButton.vue";
import RenderContainer from "../components/RenderSide.vue";
import Popup from "../components/InfoPopup.vue";
import ColorButtons from "../components/ColorButton.vue";
import HSLSlider from "../components/HSLSlider.vue";
import CMYKSlider from "../components/CMYKSlider.vue";

export default {
  name: "ColorView",
  components: {
    ActionButton,
    RenderContainer,
    Popup,
    ColorButtons,
    HSLSlider,
    CMYKSlider,
  },
  data() {
    return {
      showPopup: false,
      showHSL: true,
      showCMYK: false,
      showPicture: false,
      showUploadMenu: true,
      hoveredColor: null,
      mouseX: 0,
      mouseY: 0,
      popupTitle: "Color",
      popupText:
        "Color models like HSL (Hue, Saturation, Lightness) and CMYK (Cyan, Magenta, Yellow, Key/Black) play crucial roles in digital design and printing. These models help in achieving precise control over colors in various applications.\nHSL provides a user-friendly approach to manipulating colors. Hue represents the type of color, saturation controls the intensity, and lightness manages the brightness. It`s a popular choice for artists and designers seeking to create visually pleasing and harmonious color schemes. \nIn contrast, CMYK is essential in the printing industry. It combines cyan, magenta, yellow, and black inks to produce a wide spectrum of colors. Printers use this model to ensure accurate color reproduction in magazines, brochures, and other printed materials.\nBy integrating these color models into fractal generation, you can create captivating and customizable fractal art. These models allow for precise adjustments of color gradients, providing a vibrant and dynamic visual experience in fractal patterns. Whether for digital art or printing projects, understanding and utilizing HSL and CMYK in fractal design opens up a world of creative possibilities.",
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
    },
    showHSLComponent() {
      this.showHSL = true;
      this.showCMYK = false;
    },
    showCMYKComponent() {
      this.showHSL = false;
      this.showCMYK = true;
    },
    exportData() {
      const canvas = document.querySelector("canvas");
      const imageDataURL = canvas.toDataURL("image/jpg");
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataURL;
      downloadLink.download = "modified_image.jpg";
      downloadLink.click();
    },
    handleMouseHover(event) {
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;

      const pixel = ctx.getImageData(this.mouseX, this.mouseY, 1, 1);
      const color = `rgb(${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]})`;

      this.hoveredColor = color;
    },
    clearHoveredColor() {
      this.hoveredColor = null;
    },
    handleImageUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.showPicture = true;
          this.showUploadMenu = false;
          const image = new Image();
          image.src = e.target.result;

          image.onload = () => {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");

            const canvasWidth = 900;
            const canvasHeight = 500;

            const aspectRatio = image.width / image.height;
            let newWidth = canvasWidth;
            let newHeight = canvasWidth / aspectRatio;

            if (newHeight > canvasHeight) {
              newHeight = canvasHeight;
              newWidth = canvasHeight * aspectRatio;
            }

            // Center the image on the canvas
            const x = (canvasWidth - newWidth) / 2;
            const y = (canvasHeight - newHeight) / 2;

            // Clear the canvas and draw the image with calculated dimensions
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, x, y, newWidth, newHeight);
          };
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
    closePicture() {
      this.showPicture = false;
      this.showUploadMenu = true;
    },
    handleHSLChange(saturationValue) {
      this.updateYellowSaturation(saturationValue);
    },
    updateYellowSaturation(event) {
      const value = parseInt(event.target.value);
      console.log("saturation we get: ");
      console.log(value);
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const yellowHueMin = 40;
      const yellowHueMax = 80;
      const yellowSaturationMin = 50;
      const yellowSaturationMax = 100;

      for (let i = 0; i < imageData.data.length; i += 4) {
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];

        const hsl = RGBToHSL(red, green, blue);
        const isYellowColor =
          hsl[0] >= yellowHueMin &&
          hsl[0] <= yellowHueMax &&
          hsl[1] >= yellowSaturationMin &&
          hsl[1] <= yellowSaturationMax;
        if (isYellowColor) {
          hsl[1] = value;
          const rgb = HSLToRGB(hsl[0], hsl[1], hsl[2]);
          imageData.data[i] = rgb[0];
          imageData.data[i + 1] = rgb[1];
          imageData.data[i + 2] = rgb[2];
        }
      }

      ctx.putImageData(imageData, 0, 0);
    },
    handleCMYKChange(value) {
      console.log("new yellow color: " + value);
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < imageData.data.length; i += 4) {
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];

        if (isYellow(red, green, blue)) {
          const cmyk = RGBToCMYK(red, green, blue);

          cmyk[2] = value;
          cmyk[1] = Math.min(100, cmyk[1] * 0.5);

          const rgb = CMYKToRGB(cmyk[0], cmyk[1], cmyk[2], cmyk[3]);

          imageData.data[i] = rgb[0];
          imageData.data[i + 1] = rgb[1];
          imageData.data[i + 2] = rgb[2];
        }
      }

      ctx.putImageData(imageData, 0, 0);
    },
  },
};
function isYellow(r, g, b) {
  const yellowMin = [200, 160, 0];
  const yellowMax = [255, 255, 100];

  return (
    r >= yellowMin[0] &&
    r <= yellowMax[0] &&
    g >= yellowMin[1] &&
    g <= yellowMax[1] &&
    b >= yellowMin[2] &&
    b <= yellowMax[2]
  );
}
function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

function HSLToRGB(h, s, l) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = (c + m) * 255;
    g = (x + m) * 255;
    b = m * 255;
  } else if (60 <= h && h < 120) {
    r = (x + m) * 255;
    g = (c + m) * 255;
    b = m * 255;
  } else if (120 <= h && h < 180) {
    r = m * 255;
    g = (c + m) * 255;
    b = (x + m) * 255;
  } else if (180 <= h && h < 240) {
    r = m * 255;
    g = (x + m) * 255;
    b = (c + m) * 255;
  } else if (240 <= h && h < 300) {
    r = (x + m) * 255;
    g = m * 255;
    b = (c + m) * 255;
  } else if (300 <= h && h < 360) {
    r = (c + m) * 255;
    g = m * 255;
    b = (x + m) * 255;
  }

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return [r, g, b];
}

function RGBToCMYK(r, g, b) {
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // normalize RGB values to the range [0, 1]
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  const k = 1 - Math.max(normalizedR, normalizedG, normalizedB);
  const c = (1 - normalizedR - k) / (1 - k);
  const m = (1 - normalizedG - k) / (1 - k);
  const y = (1 - normalizedB - k) / (1 - k);

  // check if CMYK components are in the range [0, 1]
  const cyan = Math.min(1, Math.max(0, c));
  const magenta = Math.min(1, Math.max(0, m));
  const yellow = Math.min(1, Math.max(0, y));
  const black = Math.min(1, Math.max(0, k));

  return [cyan, magenta, yellow, black];
}
function CMYKToRGB(c, m, y, k) {
  // check if CMYK components are in the range [0, 1]
  c = Math.min(1, Math.max(0, c));
  m = Math.min(1, Math.max(0, m));
  y = y / 100;
  k = Math.min(1, Math.max(0, k));

  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);

  return [Math.round(r), Math.round(g), Math.round(b)];
}
</script>

<template>
  <div class="container">
    <div class="content_container">
      <div class="buttons">
        <div class="header_buttons">
          <ColorButtons
            @hsl="showHSLComponent"
            @cmyk="showCMYKComponent"
          ></ColorButtons>
        </div>
        <HSLSlider v-if="showHSL" @change="handleHSLChange" />
        <CMYKSlider v-if="showCMYK" @change-cmyk="handleCMYKChange" />
        <div class="footer_buttons">
          <ActionButton @click="showPopup = true">Learn more</ActionButton>
          <ActionButton @click="exportData">Save as</ActionButton>
        </div>
      </div>
      <RenderContainer>
        <div
          v-if="hoveredColor"
          class="color-tooltip"
          :style="{
            backgroundColor: hoveredColor,
            top: `${mouseY + 120}px`,
            left: `${mouseX + 360}px`,
          }"
        >
          {{ hoveredColor }}
        </div>
        <div v-if="showPicture" class="uploaded_image_container">
          <canvas
            ref="canvas"
            width="900"
            height="500"
            @mousemove="handleMouseHover"
            @mouseout="clearHoveredColor"
          ></canvas>
          <img
            class="close_picture"
            src="../assets/cancel.png"
            @click="closePicture"
          />
        </div>
        <div class="upload_image_container" v-if="showUploadMenu">
          <p>Upload an image</p>
          <label class="custom-file-upload">
            <input type="file" accept="image/*" @change="handleImageUpload" />
            Select File
          </label>
        </div>
      </RenderContainer>
    </div>
  </div>
  <Popup
    v-if="showPopup"
    :title="popupTitle"
    :text="popupText"
    @close="closePopup"
  ></Popup>
</template>

<style scoped>
.container {
  margin-top: 66.4px;
  padding: 32px 48px;
  height: 643px;
}
.content_container {
  display: grid;
  gap: 3%;
  grid-template-columns: 30% 67%;
  height: 100%;
}
.buttons {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.header_buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.upload_image_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}
p {
  margin: 0;
}
.footer_buttons {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}
.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: #fff;
  background-color: #7ec58e;
  border: none;
  border-radius: 24px;
}
.custom-file-upload input {
  display: none;
}
.uploaded_image_container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  margin: 30px;
  position: relative;
}

.uploaded_image_container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.close_picture {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.color-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
</style>
