/**
 * 相关表单的验证规则
 */
// 自定义规则
const articlPartNameVal = (rule, value, callback) => {
  if (value === "选择分区") {
    callback(new Error("请选择文章分区"));
  } else {
    callback();
  }
};
export const RELEASE_FORM_VALIDATE = {
  title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  articlPartName: [
    { required: true, validator: articlPartNameVal, trigger: "blur" },
  ],
  stemfrom: [{ required: true, message: "请选择文章来源", trigger: "blur" }],
};
