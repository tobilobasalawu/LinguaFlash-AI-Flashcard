import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <main className="relative flex justify-center items-center w-full h-svh overflow-hidden">
      <div className="z-[2] absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] h-[200vh] w-[200svw] animate-noise"></div>
      <div className="z-[1] absolute -top-[20svh] -left-[10svw] w-[500px] h-[500px] bg-primary blur-[100px] rounded-full"></div>
      <div className="z-[1] absolute -bottom-[20svh] -right-[10svw] w-[500px] h-[500px] bg-primary blur-[100px] rounded-full"></div>
      <SignIn />
    </main>
  )
}
