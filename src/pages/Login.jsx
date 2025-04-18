import { useState } from "react";

import { useAuth } from "../components/Context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [data, setdata] = useState({
    phone: "",
    password: "",
  });

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(http://west.edu.mn:3000/upload/programfiles/west.jpg)",
            }}
          ></div>
          {/* https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg */}
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img
                    className="h-24"
                    src="http://west.edu.mn:3000/upload/programfiles/CloudUni.png"
                    alt="logo"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-800 dark:text-gray-200"
                  >
                    Нэвтрэх нэр{" "}
                  </label>
                  <input
                    onChange={(e) => {
                      setdata({ ...data, phone: e.target.value.trim() });
                    }}
                    value={data.phone}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Нэвтрэх нэр"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-violet-700 dark:focus:border-violet-700 focus:ring-violet-700 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-800 dark:text-gray-200"
                    >
                      Нууц үг
                    </label>
                    <a
                      href="#"
                      className="text-sm text-gray-400 focus:text-violet-600 hover:text-violet-600 hover:underline"
                    >
                      Нууц үгээ мартсан уу?
                    </a>
                  </div>
                  <input
                    onChange={(e) => {
                      setdata({ ...data, password: e.target.value.trim() });
                    }}
                    value={data.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Нууц үг"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-violet-700 dark:focus:border-violet-700 focus:ring-violet-700 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      login(data.phone, data.password);
                    }}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-violet-600 rounded-lg hover:bg-violet-700 focus:outline-none focus:bg-violet-700 focus:ring focus:ring-violet-300 focus:ring-opacity-50"
                  >
                    Нэвтрэх{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <img
        src="http://west.edu.mn:3000/upload/programfiles/west.jpg"
        alt="logo"
        className="h-full cover-top bg-cover w-full"
      /> */}
      {/*<div className="flex flex-col py-8 px-8 rounded-lg w-full max-w-sm mx-auto bg-white">
          <p className="text-gray-900 text-2xl text-center uppercase font-semibold">
          Нэвтрэх хэсэг
        </p>
         <div className="mt-4 w-full">
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm text-gray-800 "
            >
              Нэвтрэх нэр
            </label>
            <input
              onChange={(e) => {
                setdata({ ...data, phone: e.target.value.trim() });
              }}
              value={data.phone}
              type="text"
              name="phone"
              id="phone"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-violet-700 dark:focus:border-violet-700 focus:ring-violet-700 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm text-gray-800 dark:text-gray-200"
              >
                Нууц үг
              </label>
            </div>
            <input
              onChange={(e) => {
                setdata({ ...data, password: e.target.value.trim() });
              }}
              value={data.password}
              type="password"
              name="password"
              id="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-violet-700 dark:focus:border-violet-700 focus:ring-violet-700 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                login(data.phone, data.password);
              }}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-violet-800 rounded-lg hover:bg-violet-600 "
            >
              Нэвтрэх
            </button>
          </div>
        </div> 
      </div>*/}
    </div>
  );
};

export default Login;
