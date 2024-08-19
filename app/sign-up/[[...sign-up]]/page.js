import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <main className="grid place-content-center w-full py-20 overflow-x-hidden">
      <div className="z-[1] absolute -top-[20svh] -left-[10svw] w-[500px] h-[500px] bg-primary blur-[100px] rounded-full"></div>
      <div className="z-[1] absolute -bottom-[20svh] -right-[10svw] w-[500px] h-[500px] bg-primary blur-[100px] rounded-full"></div>
      <SignUp />
    </main>
  )
}
