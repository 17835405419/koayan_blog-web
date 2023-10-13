import request from "@/untils/request.js";

export const uploadFile = (data) => {
  // 上传文件
  return request({
    method: "POST",
    url: "/uploadArticleImg",
    data,
  });
};

export const deleteUploadFile = (params) => {
  // 删除文件
  return request({
    method: "DELETE",
    url: "/deleteArticleImg",
    params,
  });
};

export const downFile = (params) => {
  // 下载文件
  return request({
    method: "GET",
    url: "/downFiles",
    params,
  });
};
