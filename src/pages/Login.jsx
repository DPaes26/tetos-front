import { App, Button, Form, Input } from "antd";
import { useLogin } from "../hooks/usuarioHooks";
import { useNavigate } from "react-router";


const Login = () => {
    const navigate = useNavigate();
    const { notification } = App.useApp();
    const { mutate: login, isPending: loginPending } = useLogin();

    function logar(dados) {
        login(dados, {
            onSuccess: ({ type, description, usuario, token }) => {
                notification[type]({
                    description,
                });
                if(type == "success") {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('usuario', JSON.stringify(usuario));
                    navigate('/home');
                }
            },
            onError:({ response: { data: {type, description} } }) => {
                notification[type]({
                    description,
                });
            }
        })
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="bg-white p-4 rounded-2xl shadow-md w-96">
                <Form
                    layout="vertical"
                    onFinish={logar}


                >
                    <Form.Item
                        label="Email"
                        name={"email"}
                        rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
                    >
                        <Input placeholder="email@email.com" />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name={"senha"}
                        required={false}
                        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                    >
                        <Input.Password placeholder="********" />
                    </Form.Item>

                    <Button className="w-full mt-4"
                        type="primary"
                        htmlType="submit"
                        loading={loginPending}>
                        Enviar
                    </Button>
                </Form>
            </div>
        </div>

    );
}

export default Login;