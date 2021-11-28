import { GetServerSideProps } from "next"
import redirectTo from "@/helpers/redirect_to";
import User from "@/models/user";

const Profile = ({user}) => {
  const userData: UserProfile = JSON.parse(user);
  
  return <div>
    <h1>{userData.username}</h1>
    <p>{userData.email}</p>
    <p>{userData._id}</p>
  </div>
}

interface UserProfile {
  username: string,
  _id: string,
  email: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {slug} = context.params;

  if(!context.req.cookies?.session_id) {
    return redirectTo("/auth");
  }
  
  try {
    const user = await User.findById({_id: slug}).select('username email');
    
    if(user) {
      return {
        props: {
          user: JSON.stringify(user)
        }
      }
    }
  } catch (e: Error) {
    return {
      notFound: true
    }
  }
}

export default Profile;