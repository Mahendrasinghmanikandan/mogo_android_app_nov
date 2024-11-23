import STRINGS from '../../../utils/constants/string';
import assets from '../../../utils/assets/assets';

export const onBoardData = [
  {
    id: 1,
    image: assets.frame4,
    lightImage: assets.frame2,
    title: STRINGS.onBoard.screenOne,
    buttonTitle: STRINGS.onBoard.next,
    subtitle: STRINGS.onBoard.screenOneDes,
  },
  {
    id: 2,
    image: assets.frame5,
    lightImage: assets.frame1,
    title: STRINGS.onBoard.screenSecond,
    buttonTitle: STRINGS.onBoard.next,
    subtitle: STRINGS.onBoard.screenSecondDes,
  },
  {
    id: 3,
    image: assets.frame6,
    lightImage: assets.frame3,
    title: STRINGS.onBoard.screenThree,
    buttonTitle: STRINGS.onBoard.get,
    subtitle: STRINGS.onBoard.screenThreeDes,
  },
];
