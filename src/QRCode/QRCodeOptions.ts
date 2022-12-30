import {
  ISlideOptionsContext,
  SlideOptionsModule, VueInstance
} from "@comeen/comeen-play-sdk-js";

export default class QRCodeOptionsModule extends SlideOptionsModule {
  constructor(context: ISlideOptionsContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
    const { h, computed, watchEffect } = vue;

    const update = context.update;

    const { Field, TextInput, TextArea, ColorPicker } = this.context.components

    context.updateAutoName("QRCode")

    const valid = computed(() => update.option("url").modelValue?.length > 0)
    watchEffect(() => context.updateValidationStatus(valid.value))

    return () =>
      h("div", {}, [
        h(Field, { label: this.t('modules.qrcode.options.url') }, [
          h(TextInput, { ...context.update.option('url') })
        ]),
        h(Field, { class: 'mt-4', label: this.t('modules.qrcode.options.background_color') }, [
          h(ColorPicker, {
            ...context.update.option("background_color", { default: 'white' }),
            customColors: [
              { id: "white", color: "white" }
            ]
          })
        ]),
        h(Field, { class: 'mt-4', label: this.t('modules.qrcode.options.qrcode_color') }, [
          h(ColorPicker, {
            ...context.update.option("qrcode_color", { default: 'black' }),
            customColors: [
              { id: "white", color: "white" }
            ]
          })
        ]),
        h(Field, { class: 'mt-4', label: this.t('modules.qrcode.options.description') }, [
          h(TextArea, { ...update.option('description') })
        ])
      ]
      )
  }
}
