import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import BaseModal from "@/components/modals/BaseModal.tsx";
import {ModalProps} from "@/types/BaseModal.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FormFields, SignInSchema, SignUpSchema} from "@/types/AuthModal.ts";
import {auth, db} from "@/firebase.ts";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import {setDoc, doc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast";
import {FirebaseError} from "firebase/app";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useState} from "react";


export default function AuthModal({isModalOpen, onClose}: ModalProps) {
    const [isLogin, setIsLogin] = useState(true)

    const navigate = useNavigate();
    const {toast} = useToast();
    const {setCurrentUser} = useAuth();
    const signIn = async (email: string, password: string) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response.user);
        setCurrentUser(response.user);
    }
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<FormFields>({
        resolver: zodResolver(isLogin ? SignInSchema : SignUpSchema),
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            if ("username" in data) {
                const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    username: data.username,
                    email: data.email,
                    createdAt: new Date()
                })

                await updateProfile(user, { displayName: data.username });

                await signIn(data.email, data.password);
                toast({
                    title: "Successfully sign up",
                })

            } else {
                await signIn(data.email, data.password);
                toast({
                    title: "Successfully logged in",
                })
            }
            reset();
            onClose();
            navigate("profile");

        } catch (error) {
            let errorMessage: string = "An unexpected error occurred";


            if (error instanceof FirebaseError) {
                // Handle Firebase-specific errors by checking the code
                switch (error.code) {
                    case "auth/email-already-in-use":
                        errorMessage = "Email already used";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email address";
                        break;
                    case "auth/weak-password":
                        errorMessage = "Password is too weak";
                        break;
                    case "auth/network-request-failed":
                        errorMessage = "Network error. Please check your connection.";
                        break;
                    default:
                        errorMessage = `An unexpected error occurred: ${error.message}`;
                        break;
                }
            } else {
                // For non-Firebase errors, you can still provide a generic message
                errorMessage = "An unexpected error occurred.";
            }
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            })
        }
    }

    return (
        <BaseModal isModalOpen={isModalOpen} onClose={onClose}>
            <h2 className="mb-4">{isLogin ? "Sign in" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Input {...register("email")} type="email" placeholder="Email"/>
                {errors.email && <p>{errors.email.message}</p>}
                {!isLogin && (
                    <>
                        <Input {...register("username")} type="text" placeholder="Username"/>

                        {"username" in errors && errors.username && <p>{errors.username.message}</p>}
                    </>
                )}
                <Input {...register("password")} type="password" placeholder="Password"/>
                {errors.password && <p>{errors.password.message}</p>}
                {!isLogin && (
                    <>
                        <Input {...register("confirmPassword")} type="password" placeholder="Confirm Password"/>
                        {"confirmPassword" in errors && errors.confirmPassword &&
                            <p>{errors.confirmPassword.message}</p>}
                    </>
                )}
                <Button disabled={isSubmitting} type="submit" className="">
                    {isSubmitting ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
                </Button>
            </form>
            {isLogin ?
                <p>Not a Member? <Button className="text-foreground pl-1" onClick={() => setIsLogin(false)} variant={"link"}
                                         disabled={isSubmitting}>Sign Up
                    Now</Button></p> :
                <p>Already have an account? <Button className="text-foreground pl-1" onClick={() => setIsLogin(true)}
                                                    variant={"link"} disabled={isSubmitting}>Sign
                    In</Button></p>}
        </BaseModal>
    )
}