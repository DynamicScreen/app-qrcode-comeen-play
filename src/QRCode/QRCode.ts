import {
  ISlideContext,
  IPublicSlide,
  SlideModule,
  ColorHelper
} from "@comeen/comeen-play-sdk-js";
import { nextTick } from 'vue';
import QRCodeStyling from "qr-code-styling";

export default class QRCodeSlideModule extends SlideModule {
  constructor(context: ISlideContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  // @ts-ignore
  setup(props: Record<string, any>, vue: VueInstance, context: ISlideContext) {
    const { h, reactive, ref } = vue;

    const slide = reactive(props.slide) as IPublicSlide;
    this.context = reactive(props.slide.context);

    const url = ref(slide.data.url);
    const description = ref(slide.data.description);
    const background_color = ref(slide.data.background_color);
    const qrcode_color = ref(slide.data.qrcode_color);

    const qrCodeElement = ref<HTMLDivElement>();

    this.context.onPrepare(async () => {
      nextTick(() => {
        const qrCode = new QRCodeStyling({
          width: 400,
          height: 400,
          type: "canvas",
          image: "",
          data: url.value,
          dotsOptions: {
            color: `#${ColorHelper.getRGB(qrcode_color.value)}`,
            type: "rounded",
          },
          backgroundOptions: {
            color: 'transparent',
          },
          imageOptions: {
            crossOrigin: "anonymous",
          }
        })
        if (qrCodeElement.value) {
          qrCode.append(qrCodeElement.value)
        }
      })
    });

    this.context.onReplay(async () => {
    });

    this.context.onPlay(async () => {
    });

    this.context.onPause(async () => {
    });
    this.context.onResume(async () => {
    });

    this.context.onEnded(async () => {
      qrCodeElement.value.innerHTML = ''
    });

    return () =>
      h("div", {
        class: `flex w-full h-full flex-col justify-center items-center bg-${ColorHelper.getClass(background_color.value)}`
      }, [
        h('div', {
          ref: qrCodeElement
        }),
        h('div', { class: `mt-8 text-2xl text-${ColorHelper.getClass(qrcode_color.value)}` }, description.value)
      ])
  }
}
