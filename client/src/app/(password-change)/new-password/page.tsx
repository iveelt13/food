"use client";
import { Button } from "@/components/ui/button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/utils/EmailController";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().when("password", (password, schema) =>
    password
      ? schema.required().oneOf([Yup.ref("password")], "Passwords must match")
      : schema
  ),
});

const UserLogin = () => {
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

      <p className="font-semibold text-24px">Create new password </p>
      <p className="font-normal text-[16px] text-[#71717A]">
        Set a new password with a combination of letters and numbers for better
        security.{" "}
      </p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signIn(values);
            push("/");
          } catch (error: any) {
            setErrors({
              email: error.response?.data?.message || "Signup failed",
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
                as={Input}
                name="password"
                type="password"
                placeholder="Password"
                className="border rounded-md px-3 py-2 w-104"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                as={Input}
                name="password"
                type="password"
                placeholder="Confirm"
                className="border rounded-md px-3 py-2 w-104"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex gap-3 items-center">
              <Checkbox />
              <p>Show password</p>
            </div>
            <Button
              className="h-9 px-8 bg-[#18181B] hover:opacity-25"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "..." : "Create password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserLogin;
