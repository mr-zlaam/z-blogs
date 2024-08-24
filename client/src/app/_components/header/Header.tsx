"use client";

import { IoIosCheckmark } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/ui/link";

import { handleLogout } from "@/helper/fetch/fetchBLogs";
import { useMessage } from "@/hooks/useMessage";
import logo from "@/images/logo/z-logo.png";
import { PayLoadType } from "@/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { RandomAvatar } from "react-random-avatars";
import SendOTP from "../send-otp/SendOTP";

function Header({ user, token }: { user: PayLoadType; token: string }) {
  const { successMessage } = useMessage();
  const router = useRouter();
  const pathName = usePathname();
  if (pathName === "/all-posts") return null;
  const logoutTheUser = async () => {
    try {
      const res = await handleLogout(token as string);
      if (res?.status === 200) {
        successMessage("User logout successfully");
        if (typeof window !== "undefined") return location.reload();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <header className=" h-[70px]  ">
        <nav className=" flex justify-between items-center ">
          <Link href={"/"}>
            <Image src={logo} alt="zlaam" height={70} width={70} />
          </Link>

          <div className="flex items-center">
            <div className="h-fit w-fit bg-background rounded-full  overflow-hidden ">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-transparent cursor-pointer  border-none flex items-center justify-center">
                  {user && user.uid ? (
                    <RandomAvatar
                      size={35}
                      mode="random"
                      name={(user && user?.username) || "hero"}
                      square
                    />
                  ) : (
                    <FaUserCircle size={35} />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="h-fit w-[200px] shadow-md shadow-foreground/20">
                  {user && (
                    <DropdownMenuItem>
                      <div className="flex-[1]">
                        <p className="flex flex-col p-1">
                          <span className="font-normal cursor-pointer">
                            {user.fullName}
                          </span>
                          <span className="text-sm hover:underline text-foreground/70 cursor-pointer">
                            @{user.username}
                          </span>
                        </p>
                      </div>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  {/*  */}
                  {user && user.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link
                        href={"/create-post"}
                        className="p-1 text-foreground w-full  cursor-pointer"
                      >
                        Create Post
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user && user.role === "MODERATOR" && (
                    <DropdownMenuItem>
                      <Link
                        href={"/create-post"}
                        className="p-1 text-foreground cursor-pointer w-full"
                      >
                        Create Post
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {/*  */}
                  {user && user.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link
                        href={"/admin/users"}
                        className="p-1 cursor-auto text-foreground w-full"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <Link
                      href={"/settings"}
                      className="p-1 text-foreground cursor-pointer w-full"
                    >
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user && (
                    <DropdownMenuItem>
                      {user && (
                        <span className="text-foreground/50 cursor-not-allowed bg-transparent w-full ">
                          {user && user.isVerfied ? (
                            <span className="flex items-center ">
                              Verified
                              <IoIosCheckmark
                                size={25}
                                className="text-foreground/60 mx-4"
                              />
                            </span>
                          ) : (
                            <SendOTP
                              email={user && (user.email as string)}
                              token={token as string}
                            />
                          )}
                        </span>
                      )}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    {user ? (
                      <span
                        onClick={logoutTheUser}
                        className="text-red-500 select-none flex-1 block p-1  cursor-pointer w-full"
                      >
                        Sign Out
                      </span>
                    ) : (
                      <Link
                        href={"/user-auth/sign-in"}
                        className="text-green-600 select-none flex-1 block p-1 w-full"
                      >
                        Sign in
                      </Link>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Popover>
                <PopoverTrigger className="bg-transparent cursor-pointer  border-none flex items-center justify-center">
                  {user && user.uid ? (
                    <RandomAvatar
                      size={35}
                      mode="random"
                      name={(user && user.username) || "hero"}
                      square
                    />
                  ) : (
                    <FaUserCircle size={35} />
                  )}
                </PopoverTrigger>
                <PopoverContent className="h-fit w-[200px] shadow-md shadow-foreground/20">
                  {user && user.fullName && (
                    <div className="flex-[1] p-3">
                      <p className="flex flex-col p-2">
                        <span className="font-normal cursor-pointer">
                          {user.fullName}
                        </span>
                        <span className="text-sm hover:underline text-foreground/70 cursor-pointer">
                          @{user.username}
                        </span>
                      </p>
                    </div>
                  )}
                  <Separator />

                  <div className="flex-[2] flex flex-col  ">
                    {user && user.role === "ADMIN" && (
                      <Link
                        href={"/create-post"}
                        className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                      >
                        Create Post
                      </Link>
                    )}
                    {user && user.role === "MODERATOR" && (
                      <Link
                        href={"/create-post"}
                        className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                      >
                        Create Post
                      </Link>
                    )}

                    {user && user.role === "ADMIN" && (
                      <Link
                        href={"/admin/users"}
                        className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user && (
                      <span className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded">
                        {user && user.isVerfied ? (
                          <span className="flex items-center ">
                            Verified
                            <IoIosCheckmark
                              size={25}
                              className="text-foreground mx-4"
                            />
                          </span>
                        ) : (
                          <SendOTP
                            email={user && (user.email as string)}
                            token={token as string}
                          />
                        )}
                      </span>
                    )}
                    <Link
                      href={"/settings"}
                      className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                    >
                      Settings
                    </Link>
                  </div>
                  <Separator />

                  <div>
                    {user ? (
                      <span
                        onClick={logoutTheUser}
                        className="text-red-500 select-none flex-1 block p-2 my-1 hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                      >
                        Sign Out
                      </span>
                    ) : (
                      <Link
                        href={"/user-auth/sign-in"}
                        className="text-green-600 select-none flex-1 block p-2 my-1  hover:bg-foreground/10 duration-200 transition-all cursor-pointer  rounded"
                      >
                        Sign in
                      </Link>
                    )}
                  </div>
                </PopoverContent>
              </Popover> */}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
