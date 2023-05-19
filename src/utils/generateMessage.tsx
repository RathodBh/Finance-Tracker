import { NoticeType } from "antd/es/message/interface";

const MSG = (messageApi:any ,msg: string, tp: NoticeType = "success") => {
    messageApi.open({
        type: tp,
        content: msg,
    });
};

export default MSG;
