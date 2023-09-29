import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputWithValidation from '../ui/InputWithValidation'
import { login } from '../../services/AuthService'
import { useAppContext } from '../../context/UserContext'
import { toast } from 'react-toastify'
import md5 from 'md5'

export default function Login() {
  const navigate = useNavigate()

  const { setCurrentUser } = useAppContext()

  // Validation
  const schema = yup.object().shape({
    username: yup.string().trim().required('Vui lòng nhập tên tài khoản'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Api
  const onSubmitHandler = async (data) => {
    if (data) {
      let req = await login(data.username, md5(data.password))
      if (req.status === true) {
        setCurrentUser(req)
        toast.success(req.msg)
        navigate('/manage/room-register')
      } else {
        toast.error(req.msg)
      }
    }
    reset()
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đăng nhập tài khoản
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    username
                  </label>
                  <InputWithValidation
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <InputWithValidation
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Lưu mật khẩu
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-500 dark:text-gray-300 text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="text-gray-200 text-end">
                  <button className="btn" onClick={() => navigate('/')}>
                    Hủy
                  </button>
                  <button type="submit" className="btn mx-2">
                    Đăng Nhập
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Bạn chưa có tài khoản?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Đăng Ký
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
