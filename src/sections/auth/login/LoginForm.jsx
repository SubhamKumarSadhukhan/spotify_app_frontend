import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/userAction";
// material
import {  Stack,TextField} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
export default function LoginForm() {
   const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(login(values))
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={ 'password'}
            label="Password"
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
