import redirectTo from "@/helpers/redirect_to";
import {
  GetServerSideProps
} from "next"
import User from "@/models/user";

const Profile = ({ userInfo }) => {
  return <h1>Profile</h1>
}

export const getServerSideProps = async (context) => {
  if (!context.req.cookies?.session_id) {
    return redirectTo("/auth");
  }
/*
  const userInfo = await User.findById({
    _id: user._id
  }).select('username email');
  if (userInfo) {
    return {
      props: {
        user: JSON.stringify(userInfo)
      }
    }
  }*/
  return {
    props: {}
  }
}

export default Profile;