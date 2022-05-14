import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCallById, addNote } from "../redux/app/appThunks";
import {
  Table,
  Box,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TextArea,
} from "grommet";
import styles from "../styles/Info.module.css";

const info = () => {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState("");
  const [callId, setCallId] = useState();
  const callData = useSelector((state) => state.app.currentCallData);
  const getCallData = async () => {
    await dispatch(getCallById({ id: localStorage.getItem("currentCallId") }));
  };

  const handleNote = async () => {
    await dispatch(addNote({ id: callId, content: noteText }));
    setNoteText("");
    getCallData();
  };

  useEffect(() => {
    setCallId(localStorage.getItem("currentCallId"));
    if (!callData) {
      getCallData();
    }
    console.log(callData?.notes);
  }, [callData]);

  return (
    <Box className={styles.info_container}>
      <Box className={styles.table_container}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Notes
              </TableCell>
              <TableCell scope="col" border="bottom">
                Add Note{" "}
              </TableCell>
              <TableCell scope="col" border="bottom">
                Submit{" "}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell scope="row">
                {callData?.notes?.map((item, index) => (
                  <p key={index}>{item.content}</p>
                ))}
              </TableCell>
              <TableCell scope="row">
                <TextArea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </TableCell>
              <TableCell scope="row">
                <button
                  className="button_primary"
                  style={{ width: "60px", height: "40px" }}
                  onClick={() => handleNote()}
                >
                  Add
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default info;
