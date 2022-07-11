import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack,  TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch} from "react-redux"
// component
import { register } from "../../../redux/actions/userAction";
export default function LoginForm() {
  const dispatch=useDispatch()
  const LoginSchema = Yup.object().shape({
    name:Yup.string().min(3).required('Invalid Name'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(8).required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
    name:'',
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(register(values))
      setSubmitting(false);
    },
  });

  const { errors, touched,  isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
        <TextField
            fullWidth
            autoComplete="name"
            type="text"
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
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
            type="password"
            label="Password"
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ my: 2 }}>
          <Link component={RouterLink} variant="subtitle2" to="/login" underline="hover">
            Have account?
          </Link>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
