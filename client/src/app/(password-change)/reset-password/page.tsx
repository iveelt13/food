"use client";
import { Button } from "@/components/ui/button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/utils/EmailController";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { push } = useRouter();

  const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(emailValidation(value));
  };

  return (
    <div className="w-104 flex flex-col gap-6 ">
      <Button className="border border-[#E4E4E7] rounded-md w-9 h-9 bg-white text-black">
        <ChevronLeft size={36} />
      </Button>

      <p className="font-semibold text-24px"> Reset your password </p>
      <p className="font-normal text-[16px] text-[#71717A]">
        Enter your email to receive a password reset link.{" "}
      </p>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await requestPasswordReset(values.email);
            push("/");
          } catch (error: any) {
            setErrors({
              email: error.response?.data?.message || "failed",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            <div>
              <Field
                as="input"
                className="border rounded-md px-3 py-2 w-104"
                name="email"
                placeholder="Enter your email address"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <Button
              className="h-9 px-8 bg-[#18181B] hover:opacity-25"
              type="submit"
              onClick={() => push("/verify-email")}
              disabled={isSubmitting}
            >
              {isSubmitting ? "..." : "Send link"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex gap-3 justify-center">
        <p>Don't have an account?</p>
        <a href="http://localhost:3000/signup" className="text-blue-600">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
