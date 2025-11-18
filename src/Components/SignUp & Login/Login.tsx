import { TextInput, PasswordInput, Button, LoadingOverlay } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginValidation } from "../../services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import { setJwt } from "../../Slices/JwtSlice";
import { loginUser } from "../../services/AuthService";
import { jwtDecode } from "jwt-decode";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  // ✅ Countdown + notification update logic
  useEffect(() => {
    if (!notificationId) return; // wait until login notification is shown

    let count = 5;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count > 0) {
        notifications.update({
          id: notificationId,
          title: "Login Successful",
          message: `Redirecting to home page in ${count} seconds.`,
          withCloseButton: true,
          icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
          color: "teal",
          withBorder: true,
          className: "!border-green-600",
        });
      } else {
        clearInterval(interval);
        notifications.update({
          id: notificationId,
          title: "Login Successful",
          message: "Redirecting now...",
          color: "green",
        });
        setLoading(false);
        setNotificationId(null);
        navigate("/"); // redirect after countdown
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown,notificationId, navigate]);

  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = LoginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);

    if (valid === true) {
      setLoading(true);
      setCountdown(5);
      loginUser(data)
        .then((res: any) => {
          console.log(res);
          const id = notifications.show({
            title: "Login Successful",
            message: `Redirecting to home page in 5 seconds.`,
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-600",
          });

          setNotificationId(id);

          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({ ...decoded, email: decoded.sub }));
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response?.data);
          notifications.show({
            title: "Login Failed",
            message: `${error.response?.data?.errorMessage || "Something went wrong"}`,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-red-500",
          });
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "bright-sun.4", type: "bars" }}
      />

      <div className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Login</div>

        <TextInput
          name="email"
          error={formError.email}
          onChange={handleChange}
          value={data.email}
          withAsterisk
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
        />

        <PasswordInput
          name="password"
          error={formError.password}
          onChange={handleChange}
          value={data.password}
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
        />

        <div
          onClick={open}
          className="text-bright-sun-400 sm-mx:text-sm xs-mx:text-xs hover:underline cursor-pointer text-right text-sm mb-2"
        >
          Forgot password ?
        </div>

        <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">
          Login
        </Button>

        <div className="mx-auto sm-mx:text-sm xs-mx:text-xs">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/sign-up");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 sm-mx:text-sm xs-mx:text-xs hover:underline cursor-pointer text-sm"
          >
            Sign Up
          </span>
        </div>
      </div>

      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
