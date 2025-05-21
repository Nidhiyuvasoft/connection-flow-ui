'use client';
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";

const connectModalData = {
  "emailPlaceholder": "Email address",
  "passwordPlaceholder": "Password",
  "signInButton": "Sign in",
  "emailIcon": "/assets/email-icon.svg",
  "lockIcon": "/assets/lock-icon.svg",
  "otpPrompt": "Enter a 6-digit code sent to email@address.com",
  "downloadHeader": "Downloading data",
  "checklistItems": [
    "Connecting to platform",
    "Finding Active Slates",
    "Downloading Drafts",
    "Calculating Exposures / Data"
  ],
  "leagues": [
    { "name": "League Delta" },
    { "name": "League Alpha" },
    { "name": "League Gamma" },
    { "name": "League Beta" }
  ],
  "validationMessages": {
    "emailRequired": "Email is required",
    "emailInvalid": "Invalid email",
    "passwordRequired": "Password is required"
  }
}


export default function ConnectModal({
  stage,
  platformName,
  platformLogo,
  onClose,
  onSignInSuccess
}) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showLeagueInfo, setShowLeagueInfo] = useState(false);
  const [leagueStatusList, setLeagueStatusList] = useState([]);
  const [currentLeagueIndex, setCurrentLeagueIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [itemStatuses, setItemStatuses] = useState({});

  const checklistItems = connectModalData.checklistItems;
  const defaultLeagues = connectModalData.leagues;

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        setIsVerifying(true);
      }
    } else {
      e.target.value = '';
    }
  };

  const toggleItem = (item) => {
    const isSelected = selectedItems.includes(item);
    setSelectedItems((prev) =>
      isSelected ? prev.filter((i) => i !== item) : [...prev, item]
    );

    if (item === 'Finding Active Slates') {
      if (!isSelected) {
        setExpandedItem(item);
        setShowLeagueInfo(false);
        setLeagueStatusList([]);
        setCurrentLeagueIndex(0);
        setTimeout(() => {
          setShowLeagueInfo(true);
        }, 3000);
      } else {
        setExpandedItem(null);
        setShowLeagueInfo(false);
        setLeagueStatusList([]);
        setCurrentLeagueIndex(0);
      }
    }
  };

  useEffect(() => {
    if (isVerifying && currentItemIndex < checklistItems.length) {
      setItemStatuses(prev => ({
        ...prev,
        [checklistItems[currentItemIndex]]: 'loading'
      }));

      const timer = setTimeout(() => {
        setItemStatuses(prev => ({
          ...prev,
          [checklistItems[currentItemIndex]]: 'done'
        }));
        setSelectedItems(prev => [...prev, checklistItems[currentItemIndex]]);
        setCurrentItemIndex(prev => prev + 1);

        if (checklistItems[currentItemIndex] === 'Finding Active Slates') {
          setExpandedItem('Finding Active Slates');
          setShowLeagueInfo(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVerifying, currentItemIndex, checklistItems]);

  useEffect(() => {
    if (!showLeagueInfo || currentLeagueIndex >= defaultLeagues.length) return;

    const timer = setTimeout(() => {
      setLeagueStatusList((prev) => [
        ...prev,
        { name: defaultLeagues[currentLeagueIndex].name, status: 'done' },
      ]);
      setCurrentLeagueIndex((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentLeagueIndex, showLeagueInfo]);

  const renderSignInForm = () => {
    const initialValues = { email: '', password: '' };
    const validationSchema = Yup.object({
      email: Yup.string()
        .email(connectModalData.validationMessages.emailInvalid)
        .required(connectModalData.validationMessages.emailRequired),
      password: Yup.string()
        .required(connectModalData.validationMessages.passwordRequired),
    });

    const handleSubmit = (values, { setSubmitting }) => {
      console.log('Signed in with:', values);
      setSubmitting(false);
      onSignInSuccess();
    };

    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="space-y-4 flex flex-col gap-4">

            <div className="mb-6 relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img src={connectModalData.emailIcon} alt="email-icon" />
              </div>
              <Field
                name="email"
                type="email"
                placeholder={connectModalData.emailPlaceholder}
                className="bg-white/10 text-[#9D9D95] text-base font-normal rounded-sm block w-full ps-10 p-2.5"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 absolute top-full left-0" />
            </div>

            <div className="mb-6 relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img src={connectModalData.lockIcon} alt="lock-icon" />
              </div>
              <Field
                name="password"
                type="password"
                placeholder={connectModalData.passwordPlaceholder}
                className="bg-white/10 text-[#9D9D95] text-base font-normal rounded-sm block w-full ps-10 p-2.5"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 absolute top-full left-0" />
            </div>

            <button type="submit" className="w-full bg-lime-400 text-black py-2 rounded-sm hover:bg-lime-500">
              {connectModalData.signInButton}
            </button>
          </div>

        </Form>
      </Formik>
      
    );
  };

  const renderOtpStage = () => {
    if (isVerifying) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            {platformLogo && <img src={platformLogo} className="w-6 h-6" />}
            <span>{connectModalData.downloadHeader}</span>
          </h2>

          {checklistItems.map((item, idx) => {
            const status = itemStatuses[item] || 'pending';
            const isSelected = selectedItems.includes(item);

            return (
              <div key={idx}>
                <div
                  className={`p-3 rounded flex items-center justify-between transition-colors ${
                    status === 'done' || isSelected
                      ? 'bg-[#111] text-green-500'
                      : status === 'loading'
                      ? 'bg-[#1a1a1a] text-yellow-500'
                      : 'bg-[#1a1a1a] text-gray-500'
                  }`}
                >
                  <span>{item}</span>
                  <span>
                    {status === 'done' || isSelected ? (
                      '✔'
                    ) : status === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                    ) : null}
                  </span>
                </div>

                {item === 'Finding Active Slates' && expandedItem === item && showLeagueInfo && (
                  <div className="mt-2 ml-4 bg-[#101010] rounded-md p-3 space-y-2">
                    {defaultLeagues.map((league, index) => {
                      const isLoaded = leagueStatusList.some((l) => l.name === league.name);
                      const isCurrent = index === currentLeagueIndex;

                      return (
                        <div
                          key={league.name}
                          className="flex justify-between items-center border-b border-gray-700 py-2"
                        >
                          <p className={`text-sm ${isLoaded ? 'text-green-400' : 'text-white'}`}>
                            {league.name}
                          </p>
                          {isLoaded ? (
                            <span className="text-green-400 text-sm">✔</span>
                          ) : isCurrent ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center justify-center mb-6 space-x-2">
          {platformLogo && <img src={platformLogo} className="w-6 h-6" />}
          <h2 className="text-xl font-bold">Connecting {platformName}</h2>
        </div>
        <p className="mb-4 text-gray-400 text-sm">{connectModalData.otpPrompt}</p>
        <div className="flex justify-between gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              inputMode="numeric"
              className="w-10 h-12 text-center text-xl rounded bg-black border border-gray-600 focus:outline-none"
              value={digit}
              onChange={(e) => handleOtpChange(e, i)}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-[#111] p-6 rounded-xl w-full max-w-md text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">
          <IoClose />
        </button>
        {stage === 'signin' &&
          <div className="flex items-center justify-center mb-6 space-x-2">
            {platformLogo && <img src={platformLogo} className="w-6 h-6" />}
            <h2 className="text-xl font-bold">Connecting {platformName}</h2>
          </div>}

        {stage === 'signin' ? renderSignInForm() : renderOtpStage()}
      </div>
    </div>
  );
}
