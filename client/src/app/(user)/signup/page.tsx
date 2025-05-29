"use client";
import * as Yup from "yup";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/utils/EmailController";
import { Formik, Field, Form, ErrorMessage } from "formik";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUpEmail = () => {
  const { push } = useRouter();

  return (
    <div className="w-104 flex flex-col gap-6 ">
      <Button className="border border-[#E4E4E7] rounded-md w-9 h-9 bg-white text-black">
        <ChevronLeft size={36} />
      </Button>

      <p className="font-semibold text-24px">Create your account</p>
      <p className="font-normal text-[16px] text-[#71717A]">
        Sign up to explore your favorite dishes.
      </p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signUp(values);
            push("/");
          } catch (err: any) {
            setErrors({
              email: err.response?.data?.message || "Signup failed",
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

            <div>
              <Field
                as={Input}
                name="password"
                type="password"
                placeholder="Enter your password"
                className="border rounded-md px-3 py-2 w-104"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <Button
              className="h-9 px-8 bg-[#18181B] hover:opacity-25"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Let's Go"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex gap-3">
        <p>Already have an account?</p>
        <a href="http://localhost:3000/login" className="text-blue-600">
          Log in
        </a>
      </div>
    </div>
  );
};
export default SignUpEmail;
