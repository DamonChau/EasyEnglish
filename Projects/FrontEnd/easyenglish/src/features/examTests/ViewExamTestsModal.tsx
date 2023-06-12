/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import ExamTestsViewerControl from "../examTests/ExamTestsViewerControl";

const ViewExamTestsModal = ({ open, onClose, onSubmit }: any) => {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
  
    const onSelectedDone = (items: string[]) => {
      setSelected(items);
    };
  
    const handleSubmit = () => {
      //put your validation logic here
      onSubmit(selected);
      onClose();
    };
  
    return (
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle textAlign="center" variant="h6">
          Exam Tests
        </DialogTitle>
        <DialogContent
          sx={{
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "0px",
          }}
        >
          <Stack>
            <div className="d-flex justify-content-center">
              <ExamTestsViewerControl
                onSelectedDone={onSelectedDone}
              ></ExamTestsViewerControl>
            </div>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: "1.25rem" }}>
          <button
            className="btn btn-primary py-2 px-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary py-2 px-2"
            type="button"
            onClick={handleSubmit}
          >
            OK
          </button>
        </DialogActions>
      </Dialog>
    );
  };

  export default ViewExamTestsModal;