const tag = '[View]';

export default {
  init(el) {
    if (!el) throw new Error('Unknow HTML Elements');
    this.el = el;
    return this;
  },

  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  },

  emit(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.el.dispatchEvent(customEvent);
    return this;
  },

  hide() {
    this.el.style.display = 'none';
    return this;
  },

  show() {
    this.el.style.display = '';
  },
};
