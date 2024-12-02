import express from "express";
import { quarryViaMailSendingController, sendQuarryViaFooterMail, setMeetingSchedule } from "../Controllers/quarry.Controller.js";

const costumerRoutes = express.Router();
costumerRoutes.post("/send-quarry-viaMail-for-decor-work", quarryViaMailSendingController);
costumerRoutes.post("/send-quarry-viaFooter-mail", sendQuarryViaFooterMail);
costumerRoutes.post("/set-schedule-with-client", setMeetingSchedule);

export default costumerRoutes;