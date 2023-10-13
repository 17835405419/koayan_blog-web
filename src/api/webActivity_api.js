import request from "@/untils/request.js";
export const getRandomEnglish = () => {
  // 获取随机英语单词
  return request({
    method: "GET",
    url: "/getRandomEnglish",
  });
};

export const getRandomSoup = () => {
  // 获取随机鸡汤
  return request({
    method: "GET",
    url: "/getRandomSoup",
  });
};

export const wordAudioPlay = (params) => {
  // 单词播放接口
  return request({
    method: "GET",
    url: "/wordAudioPlay",
    params,
  });
};
