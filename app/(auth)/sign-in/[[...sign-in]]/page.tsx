import { SignIn } from '@clerk/nextjs';



const SignInPage = () => {
  return (
    <section className='w-full h-screen flex justify-center items-center'>
        <SignIn />
    </section>
  )
}

export default SignInPage;