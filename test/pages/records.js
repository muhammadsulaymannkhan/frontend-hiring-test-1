import React from "react";
import { useEffect, useState } from "react";
import {
  getCalls,
  archiveCall,
  getMe,
  getNewToken,
} from "../redux/app/appThunks";
import { useRouter } from "next/dist/client/router";
import {
  Table,
  Box,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  CheckBox,
} from "grommet";
import { setCurrentCallId } from "../redux/app/appSlice";
import infoIcon from "../public/assets/info.png";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Records.module.css";
import { millisToMinutesAndSeconds } from "../helpers/helper";

const Records = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const calls = useSelector((state) => state.app.calls);
  const [callType, setCallType] = useState("");
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const getCallsFromApi = async () => {
    await dispatch(getCalls({ offset: offset, limit: limit }));
  };

  const handleArchive = async (id) => {
    await dispatch(archiveCall({ id: id }));
    await dispatch(getCalls({ offset: offset, limit: limit }));
  };
  const isUser = async () => {
    if (!user) {
      await dispatch(getMe());
    }
  };

  const handleInfo = async (id) => {
    await dispatch(setCurrentCallId(id));
    router.push("/info");
  };
  useEffect(() => {
    isUser();
    getCallsFromApi();
  }, []);

  useEffect(() => {
    getCallsFromApi();
  }, [offset]);
  return (
    <Box className={styles.record_container}>
      <Box className={styles.table_container}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                {" "}
                Index
              </TableCell>
              <TableCell scope="col" border="bottom">
                {" "}
                Caller
              </TableCell>
              <TableCell scope="col" border="bottom">
                Receiver
              </TableCell>
              <TableCell scope="col" border="bottom">
                Duration
              </TableCell>
              <TableCell scope="col" border="bottom">
                Archived
              </TableCell>
              <TableCell scope="col" border="bottom">
                Call_Type
              </TableCell>
              <TableCell scope="col" border="bottom">
                Date
              </TableCell>
              <TableCell scope="col">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls?.nodes?.map((call, index) => (
              <>
                {call.call_type === callType || !callType ? (
                  <TableRow key={index}>
                    <TableCell scope="row">{index + offset}</TableCell>
                    <TableCell>{call.from}</TableCell>
                    <TableCell>{call.to}</TableCell>
                    <TableCell>
                      {millisToMinutesAndSeconds(call.duration)}
                    </TableCell>
                    <TableCell>
                      <CheckBox
                        checked={call.is_archived}
                        toggle={true}
                        onClick={() => handleArchive(call.id)}
                      />
                    </TableCell>
                    <TableCell>{call.call_type}</TableCell>
                    <TableCell>
                      {new Date(call.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <img
                        src={infoIcon.src}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleInfo(call.id)}
                        width={15}
                        height={15}
                      />
                    </TableCell>
                  </TableRow>
                ) : null}
              </>
            ))}
          </TableBody>
        </Table>
        <div className={styles.bottom_layer}>
          <div className={styles.filters}>
            <p style={{ marginRight: "10px" }}>All</p>
            <CheckBox
              toggle={true}
              checked={callType === "" ? true : false}
              onChange={() => setCallType("")}
            />
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>Missed</p>
            <CheckBox
              toggle={true}
              checked={callType === "missed" ? true : false}
              style={{ marginRight: "10px" }}
              onChange={() => setCallType("missed")}
            />
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>Answered</p>
            <CheckBox
              toggle={true}
              checked={callType === "answered"}
              style={{ marginRight: "10px" }}
              onChange={() => setCallType("answered")}
            />
            <p style={{ marginRight: "10px", marginLeft: "10px" }}>Voicemail</p>
            <CheckBox
              toggle={true}
              checked={callType === "voicemail"}
              style={{ marginRight: "10px" }}
              onChange={() => setCallType("voicemail")}
            />
          </div>
          <div>
            <button
              className="button_primary"
              style={{ width: "120px", height: "60px" }}
              onClick={() => {
                setOffset(offset - 10);
                setPageCount(pageCount - 1);
              }}
              disabled={offset === 1}
            >
              Previous Page
            </button>
            <button
              className="button_primary"
              disabled={calls?.hasNextPage ? false : true}
              style={{ width: "120px", height: "60px" }}
              onClick={() => {
                setOffset(offset + 10);
                setPageCount(pageCount + 1);
              }}
            >
              Next Page
            </button>
          </div>
        </div>
        <div className={styles.count_layer}>
          Page {pageCount} of {Math.ceil(calls?.totalCount / 10)}
        </div>
      </Box>
    </Box>
  );
};

export default Records;
