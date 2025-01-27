"use client"

import React from 'react';
import Button from "@/components/Button";
import Link from "next/link";

function SignInPage() {

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Form submitted");
    }

    return (
        <section>
            <div className="max-w-2xl mx-auto rounded-2xl bg-white shadow-xl p-5">
                <h1 className="font-poppins font-semibold xs:text-[40px] text-[34px] xs:leading-[77px] leading-[67px] w-full text-center">Log
                    ind</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="">
                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="email" className="font-bold ml-1">E-mail</label>
                            <input className="p-2 border rounded-xl hover:border-blue-300 duration-300" type="email"
                                   name="email" id="email" autoComplete="email" required
                                   placeholder="Eksempel@gmail.com"/>
                        </div>
                        <div className="flex flex-col gap-1 mb-5">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="font-bold ml-1">Adgangskode</label>
                            </div>
                            <input className="p-2 border rounded-xl hover:border-blue-300 duration-300" minLength="8"
                                   type="password"
                                   name="password" id="password" autoComplete="current-password" required
                                   placeholder="Indtast mindst 8+ tegn"/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button styles={`mb-3`} type="submit" value="Log ind"/>
                    </div>
                    <div className="flex items-center justify-center gap-5">
                        <p>Opret ny konto</p>
                        <Link href="/signup" className="text-blue-400">
                            Tilmeld dig
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignInPage;