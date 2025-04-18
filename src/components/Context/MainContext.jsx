/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import axios from "./Axios";
import { useAuth } from "./AuthContext";

const MainContext = React.createContext();

export const MainProvider = ({ children }) => {
  useEffect(() => {
    getWork();
    getRoles();
    getallstudentStatistic();
    getEmployees();
    getTeacherSudalgaa();
    getSudalgaaStatus();
    getSudalgaaAngilal();
    getSudalgaaEduLevel();
    getAddress();
  }, []);

  const { user, checkError, successMessage } = useAuth();
  // employee
  const [employeeState, setemployeeState] = useState([]);
  const [ajilOpen, setAjilOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  // news state
  const [newsState, setNewsState] = useState([]);
  const [catState, setCatState] = useState([]);
  const [archiv, setArchiv] = useState([]);

  const [huvaariState, setHuvaariState] = useState([]);
  // timeplan, timereport
  const [timePlanState, settimePlanState] = useState([]);
  const [timeReportState, setTimeReportState] = useState([]);
  const [timeplanStud, settimeplanStud] = useState([]);
  // work
  const [workOne, setWorkOne] = useState({});

  // ajil
  const [ajilState, setAjilState] = useState({
    success: false,
    ajil: [],
    pagination: {},
  });
  const [jobOne, setJobOne] = useState({});

  const [workState, setWorkState] = useState([]);
  const [roleState, setRoleState] = useState([]);

  const [workCat, setworkCat] = useState([
    "Сургалт, заах арга зүй",
    "Эрдэм шинжилгээний ажил",
    "Мэргэжлийн үйлчилгээ",
    "Нийгмийн үйлчилгээ",
    "Тэнхим",
    "Стратеги",
    "Захирлын ажлын алба",
    "Сургалт, оюутны хэлтэс",
    "Санхүү хангамж үйлчилгээний хэлтэс",
    "Эрдэм шинжилгээ, хамтын ажиллагааны хэлтэс",
    "МУИС-ийн ББС-ийн үйл ажиллагааны төлөвлөгөөний биелэлт",
  ]);

  // Class
  const [classState, setClassState] = useState([]);
  // timely
  const [tReportState, setTReportState] = useState({
    owner: {},
    success: false,
    content: [],
  });
  // students
  const [allStudent, setallStudent] = useState({
    success: false,
    students: [],
    loading: false,
  });
  const [studentStatistic, setstudentStatistic] = useState(null);
  const [chooseLessonState, setChooseLessonState] = useState([]);

  const [loading, setLoading] = useState(false);
  // programs
  const [programState, setProgramState] = useState([]);
  const [programOne, setProgramOne] = useState({});
  const [progPlanState, setProgPlanState] = useState([]);
  // Feed
  const [feedState, setFeedState] = useState([]);

  // Dun
  const [dunYearLesson, setDunYearLesson] = useState([]);
  const [dunState, setDunState] = useState([]);
  const [dunState2, setDunState2] = useState([]);
  const [golchState, setGolchState] = useState([]);
  // sudalgaa
  const [sudalgaa, setSudalgaa] = useState([]);
  const [sudStatus, setSudStatus] = useState([]);
  const [sudAngilal, setSudAngilal] = useState([]);
  const [sudEduLevel, setSudEduLevel] = useState([]);

  // sudalgaa
  const [asuulgaState, setAsuulgaState] = useState([]);
  const [sudalgaaState, setSudalgaaState] = useState([]);
  const [sudalgaaOneState, setSudalgaaOneState] = useState(null);
  const [sudalgaaStudent, setsudalgaaStudent] = useState({
    sudalgaa: {},
    listTeachers: [],
  });
  // asuulga
  const [asuulgaOne, setAsuulgaOne] = useState({});
  const [asuulgaOpen, setAsuulgaOpen] = useState(false);

  // tulbur
  const [tulburSate, setTulburState] = useState({
    success: false,
    content: [],
  });

  const [tulburDepSate, setTulburDepState] = useState({
    success: false,
    content: [],
  });
  // elselt
  const [elseltState, setElseltState] = useState([]);

  const [addressState, setaddressState] = useState([]);

  const getAddress = () => {
    axios
      .get(`address`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setaddressState(res.data.address);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // elselt
  const getElselt = (yearlesson) => {
    axios
      .get(`bachelors?yearLesson=${yearlesson}&limit=1000`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setElseltState(res.data.bachelor);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // students
  const getAllstudents = () => {
    setallStudent({
      success: false,
      students: [],
      loading: true,
    });
    axios
      .get(`students?outlook=Суралцаж байгаа&limit=2500`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setallStudent({ ...res.data, loading: false });
      })
      .catch((err) => {
        setallStudent({
          success: false,
          students: [],
          loading: false,
        });
        checkError(err?.response?.data?.error);
      });
  };

  // tugugch
  const [tugsugchState, setTugsugchState] = useState([]);
  // tugsugch function
  const getTugsugch = () => {
    axios
      .get(`tugsugchid`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setTugsugchState(res.data.tugsugchid);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // tulbur function
  const getTulbur = () => {
    axios
      .get(`students/tulburStatus/5f79236c2e13c437e888fe21/1/allDep`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setTulburState(res.data);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getTulburDep = (did) => {
    axios
      .get(`students/tulburStatus/${did}/1/dep`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setTulburDepState(res.data);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // Sudalgaa
  const getSudalgaa = (id) => {
    axios
      .get(`sudalgaa?teacher_id=${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setSudalgaaState(res.data.sudalgaa);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getSudalgaaStudent = () => {
    axios
      .get(`sudalgaa/isTeachers/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setsudalgaaStudent(res.data);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getSudalgaaOne = (id) => {
    axios
      .get(`sudalgaa/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setSudalgaaOneState(res.data.sudalgaa);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addSudalgaa = (data) => {
    axios
      .post(`sudalgaa`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getSudalgaa(user?._id);
        // getSudalgaaOne(data._id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateSudalgaa = (data) => {
    axios
      .put(`sudalgaa/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getSudalgaaOne(data._id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteSudalgaa = (id) => {
    axios
      .delete(`sudalgaa/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getSudalgaa(user?._id);
        // getSudalgaaOne(data._id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addSudalgaaAsuulga = (sudalgaa_id, data) => {
    axios
      .put(`sudalgaa/addAsuulga/${sudalgaa_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getSudalgaaOne(sudalgaa_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateSudalgaaAsuulga = (sudalgaa_id, data) => {
    axios
      .put(`sudalgaa/updateAsuulga/${sudalgaa_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getSudalgaaOne(sudalgaa_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteSudalgaaAsuulga = (sudalgaa_id, data) => {
    axios
      .put(`sudalgaa/deleteAsuulga/${sudalgaa_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getSudalgaaOne(sudalgaa_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // asuulga
  const getAsuulga = (id) => {
    axios
      .get(`asuulga?teacher_id=${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAsuulgaState(res.data.asuulga);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getAsuulgaOne = (id) => {
    axios
      .get(`asuulga/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAsuulgaOne(res.data.asuulga);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addAsuulga = (data) => {
    axios
      .post(`asuulga`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getAsuulga(user?._id);
        setAsuulgaOne(res.data.asuulga);
        setAsuulgaOpen(true);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateAsuulga = (data) => {
    axios
      .put(`asuulga/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getAsuulga(user?._id);
        getAsuulgaOne(data?._id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteAsuulga = (id) => {
    axios
      .delete(`asuulga/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getAsuulga(user?._id);
        setAsuulgaOne(null);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addSelection = (asuulga_id, data) => {
    axios
      .put(`asuulga/addSelection/${asuulga_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getAsuulga(user?._id);
        getAsuulgaOne(asuulga_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateSelection = (asuulga_id, data) => {
    axios
      .put(`asuulga/updateSelection/${asuulga_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getAsuulga(user?._id);
        getAsuulgaOne(asuulga_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteSelection = (asuulga_id, data) => {
    axios
      .put(`asuulga/deleteSelection/${asuulga_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getAsuulga(user?._id);
        getAsuulgaOne(asuulga_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addOption = (asuulga_id, data) => {
    axios
      .put(`asuulga/addOption/${asuulga_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getAsuulga(user?._id);
        getAsuulgaOne(asuulga_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateOption = (asuulga_id, data) => {
    axios
      .put(`asuulga/updateOption/${asuulga_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getAsuulga(user?._id);
        getAsuulgaOne(asuulga_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteOption = (asuulga_id, data) => {
    axios
      .put(`asuulga/deleteOption/${asuulga_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getAsuulga(user?._id);
        getAsuulgaOne(asuulga_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // ---------------------------------------------------------------------------------------
  const getFeeds = () => {
    axios
      .get(`feedback`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setFeedState(res.data.feedback);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // sudalgaa
  const getTeacherSudalgaa = () => {
    axios
      .get(`teachers/school/5f79236c2e13c437e888fe21/sudalgaa`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setSudalgaa(res.data.formattedTeachers);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // const getSudalgaa = () => {
  //   axios
  //     .get(`statistics/teachers?groupField1=TypeOfEmployee`, {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setSudalgaaState({ ...sudalgaaState, status: res.data.teachers });
  //     })
  //     .catch((err) => {
  //       checkError(err?.response?.data?.error);
  //     });
  // };

  const getSudalgaaStatus = () => {
    axios
      .get(`statistics/teachers?groupField1=TypeOfEmployee`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setSudStatus(res.data.teachers);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getSudalgaaAngilal = () => {
    axios
      .get(`statistics/teachers?groupField1=isConsultant`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setSudAngilal(res.data.teachers);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getSudalgaaEduLevel = () => {
    axios
      .get(`statistics/teachers?groupField1=educationalLevel`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setSudEduLevel(res.data.teachers);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getUserFeeds = (id) => {
    axios
      .get(`feedback?owner_id=${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setFeedState(res.data.feedback);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const addFeedback = (data, admin) => {
    axios
      .post(`feedback`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        if (admin) {
          getFeeds();
        } else {
          getUserFeeds(user?._id);
        }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateFeedBack = (data, admin) => {
    axios
      .put(`feedback/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        if (admin) {
          getFeeds();
        } else {
          getUserFeeds(user?._id);
        }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteFeedBack = (id, admin) => {
    axios
      .delete(`feedback/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        if (admin) {
          getFeeds();
        } else {
          getUserFeeds(user?._id);
        }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addCommentFeed = (fid, data) => {
    axios
      .put(`feedback/addComment/${fid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getFeeds();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateCommentFeed = (fid, data) => {
    axios
      .put(`feedback/updateComment/${fid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getFeeds();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteCommentFeed = (fid, data) => {
    axios
      .put(`feedback/deleteComment/${fid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getFeeds();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // chart functions
  const getallstudentStatistic = () => {
    axios
      .get(`statistics/allStudents`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setstudentStatistic(res.data.students);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getPrograms = (did) => {
    axios
      .get(`programs?department_id=${did}&limit=1000`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setProgramState(res.data.programs);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getProgram = (id) => {
    axios
      .get(`programs/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setProgramOne(res.data.program);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getProgPlan = (progId) => {
    axios
      .get(
        `progplans?program_id=${progId}&sort=chooseSeminar typeElement typeStudy typeScience`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setProgPlanState(res.data.programPlan);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateProgPlan = (data) => {
    axios
      .put(`progplans/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getProgPlan(res.data.programPlan.program_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getRoles = () => {
    axios
      .get(`teachers/role`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setRoleState(res.data.role);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getDepClass = (did) => {
    axios
      .get(`classes?department_id=${did}&limit=20`, {
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

  const getTeacherHuvaari = (id, jil, semister) => {
    axios
      .get(
        `timeplans/huvaari/${id}/teacher_id?yearLesson=${jil}&yearSemister=${semister}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setHuvaariState(res.data.huvaari);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getAngiHuvaari = (id, jil, semister) => {
    axios
      .get(
        `timeplans/huvaari/${id}/student_id?yearLesson=${jil}&yearSemister=${semister}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setHuvaariState(res.data.huvaari);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // ---------------------- TimeReport ------------------------

  const getTimePlanTeacher = (depid, tid, jil) => {
    axios
      .get(`timeplans/${depid}/${tid}/teach/${jil}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        settimePlanState(res.data.timePlan);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getTimePlanStudent = (id) => {
    axios
      .get(`timeplans/findlistStuds/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        settimeplanStud(res.data.listStudents);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addStudentPlan = (pid, data) => {
    axios
      .put(`timeplans/addOneStud/${pid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimePlanStudent(pid);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteStudentPlan = (pid, data) => {
    axios
      .put(`timeplans/deleteOneStud/${pid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimePlanStudent(pid);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addHuvaari = (pid, data, on) => {
    axios
      .put(`timeplans/addHuvaari/${pid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimePlanTeacher(user?.department._id, user?.id, on);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteHuvaari = (pid, data, on) => {
    axios
      .put(`timeplans/deleteHuvaari/${pid}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimePlanTeacher(user?.department._id, user?.id, on);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getTimeReportPlan = (planid) => {
    axios
      .get(`timereports?timePlan_id=${planid}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setTimeReportState(res.data.timeReport);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addReport = (data, depid, tid, on) => {
    axios
      .post(`timereports`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimeReportPlan(data.timePlan_id);
        getTimePlanTeacher(depid, tid, on);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateReport = (data, depid, tid, on) => {
    axios
      .put(`timereports/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimeReportPlan(data.timePlan_id);
        getTimePlanTeacher(depid, tid, on);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteReport = (report_id, timePlan_id, depid, tid, on) => {
    axios
      .delete(`timereports/${report_id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getTimeReportPlan(timePlan_id);
        getTimePlanTeacher(depid, tid, on);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  // ------------ News ----------------
  const addNews = (data) => {
    axios
      .post(`news`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getCatNews(res.data?.news?.category_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateNews = (data) => {
    axios
      .put(`news/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getCatNews(res.data.news.category_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteNews = (id, cid) => {
    axios
      .delete(`news/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getCatNews(res.data.news.category_id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getCatNews = (id) => {
    axios
      .get(`news?category_id=${id}&limit=200`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setNewsState(res.data.news);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getNewsOgnoo = (on, sar) => {
    axios
      .get(`news/finddate?on=${on}&sar=${sar}&limit=500`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setNewsState(res.data.news);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getCat = () => {
    axios
      .get(`newscategories`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setCatState(res.data.newsCategories);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getArchiv = () => {
    axios
      .get(`news/arhiv`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setArchiv(res.data.content);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getEmployees = () => {
    axios
      .get(`employees?limit=200`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setemployeeState(res.data.employee);
      })
      .catch((err) => alertCall(err.response.data.error, "error"));
  };

  const addEmp = (data) => {
    axios
      .post(`employees`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAjilOpen(false);
        successMessage();
        getEmployees();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteEmp = (id) => {
    axios
      .delete(`employees/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getEmployees();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // ---------------- ajil --------------------

  const addAjil = (data) => {
    axios
      .post(`ajil`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAjilOpen(false);
        successMessage();
        getAjilTeacher(user?.id);

        // if (user?.role === "teacher") {
        //   getAjilTeacher(user?.id);
        // } else {
        //   getAjil();
        // }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const updateAjil = (data) => {
    axios
      .put(`ajil/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAjilOpen(false);
        successMessage();
        getAjilTeacher(user?.id);

        // if (user?.role === "teacher") {
        //   getAjilTeacher(user?.id);
        // } else {
        //   getAjil();
        // }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const deleteAjil = (id) => {
    axios
      .delete(`ajil/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getAjilTeacher(user?.id);

        // if (user?.role === "teacher") {
        //   getAjilTeacher(user?.id);
        // } else {
        //   getAjil();
        // }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const uploadAjil = (ajil_id, data) => {
    axios
      .put(`ajil/${ajil_id}/uploadfile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setAjilOpen(false);
        successMessage();
        getAjilTeacher(user?.id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

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

  // work
  const addWork = (data) => {
    axios
      .post(`work`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();

        getWork();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateWork = (data) => {
    axios
      .put(`work/${data._id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        setWorkOne({
          angilal: "",
          dugaar: "",
          chiglel: "",
          tailbar: "",
        });
        getWork();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteWork = (id) => {
    axios
      .delete(`work/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getWork();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addJob = (work_id, data) => {
    axios
      .put(`work/addSubjob/${work_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getWork();
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const updateJob = (work_id, data) => {
    axios
      .put(`work/updateSubjob/${work_id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getWork();
        setJobOne(null);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteJob = (work_id, data) => {
    axios
      .put(`work/deleteSubjob/${work_id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getWork();
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
      .get(`work?limit=500`, {
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
  const getFindTimely = (id, ognooStart, ognooEnd) => {
    setLoading(true);
    axios
      .post(
        `timely/findTimely?office_id=${id}`,
        {
          ognooStart,
          ognooEnd,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setTReportState(res.data);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // students
  const getChooseLesson = (sid) => {
    axios
      .get(`students/chooselesson/${sid}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setChooseLessonState(res.data.programLesson);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const addLessonProg = (id, data) => {
    axios
      .put(`progplans/addonestud/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        getChooseLesson(data._id);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const deleteLessonProg = (id, data, pid) => {
    axios
      .put(`progplans/deleteonestud/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        successMessage();
        if (pid) {
          getProgPlan(pid);
        } else {
          getChooseLesson(data._id);
        }
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  // Dun
  const getClassYear = (cid) => {
    axios
      .get(`studplans/yearLessons/${cid}/classes_id`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setDunYearLesson(res.data.yearLessons);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getClassDun = (cid, year) => {
    axios
      .get(`studplans?classes_id=${cid}&yearLesson=${year}&limit=5000`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setDunState(res.data.studentPlan);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getClassDun2 = (cid) => {
    axios
      .get(`studplans?classes_id=${cid}&limit=5000`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setDunState2(res.data.studentPlan);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };

  const getStudentDun = (sid, year) => {
    axios
      .get(`studplans?student_id=${sid}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setDunState(res.data.studentPlan);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  const getClassGolch = (cid, year, uliral) => {
    axios
      .get(`studplans/golch/class/${cid}/${year}/${uliral}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setGolchState(res.data.studGpa);
      })
      .catch((err) => {
        checkError(err?.response?.data?.error);
      });
  };
  return (
    <MainContext.Provider
      value={{
        //
        getTeacherSudalgaa,
        sudalgaa,
        setSudalgaa,
        sudAngilal,
        sudStatus,
        sudEduLevel,
        // dun
        getClassYear,
        dunYearLesson,
        getClassDun,
        getClassDun2,
        getStudentDun,
        dunState,
        dunState2,
        setDunState,
        setDunYearLesson,
        getClassGolch,
        golchState,
        // students
        getChooseLesson,
        addLessonProg,
        deleteLessonProg,
        chooseLessonState,
        roleState,
        studentStatistic,
        getTugsugch,
        tugsugchState,
        setTugsugchState,
        getAllstudents,
        allStudent,
        // timely
        tReportState,
        getFindTimely,
        // huvaari
        huvaariState,
        getTeacherHuvaari,
        getAngiHuvaari,
        // timeplan
        timePlanState,
        getTimePlanTeacher,
        getTimeReportPlan,
        getTimePlanStudent,
        timeplanStud,
        timeReportState,
        addReport,
        updateReport,
        deleteReport,
        addStudentPlan,
        deleteStudentPlan,
        addHuvaari,
        deleteHuvaari,
        // news
        addNews,
        updateNews,
        deleteNews,
        newsState,
        getCatNews,
        getCat,
        catState,
        getArchiv,
        archiv,
        getNewsOgnoo,
        // employ
        employeeState,
        setemployeeState,
        addEmp,
        deleteEmp,
        // class
        classState,
        getDepClass,
        // ajil
        ajilOpen,
        setAjilOpen,
        workOpen,
        setWorkOpen,
        addAjil,
        updateAjil,
        deleteAjil,
        workState,
        ajilState,
        getAjil,
        getWork,
        getAjilTeacher,
        uploadAjil,
        // work
        addWork,
        updateWork,
        deleteWork,
        addJob,
        updateJob,
        deleteJob,
        jobOne,
        setJobOne,
        workCat,
        setworkCat,
        // other
        loading,
        setLoading,
        workOne,
        setWorkOne,
        // program
        getPrograms,
        getProgram,
        programOne,
        setProgramOne,
        programState,
        getProgPlan,
        progPlanState,
        updateProgPlan,
        // Feedback
        getFeeds,
        getUserFeeds,
        feedState,
        setFeedState,
        addFeedback,
        updateFeedBack,
        deleteFeedBack,
        addCommentFeed,
        updateCommentFeed,
        deleteCommentFeed,
        // tulbur
        getTulbur,
        getTulburDep,
        tulburSate,
        tulburDepSate,
        // sudalgaa
        getSudalgaa,
        addSudalgaa,
        updateSudalgaa,
        deleteSudalgaa,
        sudalgaaState,
        getAsuulga,
        asuulgaState,
        addressState,
        getSudalgaaOne,
        sudalgaaOneState,
        setSudalgaaOneState,
        addSudalgaaAsuulga,
        updateSudalgaaAsuulga,
        deleteSudalgaaAsuulga,
        getSudalgaaStudent,
        sudalgaaStudent,
        // asuulga
        asuulgaOne,
        setAsuulgaOne,
        getAsuulgaOne,
        addAsuulga,
        updateAsuulga,
        deleteAsuulga,
        asuulgaOpen,
        setAsuulgaOpen,
        addSelection,
        updateSelection,
        deleteSelection,
        addOption,
        updateOption,
        deleteOption,

        // elselt
        getElselt,
        elseltState,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

// Hook to use auth context
export const useCtx = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
