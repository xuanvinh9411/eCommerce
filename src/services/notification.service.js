'use strict';
const { NOTI } = require('.')

const pushNotiToSystem = async ({
    type = 'SHOP_001 ',
    recivedId = 1,
    senderId = 1,
    options = {}
}) => {
    let noti_content 

    if( type == 'SHOP_001 ' )  noti_content = `@@ Vừa thêm mới một sản phẩm : ##`;
    else if( type == 'PROMOTION_001 ' )  noti_content = `@@ Vừa thêm mới một voucher : ##`;

    const newNoti  = await Notification.create({
        noti_type : type ,
        noti_content  ,
        noti_senderId : senderId ,
        noti_recivedId : recivedId ,
        noti_options : options ,
    })

    return newNoti;
}

module.exports = {
    pushNotiToSystem
}