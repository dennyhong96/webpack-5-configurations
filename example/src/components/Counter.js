import styles from "./Counter.module.scss";

class Counter {
  $root;
  $el;
  count;

  constructor(root) {
    this.$root = root;
    this.count = 0;

    this.setup();
    this.update();
    this.mount();
  }

  setup() {
    this.$el = document.createElement("div");
    this.$el.id = "counter";
    this.$el.classList.add(styles.counter);
    this.$el.addEventListener(
      "click",
      function () {
        this.count += 1;
        this.update();
      }.bind(this)
    );
  }

  update() {
    this.$el.innerHTML = this.count;
  }

  mount() {
    this.$root.append(this.$el);
  }
}

export default Counter;
