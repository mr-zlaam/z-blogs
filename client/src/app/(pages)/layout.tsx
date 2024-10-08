import { BACKEND_URI, SECRET } from "@/config";
import UseCookieGrabber from "@/hooks/useCookieGrabber";
import { PayLoadType } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { verify } from "jsonwebtoken";
import {} from "react";
import Header from "../_components/header/Header";
import PageHeader from "../_components/pageHeader/PageHeader";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
import axios from "axios";
const getUserInformationFromToken = () => {
  const objToken = UseCookieGrabber();
  if (!objToken?.value) {
    return;
  }
  try {
    const user = verify(objToken.value, SECRET) as PayLoadType;
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
};
// const fetchSingleUser = async (token: string) => {
//   try {
//     if (!token) return;
//     const user = verify(token, SECRET) as PayLoadType;
//     const response = await axios.get(
//       `${BACKEND_URI}/auth/getSingleUser/${user.uid}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     console.log(error);
//   }
// };
function PageLayout({ children }: { children: React.ReactNode }) {
  const tokenStore = UseCookieGrabber();
  const user = getUserInformationFromToken() as PayLoadType;
  return (
    <>
      {/* <Alert /> */}
      <PageWrapper className="sticky top-0 left-0 w-full  mb-4 bg-background/80 backdrop-blur-md z-[50]">
        <Header user={user} token={tokenStore?.value as string} />
        <Separator className="bg-foreground/10 h-[0.5px]" />
        <PageHeader />
        <Separator className="bg-foreground/10 h-[0.5px]" />
      </PageWrapper>
      <PageWrapper className="py-3  overflow-x-hidden">{children}</PageWrapper>
    </>
  );
}

export default PageLayout;
