const { ERROR, LOTTO_DETAILS } = require("../constant/constant");

const Validation = {
  isUserMoney(userMoney) {
    this.isNumber(userMoney);
    this.isNaturalNumber(userMoney);
    this.isLottoMoney(userMoney);
  },

  isNumber(userInput) {
    if (isNaN(userInput)) {
      throw new Error(ERROR.NAN);
    }
  },

  isLottoMoney(userInput) {
    if (userInput % 1000 !== 0) {
      throw new Error(ERROR.IS_LOTTO_MONEY);
    }
  },

  isNaturalNumber(userInput) {
    if (!/^[1-9][0-9]*$/.test(userInput)) {
      throw new Error(ERROR.IS_NATURAL_NUMBER);
    }
  },
  isLottoInput(userInput) {
    if (userInput.length !== LOTTO_DETAILS.EA) {
      throw new Error(ERROR.IS_LOTTO_INPUT);
    }
  },

  isLottoVariable(userInput) {
    if (!(userInput >= LOTTO_DETAILS.MIN && userInput <= LOTTO_DETAILS.MAX)) {
      throw new Error(ERROR.IS_LOTTO_NUMBER);
    }
  },

  isOverlap(userInput) {
    userInput.forEach((v, i) => {
      if (userInput.indexOf(v) !== i) throw new Error(ERROR.IS_OVERLAP);
    });
  },

  isIncludeNumberInArr(number, arr) {
    if (arr.includes(number)) throw new Error(ERROR.is_INCLUDE_NUMBER_IN_ARR);
  },
};

module.exports = Validation;
