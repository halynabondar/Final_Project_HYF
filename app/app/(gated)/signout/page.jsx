import { signOut } from 'next-auth/react';
import Button from '@/components/Button';

export default function SignOutPage() {
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-10">
      <h5 className="w-full text-center font-poppins text-[28px] font-semibold leading-[40px] xs:text-[34px] xs:leading-[50px]">
        Er du sikker på, at du vil logge ud?
      </h5>
      <form onSubmit={handleSignOut}>
        <Button type="submit" aria-label="Log out" value="Log ud" />
      </form>
    </section>
  );
}
