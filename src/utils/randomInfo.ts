type RandomParamsType = {
  prefix?: string;
  length?: number;
};

const randomBaseArr = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'g',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ],
  [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'G',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
];
function randomInfo(
  params: RandomParamsType = { prefix: 'oneLight', length: 5 },
) {
  let res = params.prefix;
  for (let i = 0; i < params.length; i++) {
    const index = Math.floor(Math.random() * 3);
    const randomStr =
      randomBaseArr[index][
        Math.floor(Math.random() * randomBaseArr[index].length)
      ];
    // 拼接进名字变量中
    res = res + randomStr;
  }
  return res;
}

export default randomInfo;
