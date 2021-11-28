import redirectTo from "@/helpers/redirect_to";
import { GetServerSideProps, Redirect } from "next"

const Profile = () => {
  return <h1>Profile</h1>
}

interface UserProfile {
  username: string,
  _id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {_id} = context.params;

  if(!context.req.cookies?.session_id) {
    return redirectTo("/auth");
  }
  return {
    props: {}
  }
}

export default Profile;