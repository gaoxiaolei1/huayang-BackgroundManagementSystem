import Mock from "mockjs";
import DATAURL from "../utils/index";

//冷启动
Mock.mock(DATAURL.favorite, () => {
  return {
    status: "0",
    "error_code": "002700",
    msg: "success",
    data: {
      clickRate: [
        {
          time: "2018/01/25",
          rate: 78
        },
        {
          time: "2018/01/26",
          rate: 30
        },
        {
          time: "2018/01/25",
          rate: 78
        },
        {
          time: "2018/01/26",
          rate: 30
        },
        {
          time: "2018/01/25",
          rate: 78
        },
        {
          time: "2018/01/26",
          rate: 30
        }
      ],
      clickContent: [
        {
          title: "小猪佩奇和妈妈",
          format: "视频",
          rectype: "AGE",
          num: 130
        },
        {
          title: "小猪佩奇和爸爸",
          format: "视频",
          rectype: "AGE",
          num: 130
        }
      ]
    }
  }
});
//推荐质量
Mock.mock(DATAURL.Recommended, () => {
  return {
    status: "0",
    "error_code": "002700",
    msg: "success",
    data: {
      clickRate: [
        {
          time: "2018/01/25",
          rate: 78
        },
        {
          time: "2018/01/26",
          rate: 30
        },
        {
          time: "2018/01/25",
          rate: 78
        },
        {
          time: "2018/01/26",
          rate: 30
        },
        {
          time: "2018/01/25",
          rate: 78
        },
        {
          time: "2018/01/26",
          rate: 30
        }
      ],
      clickContent: [
        {
          title: "小猪佩奇和妈妈",
          format: "视频",
          rectype: "AGE",
          num: 130
        },
        {
          title: "小猪佩奇和爸爸",
          format: "视频",
          rectype: "AGE",
          num: 130
        }
      ]
    }
  };
});
// //画像
Mock.mock(DATAURL.portrait, () => {
  return {
    status: "0",
    "error_code": "002700",
    msg: "success",
    data: {
      user: [
        {
          name: "动画片",
          num: "674"
        },
        {
          name: "佩奇",
          num: "428"
        }
      ],
      click: [
        {
          name: "动画片",
          num: "674"
        }
      ],
      remove: [
        {
          name: "动画片",
          num: "674"
        }
      ],
      noclick: [
        {
          name: "动画片",
          num: "674"
        }
      ]
    }
  };
});
