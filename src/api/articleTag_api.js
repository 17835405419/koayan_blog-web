import request from "@/untils/request.js";

export const createArticleTag = (data) => {
  // 发布标签
  return request({
    method: "POST",
    url: "/createArticleTag",
    data,
  });
};

export const getArticleTagList = (params) => {
  // 获取标签列表
  return request({
    method: "GET",
    url: "/getArticleTagList",
    params,
  });
};

export const deleteOneArticleTag = (params) => {
  // 删除单个标签
  return request({
    method: "DELETE",
    url: "/deleteOneArticleTag",
    params,
  });
};
