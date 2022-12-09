const { ANNOUNCEMENT_MESSAGE } = require("../constant/constant");
const Lotto = require("../model/Lotto");
const InputView = require("../view/InputView");
const OutputView = require("../view/OutputView");

class LottoController {
  play = () => {
    InputView.readUserMoney((userMoney) => {
      this.makeLotto(userMoney);
      this.printUserLottos();
      this.printUserLottoList();
      this.getWinningNumber();
    });
  };

  getWinningNumber = () => {
    InputView.readWinningNumber((userAnswer) => {
      this.lotto.setNumbers(userAnswer);
      this.getBonusNumber();
    });
  };

  getBonusNumber = () => {
    InputView.readBonusNumber((userAnswer) => {
      this.lotto.setBonusNumbers(userAnswer);
      const result = this.lotto.getResults();
      this.printLottoResult(result);
    });
  };

  makeLotto = (userMoney) => {
    this.lotto = new Lotto(userMoney);
    this.lotto.makeUserLottoArray();
  };

  printUserLottos = () => {
    OutputView.printResult(
      `${this.lotto.lottos}${ANNOUNCEMENT_MESSAGE.PURCHASE}`
    );
  };

  printUserLottoList = () => {
    this.lotto.userLottoArray.forEach((currentLotto) => {
      OutputView.printResult(`"[${currentLotto.join(", ")}]"`);
    });
  };

  printLottoResult = (result) => {
    OutputView.printResult("당첨 통계");
    OutputView.printResult("---");
    const { winningBoard } = result;
    const a = [
      `3개 일치 (5,000원) - ${winningBoard.FIFTH}개`,
      `4개 일치 (50,000원) - ${winningBoard.FORTH}개`,
      `5개 일치 (1,500,000원) - ${winningBoard.THIRD}개`,
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningBoard.SECOND}개`,
      `6개 일치 (2,000,000,000원) - ${winningBoard.FIRST}개`,
    ];
    a.forEach((item) => OutputView.printResult(item));
    OutputView.printResult(`총 수익률은 ${result.profit}%입니다.`);
  };
}

module.exports = LottoController;
