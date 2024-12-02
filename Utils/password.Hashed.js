import bcrypt from "bcrypt";

const bcryptHashedPassword = async (password)=>{
   try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
   } catch (error) {
    console.log("There is some errors in your bcrypt hashed password controller plz fix the bug first ", error);
   } 
}
export default bcryptHashedPassword;