import { Router } from "express";
import { SchoolRoutes } from "../../modules/school/school.routes";
import { UserRoutes } from "../../modules/user/user.routes";
import { TeacherRoutes } from "../../modules/teacher/teacher.routes";
import { GuardianRoutes } from "../../modules/guardian/guardian.routes";
import { StudentRoutes } from "../../modules/student/student.routes";
import { AcademicYearRoutes } from "../../modules/academic-year/academic-year.routes";
import { ShiftRoutes } from "../../modules/shift/shift.routes";
import { ClassRoutes } from "../../modules/class/class.routes";
import { SectionRoutes } from "../../modules/section/section.routes";
import { SubjectRoutes } from "../../modules/subject/subject.routes";
import { EnrollmentRoutes } from "../../modules/enrollment/enrollment.routes";
import { RoutineRoutes } from "../../modules/routine/routine.routes";
import { AttendanceRoutes } from "../../modules/attendance/attendance.routes";
import { IndicatorRoutes } from "../../modules/indicator/indicator.routes";
import { EvaluationRoutes } from "../../modules/evaluation/evaluation.routes";

const router = Router();

interface IModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoute[] = [
  {
    path: "/schools",
    route: SchoolRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/teachers",
    route: TeacherRoutes,
  },
  {
    path: "/guardians",
    route: GuardianRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-years",
    route: AcademicYearRoutes,
  },
  {
    path: "/shifts",
    route: ShiftRoutes,
  },
  {
    path: "/classes",
    route: ClassRoutes,
  },
  {
    path: "/sections",
    route: SectionRoutes,
  },
  {
    path: "/subjects",
    route: SubjectRoutes,
  },
  {
    path: "/enrollments",
    route: EnrollmentRoutes,
  },
  {
    path: "/routines",
    route: RoutineRoutes,
  },
  {
    path: "/attendances",
    route: AttendanceRoutes,
  },
  {
    path: "/indicators",
    route: IndicatorRoutes,
  },
  {
    path: "/evaluations",
    route: EvaluationRoutes,
  },
];

moduleRoutes.forEach((routeItem) => router.use(routeItem.path, routeItem.route));

export default router;
