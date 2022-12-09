const { Console } = require("@woowacourse/mission-utils");
const { ANNOUNCEMENT_MESSAGE } = require("../constant/constant");
const Validation = require("../utils/Validation");

const InputView = {
  readUserMoney(callback) {
    Console.readLine(ANNOUNCEMENT_MESSAGE.BUY_LOTTO, (userMoney) => {
      Validation.isUserMoney(Number(userMoney));
      callback(userMoney);
    });
  },

  readWinningNumber(callback) {
    Console.readLine(ANNOUNCEMENT_MESSAGE.LOTTO, (userAnswer) => {
      const splitNumbers = userAnswer.split(",").map(Number);
      Validation.isLottoInput(splitNumbers);
      splitNumbers.forEach((value) => Validation.isLottoVariable(value));
      callback(splitNumbers);
    });
  },

  readBonusNumber(callback) {
    Console.readLine(ANNOUNCEMENT_MESSAGE.BONUS, (userAnswer) => {
      const toNumberUserAnswer = Number(userAnswer);
      Validation.isLottoVariable(toNumberUserAnswer);
      callback(toNumberUserAnswer);
    });
  },
};

module.exports = InputView;
