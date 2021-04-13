const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
      type:String,
      required:[true,'Please provide your name']
  },
  email: {
      type:String,
      required:[true,'Please provide your email'],
      unique:true,
      lowercase:true,
      validate: [validator.isEmail,'Please provide a valid email']
  },
  password: {
      type:String,
      required:[true,'Please provide a password'],
      minlength:8,
      select:false
  },
  passwordConfirm: {
      type:String,
      required:[true,'Please confirm your password'],
      validate:{
          validator: function(el){
              return el ===this.password
          },
          message:'Passwords do not match'
      }
  },
  photo: {
      type:String,
      default:'default.jpg'
  },
  role:{
      type:String,
      enum:['admin','moderator','user','guide'],
      default:'user'

  },
  passwordChangedAt:Date,
  passwordResetToken:String,
  passwordResetExpires:Date,
  active:{
      type:Boolean,
      default:true,
      select:false
  }
});

userSchema.pre('save',async function(next){

    //if pass is not modified go to next()

    if(!this.isModified('password')) return next()

    //if pass is modified do this..
    //Hash the pass with cos of 12
    this.password = await bcrypt.hash(this.password,12)

    //Delete pass confirm field , we dont need it in DB
    this.passwordConfirm = undefined
    next()

})

userSchema.pre('save',function(next){

    // if pass is not modified or document is new go to next()
    if(!this.isModified('password') || this.isNew) return next()

    //if pass is modified do this..
   
    this.passwordChangedAt = Date.now()-1000
    next()
})

//for every query that startes with find,find the ones that are active
userSchema.pre(/^find/,function(next){

    this.find({active:{$ne:false}})
    next()
})

//check if password is correct
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword,userPassword)
}

//check if pass is changed after the current jwt timestamp
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() /1000,10
        )
        return JWTTimestamp<changedTimestamp
    }
    return false
}

userSchema.methods.createPasswordResetToken = function(){

    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256')
    .update(resetToken)
    .digest('hex')

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 *1000

    return resetToken
}

const User = mongoose.model('User', userSchema);

module.exports = User;