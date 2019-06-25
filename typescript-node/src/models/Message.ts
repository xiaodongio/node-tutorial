import mongoose from "mongoose";
import { User, UserDocument } from "./User";
import _ from "lodash";
import Utils from "../util/utils";


const MessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, index: true },
  local_id: { type: String, index: true },
  user_id: { type: String, index: true },
  room_id: { type: String, index: true },
  type: Number,
  message: String,
  image: String,
  file: {
      file: {
          id: mongoose.Schema.Types.ObjectId,
        name: String,
        size: Number,
        mimeType: String
      },
      thumb: {
          id: mongoose.Schema.Types.ObjectId,
        name: String,
        size: Number,
        mimeType: String
      }
  },
  seenBy:[],
  location: {
        lat: Number,
        lng: Number
  },
  deleted: Number,
  created: Number,
  attributes: {}
});

type addSeenByCallBack = (err: any, self: any) => void;

// add instance methods
MessageSchema.methods.addSeenBy = function (user: UserDocument , callBack:addSeenByCallBack) {
        
  var seenBy = this.seenBy;
  var self = this;

  var listOfUsers: UserDocument[] = [];
  
  _.forEach(seenBy,function(seenObj){
         
      listOfUsers.push(seenObj.user);
      
  });
              
  if(_.indexOf(listOfUsers,user._id) == -1){

      seenBy.push({user:user._id,at: Utils.now()});
      
      this.update({
          seenBy: seenBy
      },{},function(err: any,userResult: UserDocument){     
          if(callBack)
              callBack(err,self);              
      });
  }
}



