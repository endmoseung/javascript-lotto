const { LOTTO_DETAILS } = require("../constant/constant");
const MakeUserLottos = require("../utils/MakeUserLottos");
const { RANK } = LOTTO_DETAILS;

class Lotto {
  #numbers;
  #bonusNumber;
  userLottoArray;
  lottos;

  constructor(userMoney) {
    this.lottos = this.moneyToLotto(userMoney);
  }

  moneyToLotto = (userMoney) => {
    return userMoney / LOTTO_DETAILS.PRICE;
  };

  makeUserLottoArray = () => {
    const userLottos = Array.from({ length: this.lottos });
    this.userLottoArray = userLottos.map(() => {
      return MakeUserLottos.generate();
    });
  };

  setNumbers = (numbers) => {
    this.#numbers = numbers;
  };

  setBonusNumbers = (bonusNumber) => {
    this.#bonusNumber = bonusNumber;
  };

  getResults = () => {
    const winningBoard = { ...LOTTO_DETAILS.WINNING_BOARD };
    this.userLottoArray.forEach((lotto) => {
      const intersectionLottoAndUser = lotto.reduce((acc, number) => {
        if (this.#numbers.includes(number)) acc += 1;
        return acc;
      }, 0);

      if (intersectionLottoAndUser < RANK.FIFTH) return;

      if (
        intersectionLottoAndUser === RANK.THIRD &&
        lotto.includes(this.#bonusNumber)
      ) {
        winningBoard.SECOND += 1;
        return;
      }

      winningBoard[this.checkWinning(intersectionLottoAndUser)] += 1;
    });
    const profit = this.getProfit(winningBoard);
    return { winningBoard, profit };
  };

  checkWinning(intersection) {
    switch (intersection) {
      case RANK.FIFTH:
        return "FIFTH";
      case RANK.FORTH:
        return "FORTH";
      case RANK.THIRD:
        return "THIRD";
      case RANK.FIRST:
        return "FIRST";
      default:
        throw new Error(ERROR.WRONG_ROUTE);
    }
  }

  getProfit(winningBoard) {
    const userRevenue = this.checkRevenue(winningBoard);
    const userMoney = this.userLottoArray.length;
    const profit = Number(
      ((userRevenue / userMoney) * 100).toFixed(1)
    ).toLocaleString("en");
    //소수점 한자리까지 반올림

    return profit;
  }

  checkRevenue(winningBoard) {
    let revenue = 0;
    revenue += winningBoard.FIFTH * 5;
    revenue += winningBoard.FORTH * 50;
    revenue += winningBoard.THIRD * 1500;
    revenue += winningBoard.SECOND * 30000;
    revenue += winningBoard.FIRST * 2000000;
    return revenue;
  }
}

module.exports = Lotto;
