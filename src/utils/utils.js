import * as Realm from "realm-web";

export const testEmail = (email) => {
    let regex = /^[\w\d\._]+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;

    if(!regex.test(email)){
        return false;
    }

    return true;
}

export const isPropertyNullOrUndefinedOrEmpty = (obj, key) => {
        
    if ( !(key in obj) || typeof obj[key] == "undefined"){
        return true
    }
    if(obj[key] === 0){
        return false;
    }
    
    return false;
}

export const convertStringToInt = (param) => {
    let value = param;
    if(typeof value === 'string'){
        value = value.replace(",", "");
        value = parseFloat(value);
    }
    return value;
}

export const  handleAuthenticationError = (err) => {
    let errorMessage = "";
    const handleUnknownError = () => {
      console.warn(
        "Something went wrong with a Realm login or signup request. See the following error for details."
      );
      console.error(err);
    };
    if (err instanceof Realm.MongoDBRealmError) {
      const { error, statusCode } = err;
      const errorType = error || statusCode;
      
      switch (errorType) {
        case "invalid username":
          // Invalid email address
            errorMessage = "Invalid Username"
          break;
        case "invalid username/password":
        case "invalid password":
        case 401:
          // Invalid password
          errorMessage = "Invalid Username/Password"
          break;
        case "name already in use":
        case 409:
          // Email is already registered
          errorMessage = "Email already in use"
          break;
        case "password must be between 6 and 128 characters":
        case 400:
          // Invalid password - must be between 6 and 128 characters
          errorMessage = "Password must be between 6 and 128 characters"
          break;
        default:
          // In theory you won't ever hit this default, but if an error message/code without a case ever comes up it will fall back to this.
          handleUnknownError();
          break;
      }
    } else {
      // In this case, the error isn't a MongoDB Realm error so you probably need to add another error handler somewhere else to catch it before it gets passed to this function.
      handleUnknownError();
    }
    return errorMessage;
  }