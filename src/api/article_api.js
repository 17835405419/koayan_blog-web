import request from "@/untils/request.js";

export const createArticle = (data) => {
  // 发布文章
  return request({
    method: "POST",
    url: "/createArticle",
    data,
  });
};

export const getArticleInfo = (params) => {
  // 获取文章信息
  return request({
    method: "GET",
    url: "/getArticleInfo",
    params,
  });
};
export const getArticleList = (params) => {
  // 获取文章列表
  return request({
    method: "GET",
    url: "/getArticleList",
    params,
  });
};
export const deleteOneArticle = (params) => {
  // 删除单个文章
  return request({
    method: "DELETE",
    url: "/deleteOneArticle",
    params,
  });
};

export const searchArticle = (params) => {
  // 搜索文章
  return request({
    method: "GET",
    url: "/searchArticle",
    params,
  });
};
