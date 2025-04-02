import { useEffect, useState } from 'react';
import { login, register } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

function Home() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (token) {
      navigate('/chats');
    }
    setIsRegister(true);
  }, []);

  const handleSendForm = () => {
    if (email && email != '' && pass && pass != '') {
      const callRegister = async () => {
        setIsLoading(false);
        let token = null;
        if (isRegister) {
          token = await register(email, pass);
        } else {
          token = await login(email, pass);
        }
        localStorage.setItem('tkn', token);
        setIsLoading(false);
        navigate('/chats');
      };
      setIsLoading(true);
      callRegister();
    } else {
      setError('El email o la contraseña no es correcto');
    }
  };

  return (
    <div className="min-h-[100vh] min-w-[100vw] flex flex-col items-center justify-center align-middle">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-slate-600 rounded-lg flex flex-col gap-6 w-full md:w-[600px] m-h-[30dvh] p-8">
          <h1 className="text-2xl">Mhordio</h1>
          <div className="flex flex-col gap-2 justify-start align-middle">
            <span className="w-20 text-start p-2">Email:</span>
            <input
              className="p-2 rounded-md w-full bg-slate-600 border-2 border-slate-200 outline-none"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start align-middle">
            <span className="w-20 text-start p-2">Password:</span>
            <input
              className="p-2 rounded-md w-full bg-slate-600 border-2 border-slate-200 outline-none"
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>

          <button
            className="p-2 bg-slate-200 rounded-lg text-black hover:bg-slate-300"
            onClick={() => handleSendForm()}
          >
            {isRegister ? 'Registrarse' : 'Entrar'}
          </button>
          <span
            className={` ${
              error && error.length > 0 ? 'visible' : 'hidden'
            } text-sm text-red-400`}
          >
            {error}
          </span>
          {isRegister ? (
            <button
              className="text-lg text-blue-200 underline"
              onClick={() => {
                setIsRegister(false);
              }}
            >
              ¿Aun no tienes una cuenta?
            </button>
          ) : (
            <button
              className="text-lg text-blue-200 underline"
              onClick={() => {
                setIsRegister(true);
              }}
            >
              ¿Ya tienes una cuenta?
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
