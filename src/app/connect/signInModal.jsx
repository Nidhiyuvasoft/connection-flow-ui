
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SignInModal({ platformName, onClose, onSuccess, platformLogo }) {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // You can handle successful form submission here
    console.log('Form submitted:', values);
    onSuccess(); // Call the success callback
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-[#111] p-6 rounded-xl w-full max-w-md text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          <IoClose />
        </button>

        <div className="flex items-center justify-center mb-6 space-x-2">
          {platformLogo && (
            <img src={platformLogo} alt={`${platformName} logo`} className="w-6 h-6" />
          )}
          <h2 className="text-xl font-bold">Connecting {platformName}</h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {() => (
            <Form>
              {/* Email Field */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <img src="/assets/email-icon.svg" alt="email-icon" />
                </div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="bg-white/10 text-[#9D9D95] text-base font-normal rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password Field */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <img src="/assets/lock-icon.svg" alt="lock-icon" />
                </div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-white/10 text-[#9D9D95] text-base font-normal rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-lime-400 text-black py-2 rounded-sm hover:bg-lime-500 font-regular text-base"
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
