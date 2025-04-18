import { toast } from "sonner";
import React, { createContext, useState, useEffect, useContext } from "react";

import Cookies from "js-cookie";

import axios from "./Axios";
import axiosMain from "axios";
import { useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { CheckCircle } from "lucide-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );

  const [yearState, setYearState] = useState([
    "2025-2026",
    "2024-2025",
    "2023-2024",
    "2022-2023",
    "2021-2022",
    "2020-2021",
    "2019-2020",
    "2018-2019",
  ]);
  const [depState, setDepState] = useState([]);
  const [depOneState, setDepOneState] = useState({});
  const [albaState, setAlbaState] = useState([]);
  const [classState, setClassState] = useState([]);
  const [classOne, setClassOne] = useState({});
  const [studentState, setStudentState] = useState([]);
  const [studentGolch, setStudentGolch] = useState([]);
  const [timelyState, setTimelyState] = useState([]);
  const [teacherOne, setteacherOne] = useState({});
  const [teacherState, setTeacherState] = useState([]);
  const [employOne, setEmployOne] = useState(null);
  // student state
  const [studentOne, setStudentOne] = useState({});
  const [classTulburState, setClassTulburState] = useState({
    content: [],
  });

  //-----------
  const [device, setDevice] = useState("");
  const [configState, setconfigState] = useState({});
  const [contactState, setContactState] = useState([]);
  const [eduData, setEduData] = useState(null);
  const [shagnal, setShagnal] = useState({
    name: "",
    tushaal: "",
    dugaar: "",
    ognoo: 2025,
    type: "",
    tailbar: "",
  });
  const [ipstate, setipstate] = useState("");
  const [ajilState, setAjilState] = useState({
    success: false,
    ajil: [],
    pagination: {},
  });

  const [workState, setWorkState] = useState([]);
  const [sheepOpen, setSheetOpen] = useState(false);
  // notification
  const [notifState, setNotifState] = useState(0);

  useEffect(() => {
    getIp();
    getDepartment();
    getDeviceInfo();
    getConfig();
    getTeachers();
  }, []);

  useEffect(() => {
    if (checkRole(["teacher", "employee"], user?.rols)) {
      getTecher(user?.id);
    }
    if (checkRole(["Student"], user?.rols)) {
      getStudent(user?._id);
    }
    if (user) {
      getNotifCount();
    }
  }, [user]);

  function checkRole(role1, role2) {
    return role1?.some((role) => role2?.includes(role));
  }
  // notification

  const getNotifCount = () => {
    axios
      .get(`notification/count`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setNotifState(res.data.notification);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // changepassword
  const changePassTeacher = (data) => {
    axios
      .post(`teachers/change-password`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const changePasswordStudent = (data) => {
    axios
      .post(`students/change-password`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  function checkError(error) {
    if (error === "Таны токен хугацаа дууссан байна.") {
      logout();
    } else {
      toast.error(error);
    }
  }
  function successMessage(data) {
    toast.success("Амжилттай", {
      icon: <CheckCircle className="text-green-600 size-5 mr-4" />,
    });
    // toast.success("Амжилттай");
  }
  const getDeviceInfo = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    setDevice(result.visitorId);
  };
  const getIp = async () => {
    await axiosMain
      .get("https://api.ipify.org?format=json")
      .then((res) => {
        setipstate(res.data.ip);
        // setDevice({ ...device, ip: res.data.ip });
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getTeachers = () => {
    axios
      .get(`teachers?limit=300`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setContactState(res.data.teacher);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getConfig = () => {
    axios
      .get("settings/63087d8fc72eef0cdf40279d")
      .then((res) => {
        setconfigState(res.data.settings);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const login = (email, password) => {
    axios
      .post("teachers/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...res.data.user,
            token: res.data.token,
            rols: res.data.roles,
          })
        );
        setUser({
          ...res.data.user,
          token: res.data.token,
          rols: res.data.roles,
        });
        console.log(res.data?.user);
        // const decoded = jwtDecode(result.data.token);
        // console.log("🚀 ~ .then ~ decoded:", decoded);

        // Cookies.set("auth", JSON.stringify(result.data), {
        //   expires: 30, // 1 day
        //   path: "/",
        // });

        toast.success("Амжилттай нэвтэрлээ.");
        navigate("/dashboard"); // Redirect after login
      })
      .catch((err) => {
        axios
          .post("students/login", {
            loginName: email,
            password,
          })
          .then((res) => {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                ...res.data.user,
                token: res.data.token,
                rols: res.data.user.roles,
              })
            );
            setUser({
              ...res.data.user,
              token: res.data.token,
              rols: res.data.user.roles,
            });

            toast.success("Амжилттай нэвтэрлээ.");
            navigate("/dashboard"); // Redirect after login
          })
          .catch((err) => checkError(err?.response?.data?.error));
      });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    // Remove the cookie
    Cookies.remove("auth", { path: "/" });
    setUser(null);
    navigate("/signin"); // Redirect to login after logout
  };

  const addRole = (tid, _id, did) => {
    axios
      .put(
        `teachers/addRole/${tid}`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        getDepTeachers(did);
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const removeRole = (tid, _id, did) => {
    axios
      .put(
        `teachers/deleteRole/${tid}`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        getDepTeachers(did);
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const changePassStudent = (id, email) => {
    axios
      .post(
        "students/refreshpass",
        { id, email },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const changePassUser = (id, email) => {
    axios
      .post(
        "teachers/refreshpass",
        { id, email },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // departments
  const getDepartment = () => {
    axios
      .get(`departments`)
      .then((res) => {
        setDepState(res.data.department);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateDep = (data) => {
    axios
      .put(`departments/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getDepartment();
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getAllAlba = () => {
    axios
      .get(`alba`)
      .then((res) => {
        setAlbaState(res.data.alba);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // teachers
  const getDepTeachers = (depid) => {
    axios
      .get(`teachers?department=${depid}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setTeacherState(res.data.teacher);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addTeacher = (data) => {
    axios
      .post(`teachers`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getDepTeachers(data.department);
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateTeacher = (data) => {
    axios
      .put(`teachers/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        successMessage();
        getDepTeachers(res.data.teacher.department);
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateTeacher2 = (data) => {
    axios
      .put(`teachers/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getTecher(data._id);
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const deleteTeacher = (id, did) => {
    axios
      .delete(`teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getDepTeachers(did);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const uploadTeacherFile = (tid, data) => {
    axios
      .put(`teachers/${tid}/uploadfile`, data.file, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(user?._id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteTeacherFile = (tid, data) => {
    axios
      .put(
        `teachers/${tid}/deletefile`,
        { fileName: data.name },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        successMessage();
        getTecher(user?._id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const addEduTeacher = (tid, data) => {
    axios
      .put(`teachers/${tid}/education/add`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(tid);
        setEduData({
          country: "Монгол",
          city: "",
          university: "",
          profession: "",
          eduLevel: "Бакалавр",
          startDate: 2025,
          endDate: 2025,
          tailbar: "",
          dugaar: "",
          chiglel: "",
        });
        setSheetOpen(false);
      })

      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateEduTeacher = (tid, data) => {
    axios
      .put(`teachers/${tid}/education/edit`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(tid);
        setEduData({
          country: "Монгол",
          city: "",
          university: "",
          profession: "",
          eduLevel: "Бакалавр",
          startDate: 2025,
          endDate: 2025,
          tailbar: "",
          dugaar: "",
          chiglel: "",
        });
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteEduTeacher = (tid, data) => {
    axios
      .put(`teachers/${tid}/education/delete`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(tid);
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addShagnal = (tid, data) => {
    axios
      .put(`teachers/${tid}/shagnal/add`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(tid);
        setShagnal({
          name: "",
          tushaal: "",
          dugaar: "",
          ognoo: 2025,
          type: "",
          tailbar: "",
        });
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateShagnal = (tid, data) => {
    axios
      .put(`teachers/${tid}/shagnal/edit`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(tid);
        setShagnal({
          name: "",
          tushaal: "",
          dugaar: "",
          ognoo: 2025,
          type: "",
          tailbar: "",
        });
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteShagnal = (tid, data) => {
    axios
      .put(`teachers/${tid}/shagnal/delete`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(tid);
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addSudalgaa = (tid, data, depid) => {
    axios
      .put(`teachers/${tid}/sudalgaa/add`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        if (user?._id === tid) {
          getTecher(tid);
        } else {
          getDepTeachers(depid);
        }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateSudalgaa = (tid, data) => {
    axios
      .put(`teachers/${tid}/sudalgaa/edit`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTecher(tid);
        setShagnal({
          name: "",
          tushaal: "",
          dugaar: "",
          ognoo: 2025,
          type: "",
          tailbar: "",
        });
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteSudalgaa = (tid, data, depid) => {
    axios
      .put(`teachers/${tid}/sudalgaa/delete`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();

        if (user?._id === tid) {
          getTecher(tid);
        } else {
          getDepTeachers(depid);
        }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // classes
  const addClass = (data) => {
    axios
      .get(`classes`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getDepClass(res.data?.classes?.department_id);
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateClass = (data) => {
    axios
      .put(`classes/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getDepClass(res.data?.classes?.department_id);
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addChooselesson = (did, cid, data) => {
    axios
      .put(`classes/addChooseOfScience/${cid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getClass(cid);
        getDepClass(did);
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteChooselesson = (did, cid, data) => {
    axios
      .put(`classes/deleteChooseOfScience/${cid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getDepClass(did);
        getClass(cid);
        successMessage();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getDepClass = (did) => {
    axios
      .get(`classes?department_id=${did}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setClassState(res.data.classes);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getClass = (id) => {
    axios
      .get(`classes/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setClassOne(res.data.classes);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // students
  const getStudents = (cid) => {
    axios
      .get(`students?class_id=${cid}&limit=1000`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setStudentState(res.data.students);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getStudentGolch = (sid) => {
    axios
      .get(`studplans/gpastud/${sid}/student_id`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setStudentGolch(res.data.oyutniiDun);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getStudent = (id) => {
    axios
      .get(`students/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setStudentOne(res.data.student);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateStudent = (data) => {
    axios
      .put(`students/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getStudent(data._id);
        getStudents(data?.class_id?._id);
        setSheetOpen(false);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // const updateStudent2 = (data) => {
  //   axios
  //     .put(`students/${data._id}`, data, {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       successMessage()
  //       getStudents(data?.class_id?._id);
  //       setSheetOpen(false);
  //     })
  //     .catch((err) => {
  //       checkError(err?.response?.data?.error);
  //     });
  // };
  const getClassTulbur = (cid) => {
    axios
      .get(`students/tulburInfo/${cid}/0`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setClassTulburState(res.data);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const addTulbur = (id, cid, data) => {
    axios
      .put(`students/addTulbur/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getStudents(cid);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteTulbur = (id, cid, tid) => {
    axios
      .put(
        `students/deleteTulbur/${id}`,
        { _id: tid },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        getStudents(cid);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getTimely = (id, sar, jil) => {
    axios
      .get(`timely?sar=${sar}&owner_id=${id}&jil=${jil}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setTimelyState(res.data.timely);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const editTimely = (data) => {
    axios
      .put(`timely/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimely(data.owner_id, data.sar, data.jil);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addTimely = (data) => {
    axios
      .post(
        `timely/calc?owner_id=${data.owner_id}&sar=${data.sar}&jil=${data.jil}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        successMessage();
        getTimely(data.owner_id, data.sar, data.jil);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const irlee = (
    owner_id,
    owner_role,
    owner_name,
    office_id,
    office_name,
    sar,
    jil
  ) => {
    axios
      .put(
        `timely/irlee`,
        {
          owner_id,
          owner_role,
          owner_name,
          office_id,
          office_name,
          ip: ipstate,
          mac: device,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        getTimely(owner_id, sar, jil);
        toast.success("🚀 Цаг бүртгэгдлээ! Өдрийг сайхан өнгөрүүлээрэй. 🚀");
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const yavlaa = (
    owner_id,
    owner_role,
    owner_name,
    office_id,
    office_name,
    sar,
    jil
  ) => {
    axios
      .put(
        `timely/yavlaa`,
        {
          owner_id,
          owner_role,
          owner_name,
          office_id,
          office_name,
          ip: ipstate,
          mac: device,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        toast.info(" Сайхан амраарай. 🛌💤🥱", { icon: "😴" });

        getTimely(owner_id, sar, jil);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // staff
  const getEmploy = (id) => {
    axios
      .get(`employees/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setEmployOne(res.data.employee);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  //-----------------------   Teacher  -----------------------
  const getTecher = (id) => {
    axios
      .get(`teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setteacherOne(res.data.teacher);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // ---------------- ajil --------------------
  const getAjil = () => {
    axios
      .get(`ajil`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAjilState(res.data);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getAjilTeacher = (tid) => {
    axios
      .get(`ajil?owner_id=${tid}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAjilState(res.data);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getWork = () => {
    axios
      .get(`work`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setWorkState(res.data.work);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        checkRole,
        addRole,
        removeRole,
        configState,
        device,
        // auth
        user,
        login,
        logout,
        changePassStudent,
        changePassUser,
        contactState,
        changePassTeacher,
        changePasswordStudent,
        // department
        getDepartment,
        updateDep,
        depState,
        depOneState,
        setDepOneState,
        classState,
        classOne,
        setClassOne,
        getDepClass,
        updateClass,
        addChooselesson,
        deleteChooselesson,
        addClass,
        // studens
        getStudents,
        studentOne,
        setStudentOne,
        updateStudent,
        studentState,
        albaState,
        getAllAlba,
        addTulbur,
        deleteTulbur,
        getClassTulbur,
        classTulburState,
        getStudentGolch,
        studentGolch,
        // Timely
        getTimely,
        timelyState,
        irlee,
        yavlaa,
        editTimely,
        addTimely,
        // emp
        employOne,
        // Teacher
        teacherOne,
        setteacherOne,
        sheepOpen,
        setSheetOpen,
        addTeacher,
        updateTeacher,
        updateTeacher2,
        deleteTeacher,
        getDepTeachers,
        teacherState,
        eduData,
        setEduData,
        addEduTeacher,
        updateEduTeacher,
        deleteEduTeacher,
        addShagnal,
        updateShagnal,
        deleteShagnal,
        shagnal,
        setShagnal,
        addSudalgaa,
        updateSudalgaa,
        deleteSudalgaa,
        uploadTeacherFile,
        deleteTeacherFile,
        // tasks
        getAjil,
        getAjilTeacher,
        getWork,
        workState,
        ajilState,
        yearState,
        checkError,
        successMessage,
        // notification
        notifState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
