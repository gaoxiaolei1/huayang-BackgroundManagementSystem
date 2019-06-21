export const getRecommend = () => {
  return {
    code: 0,
    msg: '操作成功',
    data: {
      userinfo: {
        grade: {
          description: '初学乍练',
          gid: 1,
          imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537887159547&di=8399e4d2cb831e9182b5c4bd2d7971a1&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20131108%2F20131108171245-1808797716.jpg',
          level: 1,
          maxscore: 100,
          minscore: 1,
          name: '初学乍练'
        },
        honorList: [
          {
            category: 1,
            description: '登堂入室',
            get: true,
            hid: 1,
            imgicon: 'http://imgsrc.baidu.com/imgad/pic/item/b64543a98226cffcf6798788b2014a90f603eabd.jpg',
            name: '登堂入室'
          },
          {
            category: 1,
            description: '略知一二',
            get: false,
            hid: 2,
            imgicon: 'http://www.fpwap.com/UploadFiles/news/yxgl/2016/01/02/1451711312548940.png',
            name: '略知一二'
          },
          {
            category: 1,
            description: '初亏堂奥',
            get: true,
            hid: 3,
            imgicon: 'http://imgsrc.baidu.com/imgad/pic/item/a08b87d6277f9e2f308dfe2c1530e924b899f35e.jpg',
            name: '初亏堂奥'
          }
        ],
        rank: 1268723,
        rankchange: 218,
        totalcoin: 88886,
        totalscore: 60
      }
    },
    status: 0
  };
};