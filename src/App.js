const LottoController = require("./controller/LottoController");

class App {
  play() {
    new LottoController().play();
  }
}

const app = new App();
app.play();

module.exports = App;
