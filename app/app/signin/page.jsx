import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth.js"
import { AuthError } from "next-auth"

export default async function SignInPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {
    return (
        <div className="flex flex-col gap-2">
            <form
                action={async (formData) => {
                    "use server"
                    try {
                        await signIn("credentials", formData)
                    } catch (error) {
                        if (error instanceof AuthError) {
                            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                        }
                        throw error
                    }
                }}
            >
                <label htmlFor="email">
                    Email
                    <input name="email" id="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input name="password" id="password" />
                </label>
                <input type="submit" value="Sign In" />
            </form>
            {Object.values(providerMap).map((provider) => (
                <form
                    action={async () => {
                        "use server"
                        try {
                            await signIn(provider.id, {
                                redirectTo: props.searchParams?.callbackUrl ?? "",
                            })
                        } catch (error) {
                            if (error instanceof AuthError) {
                                console.error("Authentication error:", error.type);
                                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                            }

                            // Handle unexpected errors
                            console.error("Unexpected authentication error:", error);
                            return redirect(`${SIGNIN_ERROR_URL}?error=unknown`);
                        }
                    }}
                >
                    <button type="submit">
                        <span>Sign in with {provider.name}</span>
                    </button>
                </form>
            ))}
        </div>
    )
}