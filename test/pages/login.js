import Image from "next/image";
import styles from "../styles/Login.module.css";
import { Box } from "grommet";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { getNewToken } from "../redux/app/appThunks";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/app/appThunks";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const validate = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmit = async (values) => {
    await dispatch(signInUser(values));
  };
  useEffect(() => {
    if (user) {
      router.push("/records");
    }
  }, [user]);

  return (
    <Box className={styles.login_container}>
      <Box className={styles.form_container}>
        <Image
          src="/assets/logo.png"
          width={150}
          height={150}
          className={styles.logo}
        />
        <h1>Login</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Field
                placeholder="username"
                name="username"
                id="username"
                className={styles.field_style}
              />
              {errors.username && touched.username ? (
                <p style={{ color: "red" }}>{errors.username}</p>
              ) : null}

              <Field
                placeholder="your password"
                type="password"
                name="password"
                id="password"
                className={styles.field_style}
              />
              {errors.password && touched.password ? (
                <p style={{ color: "red" }}>{errors.password}</p>
              ) : null}
              <button
                type="submit"
                className="button_primary"
                style={{ width: "300px", height: "60px", fontSize: "20px" }}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
