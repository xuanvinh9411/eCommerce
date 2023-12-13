'use strict';
const { NOTI } = require('../models/notification.model')

const pushNotiToSystem = async ({
    type = 'SHOP_001 ',
    recivedId = 1,
    senderId = 1,
    options = {}
}) => {
    let noti_content 

    if( type == 'SHOP_001 ' )  noti_content = `@@ Vừa thêm mới một sản phẩm : ##`;
    else if( type == 'PROMOTION_001 ' )  noti_content = `@@ Vừa thêm mới một voucher : ##`;

    const newNoti  = await NOTI.create({
        noti_type : type ,
        noti_content  ,
        noti_senderId : senderId ,
        noti_recivedId : recivedId ,
        noti_options : options ,
    })

    return newNoti;
}

const listNotiByUser = async({ userId = 1,
    type = 'ALL',
    isRead = 0
}) =>{ 
    const match = { noti_recivedId : userId}
    if(type !== 'ALL') match['noti_type'] = type

    return await NOTI.aggregate([
        {
            $match : match
        },{
            $project : {
                noti_type : 1,
                noti_senderId : 1,
                noti_recivedId : 1,
                noti_content : {
                    $concat: [
                        {
                            $substr : ['$noti_options.shop_name',0,-1]
                        },
                        ' vừa mới thêm một sản phầm mới : ',
                        {
                            $substr : ['$noti_options.product_name',0,-1]
                        }
                    ]
                },
            }
        }
    ])
}
   

module.exports = {
    pushNotiToSystem,
    listNotiByUser
}