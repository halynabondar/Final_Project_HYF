import { signOut } from '@/auth';
import Button from '@/components/Button';

export default function SignOutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-10">
      <h5 className="w-full text-center font-poppins text-[28px] font-semibold leading-[40px] xs:text-[34px] xs:leading-[50px]">
        Er du sikker på, at du vil logge ud?
      </h5>
      <form
        action={async (formData) => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit" value="Log ud" />
      </form>
    </section>
  );
}
