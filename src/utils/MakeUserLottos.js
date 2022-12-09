const { Random } = require("@woowacourse/mission-utils");
const { LOTTO_DETAILS } = require("../constant/constant");

const MakeUserLottos = {
  generate() {
    return Random.pickUniqueNumbersInRange(
      LOTTO_DETAILS.MIN,
      LOTTO_DETAILS.MAX,
      LOTTO_DETAILS.EA
    );
  },
};

module.exports = MakeUserLottos;
