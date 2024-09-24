import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <section className='w-full h-screen flex justify-center items-center mb-20'>
        <SignUp />
    </section>
  )
}

export default SignUpPage;