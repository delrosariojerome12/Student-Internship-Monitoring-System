import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./features/globalReducer";
import userReducer from "./features/user/userReducer";
import dashboard from "./features/dashboard/dashboard";
import sidebarRight from "./features/dashboard/sidebarRight";
import intern from "./features/interns/internReducer";
import internDocument from "./features/interns/documentsReducer";
import document from "./features/admin/document";
import documentApproval from "./features/admin/documentApproval";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    dashboard: dashboard,
    sidebarRight: sidebarRight,
    intern: intern,
    internDocument: internDocument,
    document: document,
    documentApproval: documentApproval,
  },
});
