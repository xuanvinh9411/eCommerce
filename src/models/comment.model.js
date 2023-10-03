'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Comment'
const COLLECTION_NAME = 'Comments'

// Declare the Schema of the Mongo model
var commentSchema = new Schema({
    comment_userId : {type : Number, default : 1},
    comment_productId : { tpe : Schema.Types.ObjectId, ref: 'Product'},
    comment_content : {type : String, default : 'text'},
    comment_left: { type : Number, default : 0},
    comment_right : { type: Number, default: 0 },
    comment_parentId : { type: Schema.Types.ObjectId,ref: DOCUMENT_NAME},
    isDeleted : { type: Boolean, default: false },
},{
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = model(DOCUMENT_NAME, commentSchema);