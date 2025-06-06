import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@teste.com" && password === "123456") {
        onLogin();
        navigate("/home");
      } else {
        setError("E-mail ou senha inválidos.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
        <FormSection>
            <LogoWrapper>
                <img src="/img/logo.png" alt="Logo Troppi Digital" />
            </LogoWrapper>
            
            <Title>Bem-vindo de volta</Title>
            <Subtitle>Entre com sua conta para acessar o painel.</Subtitle>

            <Label htmlFor="email">E-mail</Label>
            <Input
            type="email"
            placeholder="seunome@seuservidor.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={email.includes("@")}
            />


           <Label htmlFor="password">Senha</Label>
           <PasswordWrapper>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite aqui"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isValid={password.length >= 6}
                />
                <ToggleVisibilityButton
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                    <FiEyeOff size={25} color="#cc6237" />
                    ) : (
                    <FiEye size={25} color="#cc6237" />
                    )}
                </ToggleVisibilityButton>
            </PasswordWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <LoginButton onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Enviar"}
            </LoginButton>

            <AutoFillButton onClick={() => simulateTyping(setEmail, setPassword)}>
            Preencher automático
            </AutoFillButton>
        </FormSection>

            <IllustrationSection>
                <img src="/img/monitoramento.png" alt="Ilustração" />
            </IllustrationSection>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Login;

function simulateTyping(setEmail, setPassword) {
  const fakeEmail = "admin@teste.com";
  const fakePassword = "123456";

  let email = "";
  let password = "";


  setEmail("");
  setPassword("");


  setTimeout(() => {
    let i = 0;
    const emailInterval = setInterval(() => {
      email += fakeEmail.charAt(i);
      setEmail(email);
      i++;

      if (i === fakeEmail.length) {
        clearInterval(emailInterval);

   
        let j = 0;
        const passwordInterval = setInterval(() => {
          password += fakePassword.charAt(j);
          setPassword(password);
          j++;

          if (j === fakePassword.length) {
            clearInterval(passwordInterval);
          }
        }, 80);
      }
    }, 80);
  }, 150); 
}




const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fc;
   font-family: 'Inter', sans-serif;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 800px;
  max-width: 95%;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding:10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    margin: 1rem;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;


const IllustrationSection = styled.div`
  flex: 0.8;
  background: #cc6237;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 25px;

    img {
        max-width: 110%;
        max-height: 110%;
        position:relative;
        top:82px;
        right:55px;
       
    }

    @media (max-width: 768px) {
        display: none;
    }
    `;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.0rem;
  color: #cc6237;
  position:relative;
  top:20px;
  right:1px;
  

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 2rem;
  
  
   

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
const Label = styled.label`
  font-size: 0.85rem;
  color: #cc6237;
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 90%;
  margin-bottom: 0.8rem;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  font-size: 1rem;
  border: 2px solid
    ${(props) =>
      props.isValid === undefined ? "#ccc" : props.isValid ? "#4caf50" : "#f6f6f6"};
  border-radius: 25px;
  transition: border 0.2s ease;
  box-sizing: border-box;
  background-color: #f6f6f6;

  &:focus {
    outline: none;
    border-color: #cc6237;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.65rem 0.9rem;
    width: 80%; /* mantém largura no mobile */
  }
`;

const LoginButton = styled.button`
  width: 90%;  /* deixa o botão com a mesma largura do input */
  background-color: #cc6237;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #a7461f;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ToggleVisibilityButton = styled.button`
  position: absolute;
  top: 40%;
  right: 4rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const AutoFillButton = styled.button`
  margin-top: 2rem;
  background: none;
  border: none;
  color: #cc6237;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;


const LogoWrapper = styled.div`
  display: flex;
  justify-content: rigth;
 

  img {
    
    max-height: 60px;
    width: 50%;
    position:relative;
    top:20px;
    right:10px;

  }
`;
